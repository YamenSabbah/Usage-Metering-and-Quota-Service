# Usage Metering and Quota Service

A production-minded backend service for tracking resource consumption, enforcing account-level and user-level quotas, managing subscription plans, and maintaining accurate usage history.

## Features

- **Two-tier quota enforcement** — account-level and user-level monthly allowances and per-request limits, evaluated atomically on every request.
- **Idempotent consumption** — `requestId`-based deduplication survives restarts and concurrent requests via a database unique constraint.
-- **Concurrent-safe** — row-level locking (`SELECT ... FOR UPDATE`) with a consistent lock order prevents race conditions from exceeding quotas.
- **Durable audit trail** — every decision (accepted or rejected) is persisted with a snapshot of the effective limits at decision time.
- **UTC monthly accounting** — usage periods follow UTC calendar months; new months start at zero automatically.
- **Isolation by API key** — every operation is scoped to the authenticated account. Cross-account access is impossible.
- **Predefined and custom plans** — four seeded plans out of the box; accounts can create and update their own custom plans.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript (strict mode) |
| Runtime | Node.js 22 |
| Framework | Express 5 |
| Database | PostgreSQL 16 |
| ORM | Prisma 7 (with `@prisma/adapter-pg`) |
| Validation | Zod 3 |
| Testing | Vitest + Supertest |
| Load Testing | k6 |
| Containerization | Docker + Docker Compose |

## Architecture

```
usage-metering-service/
├── src/
│   ├── app.ts                  # Express app assembly
│   ├── server.ts               # HTTP server bootstrap
│   ├── config/index.ts         # Environment configuration
│   ├── lib/
│   │   ├── prisma.ts           # Prisma client singleton
│   │   ├── prisma-errors.ts    # P2002 → 409 detection helper
│   │   └── api-key-cache.ts    # Verified-key cache (skips argon2 per request)
│   ├── middleware/
│   │   ├── api-key-auth.ts     # X-API-Key authentication
│   │   └── errors.ts           # AppError + centralized error handler
│   ├── modules/
│   │   ├── accounts/controller.ts
│   │   ├── users/controller.ts
│   │   ├── plans/controller.ts
│   │   ├── consumption/controller.ts
│   │   ├── usage/controller.ts
│   │   └── history/controller.ts
│   ├── services/               # Business logic (pure, testable)
│   │   ├── accounts.ts
│   │   ├── users.ts
│   │   ├── plans.ts
│   │   ├── consumption.ts      # Core quota engine
│   │   ├── usage.ts
│   │   └── history.ts
│   ├── validation/
│   │   ├── schemas.ts          # Zod schemas
│   │   └── middleware.ts       # validate() Express middleware
│   ├── utils/
│   │   ├── crypto.ts           # API key generation + argon2id hashing
│   │   └── date.ts             # UTC month helpers
│   └── types/index.ts
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts                 # Idempotent predefined plan seeding
├── example-client/index.html   # Browser dashboard
├── tests/
│   ├── helpers.ts
│   ├── unit/
│   ├── integration/
│   └── concurrency/
├── load-tests/
│   ├── scenarios.js
│   └── README.md
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── vitest.config.ts
```

### Layer separation

- **Controllers** (`src/modules/`) — HTTP handling, request parsing, response formatting.
- **Services** (`src/services/`) — business rules, transaction management, quota evaluation.
- **Middleware** (`src/middleware/`) — authentication, error handling.
- **Validation** (`src/validation/`) — Zod schemas and Express validation middleware.

## Data Model

### Plan
| Field | Type | Notes |
|-------|------|-------|
| id | Int | PK |
| name | String | |
| scope | `ACCOUNT` \| `USER` | |
| monthlyAllowance | Int | Units per UTC calendar month |
| maxPerRequest | Int | Max units in a single request |
| source | `PREDEFINED` \| `CUSTOM` | Predefined are read-only |
| accountId | Int? | Owner for custom plans; null for predefined |

### Account
| Field | Type | Notes |
|-------|------|-------|
| id | Int | PK |
| name | String | |
| apiKeyHash | String | argon2id hash (unique) |
| apiKeyPrefix | String | First 8 hex chars for indexed lookup (unique) |
| planId | Int | FK → Plan |

### User
| Field | Type | Notes |
|-------|------|-------|
| id | Int | PK |
| externalRef | String | Client-supplied reference |
| accountId | Int | FK → Account |
| planId | Int | FK → Plan |

Unique on `(accountId, externalRef)`.

### AccountUsage / UserUsage
Monthly usage totals with unique constraints on `(accountId, year, month)` and `(userId, year, month)` respectively. `consumedUnits` is an integer counter.

### UsageRequest
Durable record of every consumption decision. Stores the request input, the decision, rejection details, and a snapshot of the effective plan limits and usage state at decision time. Unique on `(accountId, requestId)` — this is the idempotency constraint.

## Predefined Plans

| Plan | Scope | Monthly Allowance | Max Per Request |
|------|-------|-------------------|-----------------|
| Starter | ACCOUNT | 10,000 | 100 |
| Pro | ACCOUNT | 100,000 | 1,000 |
| Basic | USER | 1,000 | 20 |
| Premium | USER | 10,000 | 200 |

Seeding is idempotent — restarting the application does not duplicate plans or reset usage.

**Defaults:** new accounts get the Starter plan. New users get the Basic plan.

## API Key Authentication

- API keys are generated with `crypto.randomBytes(32)` (256-bit, hex-encoded).
- Stored as argon2id hashes (`memoryCost: 64MB, timeCost: 3, parallelism: 4`).
- A short prefix (first 8 hex chars) is stored in `apiKeyPrefix` for efficient indexed lookup; the full key is then verified against the argon2id hash.
- The plaintext key is returned **once** at account creation and cannot be retrieved later.
- All authenticated requests use the header: `X-API-Key: <key>`

## API Endpoints

All endpoints except `POST /accounts` require the `X-API-Key` header.

### Error responses

Errors use a stable shape: `{ "error": "CODE", "message": "..." }`. Validation
failures return `{ "error": "VALIDATION_FAILED", "details": [{ field, message }] }`
instead of a top-level `message`.

| Status | Code | When |
|--------|------|------|
| 400 | `VALIDATION_FAILED` | Malformed body (e.g. `units` <= 0, missing `requestId`). Includes `details` |
| 401 | `UNAUTHORIZED` | Missing or invalid API key |
| 403 | `FORBIDDEN` | Authenticated but not allowed to touch the resource |
| 404 | `NOT_FOUND` | Unknown route, plan, user, or `requestId` |
| 409 | `CONFLICT` | Uniqueness clash: duplicate `externalRef` in an account, or a duplicate custom plan name for the same scope |
| 422 | `UNPROCESSABLE` | Referenced `userId` does not belong to the authenticated account |
| 500 | `INTERNAL_ERROR` | Unexpected server error (internals are never leaked) |

A quota rejection is **not** an HTTP error: `POST /consume` returns `200` with
`accepted: false` and a `rejectionCode`, because the decision is a valid outcome
and is recorded in history.

### Account

| Method | Path | Description |
|--------|------|-------------|
| POST | `/accounts` | Create account, returns API key (once) |
| GET | `/accounts/me` | Inspect authenticated account + plan |
| PUT | `/account/plan` | Change account's plan |

### Users

| Method | Path | Description |
|--------|------|-------------|
| POST | `/users` | Register user |
| GET | `/users` | List users (paginated) |
| GET | `/users/:userId` | Inspect user + plan |
| PUT | `/users/:userId/plan` | Change user's plan |

### Plans

| Method | Path | Description |
|--------|------|-------------|
| GET | `/plans` | List predefined + own custom plans |
| GET | `/plans/:planId` | Inspect accessible plan |
| POST | `/plans` | Create custom plan |
| PATCH | `/plans/:planId` | Update own custom plan |

### Consumption

| Method | Path | Description |
|--------|------|-------------|
| POST | `/consume` | Evaluate and record consumption |

### Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/usage` | Account usage (all months, paginated) |
| GET | `/usage/current` | Current month account usage + plan |
| GET | `/usage/users/:userId` | User usage for a month |

### History

| Method | Path | Description |
|--------|------|-------------|
| GET | `/history` | Account request history (paginated, filterable) |
| GET | `/history/:requestId` | Inspect a single recorded request |

## Request / Response Examples

### Create account

```bash
curl -X POST http://localhost:3000/accounts \
  -H "Content-Type: application/json" \
  -d '{"name":"My App"}'
```

Response:
```json
{
  "id": 1,
  "name": "My App",
  "apiKey": "a1b2c3...",
  "message": "Save this API key securely — it cannot be retrieved later."
}
```

### Consume units

```bash
curl -X POST http://localhost:3000/consume \
  -H "Content-Type: application/json" \
  -H "X-API-Key: <your-key>" \
  -d '{"userId": 1, "units": 10, "requestId": "job-12345"}'
```

Accepted response:
```json
{
  "accepted": true,
  "requestedUnits": 10,
  "unitsConsumed": 10,
  "rejectionCode": null,
  "rejectionScope": null,
  "account": {
    "planId": 1, "planName": "Starter",
    "monthlyAllowance": 10000, "consumedUnits": 10,
    "remaining": 9990, "maxPerRequest": 100
  },
  "user": {
    "planId": 3, "planName": "Basic",
    "monthlyAllowance": 1000, "consumedUnits": 10,
    "remaining": 990, "maxPerRequest": 20
  }
}
```

Rejected response:
```json
{
  "accepted": false,
  "requestedUnits": 25,
  "unitsConsumed": 0,
  "rejectionCode": "USER_PER_REQUEST_LIMIT",
  "rejectionScope": "user",
  "account": { "...": "..." },
  "user": { "...": "..." }
}
```

## Quota Evaluation Rules

Every `POST /consume` request is evaluated against four rules, in order:

1. **Account per-request limit** — `units ≤ accountPlan.maxPerRequest`
2. **User per-request limit** — `units ≤ userPlan.maxPerRequest`
3. **Account monthly allowance** — `units ≤ accountPlan.monthlyAllowance − accountUsage.consumedUnits`
4. **User monthly allowance** — `units ≤ userPlan.monthlyAllowance − userUsage.consumedUnits`

A failure in any rule rejects the entire request. Rejected requests consume zero units. All rejections return HTTP 200 with `accepted: false` and a machine-readable `rejectionCode`.

Rejection codes: `ACCOUNT_PER_REQUEST_LIMIT`, `USER_PER_REQUEST_LIMIT`, `ACCOUNT_MONTHLY_LIMIT`, `USER_MONTHLY_LIMIT`.

## Plan Update Semantics

- Plan changes take effect for new consumption requests immediately — no redeployment needed.
- Updating a plan does **not** reset previously consumed units.
- If an allowance is reduced below existing usage, remaining becomes zero. Further consumption is rejected until the allowance permits it.
- Historical `UsageRequest` records are **never** modified by plan changes — they store snapshots of the limits at decision time.

## UTC Monthly Accounting

- Usage periods are UTC calendar months identified by `(year, month)`.
- A request processed at 2026-10-31T23:59:59Z belongs to October 2026.
- A request at 2026-11-01T00:00:00Z starts a new period with zero usage.
- Query previous months with `?month=YYYY-MM`.

## Idempotency

- `requestId` is unique per account, enforced by a database unique constraint on `(accountId, requestId)`.
- Identical retries return the original recorded decision without consuming additional units.
- Rejected decisions are also persisted — their `requestId` can be retried and returns the same rejection.
- Idempotency records live as long as the `UsageRequest` rows (no automatic expiry; retention is an operational concern).

## Transaction & Concurrency Strategy

The consumption decision runs inside a Prisma interactive transaction with these protections:

1. **`INSERT ... ON CONFLICT DO NOTHING`** — atomically creates the monthly usage row if missing, avoiding a race on first use.
2. **`SELECT ... FOR UPDATE`** — explicit row locks on the account+month and user+month usage rows. Lock order is always account → user, preventing deadlocks.
3. **Conditional atomic update** — `UPDATE ... SET consumedUnits = consumedUnits + N WHERE consumedUnits = :expected` acts as a second safety net.
4. **Retry on transient errors** — serialization failures (`40001`), deadlocks (`40P01`), and unique constraint violations on the idempotency key (`P2002`) are retried up to 3 times. Business-rule failures are never retried.

READ COMMITTED isolation is used (PostgreSQL default) — the explicit row locks provide sufficient serialization.

## Product Assumptions

| Decision | Rationale |
|----------|-----------|
| Default account plan: Starter | Lowest predefined plan; safe default for new integrations. |
| Default user plan: Basic | Same reasoning. |
| API key shown once at creation | Security best practice; key is stored only as an argon2id hash. |
| API key rotation | Not implemented; create a new account. Documented as a limitation. |
| No user deactivation/deletion | Out of scope; cascade delete on account removal is the only deletion path. |
| Predefined plans are read-only | Enforced at the service layer (403 on PATCH). |
| Rejected requests return HTTP 200 | Business rejection is a valid outcome, not a transport error. |
| `requestId` reuse with different input | Returns the original recorded decision (idempotent by key, not by payload). |
| Zero allowance is allowed | A plan with `monthlyAllowance: 0` rejects all consumption — useful for paused accounts. |
| No rate limiting | Not implemented; 429 status is reserved but unused. |

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | — | PostgreSQL connection string |
| `PORT` | No | `3000` | API server port |
| `NODE_ENV` | No | `development` | `development` \| `production` \| `test` |

## Quick Start

### Local development

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Start PostgreSQL (or use an existing instance)
docker compose up -d postgres

# 3. Install dependencies
npm install

# 4. Generate Prisma client
npx prisma generate

# 5. Run migrations
npx prisma migrate dev

# 6. Seed predefined plans
npm run seed

# 7. Start the API
npm run dev
```

The API is now at `http://localhost:3000`.

### Docker Compose (full stack)

```bash
docker compose up --build
```

This starts PostgreSQL, the API (with migrations and seeding), and an nginx server for the example client at `http://localhost:8080`.

### Commands

| Command | Description |
|---------|-------------|
| `docker compose up --build` | Start full stack |
| `docker compose down` | Stop all services |
| `docker compose logs -f api` | View API logs |
| `docker compose down -v` | Stop and delete database volume (reset data) |
| `npm run dev` | Start API in development mode |
| `npm run seed` | Seed predefined plans (idempotent) |
| `npm test` | Run all tests |
| `npm run test:unit` | Run unit tests only |
| `npm run test:integration` | Run integration tests only |
| `npm run test:concurrency` | Run concurrency tests only |

## Testing

```bash
# All tests (107 tests across 8 files)
npm test

# Unit only (40 tests — validation, date utils, crypto)
npm run test:unit

# Integration only (63 tests — auth, plans, consumption, idempotency, conflicts)
npm run test:integration

# Concurrency only (4 tests — parallel consumption, shared limits, duplicate IDs)
npm run test:concurrency
```

Tests run against the real PostgreSQL database. Ensure `DATABASE_URL` points to a development database before running.

### What is covered

- **Auth**: missing/invalid/valid API key, key never exposed in responses, and the verification cache rejects a forged key sharing a prefix and is invalidated when the stored hash rotates.
- **Isolation**: cross-account plan/history access returns 404, a foreign `userId` on `/consume` returns 422, and another account's plan returns 404.
- **Conflicts**: duplicate `externalRef` and duplicate custom plan names return 409 (not 500), and uniqueness is scoped per account and per scope.
- **Plans**: predefined plans listed and read-only, custom plans CRUD, plan assignment.
- **Consumption**: all four rule rejections, boundary conditions, plan updates taking effect immediately.
- **Idempotency**: duplicate `requestId` returns original decision, rejected decisions persisted.
- **Concurrency**: parallel requests cannot exceed limits, duplicate requestIds don't double-count, shared account totals stay accurate.

## Performance Testing

```bash
# Start the API first, then run k6 from inside the compose network so the
# Docker port forward does not become the bottleneck:
docker run --rm --network foothill-finalproject_default \
  -v "$(pwd)/load-tests:/scripts:ro" grafana/k6 \
  run /scripts/scenarios.js -e BASE_URL=http://api:3000 -e RATE=10
```

See [load-tests/README.md](load-tests/README.md) for details and for the measured
capacity curve.

**Measured results** — one API container (Node 22, `tsx`), PostgreSQL 16 container,
Docker Desktop on an 8-core host, `RATE=10` (offered 10 req/s, bursting to 20):

| Metric | Value |
|--------|-------|
| Observed throughput | 24.5 req/s |
| p50 latency | 56 ms |
| p95 latency | 95 ms |
| p99 latency | 174 ms |
| Error rate | 0% |
| Accepted vs rejected | 100% accepted (plans sized for the run) |
| Final usage accuracy | Exact — within limits, no over-consumption |

**Capacity.** Consumption serializes per account via `SELECT ... FOR UPDATE`, and
the API process is single-threaded, so one node saturates one CPU core at about
**35 consumption requests/s** (measured: 17/s at 1 VU, 35/s at 10 VUs, 35/s at 50
VUs; the API container held ~100–120% CPU while PostgreSQL stayed at ~30–47%).
Offering more than that only builds a queue — at 50–100 req/s p95 rose to several
seconds, without errors. Since the API keeps no state in memory, the fix for more
throughput is more API replicas behind a load balancer; the database still had
CPU headroom.

*These are single-node numbers from a development machine, not a production
benchmark.*

## Known Limitations & Future Improvements

- **API key rotation** — not implemented; requires creating a new account.
- **Rate limiting** — not implemented; the 429 status code is reserved.
- **Multi-region** — single-database design; no cross-region replication.
- **Usage aggregation across accounts** — no admin/aggregate endpoints.
- **Plan versioning** — plan updates overwrite current values; no version history on the Plan table (UsageRequest snapshots provide the audit trail).
- **Connection pooling** — the `pg` pool is configured explicitly (`DATABASE_POOL_MAX`, default 25). Production deployments may still benefit from PgBouncer at higher replica counts.
- **Single-node throughput** — one API process saturates a core at ~35 consumption req/s. Horizontal scaling (replicas) is required for more; the data model already supports it.
- **Retention/cleanup** — no automatic purge of old UsageRequest rows; implement a background job for long-lived deployments.

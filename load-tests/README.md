# Load Tests

## Prerequisites

1. A running API (see the main README's Quick Start, or `docker compose up -d`).
2. [k6](https://k6.io/docs/get-started/installation/).

## Running

```bash
# Start the stack
docker compose up -d

# Run k6 inside the compose network.
# Running it on the host through the published port measures Docker Desktop's
# port forwarding rather than the service: the same test measured 66 req/s
# through the port and 190 req/s inside the network.
docker run --rm --network foothill-finalproject_default \
  -v "$(pwd)/load-tests:/scripts:ro" grafana/k6 \
  run /scripts/scenarios.js -e BASE_URL=http://api:3000 -e RATE=10
```

Against an API already running on the host, just point `BASE_URL` at it:

```bash
k6 run load-tests/scenarios.js -e BASE_URL=http://localhost:3000
```

## Parameters

| Env var | Default | Meaning |
|---------|---------|---------|
| `BASE_URL` | `http://localhost:3000` | Target API |
| `RATE` | `10` | Offered req/s for `mixed_load`; the burst peaks at `2 × RATE` |
| `TENANTS` | `20` | How many accounts traffic is spread over |
| `USER_ALLOWANCE` | `200000` | Monthly allowance of the generated user plan |
| `ACCOUNT_ALLOWANCE` | `500000` | Monthly allowance of the generated account plan |
| `MAX_PER_REQUEST` | `100` | Per-request cap of both generated plans |

`setup()` creates `TENANTS` throwaway accounts, each with its own custom account
plan, custom user plan, and one user. Plans are sized generously so the run
measures the **accept** path (locks + writes) rather than spending most of its
time on the cheap rejection path. Lower the allowances to probe behaviour as a
quota is exhausted.

## Scenarios

| Scenario | Type | Rate | Duration | Purpose |
|----------|------|------|----------|---------|
| `mixed_load` | constant-arrival-rate | `RATE` req/s | 30s | Sustained load with 1–15 units per request |
| `burst_near_limit` | ramping-arrival-rate | `RATE/2 → 2×RATE → RATE` | 30s | Burst to stress lock contention |
| `idempotent_retry` | constant-vus | 5 VUs | 20s | Same `requestId` three times — consumes once |

## Thresholds

- `http_req_duration`: `p(95) < 500ms`, `p(99) < 1000ms`
- `accepted`: `count > 0`

At the default `RATE=10` these pass on a single node. They are a *sustain* SLO,
not a saturation target — see below.

## Measured capacity

Single API container (Node 22 via `tsx`), PostgreSQL 16 container, Docker Desktop
on an 8-core Windows host, `/consume` with 20 tenants:

| Concurrency | Throughput | Notes |
|-------------|-----------|-------|
| 1 VU | ~17 req/s | ~58ms per request uncontended |
| 10 VUs | ~35 req/s | plateau |
| 50 VUs | ~35 req/s | plateau; API container pinned at ~100–120% CPU (one core) |

At `RATE=10` (offered 10 req/s, bursting to 20) the run measured 24.5 req/s
observed, p50 56ms, p95 95ms, p99 174ms, 0% errors.

**Why it plateaus.** Consumption holds `SELECT ... FOR UPDATE` on the monthly
usage rows, so requests for one account serialize; and the API process is
single-threaded, so it saturates one core. Offering 50–100 req/s does not produce
errors (they surface as latency), it just builds a queue: p95 reached ~7–10s with
0% failures before the pool and timeout fixes, and 0% failures after.

**Scaling.** PostgreSQL stayed at ~30–47% CPU during saturation and the API keeps
no state in memory, so additional API replicas behind a load balancer raise
throughput roughly linearly. Set `TENANTS=1` to reproduce the single-hot-account
pathological case.

## What is verified

- Final usage does not exceed the plan allowance (teardown reads `/usage/current`
  and fails the run on over-consumption).
- Idempotent retries consume units only once.
- Every request returns HTTP 200 — business rejections are 200 with
  `accepted: false`, never transport errors.
- No request fails at the transport or server-error level.

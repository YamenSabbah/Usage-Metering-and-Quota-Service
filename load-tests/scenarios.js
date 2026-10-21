import http from "k6/http";
import { check, sleep } from "k6";
import { Counter, Rate } from "k6/metrics";

// ── Custom metrics ──
const accepted = new Counter("accepted");
const rejected = new Counter("rejected");
const acceptRate = new Rate("accept_rate");

// ── Config ──
const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

// Allowances for the throwaway account/user this test creates.
// Defaults are sized well above what the scenarios consume, so the run measures
// the accept path (the expensive one: locks + writes) rather than spending most
// of its time on the cheap rejection path. Lower them to probe behaviour as a
// quota is exhausted.
const USER_ALLOWANCE = Number(__ENV.USER_ALLOWANCE || 200_000);
const ACCOUNT_ALLOWANCE = Number(__ENV.ACCOUNT_ALLOWANCE || 500_000);
const MAX_PER_REQUEST = Number(__ENV.MAX_PER_REQUEST || 100);

// How many separate tenants (accounts) to spread traffic over.
// Consumption serializes per account via `SELECT ... FOR UPDATE` on the monthly
// usage row, so a single account has a hard write ceiling (~30 tx/s measured).
// Real traffic is spread across tenants, so that is the default. Set
// TENANTS=1 to reproduce the single-hot-account saturation case instead.
const TENANTS = Number(__ENV.TENANTS || 20);

// Offered request rate for the mixed scenario (req/s). The burst scenario peaks
// at twice this. See load-tests/README.md for the measured single-node
// capacity; offering more than the node can serve only builds a queue.
const RATE = Number(__ENV.RATE || 10);

export const options = {
  scenarios: {
    // Scenario 1: Mixed load — many users competing for the same account
    mixed_load: {
      executor: "constant-arrival-rate",
      rate: RATE,
      timeUnit: "1s",
      duration: "30s",
      preAllocatedVUs: 50,
      maxVUs: 100,
      exec: "mixedLoad",
    },
    // Scenario 2: Burst near quota limit
    burst_near_limit: {
      executor: "ramping-arrival-rate",
      startRate: Math.max(1, Math.floor(RATE / 2)),
      timeUnit: "1s",
      stages: [
        { target: RATE * 2, duration: "10s" },
        { target: RATE * 2, duration: "10s" },
        { target: RATE, duration: "10s" },
      ],
      preAllocatedVUs: 50,
      maxVUs: 100,
      exec: "burstNearLimit",
      startTime: "35s",
    },
    // Scenario 3: Idempotent retries
    idempotent_retry: {
      executor: "constant-vus",
      vus: 5,
      duration: "20s",
      exec: "idempotentRetry",
      startTime: "70s",
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<500", "p(99)<1000"],
    accepted: ["count>0"],
  },
};

// ── Setup: create the tenants used by the scenarios ──
function createTenant(idx) {
  const acctRes = http.post(`${BASE_URL}/accounts`, JSON.stringify({ name: `k6-tenant-${idx}` }), {
    headers: { "Content-Type": "application/json" },
  });
  const acct = acctRes.json();
  if (!acct.apiKey) throw new Error("Failed to create account: " + acctRes.body);

  const auth = { "Content-Type": "application/json", "X-API-Key": acct.apiKey };

  // Custom plans owned by this account, so the run is not throttled by the
  // small predefined allowances (Basic is only 1,000/month).
  const acctPlan = http.post(
    `${BASE_URL}/plans`,
    JSON.stringify({
      name: "k6-account",
      scope: "ACCOUNT",
      monthlyAllowance: ACCOUNT_ALLOWANCE,
      maxPerRequest: MAX_PER_REQUEST,
    }),
    { headers: auth },
  ).json();
  if (!acctPlan.id) throw new Error("Failed to create account plan for tenant " + idx);

  const userPlan = http.post(
    `${BASE_URL}/plans`,
    JSON.stringify({
      name: "k6-user",
      scope: "USER",
      monthlyAllowance: USER_ALLOWANCE,
      maxPerRequest: MAX_PER_REQUEST,
    }),
    { headers: auth },
  ).json();
  if (!userPlan.id) throw new Error("Failed to create user plan for tenant " + idx);

  const assigned = http.put(
    `${BASE_URL}/account/plan`,
    JSON.stringify({ planId: acctPlan.id }),
    { headers: auth },
  );
  if (assigned.status !== 200) throw new Error("Failed to assign account plan: " + assigned.body);

  const user = http.post(
    `${BASE_URL}/users`,
    JSON.stringify({ externalRef: "k6-user", planId: userPlan.id }),
    { headers: auth },
  ).json();
  if (!user.id) throw new Error("Failed to create user for tenant " + idx);

  return { apiKey: acct.apiKey, userId: user.id };
}

export function setup() {
  const tenants = [];
  for (let i = 0; i < TENANTS; i++) {
    tenants.push(createTenant(i));
  }

  // Report the end state of the first tenant in teardown.
  return { tenants, primary: tenants[0] };
}

/** Pick this VU's tenant so concurrent VUs spread across accounts. */
function tenantFor(data) {
  return data.tenants[__VU % data.tenants.length];
}

// ── Scenario 1: Mixed load ──
export function mixedLoad(data) {
  const t = tenantFor(data);
  const units = Math.floor(Math.random() * 15) + 1; // 1-15 units
  const requestId = `mixed-${__VU}-${__ITER}-${Date.now()}`;

  const res = http.post(
    `${BASE_URL}/consume`,
    JSON.stringify({ userId: t.userId, units, requestId }),
    { headers: { "Content-Type": "application/json", "X-API-Key": t.apiKey } },
  );

  check(res, {
    "status is 200": (r) => r.status === 200,
    "has accepted field": (r) => r.json("accepted") !== undefined,
  });

  if (res.status === 200) {
    const acc = res.json("accepted");
    if (acc) { accepted.add(1); acceptRate.add(1); }
    else { rejected.add(1); acceptRate.add(0); }
  }
}

// ── Scenario 2: Burst near quota limit ──
export function burstNearLimit(data) {
  const t = tenantFor(data);
  const units = Math.floor(Math.random() * 20) + 1;
  const requestId = `burst-${__VU}-${__ITER}-${Date.now()}`;

  const res = http.post(
    `${BASE_URL}/consume`,
    JSON.stringify({ userId: t.userId, units, requestId }),
    { headers: { "Content-Type": "application/json", "X-API-Key": t.apiKey } },
  );

  check(res, { "burst: status 200": (r) => r.status === 200 });

  if (res.status === 200) {
    if (res.json("accepted")) { accepted.add(1); acceptRate.add(1); }
    else { rejected.add(1); acceptRate.add(0); }
  }
}

// ── Scenario 3: Idempotent retries ──
export function idempotentRetry(data) {
  const t = tenantFor(data);
  const requestId = `retry-${__VU}`;
  const body = JSON.stringify({ userId: t.userId, units: 5, requestId });

  const opts = {
    headers: { "Content-Type": "application/json", "X-API-Key": t.apiKey },
  };

  // Send the same request 3 times — only the first should consume
  const r1 = http.post(`${BASE_URL}/consume`, body, opts);
  const r2 = http.post(`${BASE_URL}/consume`, body, opts);
  const r3 = http.post(`${BASE_URL}/consume`, body, opts);

  check(r1, { "retry: first is 200": (r) => r.status === 200 });
  check(r2, { "retry: second is 200": (r) => r.status === 200 });
  check(r3, { "retry: third is 200": (r) => r.status === 200 });

  if (r1.status === 200 && r1.json("accepted")) { accepted.add(1); acceptRate.add(1); }
}

// ── Teardown: verify final state ──
export function teardown(data) {
  const usageRes = http.get(`${BASE_URL}/usage/current`, {
    headers: { "X-API-Key": data.primary.apiKey },
  });
  const usage = usageRes.json();

  // Report the server's own view. Per-VU counters are not readable from the
  // teardown context, so read the aggregate from the API and from k6's summary.
  console.log(`Final account usage: ${usage.consumedUnits} units (limit: ${usage.plan?.monthlyAllowance})`);

  if (!usage.plan || typeof usage.plan.monthlyAllowance !== "number") {
    throw new Error("FAIL: could not read usage/plan from /usage/current: " + usageRes.body);
  }

  if (usage.consumedUnits > usage.plan.monthlyAllowance) {
    throw new Error(
      `FAIL: usage ${usage.consumedUnits} exceeds limit ${usage.plan.monthlyAllowance}!`,
    );
  }
  console.log("PASS: usage is within the plan limit.");
}

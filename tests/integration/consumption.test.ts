import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import {
  setupTest,
  teardownTest,
  cleanupTestData,
  createTestAccount,
  createTestUser,
  findPlan,
  type TestContext,
} from "../helpers";

let ctx: TestContext;
let key: string;
let userId: number;

beforeAll(async () => {
  ctx = await setupTest();
  await cleanupTestData(ctx.prisma);

  const a = await createTestAccount(ctx.app, "Consume Corp");
  key = a.apiKey;

  const u = await createTestUser(ctx.app, key, "consumer");
  userId = u.id;
});

afterAll(async () => {
  await cleanupTestData(ctx.prisma);
  await teardownTest();
});

describe("Accepting valid consumption", () => {
  it("accepts a valid request and returns updated usage", async () => {
    const res = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", key)
      .send({ userId, units: 10, requestId: "acc-1" });

    expect(res.status).toBe(200);
    expect(res.body.accepted).toBe(true);
    expect(res.body.unitsConsumed).toBe(10);
    expect(res.body.rejectionCode).toBeNull();
    expect(res.body.rejectionScope).toBeNull();

    // Account usage
    expect(res.body.account.planName).toBe("Starter");
    expect(res.body.account.monthlyAllowance).toBe(10000);
    expect(res.body.account.consumedUnits).toBe(10);
    expect(res.body.account.remaining).toBe(9990);

    // User usage
    expect(res.body.user.planName).toBe("Basic");
    expect(res.body.user.monthlyAllowance).toBe(1000);
    expect(res.body.user.consumedUnits).toBe(10);
    expect(res.body.user.remaining).toBe(990);
  });

  it("accumulates usage across requests", async () => {
    const res = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", key)
      .send({ userId, units: 5, requestId: "acc-2" });

    expect(res.body.accepted).toBe(true);
    expect(res.body.account.consumedUnits).toBe(15); // 10 + 5
    expect(res.body.user.consumedUnits).toBe(15);
  });
});

describe("Per-request limit enforcement", () => {
  it("rejects request exceeding USER per-request limit", async () => {
    // Basic plan maxPerRequest = 20
    const res = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", key)
      .send({ userId, units: 21, requestId: "pr-user" });

    expect(res.status).toBe(200);
    expect(res.body.accepted).toBe(false);
    expect(res.body.rejectionCode).toBe("USER_PER_REQUEST_LIMIT");
    expect(res.body.rejectionScope).toBe("user");
    expect(res.body.unitsConsumed).toBe(0);
  });

  it("accepts request at exactly the user per-request limit", async () => {
    const res = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", key)
      .send({ userId, units: 20, requestId: "pr-exact" });

    expect(res.body.accepted).toBe(true);
    expect(res.body.unitsConsumed).toBe(20);
  });

  it("rejects request exceeding ACCOUNT per-request limit", async () => {
    // Starter plan maxPerRequest = 100
    const res = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", key)
      .send({ userId, units: 101, requestId: "pr-acct" });

    expect(res.body.accepted).toBe(false);
    expect(res.body.rejectionCode).toBe("ACCOUNT_PER_REQUEST_LIMIT");
    expect(res.body.rejectionScope).toBe("account");
  });
});

describe("Monthly limit enforcement", () => {
  it("rejects request exceeding USER monthly allowance", async () => {
    // Fresh account/user to isolate test
    const a2 = await createTestAccount(ctx.app, "Monthly Corp");
    const u2 = await createTestUser(ctx.app, a2.apiKey, "monthly-user");
    // Basic: monthlyAllowance=1000, maxPerRequest=20
    // Use 50 requests of 20 = 1000, then 51st should fail
    for (let i = 1; i <= 50; i++) {
      const r = await request(ctx.app)
        .post("/consume")
        .set("X-API-Key", a2.apiKey)
        .send({ userId: u2.id, units: 20, requestId: `ml-${i}` });
      expect(r.body.accepted).toBe(true);
      expect(r.body.user.remaining).toBe(1000 - i * 20);
    }

    const r51 = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", a2.apiKey)
      .send({ userId: u2.id, units: 20, requestId: "ml-51" });

    expect(r51.body.accepted).toBe(false);
    expect(r51.body.rejectionCode).toBe("USER_MONTHLY_LIMIT");
    expect(r51.body.rejectionScope).toBe("user");
    expect(r51.body.user.remaining).toBe(0);
  });

  it("rejects request exceeding ACCOUNT monthly allowance", async () => {
    // Create a custom account plan with low monthly allowance
    const a3 = await createTestAccount(ctx.app, "Low Limit Corp");
    const plan = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", a3.apiKey)
      .send({ name: "Tiny", scope: "ACCOUNT", monthlyAllowance: 50, maxPerRequest: 25 });

    await request(ctx.app)
      .put("/account/plan")
      .set("X-API-Key", a3.apiKey)
      .send({ planId: plan.body.id });

    const u3 = await createTestUser(ctx.app, a3.apiKey, "acct-limit-user");
    // Switch user to a plan with high monthly but same per-request
    const uplan = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", a3.apiKey)
      .send({ name: "UserOK", scope: "USER", monthlyAllowance: 1000, maxPerRequest: 25 });

    await request(ctx.app)
      .put(`/users/${u3.id}/plan`)
      .set("X-API-Key", a3.apiKey)
      .send({ planId: uplan.body.id });

    // 2 requests of 25 = 50 (exact account limit)
    const r1 = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", a3.apiKey)
      .send({ userId: u3.id, units: 25, requestId: "al-1" });
    expect(r1.body.accepted).toBe(true);

    const r2 = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", a3.apiKey)
      .send({ userId: u3.id, units: 25, requestId: "al-2" });
    expect(r2.body.accepted).toBe(true);

    // 3rd request should fail — account has 0 remaining
    const r3 = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", a3.apiKey)
      .send({ userId: u3.id, units: 25, requestId: "al-3" });
    expect(r3.body.accepted).toBe(false);
    expect(r3.body.rejectionCode).toBe("ACCOUNT_MONTHLY_LIMIT");
    expect(r3.body.rejectionScope).toBe("account");
    expect(r3.body.account.remaining).toBe(0);
  });

  it("remaining allowance never goes negative", async () => {
    const usage = await request(ctx.app)
      .get("/usage/current")
      .set("X-API-Key", key);
    expect(usage.body.remaining).toBeGreaterThanOrEqual(0);
  });
});

describe("Rejected requests consume zero units", () => {
  it("rejected request does not change usage totals", async () => {
    const before = await request(ctx.app)
      .get("/usage/current")
      .set("X-API-Key", key);

    // Send a request that will be rejected (25 > Basic maxPerRequest=20)
    const res = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", key)
      .send({ userId, units: 25, requestId: "zero-check" });

    expect(res.body.accepted).toBe(false);
    expect(res.body.unitsConsumed).toBe(0);

    const after = await request(ctx.app)
      .get("/usage/current")
      .set("X-API-Key", key);

    expect(after.body.consumedUnits).toBe(before.body.consumedUnits);
  });
});

describe("Plan updates affect new requests immediately", () => {
  it("updating a custom plan changes limits for new consumption", async () => {
    const a4 = await createTestAccount(ctx.app, "Plan Update Corp");
    const plan = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", a4.apiKey)
      .send({ name: "Dynamic", scope: "USER", monthlyAllowance: 100, maxPerRequest: 5 });

    const u4 = await createTestUser(ctx.app, a4.apiKey, "dynamic-user");
    await request(ctx.app)
      .put(`/users/${u4.id}/plan`)
      .set("X-API-Key", a4.apiKey)
      .send({ planId: plan.body.id });

    // 6 units > maxPerRequest=5 → rejected
    const r1 = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", a4.apiKey)
      .send({ userId: u4.id, units: 6, requestId: "dyn-1" });
    expect(r1.body.accepted).toBe(false);

    // Update plan: maxPerRequest=10
    await request(ctx.app)
      .patch(`/plans/${plan.body.id}`)
      .set("X-API-Key", a4.apiKey)
      .send({ maxPerRequest: 10 });

    // 8 units ≤ maxPerRequest=10 → accepted (no redeployment needed)
    const r2 = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", a4.apiKey)
      .send({ userId: u4.id, units: 8, requestId: "dyn-2" });
    expect(r2.body.accepted).toBe(true);
    expect(r2.body.user.maxPerRequest).toBe(10);
  });

  it("plan change preserves previously consumed units", async () => {
    const a5 = await createTestAccount(ctx.app, "Preserve Corp");
    const u5 = await createTestUser(ctx.app, a5.apiKey, "preserve-user");

    // Consume 50 units with Basic plan (maxPer=20)
    for (let i = 1; i <= 3; i++) {
      await request(ctx.app)
        .post("/consume")
        .set("X-API-Key", a5.apiKey)
        .send({ userId: u5.id, units: 20, requestId: `pre-${i}` });
    }
    // Used = 60

    // Switch to Premium (maxPer=200)
    const premium = await findPlan(ctx.app, a5.apiKey, "Premium", "USER");
    await request(ctx.app)
      .put(`/users/${u5.id}/plan`)
      .set("X-API-Key", a5.apiKey)
      .send({ planId: premium.id });

    // Usage should still be 60, not reset
    const usage = await request(ctx.app)
      .get(`/usage/users/${u5.id}`)
      .set("X-API-Key", a5.apiKey);
    expect(usage.body.consumedUnits).toBe(60);
  });
});

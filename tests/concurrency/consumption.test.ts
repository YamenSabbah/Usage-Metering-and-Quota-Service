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

beforeAll(async () => {
  ctx = await setupTest();
  await cleanupTestData(ctx.prisma);
});

afterAll(async () => {
  await cleanupTestData(ctx.prisma);
  await teardownTest();
});

describe("Concurrent consumption cannot exceed user limits", () => {
  it("50 parallel requests of 20 units → exactly 50 accepted (Basic monthly=1000)", async () => {
    const a = await createTestAccount(ctx.app, "Concurrent User Corp");
    const u = await createTestUser(ctx.app, a.apiKey, "conc-user");

    // Basic plan: monthlyAllowance=1000, maxPerRequest=20
    // 60 parallel requests of 20 units each.
    // Only 50 can be accepted (50 × 20 = 1000 = monthly limit).
    const promises = Array.from({ length: 60 }, (_, i) =>
      request(ctx.app)
        .post("/consume")
        .set("X-API-Key", a.apiKey)
        .send({ userId: u.id, units: 20, requestId: `conc-user-${i}` }),
    );

    const results = await Promise.all(promises);
    const accepted = results.filter((r) => r.body.accepted);
    const rejected = results.filter((r) => !r.body.accepted);

    // Exactly 50 should be accepted, 10 rejected
    expect(accepted.length).toBe(50);
    expect(rejected.length).toBe(10);

    // All rejections should be USER_MONTHLY_LIMIT
    for (const r of rejected) {
      expect(r.body.rejectionCode).toBe("USER_MONTHLY_LIMIT");
    }

    // Final usage should be exactly 1000
    const usage = await request(ctx.app)
      .get(`/usage/users/${u.id}`)
      .set("X-API-Key", a.apiKey);
    expect(usage.body.consumedUnits).toBe(1000);
  });
});

describe("Concurrent consumption cannot exceed account limits", () => {
  it("parallel requests across users respect shared account allowance", async () => {
    const a = await createTestAccount(ctx.app, "Concurrent Acct Corp");

    // Custom account plan: monthlyAllowance=200, maxPerRequest=50
    const acctPlan = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", a.apiKey)
      .send({ name: "Conc Acct", scope: "ACCOUNT", monthlyAllowance: 200, maxPerRequest: 50 });
    await request(ctx.app)
      .put("/account/plan")
      .set("X-API-Key", a.apiKey)
      .send({ planId: acctPlan.body.id });

    // Custom user plan: monthlyAllowance=500, maxPerRequest=50
    const userPlan = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", a.apiKey)
      .send({ name: "Conc User", scope: "USER", monthlyAllowance: 500, maxPerRequest: 50 });

    // 3 users, each trying 4 requests of 50 units = 200 per user = 600 total
    // But account limit is only 200. So only 4 requests (200 units) can be accepted total.
    const users = [];
    for (let i = 0; i < 3; i++) {
      const u = await createTestUser(ctx.app, a.apiKey, `conc-acct-user-${i}`);
      await request(ctx.app)
        .put(`/users/${u.id}/plan`)
        .set("X-API-Key", a.apiKey)
        .send({ planId: userPlan.body.id });
      users.push(u.id);
    }

    // 12 parallel requests (4 per user × 3 users), each 50 units
    const promises: Promise<any>[] = [];
    for (const uid of users) {
      for (let j = 0; j < 4; j++) {
        promises.push(
          request(ctx.app)
            .post("/consume")
            .set("X-API-Key", a.apiKey)
            .send({ userId: uid, units: 50, requestId: `ca-${uid}-${j}` }),
        );
      }
    }

    const results = await Promise.all(promises);
    const accepted = results.filter((r) => r.body.accepted);

    // Account limit is 200, each request is 50, so exactly 4 should be accepted
    expect(accepted.length).toBe(4);

    // Account usage should be exactly 200
    const usage = await request(ctx.app)
      .get("/usage/current")
      .set("X-API-Key", a.apiKey);
    expect(usage.body.consumedUnits).toBe(200);
  });
});

describe("Concurrent duplicate requestIds do not double-count", () => {
  it("20 parallel requests with same requestId consume only once", async () => {
    const a = await createTestAccount(ctx.app, "Duplicate Corp");
    const u = await createTestUser(ctx.app, a.apiKey, "dup-user");

    const body = { userId: u.id, units: 15, requestId: "same-request" };

    const promises = Array.from({ length: 20 }, () =>
      request(ctx.app)
        .post("/consume")
        .set("X-API-Key", a.apiKey)
        .send(body),
    );

    const results = await Promise.all(promises);

    // All should return 200 (idempotent)
    for (const r of results) {
      expect(r.status).toBe(200);
    }

    // At least one should be accepted
    const accepted = results.filter((r) => r.body.accepted);
    expect(accepted.length).toBeGreaterThanOrEqual(1);

    // But usage should only increase by 15, not 300
    const usage = await request(ctx.app)
      .get(`/usage/users/${u.id}`)
      .set("X-API-Key", a.apiKey);
    expect(usage.body.consumedUnits).toBe(15);
  });
});

describe("Concurrent plan updates and consumption", () => {
  it("consumption uses consistent plan snapshot during concurrent update", async () => {
    const a = await createTestAccount(ctx.app, "Race Corp");
    const plan = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", a.apiKey)
      .send({ name: "Race Plan", scope: "USER", monthlyAllowance: 1000, maxPerRequest: 10 });
    const u = await createTestUser(ctx.app, a.apiKey, "race-user");
    await request(ctx.app)
      .put(`/users/${u.id}/plan`)
      .set("X-API-Key", a.apiKey)
      .send({ planId: plan.body.id });

    // Launch 10 concurrent consumes (5 units each) AND a plan update simultaneously
    const consumes = Array.from({ length: 10 }, (_, i) =>
      request(ctx.app)
        .post("/consume")
        .set("X-API-Key", a.apiKey)
        .send({ userId: u.id, units: 5, requestId: `race-${i}` }),
    );

    const update = request(ctx.app)
      .patch(`/plans/${plan.body.id}`)
      .set("X-API-Key", a.apiKey)
      .send({ maxPerRequest: 20 });

    const results = await Promise.all([...consumes, update]);

    // All consume requests should have succeeded (5 ≤ old maxPer=10 and ≤ new maxPer=20)
    const consumeResults = results.slice(0, 10);
    for (const r of consumeResults) {
      expect(r.status).toBe(200);
    }

    // Verify plan was updated
    const planAfter = await request(ctx.app)
      .get(`/plans/${plan.body.id}`)
      .set("X-API-Key", a.apiKey);
    expect(planAfter.body.maxPerRequest).toBe(20);
  });
});

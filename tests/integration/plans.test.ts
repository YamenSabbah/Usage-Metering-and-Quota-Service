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

beforeAll(async () => {
  ctx = await setupTest();
  await cleanupTestData(ctx.prisma);
  const a = await createTestAccount(ctx.app, "Plan Test Corp");
  key = a.apiKey;
});

afterAll(async () => {
  await cleanupTestData(ctx.prisma);
  await teardownTest();
});

describe("Listing plans", () => {
  it("lists 4 predefined plans", async () => {
    const res = await request(ctx.app)
      .get("/plans?source=PREDEFINED")
      .set("X-API-Key", key);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(4);

    const names = res.body.data.map((p: { name: string }) => p.name).sort();
    expect(names).toEqual(["Basic", "Premium", "Pro", "Starter"]);
  });

  it("predefined plans have correct limits", async () => {
    const plans = await request(ctx.app)
      .get("/plans?source=PREDEFINED")
      .set("X-API-Key", key);

    const starter = plans.body.data.find((p: any) => p.name === "Starter");
    expect(starter.monthlyAllowance).toBe(10000);
    expect(starter.maxPerRequest).toBe(100);
    expect(starter.scope).toBe("ACCOUNT");

    const basic = plans.body.data.find((p: any) => p.name === "Basic");
    expect(basic.monthlyAllowance).toBe(1000);
    expect(basic.maxPerRequest).toBe(20);
    expect(basic.scope).toBe("USER");
  });

  it("lists own custom plans and predefined plans together", async () => {
    await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", key)
      .send({ name: "My Custom", scope: "USER", monthlyAllowance: 500, maxPerRequest: 25 });

    const res = await request(ctx.app)
      .get("/plans")
      .set("X-API-Key", key);
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(5);
  });

  it("filters by scope", async () => {
    const res = await request(ctx.app)
      .get("/plans?scope=USER")
      .set("X-API-Key", key);
    expect(res.status).toBe(200);
    for (const p of res.body.data) {
      expect(p.scope).toBe("USER");
    }
  });

  it("paginates results", async () => {
    const res = await request(ctx.app)
      .get("/plans?page=1&limit=2")
      .set("X-API-Key", key);
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeLessThanOrEqual(2);
    expect(res.body.limit).toBe(2);
    expect(res.body.page).toBe(1);
    expect(res.body.hasMore).toBe(true); // there are more than 2 plans
  });
});

describe("Custom plan CRUD", () => {
  let customPlanId: number;

  it("creates a custom account plan", async () => {
    const res = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", key)
      .send({ name: "Custom Acct", scope: "ACCOUNT", monthlyAllowance: 50000, maxPerRequest: 500 });
    expect(res.status).toBe(201);
    expect(res.body.source).toBe("CUSTOM");
    expect(res.body.scope).toBe("ACCOUNT");
    expect(res.body.monthlyAllowance).toBe(50000);
    customPlanId = res.body.id;
  });

  it("creates a custom user plan", async () => {
    const res = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", key)
      .send({ name: "Custom User", scope: "USER", monthlyAllowance: 2000, maxPerRequest: 50 });
    expect(res.status).toBe(201);
    expect(res.body.source).toBe("CUSTOM");
  });

  it("rejects plan with negative allowance", async () => {
    const res = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", key)
      .send({ name: "Bad", scope: "USER", monthlyAllowance: -1, maxPerRequest: 10 });
    expect(res.status).toBe(400);
  });

  it("rejects plan with invalid scope", async () => {
    const res = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", key)
      .send({ name: "Bad", scope: "INVALID", monthlyAllowance: 100, maxPerRequest: 10 });
    expect(res.status).toBe(400);
  });

  it("updates own custom plan", async () => {
    const res = await request(ctx.app)
      .patch(`/plans/${customPlanId}`)
      .set("X-API-Key", key)
      .send({ monthlyAllowance: 75000, maxPerRequest: 750 });
    expect(res.status).toBe(200);
    expect(res.body.monthlyAllowance).toBe(75000);
    expect(res.body.maxPerRequest).toBe(750);
  });

  it("rejects update to predefined plan (403)", async () => {
    const starter = await findPlan(ctx.app, key, "Starter", "ACCOUNT");
    const res = await request(ctx.app)
      .patch(`/plans/${starter.id}`)
      .set("X-API-Key", key)
      .send({ name: "Hacked" });
    expect(res.status).toBe(403);
  });

  it("returns 404 for nonexistent plan", async () => {
    const res = await request(ctx.app)
      .get("/plans/99999")
      .set("X-API-Key", key);
    expect(res.status).toBe(404);
  });
});

describe("Plan assignment", () => {
  it("assigns account plan", async () => {
    const pro = await findPlan(ctx.app, key, "Pro", "ACCOUNT");
    const res = await request(ctx.app)
      .put("/account/plan")
      .set("X-API-Key", key)
      .send({ planId: pro.id });
    expect(res.status).toBe(200);

    const me = await request(ctx.app)
      .get("/accounts/me")
      .set("X-API-Key", key);
    expect(me.body.planId).toBe(pro.id);
    expect(me.body.planName).toBe("Pro");
  });

  it("assigns user plan (Premium)", async () => {
    const user = await createTestUser(ctx.app, key, "plan-user");
    const premium = await findPlan(ctx.app, key, "Premium", "USER");

    const res = await request(ctx.app)
      .put(`/users/${user.id}/plan`)
      .set("X-API-Key", key)
      .send({ planId: premium.id });
    expect(res.status).toBe(200);

    const u = await request(ctx.app)
      .get(`/users/${user.id}`)
      .set("X-API-Key", key);
    expect(u.body.planId).toBe(premium.id);
    expect(u.body.planName).toBe("Premium");
    expect(u.body.monthlyAllowance).toBe(10000);
    expect(u.body.maxPerRequest).toBe(200);
  });

  it("assigns custom plan to user", async () => {
    const user = await createTestUser(ctx.app, key, "custom-user");
    const plan = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", key)
      .send({ name: "Assign Custom", scope: "USER", monthlyAllowance: 300, maxPerRequest: 15 });

    const res = await request(ctx.app)
      .put(`/users/${user.id}/plan`)
      .set("X-API-Key", key)
      .send({ planId: plan.body.id });
    expect(res.status).toBe(200);
  });

  it("rejects assignment of nonexistent plan", async () => {
    const user = await createTestUser(ctx.app, key, "bad-plan-user");
    const res = await request(ctx.app)
      .put(`/users/${user.id}/plan`)
      .set("X-API-Key", key)
      .send({ planId: 99999 });
    expect(res.status).toBe(404);
  });
});

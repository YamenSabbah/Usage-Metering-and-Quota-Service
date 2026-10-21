import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import {
  setupTest,
  teardownTest,
  cleanupTestData,
  createTestAccount,
  createTestUser,
  type TestContext,
} from "../helpers";

let ctx: TestContext;
let key: string;
let userId: number;

beforeAll(async () => {
  ctx = await setupTest();
  await cleanupTestData(ctx.prisma);

  const a = await createTestAccount(ctx.app, "Idem Corp");
  key = a.apiKey;
  const u = await createTestUser(ctx.app, key, "idem-user");
  userId = u.id;
});

afterAll(async () => {
  await cleanupTestData(ctx.prisma);
  await teardownTest();
});

describe("Idempotent duplicate requests", () => {
  it("returns the same decision for identical duplicate", async () => {
    const body = { userId, units: 10, requestId: "idem-1" };

    const r1 = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", key)
      .send(body);
    expect(r1.body.accepted).toBe(true);
    expect(r1.body.unitsConsumed).toBe(10);

    const r2 = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", key)
      .send(body);
    expect(r2.status).toBe(200);
    expect(r2.body.accepted).toBe(true);
    expect(r2.body.unitsConsumed).toBe(10);

    // Usage should only be 10, not 20
    const usage = await request(ctx.app)
      .get("/usage/current")
      .set("X-API-Key", key);
    expect(usage.body.consumedUnits).toBe(10);
  });

  it("duplicate of rejected request returns same rejection", async () => {
    const body = { userId, units: 25, requestId: "idem-reject" };

    const r1 = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", key)
      .send(body);
    expect(r1.body.accepted).toBe(false);
    expect(r1.body.rejectionCode).toBe("USER_PER_REQUEST_LIMIT");

    const r2 = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", key)
      .send(body);
    expect(r2.body.accepted).toBe(false);
    expect(r2.body.rejectionCode).toBe("USER_PER_REQUEST_LIMIT");
    expect(r2.body.unitsConsumed).toBe(0);
  });

  it("multiple rapid duplicates only consume once", async () => {
    const body = { userId, units: 5, requestId: "idem-rapid" };

    const results = await Promise.all(
      Array.from({ length: 5 }, () =>
        request(ctx.app)
          .post("/consume")
          .set("X-API-Key", key)
          .send(body),
      ),
    );

    // All should succeed (idempotent)
    for (const r of results) {
      expect(r.status).toBe(200);
    }

    // Only one should have consumed units
    const accepted = results.filter((r) => r.body.accepted);
    expect(accepted.length).toBeGreaterThanOrEqual(1);

    // Verify only 5 units consumed, not 25
    const usage = await request(ctx.app)
      .get("/usage/current")
      .set("X-API-Key", key);
    expect(usage.body.consumedUnits).toBe(15); // 10 (from idem-1) + 5 (from idem-rapid, once)
  });

  it("different requestIds are independent", async () => {
    const r1 = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", key)
      .send({ userId, units: 3, requestId: "unique-a" });
    expect(r1.body.accepted).toBe(true);

    const r2 = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", key)
      .send({ userId, units: 3, requestId: "unique-b" });
    expect(r2.body.accepted).toBe(true);

    const usage = await request(ctx.app)
      .get("/usage/current")
      .set("X-API-Key", key);
    expect(usage.body.consumedUnits).toBe(21); // 15 + 3 + 3
  });
});

describe("Rejected decisions are persisted", () => {
  it("rejected request appears in history", async () => {
    const res = await request(ctx.app)
      .get("/history?limit=100")
      .set("X-API-Key", key);

    const rejected = res.body.data.filter((h: any) => !h.accepted);
    expect(rejected.length).toBeGreaterThan(0);

    const idemReject = res.body.data.find((h: any) => h.requestId === "idem-reject");
    expect(idemReject).toBeDefined();
    expect(idemReject.accepted).toBe(false);
    expect(idemReject.rejectionCode).toBe("USER_PER_REQUEST_LIMIT");
    expect(idemReject.unitsConsumed).toBe(0);
  });

  it("history can be queried by requestId", async () => {
    const res = await request(ctx.app)
      .get("/history/idem-reject")
      .set("X-API-Key", key);
    expect(res.status).toBe(200);
    expect(res.body.requestId).toBe("idem-reject");
    expect(res.body.accepted).toBe(false);
  });

  it("history records effective limits at decision time", async () => {
    const res = await request(ctx.app)
      .get("/history/idem-1")
      .set("X-API-Key", key);
    expect(res.status).toBe(200);
    expect(res.body.accountMonthlyAllowance).toBe(10000);
    expect(res.body.userMonthlyAllowance).toBe(1000);
    expect(res.body.accountMaxPerRequest).toBe(100);
    expect(res.body.userMaxPerRequest).toBe(20);
    expect(res.body.accountUsedBefore).toBe(0);
    expect(res.body.userUsedBefore).toBe(0);
  });
});

describe("History filtering", () => {
  it("filters by month", async () => {
    const now = new Date();
    const month = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
    const res = await request(ctx.app)
      .get(`/history?month=${month}&limit=100`)
      .set("X-API-Key", key);
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("filters by userId", async () => {
    const res = await request(ctx.app)
      .get(`/history?userId=${userId}&limit=100`)
      .set("X-API-Key", key);
    expect(res.status).toBe(200);
    for (const h of res.body.data) {
      expect(h.userId).toBe(userId);
    }
  });

  it("returns 404 for nonexistent requestId", async () => {
    const res = await request(ctx.app)
      .get("/history/nonexistent-request-id")
      .set("X-API-Key", key);
    expect(res.status).toBe(404);
  });
});

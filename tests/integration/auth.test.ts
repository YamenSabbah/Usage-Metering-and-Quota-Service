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
import { hashApiKey } from "../../src/utils/crypto";

let ctx: TestContext;
let keyA: string;
let keyB: string;
let accountAId: number;
let accountBId: number;
let userA1Id: number;

beforeAll(async () => {
  ctx = await setupTest();
  await cleanupTestData(ctx.prisma);

  const a = await createTestAccount(ctx.app, "Test Corp A");
  keyA = a.apiKey;
  accountAId = a.accountId;

  const b = await createTestAccount(ctx.app, "Test Corp B");
  keyB = b.apiKey;
  accountBId = b.accountId;

  const u = await createTestUser(ctx.app, keyA, "alice");
  userA1Id = u.id;
});

afterAll(async () => {
  await cleanupTestData(ctx.prisma);
  await teardownTest();
});

describe("Authentication", () => {
  it("POST /accounts creates account and returns plaintext API key", async () => {
    const res = await request(ctx.app)
      .post("/accounts")
      .send({ name: "New Corp" });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeGreaterThan(0);
    expect(res.body.apiKey).toMatch(/^[0-9a-f]{64}$/);
    expect(res.body.message).toContain("cannot be retrieved");
  });

  it("rejects request with no API key (401)", async () => {
    const res = await request(ctx.app).get("/accounts/me");
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("UNAUTHORIZED");
  });

  it("rejects request with invalid API key (401)", async () => {
    const res = await request(ctx.app)
      .get("/accounts/me")
      .set("X-API-Key", "deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef");
    expect(res.status).toBe(401);
  });

  it("rejects request with short API key (401)", async () => {
    const res = await request(ctx.app)
      .get("/accounts/me")
      .set("X-API-Key", "short");
    expect(res.status).toBe(401);
  });

  it("valid API key identifies the correct account", async () => {
    const res = await request(ctx.app)
      .get("/accounts/me")
      .set("X-API-Key", keyA);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(accountAId);
    expect(res.body.name).toBe("Test Corp A");
  });

  it("API key is never exposed in ordinary responses", async () => {
    const res = await request(ctx.app)
      .get("/accounts/me")
      .set("X-API-Key", keyA);
    expect(JSON.stringify(res.body)).not.toContain(keyA);
    expect(res.body.apiKey).toBeUndefined();
    expect(res.body.apiKeyHash).toBeUndefined();
  });

  it("health endpoint requires no auth", async () => {
    const res = await request(ctx.app).get("/health");
    expect(res.status).toBe(200);
  });
});

describe("Account isolation", () => {
  it("account B cannot see account A's user", async () => {
    const res = await request(ctx.app)
      .get(`/users/${userA1Id}`)
      .set("X-API-Key", keyB);
    expect(res.status).toBe(404);
  });

  it("account B cannot list account A's users", async () => {
    const res = await request(ctx.app)
      .get("/users")
      .set("X-API-Key", keyB);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(0);
  });

  it("account B sees empty history for account A's requests", async () => {
    // Make a request as A first
    await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", keyA)
      .send({ userId: userA1Id, units: 1, requestId: "iso-test-1" });

    const res = await request(ctx.app)
      .get("/history")
      .set("X-API-Key", keyB);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(0);
  });

  it("account B cannot access account A's custom plan", async () => {
    const plan = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", keyA)
      .send({ name: "A-Private", scope: "USER", monthlyAllowance: 100, maxPerRequest: 10 });

    const res = await request(ctx.app)
      .get(`/plans/${plan.body.id}`)
      .set("X-API-Key", keyB);
    expect(res.status).toBe(403);
  });

  it("account B cannot switch user to account A's custom plan", async () => {
    const plan = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", keyA)
      .send({ name: "A-Private2", scope: "USER", monthlyAllowance: 100, maxPerRequest: 10 });

    // Create a user under B
    const userB = await createTestUser(ctx.app, keyB, "bob");

    const res = await request(ctx.app)
      .put(`/users/${userB.id}/plan`)
      .set("X-API-Key", keyB)
      .send({ planId: plan.body.id });
    expect(res.status).toBe(404);
  });

  it("account B cannot consume for account A's user", async () => {
    const res = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", keyB)
      .send({ userId: userA1Id, units: 1, requestId: "iso-test-2" });
    expect(res.status).toBe(422);
  });
});

describe("Input validation errors", () => {
  it("POST /accounts with missing name → 400", async () => {
    const res = await request(ctx.app).post("/accounts").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("VALIDATION_FAILED");
  });

  it("POST /consume with missing fields → 400", async () => {
    const res = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", keyA)
      .send({});
    expect(res.status).toBe(400);
  });

  it("POST /consume with zero units → 400", async () => {
    const res = await request(ctx.app)
      .post("/consume")
      .set("X-API-Key", keyA)
      .send({ userId: userA1Id, units: 0, requestId: "bad" });
    expect(res.status).toBe(400);
  });

  it("GET /users/abc → 400", async () => {
    const res = await request(ctx.app)
      .get("/users/abc")
      .set("X-API-Key", keyA);
    expect(res.status).toBe(400);
  });

  it("unknown route → 404", async () => {
    const res = await request(ctx.app).get("/nonexistent");
    expect(res.status).toBe(404);
  });
});

describe("API key verification cache", () => {
  // The cache skips the expensive argon2 verify on repeat requests. These
  // tests pin the security properties that makes safe.

  it("a wrong key sharing the cached key's prefix is still rejected", async () => {
    // Warm the cache for a real key.
    const ok = await request(ctx.app).get("/accounts/me").set("X-API-Key", keyA);
    expect(ok.status).toBe(200);

    // Same first 8 chars (the lookup prefix), different tail.
    const forged = keyA.slice(0, 8) + "0".repeat(keyA.length - 8);
    const res = await request(ctx.app).get("/accounts/me").set("X-API-Key", forged);
    expect(res.status).toBe(401);
  });

  it("rotating the stored hash invalidates a cached verification", async () => {
    const ok = await request(ctx.app).get("/accounts/me").set("X-API-Key", keyB);
    expect(ok.status).toBe(200);

    const account = await ctx.prisma.account.findUnique({ where: { id: accountBId } });
    expect(account).not.toBeNull();

    // Simulate a rotation: different hash in the database.
    const rotatedHash = await hashApiKey("a-completely-different-key");
    await ctx.prisma.account.update({
      where: { id: accountBId },
      data: { apiKeyHash: rotatedHash },
    });

    // The old plaintext key must now fail even though it was cached.
    const res = await request(ctx.app).get("/accounts/me").set("X-API-Key", keyB);
    expect(res.status).toBe(401);

    // Restore so later assertions in this file keep working.
    await ctx.prisma.account.update({
      where: { id: accountBId },
      data: { apiKeyHash: account!.apiKeyHash },
    });

    const restored = await request(ctx.app).get("/accounts/me").set("X-API-Key", keyB);
    expect(restored.status).toBe(200);
  });
});

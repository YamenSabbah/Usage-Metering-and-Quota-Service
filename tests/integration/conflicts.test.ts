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

/**
 * Regression tests for unique-constraint clashes.
 *
 * These cases previously surfaced as 500 INTERNAL_ERROR because the Prisma
 * P2002 violation was never translated into a client-facing 409.
 */

let ctx: TestContext;
let keyA: string;
let keyB: string;

beforeAll(async () => {
  ctx = await setupTest();
  await cleanupTestData(ctx.prisma);

  const a = await createTestAccount(ctx.app, "Conflict Corp A");
  keyA = a.apiKey;

  const b = await createTestAccount(ctx.app, "Conflict Corp B");
  keyB = b.apiKey;

  await createTestUser(ctx.app, keyA, "dup-ref");
});

afterAll(async () => {
  await cleanupTestData(ctx.prisma);
  await teardownTest();
});

describe("Duplicate externalRef", () => {
  it("returns 409 CONFLICT, not 500", async () => {
    const res = await request(ctx.app)
      .post("/users")
      .set("X-API-Key", keyA)
      .send({ externalRef: "dup-ref" });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe("CONFLICT");
  });

  it("does not create a second user row", async () => {
    const count = await ctx.prisma.user.count({ where: { externalRef: "dup-ref" } });
    expect(count).toBe(1);
  });

  it("scopes uniqueness per account — same externalRef in another account is allowed", async () => {
    const res = await request(ctx.app)
      .post("/users")
      .set("X-API-Key", keyB)
      .send({ externalRef: "dup-ref" });

    expect(res.status).toBe(201);
  });
});

describe("Duplicate custom plan name", () => {
  it("returns 409 CONFLICT, not 500", async () => {
    const first = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", keyA)
      .send({ name: "Dup Plan", scope: "USER", monthlyAllowance: 500, maxPerRequest: 10 });
    expect(first.status).toBe(201);

    const second = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", keyA)
      .send({ name: "Dup Plan", scope: "USER", monthlyAllowance: 500, maxPerRequest: 10 });

    expect(second.status).toBe(409);
    expect(second.body.error).toBe("CONFLICT");
  });

  it("allows the same custom name under a different scope", async () => {
    const res = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", keyA)
      .send({ name: "Dup Plan", scope: "ACCOUNT", monthlyAllowance: 5000, maxPerRequest: 50 });

    expect(res.status).toBe(201);
  });

  it("allows another account to reuse the same custom name", async () => {
    const res = await request(ctx.app)
      .post("/plans")
      .set("X-API-Key", keyB)
      .send({ name: "Dup Plan", scope: "USER", monthlyAllowance: 500, maxPerRequest: 10 });

    expect(res.status).toBe(201);
  });
});

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { createApp } from "../src/app";
import type { Express } from "express";

/**
 * Shared test infrastructure.
 * Tests run against the real PostgreSQL database using a separate test schema
 * or cleanup strategy. Each test file calls setupTestDb() in beforeAll and
 * cleanupTestDb() in afterAll.
 */

export type TestContext = {
  app: Express;
  prisma: PrismaClient;
};

let testPrisma: PrismaClient | null = null;

export async function setupTest(): Promise<TestContext> {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  testPrisma = new PrismaClient({ adapter });
  const app = createApp();
  return { app, prisma: testPrisma };
}

export async function teardownTest(): Promise<void> {
  if (testPrisma) {
    await testPrisma.$disconnect();
    testPrisma = null;
  }
}

/**
 * Remove all test-created data. We identify test data by a unique prefix
 * to avoid destroying seeded predefined plans.
 */
export async function cleanupTestData(prisma: PrismaClient): Promise<void> {
  // Delete in dependency order.
  await prisma.usageRequest.deleteMany({});
  await prisma.userUsage.deleteMany({});
  await prisma.accountUsage.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.plan.deleteMany({ where: { source: "CUSTOM" } });
}

// ──────────────────── API helpers ────────────────────

import request from "supertest";

export type ApiKeyResult = {
  accountId: number;
  apiKey: string;
};

export async function createTestAccount(
  app: Express,
  name: string,
): Promise<ApiKeyResult> {
  const res = await request(app)
    .post("/accounts")
    .send({ name });

  if (res.status !== 201) {
    throw new Error(`Account creation failed: ${res.status} ${JSON.stringify(res.body)}`);
  }

  return { accountId: res.body.id, apiKey: res.body.apiKey };
}

export async function createTestUser(
  app: Express,
  apiKey: string,
  externalRef: string,
  planId?: number,
): Promise<{ id: number; planId: number }> {
  const body: Record<string, unknown> = { externalRef };
  if (planId !== undefined) body.planId = planId;

  const res = await request(app)
    .post("/users")
    .set("X-API-Key", apiKey)
    .send(body);

  if (res.status !== 201) {
    throw new Error(`User creation failed: ${res.status} ${JSON.stringify(res.body)}`);
  }

  return { id: res.body.id, planId: res.body.planId };
}

export async function getPlans(
  app: Express,
  apiKey: string,
  query = "",
): Promise<Array<{ id: number; name: string; scope: string; source: string; monthlyAllowance: number; maxPerRequest: number }>> {
  const res = await request(app)
    .get(`/plans${query}`)
    .set("X-API-Key", apiKey);

  if (res.status !== 200) {
    throw new Error(`Get plans failed: ${res.status} ${JSON.stringify(res.body)}`);
  }

  return res.body.data;
}

export async function findPlan(
  app: Express,
  apiKey: string,
  name: string,
  scope?: string,
): Promise<{ id: number; name: string; scope: string; source: string; monthlyAllowance: number; maxPerRequest: number }> {
  const query = scope ? `?scope=${scope}` : "";
  const plans = await getPlans(app, apiKey, query);
  const plan = plans.find((p) => p.name === name);
  if (!plan) {
    throw new Error(`Plan "${name}" not found. Available: ${plans.map((p) => p.name).join(", ")}`);
  }
  return plan;
}

import { PrismaClient } from "../../generated/prisma/client";
import { hashApiKey, generateApiKey } from "../utils/crypto";
import { notFound } from "../middleware/errors";

export type CreateAccountInput = {
  name: string;
};

export type AccountSummary = {
  id: number;
  name: string;
  planId: number;
  planName: string;
  planScope: "ACCOUNT" | "USER";
  monthlyAllowance: number;
  maxPerRequest: number;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Create a new account.
 * Returns the plaintext API key exactly once. The caller must store it securely.
 * The account is created with the predefined "Starter" account plan by default.
 */
export async function createAccount(
  prisma: PrismaClient,
  input: CreateAccountInput,
): Promise<{ id: number; name: string; apiKey: string }> {
  // Default to the predefined "Starter" account plan.
  const defaultPlan = await prisma.plan.findFirst({
    where: { name: "Starter", scope: "ACCOUNT", source: "PREDEFINED" },
  });
  if (!defaultPlan) {
    throw new Error("Default account plan 'Starter' not found. Run seed first.");
  }

  const plaintextKey = generateApiKey();
  const apiKeyHash = await hashApiKey(plaintextKey);
  const apiKeyPrefix = plaintextKey.slice(0, 8);

  const account = await prisma.account.create({
    data: {
      name: input.name,
      apiKeyHash,
      apiKeyPrefix,
      planId: defaultPlan.id,
    },
  });

  return {
    id: account.id,
    name: account.name,
    apiKey: plaintextKey,
  };
}

/**
 * Get the authenticated account with its current plan.
 */
export async function getAccount(prisma: PrismaClient, accountId: number): Promise<AccountSummary> {
  const account = await prisma.account.findUnique({
    where: { id: accountId },
    include: { plan: true },
  });

  if (!account) throw notFound("Account not found.");

  return {
    id: account.id,
    name: account.name,
    planId: account.planId,
    planName: account.plan.name,
    planScope: account.plan.scope as "ACCOUNT" | "USER",
    monthlyAllowance: account.plan.monthlyAllowance,
    maxPerRequest: account.plan.maxPerRequest,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
}

/**
 * Change the account's assigned plan.
 * The new plan must be accessible to the account (predefined or its own custom).
 */
export async function changeAccountPlan(
  prisma: PrismaClient,
  accountId: number,
  planId: number,
): Promise<void> {
  const account = await prisma.account.findUnique({ where: { id: accountId } });
  if (!account) throw notFound("Account not found.");

  // Allow switching to a predefined plan or the account's own custom plan.
  // Prevent switching to another account's custom plan.
  const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (!plan) throw notFound("Plan not found.");
  if (plan.source === "CUSTOM" && plan.accountId !== accountId) {
    throw notFound("Plan not found.");
  }

  await prisma.account.update({
    where: { id: accountId },
    data: { planId },
  });
}

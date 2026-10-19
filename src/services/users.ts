import { PrismaClient } from "../../generated/prisma/client";
import { notFound, forbidden } from "../middleware/errors";

export type UserSummary = {
  id: number;
  externalRef: string;
  accountId: number;
  planId: number;
  planName: string;
  planScope: "ACCOUNT" | "USER";
  monthlyAllowance: number;
  maxPerRequest: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserInput = {
  externalRef: string;
  planId?: number | undefined;
};

/**
 * Create a user under the given account.
 * If no planId is supplied, the user gets the predefined "Basic" user plan.
 */
export async function createUser(
  prisma: PrismaClient,
  accountId: number,
  input: CreateUserInput,
): Promise<{ id: number; externalRef: string; planId: number }> {
  let planId = input.planId;

  if (!planId) {
    const defaultPlan = await prisma.plan.findFirst({
      where: { name: "Basic", scope: "USER", source: "PREDEFINED" },
    });
    if (!defaultPlan) {
      throw new Error("Default user plan 'Basic' not found. Run seed first.");
    }
    planId = defaultPlan.id;
  }

  // Verify the plan is accessible.
  const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (!plan) throw notFound("Plan not found.");

  const isOwnCustom = plan.source === "CUSTOM" && plan.accountId === accountId;
  const isPredefined = plan.source === "PREDEFINED";
  if (!isOwnCustom && !isPredefined) {
    throw notFound("Plan not found.");
  }

  const user = await prisma.user.create({
    data: {
      externalRef: input.externalRef,
      accountId,
      planId,
    },
  });

  return { id: user.id, externalRef: user.externalRef, planId: user.planId };
}

export async function getUser(
  prisma: PrismaClient,
  accountId: number,
  userId: number,
): Promise<UserSummary> {
  const user = await prisma.user.findFirst({
    where: { id: userId, accountId },
    include: { plan: true },
  });

  if (!user) throw notFound("User not found.");

  return {
    id: user.id,
    externalRef: user.externalRef,
    accountId: user.accountId,
    planId: user.planId,
    planName: user.plan.name,
    planScope: user.plan.scope as "ACCOUNT" | "USER",
    monthlyAllowance: user.plan.monthlyAllowance,
    maxPerRequest: user.plan.maxPerRequest,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function listUsers(
  prisma: PrismaClient,
  accountId: number,
  page: number,
  limit: number,
): Promise<{ data: UserSummary[]; total: number }> {
  const [rows, total] = await Promise.all([
    prisma.user.findMany({
      where: { accountId },
      include: { plan: true },
      orderBy: { id: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.user.count({ where: { accountId } }),
  ]);

  return {
    data: rows.map((u) => ({
      id: u.id,
      externalRef: u.externalRef,
      accountId: u.accountId,
      planId: u.planId,
      planName: u.plan.name,
      planScope: u.plan.scope as "ACCOUNT" | "USER",
      monthlyAllowance: u.plan.monthlyAllowance,
      maxPerRequest: u.plan.maxPerRequest,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    })),
    total,
  };
}

export async function changeUserPlan(
  prisma: PrismaClient,
  accountId: number,
  userId: number,
  planId: number,
): Promise<void> {
  // Verify user belongs to this account.
  const user = await prisma.user.findFirst({
    where: { id: userId, accountId },
    select: { id: true },
  });
  if (!user) throw notFound("User not found.");

  const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (!plan) throw notFound("Plan not found.");

  const isOwnCustom = plan.source === "CUSTOM" && plan.accountId === accountId;
  const isPredefined = plan.source === "PREDEFINED";
  if (!isOwnCustom && !isPredefined) {
    throw notFound("Plan not found.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { planId },
  });
}

import { PrismaClient } from "../../generated/prisma/client";
import { notFound, forbidden } from "../middleware/errors";

export type PlanSummary = {
  id: number;
  name: string;
  scope: "ACCOUNT" | "USER";
  monthlyAllowance: number;
  maxPerRequest: number;
  source: "PREDEFINED" | "CUSTOM";
  accountId: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ListPlansFilters = {
  scope?: "ACCOUNT" | "USER" | undefined;
  source?: "PREDEFINED" | "CUSTOM" | undefined;
};

/**
 * List plans visible to the authenticated account.
 * - Predefined plans are visible to everyone.
 * - Custom plans are visible only to their owning account.
 */
export async function listPlans(
  prisma: PrismaClient,
  accountId: number,
  filters: ListPlansFilters,
  page: number,
  limit: number,
): Promise<{ data: PlanSummary[]; total: number }> {
  const where: Record<string, unknown> = {};

  if (filters.scope) where.scope = filters.scope;
  if (filters.source) where.source = filters.source;

  // For custom plans, restrict to the authenticated account's own plans.
  if (filters.source === "CUSTOM" || !filters.source) {
    where.OR = [
      { source: "PREDEFINED" },
      { source: "CUSTOM", accountId },
    ];
  }

  const [rows, total] = await Promise.all([
    prisma.plan.findMany({
      where,
      orderBy: [{ source: "asc" }, { name: "asc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.plan.count({ where }),
  ]);

  return {
    data: rows.map((p) => ({
      id: p.id,
      name: p.name,
      scope: p.scope as "ACCOUNT" | "USER",
      monthlyAllowance: p.monthlyAllowance,
      maxPerRequest: p.maxPerRequest,
      source: p.source as "PREDEFINED" | "CUSTOM",
      accountId: p.accountId,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    })),
    total,
  };
}

export async function getPlan(
  prisma: PrismaClient,
  accountId: number,
  planId: number,
): Promise<PlanSummary> {
  const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (!plan) throw notFound("Plan not found.");

  // Custom plans are only accessible to their owner.
  if (plan.source === "CUSTOM" && plan.accountId !== accountId) {
    throw forbidden("Plan not found.");
  }

  return {
    id: plan.id,
    name: plan.name,
    scope: plan.scope as "ACCOUNT" | "USER",
    monthlyAllowance: plan.monthlyAllowance,
    maxPerRequest: plan.maxPerRequest,
    source: plan.source as "PREDEFINED" | "CUSTOM",
    accountId: plan.accountId,
    createdAt: plan.createdAt,
    updatedAt: plan.updatedAt,
  };
}

export type CreatePlanInput = {
  name: string;
  scope: "ACCOUNT" | "USER";
  monthlyAllowance: number;
  maxPerRequest: number;
};

export async function createPlan(
  prisma: PrismaClient,
  accountId: number,
  input: CreatePlanInput,
): Promise<PlanSummary> {
  const plan = await prisma.plan.create({
    data: {
      name: input.name,
      scope: input.scope,
      monthlyAllowance: input.monthlyAllowance,
      maxPerRequest: input.maxPerRequest,
      source: "CUSTOM",
      accountId,
    },
  });

  return {
    id: plan.id,
    name: plan.name,
    scope: plan.scope as "ACCOUNT" | "USER",
    monthlyAllowance: plan.monthlyAllowance,
    maxPerRequest: plan.maxPerRequest,
    source: "CUSTOM",
    accountId: plan.accountId,
    createdAt: plan.createdAt,
    updatedAt: plan.updatedAt,
  };
}

export type UpdatePlanInput = {
  name?: string | undefined;
  monthlyAllowance?: number | undefined;
  maxPerRequest?: number | undefined;
};

export async function updatePlan(
  prisma: PrismaClient,
  accountId: number,
  planId: number,
  input: UpdatePlanInput,
): Promise<PlanSummary> {
  const existing = await prisma.plan.findUnique({ where: { id: planId } });
  if (!existing) throw notFound("Plan not found.");
  if (existing.source === "PREDEFINED") {
    throw forbidden("Predefined plans cannot be modified.");
  }
  if (existing.accountId !== accountId) {
    throw forbidden("Plan not found.");
  }

  const plan = await prisma.plan.update({
    where: { id: planId },
    data: {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.monthlyAllowance !== undefined && { monthlyAllowance: input.monthlyAllowance }),
      ...(input.maxPerRequest !== undefined && { maxPerRequest: input.maxPerRequest }),
    },
  });

  return {
    id: plan.id,
    name: plan.name,
    scope: plan.scope as "ACCOUNT" | "USER",
    monthlyAllowance: plan.monthlyAllowance,
    maxPerRequest: plan.maxPerRequest,
    source: plan.source as "PREDEFINED" | "CUSTOM",
    accountId: plan.accountId,
    createdAt: plan.createdAt,
    updatedAt: plan.updatedAt,
  };
}

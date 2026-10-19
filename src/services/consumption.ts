import { PrismaClient } from "../../generated/prisma/client";
import { utcYearMonth } from "../utils/date";
import { unprocessable } from "../middleware/errors";
import type { RejectionCode, Scope } from "../types";

export type ConsumptionDecision = {
  accepted: boolean;
  requestedUnits: number;
  unitsConsumed: number;
  rejectionCode: RejectionCode | null;
  rejectionScope: Scope | null;
  account: {
    planId: number;
    planName: string;
    monthlyAllowance: number;
    consumedUnits: number;
    remaining: number;
    maxPerRequest: number;
  };
  user: {
    planId: number;
    planName: string;
    monthlyAllowance: number;
    consumedUnits: number;
    remaining: number;
    maxPerRequest: number;
  };
};

/**
 * Concurrency strategy
 * ────────────────────
 * We use a Prisma interactive transaction with SERIALIZABLE isolation plus explicit
 * `SELECT ... FOR UPDATE` row locks on the account+month and user+month usage rows.
 *
 * Lock order (always account first, then user) prevents deadlocks between two requests
 * for different users sharing one account.
 *
 * The actual usage increment uses a conditional UPDATE (consumedUnits = :expected) as a
 * second safety net. If the predicate fails, the request is rejected. This guards against
 * any remaining anomaly even though the FOR UPDATE path should be sufficient.
 *
 * Idempotency is enforced by a DB unique constraint on (accountId, requestId). Duplicate
 * requests return the original recorded decision without consuming additional units.
 * Rejected decisions are also persisted.
 */

export async function processConsumption(
  prisma: PrismaClient,
  accountId: number,
  userId: number,
  requestedUnits: number,
  requestId: string,
): Promise<ConsumptionDecision> {
  const { year, month } = utcYearMonth();
  const maxRetries = 2;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await prisma.$transaction(async (tx) => {
        return await decideAndRecord(tx, accountId, userId, requestedUnits, requestId, year, month);
      }, { isolationLevel: "Serializable" });
    } catch (err: unknown) {
      if (attempt < maxRetries && isRetryableDBError(err) && !isBusinessError(err)) {
        continue;
      }
      throw err;
    }
  }

  throw new Error("Consumption failed after retries");
}

// ──────────────────────────── internal transaction logic ────────────────────────────

async function decideAndRecord(
  tx: Parameters<Parameters<PrismaClient["$transaction"]>[0]>[0],
  accountId: number,
  userId: number,
  requestedUnits: number,
  requestId: string,
  year: number,
  month: number,
): Promise<ConsumptionDecision> {
  // --- Idempotency: return the original decision if this requestId was already recorded ---
  const existing = await tx.usageRequest.findUnique({
    where: { accountId_requestId: { accountId, requestId } },
    include: {
      account: { include: { plan: true } },
      user: { include: { plan: true } },
    },
  });

  if (existing) {
    return decodeRecordedDecision(existing);
  }

  // --- Lock + load account usage for the current UTC month ---
  let accountUsage = await tx.accountUsage.findUnique({
    where: { accountId_year_month: { accountId, year, month } },
  });

  if (!accountUsage) {
    accountUsage = await tx.accountUsage.create({
      data: { accountId, year, month, consumedUnits: 0 },
    });
  }

  // Explicit row lock — serializes concurrent consumption for the same account+month.
  await tx.$executeRaw`
    SELECT 1 FROM "AccountUsage"
    WHERE "accountId" = ${accountId} AND "year" = ${year} AND "month" = ${month}
    FOR UPDATE
  `;

  // Re-read after acquiring the lock to get the latest committed state.
  accountUsage = await tx.accountUsage.findUnique({
    where: { id: accountUsage.id },
  });
  if (!accountUsage) throw new Error("accountUsage row vanished under lock");

  // --- Lock + load user usage for the current UTC month ---
  let userUsage = await tx.userUsage.findUnique({
    where: { userId_year_month: { userId, year, month } },
  });

  if (!userUsage) {
    userUsage = await tx.userUsage.create({
      data: { userId, year, month, consumedUnits: 0 },
    });
  }

  await tx.$executeRaw`
    SELECT 1 FROM "UserUsage"
    WHERE "userId" = ${userId} AND "year" = ${year} AND "month" = ${month}
    FOR UPDATE
  `;

  userUsage = await tx.userUsage.findUnique({ where: { id: userUsage.id } });
  if (!userUsage) throw new Error("userUsage row vanished under lock");

  // --- Load account + user rows and plans ---
  const accountRow = await tx.account.findUnique({
    where: { id: accountId },
    include: { plan: true },
  });
  if (!accountRow) throw new Error("account not found");

  const userRow = await tx.user.findUnique({ where: { id: userId } });
  if (!userRow || userRow.accountId !== accountId) {
    throw unprocessable("User not found or not accessible.");
  }

  const userPlanRow = await tx.plan.findUnique({ where: { id: userRow.planId } });
  if (!userPlanRow) throw new Error("user plan not found");

  const accountPlan = accountRow.plan;
  const userPlan = userPlanRow;

  // --- Snapshot state before decision ---
  const accountUsedBefore = accountUsage.consumedUnits;
  const userUsedBefore = userUsage.consumedUnits;
  const accountRemainingBefore = Math.max(0, accountPlan.monthlyAllowance - accountUsedBefore);
  const userRemainingBefore = Math.max(0, userPlan.monthlyAllowance - userUsedBefore);

  // --- Rule evaluation (order: per-request first, then monthly) ---
  const rules = [
    {
      pass: requestedUnits <= accountPlan.maxPerRequest,
      code: "ACCOUNT_PER_REQUEST_LIMIT" as RejectionCode,
      scope: "account" as Scope,
    },
    {
      pass: requestedUnits <= userPlan.maxPerRequest,
      code: "USER_PER_REQUEST_LIMIT" as RejectionCode,
      scope: "user" as Scope,
    },
    {
      pass: requestedUnits <= accountRemainingBefore,
      code: "ACCOUNT_MONTHLY_LIMIT" as RejectionCode,
      scope: "account" as Scope,
    },
    {
      pass: requestedUnits <= userRemainingBefore,
      code: "USER_MONTHLY_LIMIT" as RejectionCode,
      scope: "user" as Scope,
    },
  ];

  const failed = rules.find((r) => !r.pass);
  if (failed) {
    return recordDecision(tx, {
      accountId,
      userId,
      requestId,
      requestedUnits,
      accepted: false,
      rejectionCode: failed.code,
      rejectionScope: failed.scope,
      year,
      month,
      accountPlanId: accountPlan.id,
      userPlanId: userPlan.id,
      accountMaxPerRequest: accountPlan.maxPerRequest,
      userMaxPerRequest: userPlan.maxPerRequest,
      accountMonthlyAllowance: accountPlan.monthlyAllowance,
      userMonthlyAllowance: userPlan.monthlyAllowance,
      accountUsedBefore,
      userUsedBefore,
      accountRemainingBefore,
      userRemainingBefore,
      accountPlanName: accountPlan.name,
      userPlanName: userPlan.name,
      accountName: accountRow.name,
    });
  }

  // --- All rules pass: atomically increment both usage rows ---
  const accountUpdated = await tx.accountUsage.updateMany({
    where: { id: accountUsage.id, consumedUnits: accountUsedBefore },
    data: { consumedUnits: { increment: requestedUnits } },
  });

  if (accountUpdated.count === 0) {
    // State changed under us — reject (should be extremely rare given the lock).
    return recordDecision(tx, {
      accountId,
      userId,
      requestId,
      requestedUnits,
      accepted: false,
      rejectionCode: "ACCOUNT_MONTHLY_LIMIT",
      rejectionScope: "account",
      year,
      month,
      accountPlanId: accountPlan.id,
      userPlanId: userPlan.id,
      accountMaxPerRequest: accountPlan.maxPerRequest,
      userMaxPerRequest: userPlan.maxPerRequest,
      accountMonthlyAllowance: accountPlan.monthlyAllowance,
      userMonthlyAllowance: userPlan.monthlyAllowance,
      accountUsedBefore,
      userUsedBefore,
      accountRemainingBefore,
      userRemainingBefore,
      accountPlanName: accountPlan.name,
      userPlanName: userPlan.name,
      accountName: accountRow.name,
    });
  }

  const userUpdated = await tx.userUsage.updateMany({
    where: { id: userUsage.id, consumedUnits: userUsedBefore },
    data: { consumedUnits: { increment: requestedUnits } },
  });

  if (userUpdated.count === 0) {
    // Roll back account increment.
    await tx.accountUsage.update({
      where: { id: accountUsage.id },
      data: { consumedUnits: { decrement: requestedUnits } },
    });
    return recordDecision(tx, {
      accountId,
      userId,
      requestId,
      requestedUnits,
      accepted: false,
      rejectionCode: "USER_MONTHLY_LIMIT",
      rejectionScope: "user",
      year,
      month,
      accountPlanId: accountPlan.id,
      userPlanId: userPlan.id,
      accountMaxPerRequest: accountPlan.maxPerRequest,
      userMaxPerRequest: userPlan.maxPerRequest,
      accountMonthlyAllowance: accountPlan.monthlyAllowance,
      userMonthlyAllowance: userPlan.monthlyAllowance,
      accountUsedBefore,
      userUsedBefore,
      accountRemainingBefore,
      userRemainingBefore,
      accountPlanName: accountPlan.name,
      userPlanName: userPlan.name,
      accountName: accountRow.name,
    });
  }

  // --- Record accepted decision ---
  await tx.usageRequest.create({
    data: {
      requestId,
      requestedUnits,
      accepted: true,
      rejectionCode: null,
      rejectionScope: null,
      accountedYear: year,
      accountedMonth: month,
      accountPlanId: accountPlan.id,
      userPlanId: userPlan.id,
      accountMaxPerRequest: accountPlan.maxPerRequest,
      userMaxPerRequest: userPlan.maxPerRequest,
      accountMonthlyAllowance: accountPlan.monthlyAllowance,
      userMonthlyAllowance: userPlan.monthlyAllowance,
      accountUsedBefore,
      userUsedBefore,
      accountRemainingBefore,
      userRemainingBefore,
      unitsConsumed: requestedUnits,
      account: { connect: { id: accountId } },
      user: { connect: { id: userId } },
    },
  });

  const updatedAccountUsage = await tx.accountUsage.findUnique({ where: { id: accountUsage.id } });
  const updatedUserUsage = await tx.userUsage.findUnique({ where: { id: userUsage.id } });

  return {
    accepted: true,
    requestedUnits,
    unitsConsumed: requestedUnits,
    rejectionCode: null,
    rejectionScope: null,
    account: {
      planId: accountPlan.id,
      planName: accountPlan.name,
      monthlyAllowance: accountPlan.monthlyAllowance,
      consumedUnits: updatedAccountUsage!.consumedUnits,
      remaining: Math.max(0, accountPlan.monthlyAllowance - updatedAccountUsage!.consumedUnits),
      maxPerRequest: accountPlan.maxPerRequest,
    },
    user: {
      planId: userPlan.id,
      planName: userPlan.name,
      monthlyAllowance: userPlan.monthlyAllowance,
      consumedUnits: updatedUserUsage!.consumedUnits,
      remaining: Math.max(0, userPlan.monthlyAllowance - updatedUserUsage!.consumedUnits),
      maxPerRequest: userPlan.maxPerRequest,
    },
  };
}

// ──────────────────────────── decision recording ────────────────────────────

interface RecordDecisionParams {
  accountId: number;
  userId: number;
  requestId: string;
  requestedUnits: number;
  accepted: boolean;
  rejectionCode: RejectionCode;
  rejectionScope: Scope | null;
  year: number;
  month: number;
  accountPlanId: number;
  userPlanId: number;
  accountMaxPerRequest: number;
  userMaxPerRequest: number;
  accountMonthlyAllowance: number;
  userMonthlyAllowance: number;
  accountUsedBefore: number;
  userUsedBefore: number;
  accountRemainingBefore: number;
  userRemainingBefore: number;
  accountPlanName: string;
  userPlanName: string;
  accountName: string;
}

async function recordDecision(
  tx: Parameters<Parameters<PrismaClient["$transaction"]>[0]>[0],
  p: RecordDecisionParams,
): Promise<ConsumptionDecision> {
  const rec = await tx.usageRequest.create({
    data: {
      requestId: p.requestId,
      requestedUnits: p.requestedUnits,
      accepted: p.accepted,
      rejectionCode: p.rejectionCode,
      rejectionScope: p.rejectionScope,
      accountedYear: p.year,
      accountedMonth: p.month,
      accountPlanId: p.accountPlanId,
      userPlanId: p.userPlanId,
      accountMaxPerRequest: p.accountMaxPerRequest,
      userMaxPerRequest: p.userMaxPerRequest,
      accountMonthlyAllowance: p.accountMonthlyAllowance,
      userMonthlyAllowance: p.userMonthlyAllowance,
      accountUsedBefore: p.accountUsedBefore,
      userUsedBefore: p.userUsedBefore,
      accountRemainingBefore: p.accountRemainingBefore,
      userRemainingBefore: p.userRemainingBefore,
      unitsConsumed: 0,
      account: { connect: { id: p.accountId } },
      user: { connect: { id: p.userId } },
    },
    include: {
      account: { include: { plan: true } },
      user: { include: { plan: true } },
    },
  });

  return decodeRecordedDecision(rec);
}

function decodeRecordedDecision(rec: {
  accepted: boolean;
  requestedUnits: number;
  unitsConsumed: number;
  rejectionCode: string | null;
  rejectionScope: string | null;
  account: { plan: { id: number; name: string; monthlyAllowance: number; maxPerRequest: number } };
  user: { plan: { id: number; name: string; monthlyAllowance: number; maxPerRequest: number } };
  accountUsedBefore: number;
  userUsedBefore: number;
}): ConsumptionDecision {
  const accountPlan = rec.account.plan;
  const userPlan = rec.user.plan;
  // Compute current usage from snapshots stored on the UsageRequest record.
  const accountUsed = rec.accountUsedBefore + rec.unitsConsumed;
  const userUsed = rec.userUsedBefore + rec.unitsConsumed;

  return {
    accepted: rec.accepted,
    requestedUnits: rec.requestedUnits,
    unitsConsumed: rec.unitsConsumed,
    rejectionCode: (rec.rejectionCode as RejectionCode) ?? null,
    rejectionScope: (rec.rejectionScope as Scope) ?? null,
    account: {
      planId: accountPlan.id,
      planName: accountPlan.name,
      monthlyAllowance: accountPlan.monthlyAllowance,
      consumedUnits: accountUsed,
      remaining: Math.max(0, accountPlan.monthlyAllowance - accountUsed),
      maxPerRequest: accountPlan.maxPerRequest,
    },
    user: {
      planId: userPlan.id,
      planName: userPlan.name,
      monthlyAllowance: userPlan.monthlyAllowance,
      consumedUnits: userUsed,
      remaining: Math.max(0, userPlan.monthlyAllowance - userUsed),
      maxPerRequest: userPlan.maxPerRequest,
    },
  };
}

// ──────────────────────────── error classification ────────────────────────────

function isRetryableDBError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  let current: unknown = err;
  for (let i = 0; i < 5; i++) {
    if (!current || typeof current !== "object") break;
    const c = current as Record<string, unknown>;
    const pgError = c["cause"] ?? c["original"] ?? c["driverError"] ?? c["pgError"];
    if (pgError && typeof pgError === "object") {
      const d = pgError as Record<string, unknown>;
      const sqlState = d["code"] ?? d["sqlState"];
      if (sqlState === "40001" || sqlState === "40P01") return true;
    }
    current = c["cause"] ?? c["original"] ?? c["driverError"];
  }
  return false;
}

function isBusinessError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  return (err as { statusCode?: number }).statusCode !== undefined;
}

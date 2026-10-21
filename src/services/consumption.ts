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
 * We use a Prisma interactive transaction with READ COMMITTED isolation (the PostgreSQL
 * default) plus explicit `SELECT ... FOR UPDATE` row locks on the account+month and
 * user+month usage rows.
 *
 * READ COMMITTED + FOR UPDATE is sufficient here because:
 *  - The FOR UPDATE lock serializes competing transactions on the same usage row.
 *  - The conditional UPDATE (consumedUnits = :expected) provides a second safety net.
 *  - SERIALIZABLE would add unnecessary conflict detection on top of the explicit locks,
 *    causing serialization failures (40001) under high concurrency that require retries.
 *
 * Lock order (always account first, then user) prevents deadlocks between two requests
 * for different users sharing one account.
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
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await prisma.$transaction(
        async (tx) => {
          return await decideAndRecord(tx, accountId, userId, requestedUnits, requestId, year, month);
        },
        // Prisma's defaults (maxWait 2s) turn a brief pool queue into a P2028
        // error. Waiting longer converts those hard failures into latency.
        { maxWait: 15_000, timeout: 20_000 },
      );
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
  // Use INSERT ... ON CONFLICT DO NOTHING to atomically create the row if missing.
  // This avoids a race where multiple concurrent transactions all try to create
  // the same (accountId, year, month) row and hit the unique constraint.
  await tx.$executeRaw`
    INSERT INTO "AccountUsage" ("accountId", "year", "month", "consumedUnits")
    VALUES (${accountId}, ${year}, ${month}, 0)
    ON CONFLICT ("accountId", "year", "month") DO NOTHING
  `;

  // Lock and read in one statement. This serializes concurrent consumption for
  // the same account+month regardless of whether the row was just created.
  const accountRows = await tx.$queryRaw<Array<{ id: number; consumedUnits: number }>>`
    SELECT "id", "consumedUnits" FROM "AccountUsage"
    WHERE "accountId" = ${accountId} AND "year" = ${year} AND "month" = ${month}
    FOR UPDATE
  `;
  const accountUsage = accountRows[0];
  if (!accountUsage) throw new Error("accountUsage row vanished under lock");

  // --- Lock + load user usage for the current UTC month ---
  await tx.$executeRaw`
    INSERT INTO "UserUsage" ("userId", "year", "month", "consumedUnits")
    VALUES (${userId}, ${year}, ${month}, 0)
    ON CONFLICT ("userId", "year", "month") DO NOTHING
  `;

  const userRows = await tx.$queryRaw<Array<{ id: number; consumedUnits: number }>>`
    SELECT "id", "consumedUnits" FROM "UserUsage"
    WHERE "userId" = ${userId} AND "year" = ${year} AND "month" = ${month}
    FOR UPDATE
  `;
  const userUsage = userRows[0];
  if (!userUsage) throw new Error("userUsage row vanished under lock");

  // --- Load account + user rows and plans ---
  const accountRow = await tx.account.findUnique({
    where: { id: accountId },
    include: { plan: true },
  });
  if (!accountRow) throw new Error("account not found");

  // One round trip instead of two: the user's plan comes back with the user.
  const userRow = await tx.user.findUnique({
    where: { id: userId },
    include: { plan: true },
  });
  if (!userRow || userRow.accountId !== accountId) {
    throw unprocessable("User not found or not accessible.");
  }

  const userPlanRow = userRow.plan;
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

  // The increments above happened under the row locks, so the new totals are
  // exactly before + requestedUnits — no need to read them back.
  const accountConsumedAfter = accountUsedBefore + requestedUnits;
  const userConsumedAfter = userUsedBefore + requestedUnits;

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
      consumedUnits: accountConsumedAfter,
      remaining: Math.max(0, accountPlan.monthlyAllowance - accountConsumedAfter),
      maxPerRequest: accountPlan.maxPerRequest,
    },
    user: {
      planId: userPlan.id,
      planName: userPlan.name,
      monthlyAllowance: userPlan.monthlyAllowance,
      consumedUnits: userConsumedAfter,
      remaining: Math.max(0, userPlan.monthlyAllowance - userConsumedAfter),
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
  const e = err as Record<string, unknown>;

  // Check the error's own code property (Prisma error codes).
  // P2034 = transaction conflict / deadlock (retryable).
  // P2002 = unique constraint violation — on the (accountId, requestId) idempotency
  // key this means another concurrent transaction already recorded the decision.
  // Retrying lets the idempotency check at the top of decideAndRecord() find the
  // existing record and return it. Other unique constraint violations will fail
  // again on retry and eventually throw.
  if (e["code"] === "P2034" || e["code"] === "P2002") return true;

  // Check the error message for PostgreSQL serialization failure indicators.
  // Prisma wraps raw query errors with the SQL state in the message.
  const msg = String(e["message"] ?? "");
  if (msg.includes("40001") || msg.includes("40P01") || msg.includes("could not serialize") || msg.includes("deadlock detected")) {
    return true;
  }

  // Walk the cause chain looking for the SQL state on nested errors.
  let current: unknown = err;
  for (let i = 0; i < 5; i++) {
    if (!current || typeof current !== "object") break;
    const c = current as Record<string, unknown>;
    const sqlState = c["code"] ?? c["sqlState"];
    if (sqlState === "40001" || sqlState === "40P01") return true;
    current = c["cause"] ?? c["original"] ?? c["driverError"] ?? c["pgError"];
  }
  return false;
}

function isBusinessError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  return (err as { statusCode?: number }).statusCode !== undefined;
}

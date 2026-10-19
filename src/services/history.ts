import { prisma } from "../lib/prisma";
import { parseUtcMonth } from "../utils/date";
import type { Prisma } from "../../generated/prisma/client";

export type HistoryEntry = {
  id: number;
  userId: number;
  requestId: string;
  requestedUnits: number;
  accepted: boolean;
  rejectionCode: string | null;
  rejectionScope: string | null;
  unitsConsumed: number;
  accountedYear: number;
  accountedMonth: number;
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
  processedAt: Date;
};

export type HistoryQuery = {
  accountId: number;
  userId?: number | undefined;
  requestId?: string | undefined;
  month?: string | undefined;
  page: number;
  limit: number;
};

export async function queryHistory(
  q: HistoryQuery,
): Promise<{ data: HistoryEntry[]; total: number }> {
  const where: Prisma.UsageRequestWhereInput = { accountId: q.accountId };

  if (q.userId !== undefined) where.userId = q.userId;
  if (q.requestId !== undefined) where.requestId = q.requestId;
  if (q.month) {
    const tuple = parseUtcMonth(q.month);
    if (tuple) {
      where.accountedYear = tuple.year;
      where.accountedMonth = tuple.month;
    }
  }

  const orderBy = { processedAt: "desc" as const };
  const skip = (q.page - 1) * q.limit;
  const take = q.limit;

  const [rows, total] = await Promise.all([
    prisma.usageRequest.findMany({
      where,
      orderBy,
      skip,
      take,
    }),
    prisma.usageRequest.count({ where }),
  ]);

  return { data: rows as unknown as HistoryEntry[], total };
}

export async function getRequestByRequestId(
  accountId: number,
  requestId: string,
): Promise<HistoryEntry | null> {
  const row = await prisma.usageRequest.findFirst({
    where: { accountId, requestId },
  });

  if (!row) return null;
  return row as unknown as HistoryEntry;
}

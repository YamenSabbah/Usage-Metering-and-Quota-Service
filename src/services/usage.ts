import { prisma } from "../lib/prisma";
import { parseUtcMonth } from "../utils/date";
import type { PaginatedRequestParams } from "../types";

export type UsageEntry = {
  year: number;
  month: number;
  consumedUnits: number;
};

/**
 * Get usage for the authenticated account across multiple months.
 * Returns the current month by default; supports ?month=YYYY-MM for a specific month.
 */
export async function getAccountUsage(
  accountId: number,
  monthFilter?: string,
  pagination?: PaginatedRequestParams,
): Promise<{ data: UsageEntry[]; total: number }> {
  const parsed = monthFilter ? parseUtcMonth(monthFilter) : null;

  const where = parsed
    ? { accountId, year: parsed.year, month: parsed.month }
    : { accountId };

  const page = pagination?.page ?? 1;
  const limit = pagination?.limit ?? 20;
  const [rows, total] = await Promise.all([
    prisma.accountUsage.findMany({
      where,
      orderBy: [{ year: "desc" }, { month: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.accountUsage.count({ where }),
  ]);

  return {
    data: rows.map((r) => ({
      year: r.year,
      month: r.month,
      consumedUnits: r.consumedUnits,
    })),
    total,
  };
}

/**
 * Get usage for a specific user.
 */
export async function getUserUsage(
  accountId: number,
  userId: number,
  monthFilter?: string,
): Promise<UsageEntry | null> {
  const tuple = (monthFilter ? parseUtcMonth(monthFilter) : null) ?? {
    year: new Date().getUTCFullYear(),
    month: new Date().getUTCMonth() + 1,
  };

  const row = await prisma.userUsage.findUnique({
    where: { userId_year_month: { userId, year: tuple.year, month: tuple.month } },
  });

  if (!row) return null;

  // Verify user belongs to the account (isolation).
  const user = await prisma.user.findFirst({
    where: { id: userId, accountId },
    select: { id: true },
  });
  if (!user) return null;

  return {
    year: row.year,
    month: row.month,
    consumedUnits: row.consumedUnits,
  };
}

/**
 * Get the current month usage for the account (for the /usage summary endpoint).
 */
export async function getAccountCurrentUsage(accountId: number): Promise<UsageEntry> {
  const { year, month } = { year: new Date().getUTCFullYear(), month: new Date().getUTCMonth() + 1 };
  let row = await prisma.accountUsage.findUnique({
    where: { accountId_year_month: { accountId, year, month } },
  });
  if (!row) {
    row = await prisma.accountUsage.create({
      data: { accountId, year, month, consumedUnits: 0 },
    });
  }
  return { year: row!.year, month: row!.month, consumedUnits: row!.consumedUnits };
}

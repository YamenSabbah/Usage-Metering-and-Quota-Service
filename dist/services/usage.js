import { prisma } from "../lib/prisma";
import { parseUtcMonth } from "../utils/date";
// Re-export the prisma singleton for services that need their own instance.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _unused = prisma;
/**
 * Get usage for the authenticated account across multiple months.
 * Returns the current month by default; supports ?month=YYYY-MM for a specific month.
 */
export async function getAccountUsage(accountId, monthFilter, pagination) {
    const parsed = monthFilter ? parseUtcMonth(monthFilter) : null;
    const where = parsed
        ? { accountId, year: parsed.year, month: parsed.month }
        : { accountId };
    const [rows, total] = await Promise.all([
        prisma.accountUsage.findMany({
            where,
            orderBy: [{ year: "desc" }, { month: "desc" }],
            skip: (pagination?.page ?? 1) - 1,
            take: pagination?.limit ?? 20,
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
export async function getUserUsage(accountId, userId, monthFilter) {
    const tuple = (monthFilter ? parseUtcMonth(monthFilter) : null) ?? {
        year: new Date().getUTCFullYear(),
        month: new Date().getUTCMonth() + 1,
    };
    const row = await prisma.userUsage.findUnique({
        where: { userId_year_month: { userId, year: tuple.year, month: tuple.month } },
    });
    if (!row)
        return null;
    // Verify user belongs to the account (isolation).
    const user = await prisma.user.findFirst({
        where: { id: userId, accountId },
        select: { id: true },
    });
    if (!user)
        return null;
    return {
        year: row.year,
        month: row.month,
        consumedUnits: row.consumedUnits,
    };
}
/**
 * Get the current month usage for the account (for the /usage summary endpoint).
 */
export async function getAccountCurrentUsage(accountId) {
    const { year, month } = { year: new Date().getUTCFullYear(), month: new Date().getUTCMonth() + 1 };
    let row = await prisma.accountUsage.findUnique({
        where: { accountId_year_month: { accountId, year, month } },
    });
    if (!row) {
        row = await prisma.accountUsage.create({
            data: { accountId, year, month, consumedUnits: 0 },
        });
    }
    return { year: row.year, month: row.month, consumedUnits: row.consumedUnits };
}
//# sourceMappingURL=usage.js.map
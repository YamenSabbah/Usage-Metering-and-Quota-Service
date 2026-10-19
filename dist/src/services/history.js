import { prisma } from "../lib/prisma";
import { parseUtcMonth } from "../utils/date";
export async function queryHistory(q) {
    const where = { accountId: q.accountId };
    if (q.userId !== undefined)
        where.userId = q.userId;
    if (q.requestId !== undefined)
        where.requestId = q.requestId;
    if (q.month) {
        const tuple = parseUtcMonth(q.month);
        if (tuple) {
            where.accountedYear = tuple.year;
            where.accountedMonth = tuple.month;
        }
    }
    const orderBy = { processedAt: "desc" };
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
    return { data: rows, total };
}
export async function getRequestByRequestId(accountId, requestId) {
    const row = await prisma.usageRequest.findFirst({
        where: { accountId, requestId },
    });
    if (!row)
        return null;
    return row;
}
//# sourceMappingURL=history.js.map
import { PrismaClient } from "../../generated/prisma/client";
import { notFound, forbidden } from "../middleware/errors";
/**
 * List plans visible to the authenticated account.
 * - Predefined plans are visible to everyone.
 * - Custom plans are visible only to their owning account.
 */
export async function listPlans(prisma, accountId, filters, page, limit) {
    const where = {};
    if (filters.scope)
        where.scope = filters.scope;
    if (filters.source)
        where.source = filters.source;
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
            scope: p.scope,
            monthlyAllowance: p.monthlyAllowance,
            maxPerRequest: p.maxPerRequest,
            source: p.source,
            accountId: p.accountId,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
        })),
        total,
    };
}
export async function getPlan(prisma, accountId, planId) {
    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan)
        throw notFound("Plan not found.");
    // Custom plans are only accessible to their owner.
    if (plan.source === "CUSTOM" && plan.accountId !== accountId) {
        throw forbidden("Plan not found.");
    }
    return {
        id: plan.id,
        name: plan.name,
        scope: plan.scope,
        monthlyAllowance: plan.monthlyAllowance,
        maxPerRequest: plan.maxPerRequest,
        source: plan.source,
        accountId: plan.accountId,
        createdAt: plan.createdAt,
        updatedAt: plan.updatedAt,
    };
}
export async function createPlan(prisma, accountId, input) {
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
        scope: plan.scope,
        monthlyAllowance: plan.monthlyAllowance,
        maxPerRequest: plan.maxPerRequest,
        source: "CUSTOM",
        accountId: plan.accountId,
        createdAt: plan.createdAt,
        updatedAt: plan.updatedAt,
    };
}
export async function updatePlan(prisma, accountId, planId, input) {
    const existing = await prisma.plan.findUnique({ where: { id: planId } });
    if (!existing)
        throw notFound("Plan not found.");
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
        scope: plan.scope,
        monthlyAllowance: plan.monthlyAllowance,
        maxPerRequest: plan.maxPerRequest,
        source: plan.source,
        accountId: plan.accountId,
        createdAt: plan.createdAt,
        updatedAt: plan.updatedAt,
    };
}
//# sourceMappingURL=plans.js.map
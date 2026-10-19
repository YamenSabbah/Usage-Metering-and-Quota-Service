import { PrismaClient } from "../../generated/prisma/client";
import { notFound, forbidden } from "../middleware/errors";
/**
 * Create a user under the given account.
 * If no planId is supplied, the user gets the predefined "Basic" user plan.
 */
export async function createUser(prisma, accountId, input) {
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
    if (!plan)
        throw notFound("Plan not found.");
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
export async function getUser(prisma, accountId, userId) {
    const user = await prisma.user.findFirst({
        where: { id: userId, accountId },
        include: { plan: true },
    });
    if (!user)
        throw notFound("User not found.");
    return {
        id: user.id,
        externalRef: user.externalRef,
        accountId: user.accountId,
        planId: user.planId,
        planName: user.plan.name,
        planScope: user.plan.scope,
        monthlyAllowance: user.plan.monthlyAllowance,
        maxPerRequest: user.plan.maxPerRequest,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
export async function listUsers(prisma, accountId, page, limit) {
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
            planScope: u.plan.scope,
            monthlyAllowance: u.plan.monthlyAllowance,
            maxPerRequest: u.plan.maxPerRequest,
            createdAt: u.createdAt,
            updatedAt: u.updatedAt,
        })),
        total,
    };
}
export async function changeUserPlan(prisma, accountId, userId, planId) {
    // Verify user belongs to this account.
    const user = await prisma.user.findFirst({
        where: { id: userId, accountId },
        select: { id: true },
    });
    if (!user)
        throw notFound("User not found.");
    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan)
        throw notFound("Plan not found.");
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
//# sourceMappingURL=users.js.map
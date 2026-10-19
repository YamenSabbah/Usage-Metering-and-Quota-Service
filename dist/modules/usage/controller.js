import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { apiKeyAuth } from "../../middleware/api-key-auth";
import { getAccountUsage, getUserUsage, getAccountCurrentUsage } from "../../services/usage";
import { notFound } from "../../middleware/errors";
// NOTE: usage service functions use the prisma singleton directly.
export const usageRouter = Router();
// GET /usage — account usage (optionally filtered by ?month=YYYY-MM)
usageRouter.get("/usage", apiKeyAuth(), async (req, res, next) => {
    try {
        const month = req.query.month ?? undefined;
        const page = parseInt(req.query.page ?? "1", 10) || 1;
        const limit = parseInt(req.query.limit ?? "20", 10) || 20;
        const cappedLimit = Math.min(limit, 100);
        const { data, total } = await getAccountUsage(req.accountId, month, { page, limit: cappedLimit });
        res.json({ data, page, limit: cappedLimit, total, hasMore: page * cappedLimit < total });
    }
    catch (err) {
        next(err);
    }
});
// GET /usage/current — current month account usage with plan info
usageRouter.get("/usage/current", apiKeyAuth(), async (req, res, next) => {
    try {
        const account = await prisma.account.findUnique({
            where: { id: req.accountId },
            include: { plan: true },
        });
        if (!account)
            throw notFound("Account not found.");
        const usage = await getAccountCurrentUsage(req.accountId);
        const remaining = Math.max(0, account.plan.monthlyAllowance - usage.consumedUnits);
        res.json({
            year: usage.year,
            month: usage.month,
            consumedUnits: usage.consumedUnits,
            plan: {
                id: account.plan.id,
                name: account.plan.name,
                monthlyAllowance: account.plan.monthlyAllowance,
                maxPerRequest: account.plan.maxPerRequest,
            },
            remaining,
        });
    }
    catch (err) {
        next(err);
    }
});
// GET /usage/users/:userId — usage for a specific user
usageRouter.get("/usage/users/:userId", apiKeyAuth(), async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId) || userId < 1) {
            res.status(400).json({ error: "BAD_REQUEST", message: "Invalid userId" });
            return;
        }
        const month = req.query.month ?? undefined;
        const usage = await getUserUsage(req.accountId, userId, month);
        if (!usage) {
            res.json({ year: new Date().getUTCFullYear(), month: new Date().getUTCMonth() + 1, consumedUnits: 0 });
            return;
        }
        res.json(usage);
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=controller.js.map
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { apiKeyAuth } from "../../middleware/api-key-auth";
import { validate } from "../../validation/middleware";
import { createUserBody, changeUserPlanBody, paginationQuery } from "../../validation/schemas";
import { createUser as createUserSvc, getUser as getUserSvc, listUsers as listUsersSvc, changeUserPlan as changeUserPlanSvc, } from "../../services/users";
export const userRouter = Router();
// POST /users — register a user under the authenticated account
userRouter.post("/users", apiKeyAuth(), validate(createUserBody), async (req, res, next) => {
    try {
        const { externalRef, planId } = req.body;
        const result = await createUserSvc(prisma, req.accountId, { externalRef, planId });
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
});
// GET /users — list users belonging to the authenticated account
userRouter.get("/users", apiKeyAuth(), async (req, res, next) => {
    try {
        const page = parseInt(req.query.page ?? "1", 10) || 1;
        const limit = Math.min(parseInt(req.query.limit ?? "20", 10) || 20, 100);
        const { data, total } = await listUsersSvc(prisma, req.accountId, page, limit);
        res.json({ data, page, limit, total, hasMore: page * limit < total });
    }
    catch (err) {
        next(err);
    }
});
// GET /users/:userId — inspect a user
userRouter.get("/users/:userId", apiKeyAuth(), async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId) || userId < 1) {
            res.status(400).json({ error: "BAD_REQUEST", message: "Invalid userId" });
            return;
        }
        const user = await getUserSvc(prisma, req.accountId, userId);
        res.json(user);
    }
    catch (err) {
        next(err);
    }
});
// PUT /users/:userId/plan — change a user's plan
userRouter.put("/users/:userId/plan", apiKeyAuth(), validate(changeUserPlanBody), async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId) || userId < 1) {
            res.status(400).json({ error: "BAD_REQUEST", message: "Invalid userId" });
            return;
        }
        const { planId } = req.body;
        await changeUserPlanSvc(prisma, req.accountId, userId, planId);
        res.json({ ok: true });
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=controller.js.map
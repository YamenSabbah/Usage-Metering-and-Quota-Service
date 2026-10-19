import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import type { AuthenticatedRequest } from "../../middleware/api-key-auth";
import { apiKeyAuth } from "../../middleware/api-key-auth";
import { validate } from "../../validation/middleware";
import { createPlanBody, updatePlanBody } from "../../validation/schemas";
import {
  listPlans as listPlansSvc,
  getPlan as getPlanSvc,
  createPlan as createPlanSvc,
  updatePlan as updatePlanSvc,
} from "../../services/plans";

export const planRouter = Router();

// GET /plans — list predefined and owned custom plans
planRouter.get("/plans", apiKeyAuth(), async (req: AuthenticatedRequest, res, next) => {
  try {
    const rawScope = req.query.scope;
    const scope = (rawScope === "ACCOUNT" || rawScope === "USER") ? rawScope : undefined;
    const rawSource = req.query.source;
    const source = (rawSource === "PREDEFINED" || rawSource === "CUSTOM") ? rawSource : undefined;
    const page = parseInt(req.query.page as string ?? "1", 10) || 1;
    const limit = Math.min(parseInt(req.query.limit as string ?? "20", 10) || 20, 100);

    const { data, total } = await listPlansSvc(prisma, req.accountId, { scope, source }, page, limit);
    res.json({ data, page, limit, total, hasMore: page * limit < total });
  } catch (err) {
    next(err);
  }
});

// GET /plans/:planId — inspect an accessible plan
planRouter.get("/plans/:planId", apiKeyAuth(), async (req: AuthenticatedRequest, res, next) => {
  try {
    const planId = parseInt(req.params.planId as string, 10);
    if (isNaN(planId) || planId < 1) {
      res.status(400).json({ error: "BAD_REQUEST", message: "Invalid planId" });
      return;
    }
    const plan = await getPlanSvc(prisma, req.accountId, planId);
    res.json(plan);
  } catch (err) {
    next(err);
  }
});

// POST /plans — create a custom plan owned by the authenticated account
planRouter.post("/plans", apiKeyAuth(), validate(createPlanBody), async (req: AuthenticatedRequest, res, next) => {
  try {
    const body = req.body as z.infer<typeof createPlanBody>;
    const plan = await createPlanSvc(prisma, req.accountId, {
      name: body.name,
      scope: body.scope,
      monthlyAllowance: body.monthlyAllowance,
      maxPerRequest: body.maxPerRequest,
    });
    res.status(201).json(plan);
  } catch (err) {
    next(err);
  }
});

// PATCH /plans/:planId — update an owned custom plan
planRouter.patch("/plans/:planId", apiKeyAuth(), validate(updatePlanBody), async (req: AuthenticatedRequest, res, next) => {
  try {
    const planId = parseInt(req.params.planId as string, 10);
    if (isNaN(planId) || planId < 1) {
      res.status(400).json({ error: "BAD_REQUEST", message: "Invalid planId" });
      return;
    }
    const body = req.body as z.infer<typeof updatePlanBody>;
    const plan = await updatePlanSvc(prisma, req.accountId, planId, body);
    res.json(plan);
  } catch (err) {
    next(err);
  }
});

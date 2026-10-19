import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import type { AuthenticatedRequest } from "../../middleware/api-key-auth";
import { apiKeyAuth } from "../../middleware/api-key-auth";
import { validate } from "../../validation/middleware";
import { createAccountBody, changeAccountPlanBody } from "../../validation/schemas";
import {
  createAccount as createAccountSvc,
  getAccount as getAccountSvc,
  changeAccountPlan as changeAccountPlanSvc,
} from "../../services/accounts";

export const accountRouter = Router();

// POST /accounts — create account (no auth required; onboarding bootstrap)
accountRouter.post("/accounts", validate(createAccountBody), async (req, res, next) => {
  try {
    const { name } = req.body as z.infer<typeof createAccountBody>;
    const result = await createAccountSvc(prisma, { name });
    res.status(201).json({
      id: result.id,
      name: result.name,
      apiKey: result.apiKey,
      message: "Save this API key securely — it cannot be retrieved later.",
    });
  } catch (err) {
    next(err);
  }
});

// GET /accounts/me — inspect authenticated account
accountRouter.get("/accounts/me", apiKeyAuth(), async (req: AuthenticatedRequest, res, next) => {
  try {
    const account = await getAccountSvc(prisma, req.accountId);
    res.json(account);
  } catch (err) {
    next(err);
  }
});

// PUT /account/plan — change account's assigned plan
accountRouter.put("/account/plan", apiKeyAuth(), validate(changeAccountPlanBody), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { planId } = req.body as z.infer<typeof changeAccountPlanBody>;
    await changeAccountPlanSvc(prisma, req.accountId, planId);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { apiKeyAuth } from "../../middleware/api-key-auth";
import { validate } from "../../validation/middleware";
import { consumeBody } from "../../validation/schemas";
import { processConsumption } from "../../services/consumption";
export const consumptionRouter = Router();
consumptionRouter.post("/consume", apiKeyAuth(), validate(consumeBody), async (req, res, next) => {
    try {
        const { userId, units, requestId } = req.body;
        const decision = await processConsumption(prisma, req.accountId, userId, units, requestId);
        res.json(decision);
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=controller.js.map
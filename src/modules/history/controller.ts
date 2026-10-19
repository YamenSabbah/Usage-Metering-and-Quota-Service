import { Router } from "express";
import { prisma } from "../../lib/prisma";
import type { AuthenticatedRequest } from "../../middleware/api-key-auth";
import { apiKeyAuth } from "../../middleware/api-key-auth";
import { queryHistory, getRequestByRequestId } from "../../services/history";

export const historyRouter = Router();

// GET /history — account request history
historyRouter.get("/history", apiKeyAuth(), async (req: AuthenticatedRequest, res, next) => {
  try {
    const userId = (req.query.userId as string) ? parseInt(req.query.userId as string, 10) : undefined;
    const requestId = (req.query.requestId as string) ?? undefined;
    const month = (req.query.month as string) ?? undefined;
    const page = parseInt(req.query.page as string ?? "1", 10) || 1;
    const limit = Math.min(parseInt(req.query.limit as string ?? "20", 10) || 20, 100);

    const { data, total } = await queryHistory({
      accountId: req.accountId,
      userId,
      requestId,
      month,
      page,
      limit,
    });

    res.json({ data, page, limit, total, hasMore: page * limit < total });
  } catch (err) {
    next(err);
  }
});

// GET /history/:requestId — inspect a single recorded request
historyRouter.get("/history/:requestId", apiKeyAuth(), async (req: AuthenticatedRequest, res, next) => {
  try {
    const requestId = req.params.requestId as string;
    const row = await getRequestByRequestId(req.accountId, requestId);
    if (!row) {
      res.status(404).json({ error: "NOT_FOUND", message: "Request not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    next(err);
  }
});

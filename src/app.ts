import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errors";
import { accountRouter } from "./modules/accounts/controller";
import { userRouter } from "./modules/users/controller";
import { planRouter } from "./modules/plans/controller";
import { consumptionRouter } from "./modules/consumption/controller";
import { usageRouter } from "./modules/usage/controller";
import { historyRouter } from "./modules/history/controller";

export function createApp(): express.Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(accountRouter);
  app.use(userRouter);
  app.use(planRouter);
  app.use(consumptionRouter);
  app.use(usageRouter);
  app.use(historyRouter);

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use((_req, res) => {
    res.status(404).json({ error: "NOT_FOUND", message: "Route not found" });
  });

  app.use(errorHandler);

  return app;
}

import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { ZodError } from "zod";

export function validate<T>(schema: ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: "VALIDATION_FAILED",
          details: error.issues.map((i) => ({ field: i.path.join("."), message: i.message })),
        });
      } else {
        next(error);
      }
    }
  };
}

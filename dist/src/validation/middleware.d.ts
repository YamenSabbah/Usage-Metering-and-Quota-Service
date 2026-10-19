import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
export declare function validate<T>(schema: ZodType<T>): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=middleware.d.ts.map
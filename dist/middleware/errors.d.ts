import type { Request, Response, NextFunction } from "express";
export declare class AppError extends Error {
    statusCode: number;
    code: string;
    details?: unknown;
    constructor(statusCode: number, code: string, message: string, details?: unknown);
}
export declare function notFound(msg?: string): AppError;
export declare function unauthorized(msg?: string): AppError;
export declare function forbidden(msg?: string): AppError;
export declare function conflict(msg?: string): AppError;
export declare function unprocessable(msg?: string): AppError;
export declare function badRequest(msg?: string): AppError;
export declare function internal(msg?: string): AppError;
export declare function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void;
//# sourceMappingURL=errors.d.ts.map
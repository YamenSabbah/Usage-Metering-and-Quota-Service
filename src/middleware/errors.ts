import type { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function notFound(msg = "Resource not found"): AppError {
  return new AppError(404, "NOT_FOUND", msg);
}

export function unauthorized(msg = "Authentication required"): AppError {
  return new AppError(401, "UNAUTHORIZED", msg);
}

export function forbidden(msg = "Forbidden"): AppError {
  return new AppError(403, "FORBIDDEN", msg);
}

export function conflict(msg = "Conflict"): AppError {
  return new AppError(409, "CONFLICT", msg);
}

export function unprocessable(msg = "Unprocessable"): AppError {
  return new AppError(422, "UNPROCESSABLE", msg);
}

export function badRequest(msg = "Bad request"): AppError {
  return new AppError(400, "BAD_REQUEST", msg);
}

export function internal(msg = "Internal server error"): AppError {
  return new AppError(500, "INTERNAL_ERROR", msg);
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    const body: Record<string, unknown> = {
      error: err.code,
      message: err.message,
    };
    if (err.details !== undefined) {
      body.details = err.details;
    }
    res.status(err.statusCode).json(body);
    return;
  }

  // Log unexpected errors but never leak internals.
  console.error("Unexpected error:", err?.constructor?.name, err?.message);
  if (err?.stack) console.error(err.stack.split('\n').slice(0, 5).join('\n'));

  res.status(500).json({
    error: "INTERNAL_ERROR",
    message: "An unexpected error occurred.",
  });
}

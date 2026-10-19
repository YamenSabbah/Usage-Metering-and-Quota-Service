import type { PlanScope as PrismaPlanScope, PlanSource as PrismaPlanSource } from "../../generated/prisma/client";

// Re-export Prisma enums as our own branded types for clarity.
export type PlanScope = PrismaPlanScope;
export type PlanSource = PrismaPlanSource;

export type Scope = "account" | "user";

export type RejectionCode =
  | "ACCOUNT_PER_REQUEST_LIMIT"
  | "USER_PER_REQUEST_LIMIT"
  | "ACCOUNT_MONTHLY_LIMIT"
  | "USER_MONTHLY_LIMIT"
  | "USER_NOT_FOUND"
  | "REQUEST_ID_CONFLICT"
  | "INVALID_REQUEST";

export interface PaginatedRequestParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

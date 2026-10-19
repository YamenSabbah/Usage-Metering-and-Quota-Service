import type { PaginatedRequestParams } from "../types";
export type UsageEntry = {
    year: number;
    month: number;
    consumedUnits: number;
};
/**
 * Get usage for the authenticated account across multiple months.
 * Returns the current month by default; supports ?month=YYYY-MM for a specific month.
 */
export declare function getAccountUsage(accountId: number, monthFilter?: string, pagination?: PaginatedRequestParams): Promise<{
    data: UsageEntry[];
    total: number;
}>;
/**
 * Get usage for a specific user.
 */
export declare function getUserUsage(accountId: number, userId: number, monthFilter?: string): Promise<UsageEntry | null>;
/**
 * Get the current month usage for the account (for the /usage summary endpoint).
 */
export declare function getAccountCurrentUsage(accountId: number): Promise<UsageEntry>;
//# sourceMappingURL=usage.d.ts.map
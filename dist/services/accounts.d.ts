import { PrismaClient } from "../../generated/prisma/client";
export type CreateAccountInput = {
    name: string;
};
export type AccountSummary = {
    id: number;
    name: string;
    planId: number;
    planName: string;
    planScope: "ACCOUNT" | "USER";
    monthlyAllowance: number;
    maxPerRequest: number;
    createdAt: Date;
    updatedAt: Date;
};
/**
 * Create a new account.
 * Returns the plaintext API key exactly once. The caller must store it securely.
 * The account is created with the predefined "Starter" account plan by default.
 */
export declare function createAccount(prisma: PrismaClient, input: CreateAccountInput): Promise<{
    id: number;
    name: string;
    apiKey: string;
}>;
/**
 * Get the authenticated account with its current plan.
 */
export declare function getAccount(prisma: PrismaClient, accountId: number): Promise<AccountSummary>;
/**
 * Change the account's assigned plan.
 * The new plan must be accessible to the account (predefined or its own custom).
 */
export declare function changeAccountPlan(prisma: PrismaClient, accountId: number, planId: number): Promise<void>;
//# sourceMappingURL=accounts.d.ts.map
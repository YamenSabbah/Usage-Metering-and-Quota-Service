import { PrismaClient } from "../../generated/prisma/client";
export type UserSummary = {
    id: number;
    externalRef: string;
    accountId: number;
    planId: number;
    planName: string;
    planScope: "ACCOUNT" | "USER";
    monthlyAllowance: number;
    maxPerRequest: number;
    createdAt: Date;
    updatedAt: Date;
};
export type CreateUserInput = {
    externalRef: string;
    planId?: number | undefined;
};
/**
 * Create a user under the given account.
 * If no planId is supplied, the user gets the predefined "Basic" user plan.
 */
export declare function createUser(prisma: PrismaClient, accountId: number, input: CreateUserInput): Promise<{
    id: number;
    externalRef: string;
    planId: number;
}>;
export declare function getUser(prisma: PrismaClient, accountId: number, userId: number): Promise<UserSummary>;
export declare function listUsers(prisma: PrismaClient, accountId: number, page: number, limit: number): Promise<{
    data: UserSummary[];
    total: number;
}>;
export declare function changeUserPlan(prisma: PrismaClient, accountId: number, userId: number, planId: number): Promise<void>;
//# sourceMappingURL=users.d.ts.map
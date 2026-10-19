import { PrismaClient } from "../../generated/prisma/client";
export type PlanSummary = {
    id: number;
    name: string;
    scope: "ACCOUNT" | "USER";
    monthlyAllowance: number;
    maxPerRequest: number;
    source: "PREDEFINED" | "CUSTOM";
    accountId: number | null;
    createdAt: Date;
    updatedAt: Date;
};
export type ListPlansFilters = {
    scope?: "ACCOUNT" | "USER" | undefined;
    source?: "PREDEFINED" | "CUSTOM" | undefined;
};
/**
 * List plans visible to the authenticated account.
 * - Predefined plans are visible to everyone.
 * - Custom plans are visible only to their owning account.
 */
export declare function listPlans(prisma: PrismaClient, accountId: number, filters: ListPlansFilters, page: number, limit: number): Promise<{
    data: PlanSummary[];
    total: number;
}>;
export declare function getPlan(prisma: PrismaClient, accountId: number, planId: number): Promise<PlanSummary>;
export type CreatePlanInput = {
    name: string;
    scope: "ACCOUNT" | "USER";
    monthlyAllowance: number;
    maxPerRequest: number;
};
export declare function createPlan(prisma: PrismaClient, accountId: number, input: CreatePlanInput): Promise<PlanSummary>;
export type UpdatePlanInput = {
    name?: string | undefined;
    monthlyAllowance?: number | undefined;
    maxPerRequest?: number | undefined;
};
export declare function updatePlan(prisma: PrismaClient, accountId: number, planId: number, input: UpdatePlanInput): Promise<PlanSummary>;
//# sourceMappingURL=plans.d.ts.map
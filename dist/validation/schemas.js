import { z } from "zod";
// ──────────────────────── Shared ────────────────────────
export const paginationQuery = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
});
export const utcMonthParam = z.object({
    month: z.string().regex(/^\d{4}-\d{2}$/, "month must be YYYY-MM"),
});
// ──────────────────────── Accounts ────────────────────────
export const createAccountBody = z.object({
    name: z.string().min(1).max(255),
});
export const changeAccountPlanBody = z.object({
    planId: z.coerce.number().int().positive(),
});
// ──────────────────────── Users ────────────────────────
export const createUserBody = z.object({
    externalRef: z.string().min(1).max(255),
    planId: z.coerce.number().int().positive().optional(),
});
export const changeUserPlanBody = z.object({
    planId: z.coerce.number().int().positive(),
});
// ──────────────────────── Plans ────────────────────────
export const listPlansQuery = z.object({
    scope: z.enum(["ACCOUNT", "USER"]).optional(),
    source: z.enum(["PREDEFINED", "CUSTOM"]).optional(),
});
export const createPlanBody = z.object({
    name: z.string().min(1).max(255),
    scope: z.enum(["ACCOUNT", "USER"]),
    monthlyAllowance: z.coerce.number().int().min(0),
    maxPerRequest: z.coerce.number().int().min(0),
    // Custom plans are owned by the authenticated account.
    // Predefined plans are seeded separately and are read-only.
    source: z.enum(["CUSTOM"]).optional(), // public API only creates CUSTOM
});
export const updatePlanBody = z.object({
    name: z.string().min(1).max(255).optional(),
    monthlyAllowance: z.coerce.number().int().min(0).optional(),
    maxPerRequest: z.coerce.number().int().min(0).optional(),
});
// ──────────────────────── Consumption ────────────────────────
export const consumeBody = z.object({
    userId: z.coerce.number().int().positive(),
    units: z.coerce.number().int().min(1),
    requestId: z.string().min(1).max(255),
});
//# sourceMappingURL=schemas.js.map
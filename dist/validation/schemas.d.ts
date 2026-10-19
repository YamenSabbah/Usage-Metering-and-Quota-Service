import { z } from "zod";
export declare const paginationQuery: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare const utcMonthParam: z.ZodObject<{
    month: z.ZodString;
}, "strip", z.ZodTypeAny, {
    month: string;
}, {
    month: string;
}>;
export declare const createAccountBody: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export declare const changeAccountPlanBody: z.ZodObject<{
    planId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    planId: number;
}, {
    planId: number;
}>;
export declare const createUserBody: z.ZodObject<{
    externalRef: z.ZodString;
    planId: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    externalRef: string;
    planId?: number | undefined;
}, {
    externalRef: string;
    planId?: number | undefined;
}>;
export declare const changeUserPlanBody: z.ZodObject<{
    planId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    planId: number;
}, {
    planId: number;
}>;
export declare const listPlansQuery: z.ZodObject<{
    scope: z.ZodOptional<z.ZodEnum<["ACCOUNT", "USER"]>>;
    source: z.ZodOptional<z.ZodEnum<["PREDEFINED", "CUSTOM"]>>;
}, "strip", z.ZodTypeAny, {
    scope?: "ACCOUNT" | "USER" | undefined;
    source?: "CUSTOM" | "PREDEFINED" | undefined;
}, {
    scope?: "ACCOUNT" | "USER" | undefined;
    source?: "CUSTOM" | "PREDEFINED" | undefined;
}>;
export declare const createPlanBody: z.ZodObject<{
    name: z.ZodString;
    scope: z.ZodEnum<["ACCOUNT", "USER"]>;
    monthlyAllowance: z.ZodNumber;
    maxPerRequest: z.ZodNumber;
    source: z.ZodOptional<z.ZodEnum<["CUSTOM"]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    scope: "ACCOUNT" | "USER";
    monthlyAllowance: number;
    maxPerRequest: number;
    source?: "CUSTOM" | undefined;
}, {
    name: string;
    scope: "ACCOUNT" | "USER";
    monthlyAllowance: number;
    maxPerRequest: number;
    source?: "CUSTOM" | undefined;
}>;
export declare const updatePlanBody: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    monthlyAllowance: z.ZodOptional<z.ZodNumber>;
    maxPerRequest: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    monthlyAllowance?: number | undefined;
    maxPerRequest?: number | undefined;
}, {
    name?: string | undefined;
    monthlyAllowance?: number | undefined;
    maxPerRequest?: number | undefined;
}>;
export declare const consumeBody: z.ZodObject<{
    userId: z.ZodNumber;
    units: z.ZodNumber;
    requestId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: number;
    units: number;
    requestId: string;
}, {
    userId: number;
    units: number;
    requestId: string;
}>;
//# sourceMappingURL=schemas.d.ts.map
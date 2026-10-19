export type HistoryEntry = {
    id: number;
    userId: number;
    requestId: string;
    requestedUnits: number;
    accepted: boolean;
    rejectionCode: string | null;
    rejectionScope: string | null;
    unitsConsumed: number;
    accountedYear: number;
    accountedMonth: number;
    accountPlanId: number;
    userPlanId: number;
    accountMaxPerRequest: number;
    userMaxPerRequest: number;
    accountMonthlyAllowance: number;
    userMonthlyAllowance: number;
    accountUsedBefore: number;
    userUsedBefore: number;
    accountRemainingBefore: number;
    userRemainingBefore: number;
    processedAt: Date;
};
export type HistoryQuery = {
    accountId: number;
    userId?: number | undefined;
    requestId?: string | undefined;
    month?: string | undefined;
    page: number;
    limit: number;
};
export declare function queryHistory(q: HistoryQuery): Promise<{
    data: HistoryEntry[];
    total: number;
}>;
export declare function getRequestByRequestId(accountId: number, requestId: string): Promise<HistoryEntry | null>;
//# sourceMappingURL=history.d.ts.map
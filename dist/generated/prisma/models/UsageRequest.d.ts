import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model UsageRequest
 *
 */
export type UsageRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$UsageRequestPayload>;
export type AggregateUsageRequest = {
    _count: UsageRequestCountAggregateOutputType | null;
    _avg: UsageRequestAvgAggregateOutputType | null;
    _sum: UsageRequestSumAggregateOutputType | null;
    _min: UsageRequestMinAggregateOutputType | null;
    _max: UsageRequestMaxAggregateOutputType | null;
};
export type UsageRequestAvgAggregateOutputType = {
    id: number | null;
    accountId: number | null;
    userId: number | null;
    requestedUnits: number | null;
    accountedYear: number | null;
    accountedMonth: number | null;
    accountPlanId: number | null;
    userPlanId: number | null;
    accountMaxPerRequest: number | null;
    userMaxPerRequest: number | null;
    accountMonthlyAllowance: number | null;
    userMonthlyAllowance: number | null;
    accountUsedBefore: number | null;
    userUsedBefore: number | null;
    accountRemainingBefore: number | null;
    userRemainingBefore: number | null;
    unitsConsumed: number | null;
};
export type UsageRequestSumAggregateOutputType = {
    id: number | null;
    accountId: number | null;
    userId: number | null;
    requestedUnits: number | null;
    accountedYear: number | null;
    accountedMonth: number | null;
    accountPlanId: number | null;
    userPlanId: number | null;
    accountMaxPerRequest: number | null;
    userMaxPerRequest: number | null;
    accountMonthlyAllowance: number | null;
    userMonthlyAllowance: number | null;
    accountUsedBefore: number | null;
    userUsedBefore: number | null;
    accountRemainingBefore: number | null;
    userRemainingBefore: number | null;
    unitsConsumed: number | null;
};
export type UsageRequestMinAggregateOutputType = {
    id: number | null;
    accountId: number | null;
    userId: number | null;
    requestId: string | null;
    requestedUnits: number | null;
    accepted: boolean | null;
    rejectionCode: string | null;
    rejectionScope: string | null;
    accountedYear: number | null;
    accountedMonth: number | null;
    accountPlanId: number | null;
    userPlanId: number | null;
    accountMaxPerRequest: number | null;
    userMaxPerRequest: number | null;
    accountMonthlyAllowance: number | null;
    userMonthlyAllowance: number | null;
    accountUsedBefore: number | null;
    userUsedBefore: number | null;
    accountRemainingBefore: number | null;
    userRemainingBefore: number | null;
    unitsConsumed: number | null;
    processedAt: Date | null;
};
export type UsageRequestMaxAggregateOutputType = {
    id: number | null;
    accountId: number | null;
    userId: number | null;
    requestId: string | null;
    requestedUnits: number | null;
    accepted: boolean | null;
    rejectionCode: string | null;
    rejectionScope: string | null;
    accountedYear: number | null;
    accountedMonth: number | null;
    accountPlanId: number | null;
    userPlanId: number | null;
    accountMaxPerRequest: number | null;
    userMaxPerRequest: number | null;
    accountMonthlyAllowance: number | null;
    userMonthlyAllowance: number | null;
    accountUsedBefore: number | null;
    userUsedBefore: number | null;
    accountRemainingBefore: number | null;
    userRemainingBefore: number | null;
    unitsConsumed: number | null;
    processedAt: Date | null;
};
export type UsageRequestCountAggregateOutputType = {
    id: number;
    accountId: number;
    userId: number;
    requestId: number;
    requestedUnits: number;
    accepted: number;
    rejectionCode: number;
    rejectionScope: number;
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
    unitsConsumed: number;
    processedAt: number;
    _all: number;
};
export type UsageRequestAvgAggregateInputType = {
    id?: true;
    accountId?: true;
    userId?: true;
    requestedUnits?: true;
    accountedYear?: true;
    accountedMonth?: true;
    accountPlanId?: true;
    userPlanId?: true;
    accountMaxPerRequest?: true;
    userMaxPerRequest?: true;
    accountMonthlyAllowance?: true;
    userMonthlyAllowance?: true;
    accountUsedBefore?: true;
    userUsedBefore?: true;
    accountRemainingBefore?: true;
    userRemainingBefore?: true;
    unitsConsumed?: true;
};
export type UsageRequestSumAggregateInputType = {
    id?: true;
    accountId?: true;
    userId?: true;
    requestedUnits?: true;
    accountedYear?: true;
    accountedMonth?: true;
    accountPlanId?: true;
    userPlanId?: true;
    accountMaxPerRequest?: true;
    userMaxPerRequest?: true;
    accountMonthlyAllowance?: true;
    userMonthlyAllowance?: true;
    accountUsedBefore?: true;
    userUsedBefore?: true;
    accountRemainingBefore?: true;
    userRemainingBefore?: true;
    unitsConsumed?: true;
};
export type UsageRequestMinAggregateInputType = {
    id?: true;
    accountId?: true;
    userId?: true;
    requestId?: true;
    requestedUnits?: true;
    accepted?: true;
    rejectionCode?: true;
    rejectionScope?: true;
    accountedYear?: true;
    accountedMonth?: true;
    accountPlanId?: true;
    userPlanId?: true;
    accountMaxPerRequest?: true;
    userMaxPerRequest?: true;
    accountMonthlyAllowance?: true;
    userMonthlyAllowance?: true;
    accountUsedBefore?: true;
    userUsedBefore?: true;
    accountRemainingBefore?: true;
    userRemainingBefore?: true;
    unitsConsumed?: true;
    processedAt?: true;
};
export type UsageRequestMaxAggregateInputType = {
    id?: true;
    accountId?: true;
    userId?: true;
    requestId?: true;
    requestedUnits?: true;
    accepted?: true;
    rejectionCode?: true;
    rejectionScope?: true;
    accountedYear?: true;
    accountedMonth?: true;
    accountPlanId?: true;
    userPlanId?: true;
    accountMaxPerRequest?: true;
    userMaxPerRequest?: true;
    accountMonthlyAllowance?: true;
    userMonthlyAllowance?: true;
    accountUsedBefore?: true;
    userUsedBefore?: true;
    accountRemainingBefore?: true;
    userRemainingBefore?: true;
    unitsConsumed?: true;
    processedAt?: true;
};
export type UsageRequestCountAggregateInputType = {
    id?: true;
    accountId?: true;
    userId?: true;
    requestId?: true;
    requestedUnits?: true;
    accepted?: true;
    rejectionCode?: true;
    rejectionScope?: true;
    accountedYear?: true;
    accountedMonth?: true;
    accountPlanId?: true;
    userPlanId?: true;
    accountMaxPerRequest?: true;
    userMaxPerRequest?: true;
    accountMonthlyAllowance?: true;
    userMonthlyAllowance?: true;
    accountUsedBefore?: true;
    userUsedBefore?: true;
    accountRemainingBefore?: true;
    userRemainingBefore?: true;
    unitsConsumed?: true;
    processedAt?: true;
    _all?: true;
};
export type UsageRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UsageRequest to aggregate.
     */
    where?: Prisma.UsageRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UsageRequests to fetch.
     */
    orderBy?: Prisma.UsageRequestOrderByWithRelationInput | Prisma.UsageRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UsageRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UsageRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UsageRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned UsageRequests
    **/
    _count?: true | UsageRequestCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: UsageRequestAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: UsageRequestSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UsageRequestMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UsageRequestMaxAggregateInputType;
};
export type GetUsageRequestAggregateType<T extends UsageRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateUsageRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUsageRequest[P]> : Prisma.GetScalarType<T[P], AggregateUsageRequest[P]>;
};
export type UsageRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UsageRequestWhereInput;
    orderBy?: Prisma.UsageRequestOrderByWithAggregationInput | Prisma.UsageRequestOrderByWithAggregationInput[];
    by: Prisma.UsageRequestScalarFieldEnum[] | Prisma.UsageRequestScalarFieldEnum;
    having?: Prisma.UsageRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UsageRequestCountAggregateInputType | true;
    _avg?: UsageRequestAvgAggregateInputType;
    _sum?: UsageRequestSumAggregateInputType;
    _min?: UsageRequestMinAggregateInputType;
    _max?: UsageRequestMaxAggregateInputType;
};
export type UsageRequestGroupByOutputType = {
    id: number;
    accountId: number;
    userId: number;
    requestId: string;
    requestedUnits: number;
    accepted: boolean;
    rejectionCode: string | null;
    rejectionScope: string | null;
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
    unitsConsumed: number;
    processedAt: Date;
    _count: UsageRequestCountAggregateOutputType | null;
    _avg: UsageRequestAvgAggregateOutputType | null;
    _sum: UsageRequestSumAggregateOutputType | null;
    _min: UsageRequestMinAggregateOutputType | null;
    _max: UsageRequestMaxAggregateOutputType | null;
};
export type GetUsageRequestGroupByPayload<T extends UsageRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UsageRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UsageRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UsageRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UsageRequestGroupByOutputType[P]>;
}>>;
export type UsageRequestWhereInput = {
    AND?: Prisma.UsageRequestWhereInput | Prisma.UsageRequestWhereInput[];
    OR?: Prisma.UsageRequestWhereInput[];
    NOT?: Prisma.UsageRequestWhereInput | Prisma.UsageRequestWhereInput[];
    id?: Prisma.IntFilter<"UsageRequest"> | number;
    accountId?: Prisma.IntFilter<"UsageRequest"> | number;
    userId?: Prisma.IntFilter<"UsageRequest"> | number;
    requestId?: Prisma.StringFilter<"UsageRequest"> | string;
    requestedUnits?: Prisma.IntFilter<"UsageRequest"> | number;
    accepted?: Prisma.BoolFilter<"UsageRequest"> | boolean;
    rejectionCode?: Prisma.StringNullableFilter<"UsageRequest"> | string | null;
    rejectionScope?: Prisma.StringNullableFilter<"UsageRequest"> | string | null;
    accountedYear?: Prisma.IntFilter<"UsageRequest"> | number;
    accountedMonth?: Prisma.IntFilter<"UsageRequest"> | number;
    accountPlanId?: Prisma.IntFilter<"UsageRequest"> | number;
    userPlanId?: Prisma.IntFilter<"UsageRequest"> | number;
    accountMaxPerRequest?: Prisma.IntFilter<"UsageRequest"> | number;
    userMaxPerRequest?: Prisma.IntFilter<"UsageRequest"> | number;
    accountMonthlyAllowance?: Prisma.IntFilter<"UsageRequest"> | number;
    userMonthlyAllowance?: Prisma.IntFilter<"UsageRequest"> | number;
    accountUsedBefore?: Prisma.IntFilter<"UsageRequest"> | number;
    userUsedBefore?: Prisma.IntFilter<"UsageRequest"> | number;
    accountRemainingBefore?: Prisma.IntFilter<"UsageRequest"> | number;
    userRemainingBefore?: Prisma.IntFilter<"UsageRequest"> | number;
    unitsConsumed?: Prisma.IntFilter<"UsageRequest"> | number;
    processedAt?: Prisma.DateTimeFilter<"UsageRequest"> | Date | string;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UsageRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    requestedUnits?: Prisma.SortOrder;
    accepted?: Prisma.SortOrder;
    rejectionCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionScope?: Prisma.SortOrderInput | Prisma.SortOrder;
    accountedYear?: Prisma.SortOrder;
    accountedMonth?: Prisma.SortOrder;
    accountPlanId?: Prisma.SortOrder;
    userPlanId?: Prisma.SortOrder;
    accountMaxPerRequest?: Prisma.SortOrder;
    userMaxPerRequest?: Prisma.SortOrder;
    accountMonthlyAllowance?: Prisma.SortOrder;
    userMonthlyAllowance?: Prisma.SortOrder;
    accountUsedBefore?: Prisma.SortOrder;
    userUsedBefore?: Prisma.SortOrder;
    accountRemainingBefore?: Prisma.SortOrder;
    userRemainingBefore?: Prisma.SortOrder;
    unitsConsumed?: Prisma.SortOrder;
    processedAt?: Prisma.SortOrder;
    account?: Prisma.AccountOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type UsageRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    accountId_requestId?: Prisma.UsageRequestAccountIdRequestIdCompoundUniqueInput;
    AND?: Prisma.UsageRequestWhereInput | Prisma.UsageRequestWhereInput[];
    OR?: Prisma.UsageRequestWhereInput[];
    NOT?: Prisma.UsageRequestWhereInput | Prisma.UsageRequestWhereInput[];
    accountId?: Prisma.IntFilter<"UsageRequest"> | number;
    userId?: Prisma.IntFilter<"UsageRequest"> | number;
    requestId?: Prisma.StringFilter<"UsageRequest"> | string;
    requestedUnits?: Prisma.IntFilter<"UsageRequest"> | number;
    accepted?: Prisma.BoolFilter<"UsageRequest"> | boolean;
    rejectionCode?: Prisma.StringNullableFilter<"UsageRequest"> | string | null;
    rejectionScope?: Prisma.StringNullableFilter<"UsageRequest"> | string | null;
    accountedYear?: Prisma.IntFilter<"UsageRequest"> | number;
    accountedMonth?: Prisma.IntFilter<"UsageRequest"> | number;
    accountPlanId?: Prisma.IntFilter<"UsageRequest"> | number;
    userPlanId?: Prisma.IntFilter<"UsageRequest"> | number;
    accountMaxPerRequest?: Prisma.IntFilter<"UsageRequest"> | number;
    userMaxPerRequest?: Prisma.IntFilter<"UsageRequest"> | number;
    accountMonthlyAllowance?: Prisma.IntFilter<"UsageRequest"> | number;
    userMonthlyAllowance?: Prisma.IntFilter<"UsageRequest"> | number;
    accountUsedBefore?: Prisma.IntFilter<"UsageRequest"> | number;
    userUsedBefore?: Prisma.IntFilter<"UsageRequest"> | number;
    accountRemainingBefore?: Prisma.IntFilter<"UsageRequest"> | number;
    userRemainingBefore?: Prisma.IntFilter<"UsageRequest"> | number;
    unitsConsumed?: Prisma.IntFilter<"UsageRequest"> | number;
    processedAt?: Prisma.DateTimeFilter<"UsageRequest"> | Date | string;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "accountId_requestId">;
export type UsageRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    requestedUnits?: Prisma.SortOrder;
    accepted?: Prisma.SortOrder;
    rejectionCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionScope?: Prisma.SortOrderInput | Prisma.SortOrder;
    accountedYear?: Prisma.SortOrder;
    accountedMonth?: Prisma.SortOrder;
    accountPlanId?: Prisma.SortOrder;
    userPlanId?: Prisma.SortOrder;
    accountMaxPerRequest?: Prisma.SortOrder;
    userMaxPerRequest?: Prisma.SortOrder;
    accountMonthlyAllowance?: Prisma.SortOrder;
    userMonthlyAllowance?: Prisma.SortOrder;
    accountUsedBefore?: Prisma.SortOrder;
    userUsedBefore?: Prisma.SortOrder;
    accountRemainingBefore?: Prisma.SortOrder;
    userRemainingBefore?: Prisma.SortOrder;
    unitsConsumed?: Prisma.SortOrder;
    processedAt?: Prisma.SortOrder;
    _count?: Prisma.UsageRequestCountOrderByAggregateInput;
    _avg?: Prisma.UsageRequestAvgOrderByAggregateInput;
    _max?: Prisma.UsageRequestMaxOrderByAggregateInput;
    _min?: Prisma.UsageRequestMinOrderByAggregateInput;
    _sum?: Prisma.UsageRequestSumOrderByAggregateInput;
};
export type UsageRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.UsageRequestScalarWhereWithAggregatesInput | Prisma.UsageRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.UsageRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UsageRequestScalarWhereWithAggregatesInput | Prisma.UsageRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    accountId?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    requestId?: Prisma.StringWithAggregatesFilter<"UsageRequest"> | string;
    requestedUnits?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    accepted?: Prisma.BoolWithAggregatesFilter<"UsageRequest"> | boolean;
    rejectionCode?: Prisma.StringNullableWithAggregatesFilter<"UsageRequest"> | string | null;
    rejectionScope?: Prisma.StringNullableWithAggregatesFilter<"UsageRequest"> | string | null;
    accountedYear?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    accountedMonth?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    accountPlanId?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    userPlanId?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    accountMaxPerRequest?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    userMaxPerRequest?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    accountMonthlyAllowance?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    userMonthlyAllowance?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    accountUsedBefore?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    userUsedBefore?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    accountRemainingBefore?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    userRemainingBefore?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    unitsConsumed?: Prisma.IntWithAggregatesFilter<"UsageRequest"> | number;
    processedAt?: Prisma.DateTimeWithAggregatesFilter<"UsageRequest"> | Date | string;
};
export type UsageRequestCreateInput = {
    requestId: string;
    requestedUnits: number;
    accepted: boolean;
    rejectionCode?: string | null;
    rejectionScope?: string | null;
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
    unitsConsumed?: number;
    processedAt?: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutUsageRequestsInput;
    user: Prisma.UserCreateNestedOneWithoutUsageRequestsInput;
};
export type UsageRequestUncheckedCreateInput = {
    id?: number;
    accountId: number;
    userId: number;
    requestId: string;
    requestedUnits: number;
    accepted: boolean;
    rejectionCode?: string | null;
    rejectionScope?: string | null;
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
    unitsConsumed?: number;
    processedAt?: Date | string;
};
export type UsageRequestUpdateInput = {
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
    accepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    rejectionCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountedYear?: Prisma.IntFieldUpdateOperationsInput | number;
    accountedMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    accountPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    userPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    userMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    userMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    accountUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    accountRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    unitsConsumed?: Prisma.IntFieldUpdateOperationsInput | number;
    processedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutUsageRequestsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutUsageRequestsNestedInput;
};
export type UsageRequestUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    accountId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
    accepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    rejectionCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountedYear?: Prisma.IntFieldUpdateOperationsInput | number;
    accountedMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    accountPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    userPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    userMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    userMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    accountUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    accountRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    unitsConsumed?: Prisma.IntFieldUpdateOperationsInput | number;
    processedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UsageRequestCreateManyInput = {
    id?: number;
    accountId: number;
    userId: number;
    requestId: string;
    requestedUnits: number;
    accepted: boolean;
    rejectionCode?: string | null;
    rejectionScope?: string | null;
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
    unitsConsumed?: number;
    processedAt?: Date | string;
};
export type UsageRequestUpdateManyMutationInput = {
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
    accepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    rejectionCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountedYear?: Prisma.IntFieldUpdateOperationsInput | number;
    accountedMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    accountPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    userPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    userMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    userMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    accountUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    accountRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    unitsConsumed?: Prisma.IntFieldUpdateOperationsInput | number;
    processedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UsageRequestUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    accountId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
    accepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    rejectionCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountedYear?: Prisma.IntFieldUpdateOperationsInput | number;
    accountedMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    accountPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    userPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    userMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    userMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    accountUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    accountRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    unitsConsumed?: Prisma.IntFieldUpdateOperationsInput | number;
    processedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UsageRequestListRelationFilter = {
    every?: Prisma.UsageRequestWhereInput;
    some?: Prisma.UsageRequestWhereInput;
    none?: Prisma.UsageRequestWhereInput;
};
export type UsageRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UsageRequestAccountIdRequestIdCompoundUniqueInput = {
    accountId: number;
    requestId: string;
};
export type UsageRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    requestedUnits?: Prisma.SortOrder;
    accepted?: Prisma.SortOrder;
    rejectionCode?: Prisma.SortOrder;
    rejectionScope?: Prisma.SortOrder;
    accountedYear?: Prisma.SortOrder;
    accountedMonth?: Prisma.SortOrder;
    accountPlanId?: Prisma.SortOrder;
    userPlanId?: Prisma.SortOrder;
    accountMaxPerRequest?: Prisma.SortOrder;
    userMaxPerRequest?: Prisma.SortOrder;
    accountMonthlyAllowance?: Prisma.SortOrder;
    userMonthlyAllowance?: Prisma.SortOrder;
    accountUsedBefore?: Prisma.SortOrder;
    userUsedBefore?: Prisma.SortOrder;
    accountRemainingBefore?: Prisma.SortOrder;
    userRemainingBefore?: Prisma.SortOrder;
    unitsConsumed?: Prisma.SortOrder;
    processedAt?: Prisma.SortOrder;
};
export type UsageRequestAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestedUnits?: Prisma.SortOrder;
    accountedYear?: Prisma.SortOrder;
    accountedMonth?: Prisma.SortOrder;
    accountPlanId?: Prisma.SortOrder;
    userPlanId?: Prisma.SortOrder;
    accountMaxPerRequest?: Prisma.SortOrder;
    userMaxPerRequest?: Prisma.SortOrder;
    accountMonthlyAllowance?: Prisma.SortOrder;
    userMonthlyAllowance?: Prisma.SortOrder;
    accountUsedBefore?: Prisma.SortOrder;
    userUsedBefore?: Prisma.SortOrder;
    accountRemainingBefore?: Prisma.SortOrder;
    userRemainingBefore?: Prisma.SortOrder;
    unitsConsumed?: Prisma.SortOrder;
};
export type UsageRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    requestedUnits?: Prisma.SortOrder;
    accepted?: Prisma.SortOrder;
    rejectionCode?: Prisma.SortOrder;
    rejectionScope?: Prisma.SortOrder;
    accountedYear?: Prisma.SortOrder;
    accountedMonth?: Prisma.SortOrder;
    accountPlanId?: Prisma.SortOrder;
    userPlanId?: Prisma.SortOrder;
    accountMaxPerRequest?: Prisma.SortOrder;
    userMaxPerRequest?: Prisma.SortOrder;
    accountMonthlyAllowance?: Prisma.SortOrder;
    userMonthlyAllowance?: Prisma.SortOrder;
    accountUsedBefore?: Prisma.SortOrder;
    userUsedBefore?: Prisma.SortOrder;
    accountRemainingBefore?: Prisma.SortOrder;
    userRemainingBefore?: Prisma.SortOrder;
    unitsConsumed?: Prisma.SortOrder;
    processedAt?: Prisma.SortOrder;
};
export type UsageRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    requestedUnits?: Prisma.SortOrder;
    accepted?: Prisma.SortOrder;
    rejectionCode?: Prisma.SortOrder;
    rejectionScope?: Prisma.SortOrder;
    accountedYear?: Prisma.SortOrder;
    accountedMonth?: Prisma.SortOrder;
    accountPlanId?: Prisma.SortOrder;
    userPlanId?: Prisma.SortOrder;
    accountMaxPerRequest?: Prisma.SortOrder;
    userMaxPerRequest?: Prisma.SortOrder;
    accountMonthlyAllowance?: Prisma.SortOrder;
    userMonthlyAllowance?: Prisma.SortOrder;
    accountUsedBefore?: Prisma.SortOrder;
    userUsedBefore?: Prisma.SortOrder;
    accountRemainingBefore?: Prisma.SortOrder;
    userRemainingBefore?: Prisma.SortOrder;
    unitsConsumed?: Prisma.SortOrder;
    processedAt?: Prisma.SortOrder;
};
export type UsageRequestSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestedUnits?: Prisma.SortOrder;
    accountedYear?: Prisma.SortOrder;
    accountedMonth?: Prisma.SortOrder;
    accountPlanId?: Prisma.SortOrder;
    userPlanId?: Prisma.SortOrder;
    accountMaxPerRequest?: Prisma.SortOrder;
    userMaxPerRequest?: Prisma.SortOrder;
    accountMonthlyAllowance?: Prisma.SortOrder;
    userMonthlyAllowance?: Prisma.SortOrder;
    accountUsedBefore?: Prisma.SortOrder;
    userUsedBefore?: Prisma.SortOrder;
    accountRemainingBefore?: Prisma.SortOrder;
    userRemainingBefore?: Prisma.SortOrder;
    unitsConsumed?: Prisma.SortOrder;
};
export type UsageRequestCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.UsageRequestCreateWithoutAccountInput, Prisma.UsageRequestUncheckedCreateWithoutAccountInput> | Prisma.UsageRequestCreateWithoutAccountInput[] | Prisma.UsageRequestUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.UsageRequestCreateOrConnectWithoutAccountInput | Prisma.UsageRequestCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.UsageRequestCreateManyAccountInputEnvelope;
    connect?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
};
export type UsageRequestUncheckedCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.UsageRequestCreateWithoutAccountInput, Prisma.UsageRequestUncheckedCreateWithoutAccountInput> | Prisma.UsageRequestCreateWithoutAccountInput[] | Prisma.UsageRequestUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.UsageRequestCreateOrConnectWithoutAccountInput | Prisma.UsageRequestCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.UsageRequestCreateManyAccountInputEnvelope;
    connect?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
};
export type UsageRequestUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.UsageRequestCreateWithoutAccountInput, Prisma.UsageRequestUncheckedCreateWithoutAccountInput> | Prisma.UsageRequestCreateWithoutAccountInput[] | Prisma.UsageRequestUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.UsageRequestCreateOrConnectWithoutAccountInput | Prisma.UsageRequestCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.UsageRequestUpsertWithWhereUniqueWithoutAccountInput | Prisma.UsageRequestUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.UsageRequestCreateManyAccountInputEnvelope;
    set?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    disconnect?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    delete?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    connect?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    update?: Prisma.UsageRequestUpdateWithWhereUniqueWithoutAccountInput | Prisma.UsageRequestUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.UsageRequestUpdateManyWithWhereWithoutAccountInput | Prisma.UsageRequestUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.UsageRequestScalarWhereInput | Prisma.UsageRequestScalarWhereInput[];
};
export type UsageRequestUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.UsageRequestCreateWithoutAccountInput, Prisma.UsageRequestUncheckedCreateWithoutAccountInput> | Prisma.UsageRequestCreateWithoutAccountInput[] | Prisma.UsageRequestUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.UsageRequestCreateOrConnectWithoutAccountInput | Prisma.UsageRequestCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.UsageRequestUpsertWithWhereUniqueWithoutAccountInput | Prisma.UsageRequestUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.UsageRequestCreateManyAccountInputEnvelope;
    set?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    disconnect?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    delete?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    connect?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    update?: Prisma.UsageRequestUpdateWithWhereUniqueWithoutAccountInput | Prisma.UsageRequestUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.UsageRequestUpdateManyWithWhereWithoutAccountInput | Prisma.UsageRequestUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.UsageRequestScalarWhereInput | Prisma.UsageRequestScalarWhereInput[];
};
export type UsageRequestCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UsageRequestCreateWithoutUserInput, Prisma.UsageRequestUncheckedCreateWithoutUserInput> | Prisma.UsageRequestCreateWithoutUserInput[] | Prisma.UsageRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UsageRequestCreateOrConnectWithoutUserInput | Prisma.UsageRequestCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UsageRequestCreateManyUserInputEnvelope;
    connect?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
};
export type UsageRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UsageRequestCreateWithoutUserInput, Prisma.UsageRequestUncheckedCreateWithoutUserInput> | Prisma.UsageRequestCreateWithoutUserInput[] | Prisma.UsageRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UsageRequestCreateOrConnectWithoutUserInput | Prisma.UsageRequestCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UsageRequestCreateManyUserInputEnvelope;
    connect?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
};
export type UsageRequestUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UsageRequestCreateWithoutUserInput, Prisma.UsageRequestUncheckedCreateWithoutUserInput> | Prisma.UsageRequestCreateWithoutUserInput[] | Prisma.UsageRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UsageRequestCreateOrConnectWithoutUserInput | Prisma.UsageRequestCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UsageRequestUpsertWithWhereUniqueWithoutUserInput | Prisma.UsageRequestUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UsageRequestCreateManyUserInputEnvelope;
    set?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    disconnect?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    delete?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    connect?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    update?: Prisma.UsageRequestUpdateWithWhereUniqueWithoutUserInput | Prisma.UsageRequestUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UsageRequestUpdateManyWithWhereWithoutUserInput | Prisma.UsageRequestUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UsageRequestScalarWhereInput | Prisma.UsageRequestScalarWhereInput[];
};
export type UsageRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UsageRequestCreateWithoutUserInput, Prisma.UsageRequestUncheckedCreateWithoutUserInput> | Prisma.UsageRequestCreateWithoutUserInput[] | Prisma.UsageRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UsageRequestCreateOrConnectWithoutUserInput | Prisma.UsageRequestCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UsageRequestUpsertWithWhereUniqueWithoutUserInput | Prisma.UsageRequestUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UsageRequestCreateManyUserInputEnvelope;
    set?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    disconnect?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    delete?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    connect?: Prisma.UsageRequestWhereUniqueInput | Prisma.UsageRequestWhereUniqueInput[];
    update?: Prisma.UsageRequestUpdateWithWhereUniqueWithoutUserInput | Prisma.UsageRequestUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UsageRequestUpdateManyWithWhereWithoutUserInput | Prisma.UsageRequestUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UsageRequestScalarWhereInput | Prisma.UsageRequestScalarWhereInput[];
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type UsageRequestCreateWithoutAccountInput = {
    requestId: string;
    requestedUnits: number;
    accepted: boolean;
    rejectionCode?: string | null;
    rejectionScope?: string | null;
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
    unitsConsumed?: number;
    processedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutUsageRequestsInput;
};
export type UsageRequestUncheckedCreateWithoutAccountInput = {
    id?: number;
    userId: number;
    requestId: string;
    requestedUnits: number;
    accepted: boolean;
    rejectionCode?: string | null;
    rejectionScope?: string | null;
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
    unitsConsumed?: number;
    processedAt?: Date | string;
};
export type UsageRequestCreateOrConnectWithoutAccountInput = {
    where: Prisma.UsageRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.UsageRequestCreateWithoutAccountInput, Prisma.UsageRequestUncheckedCreateWithoutAccountInput>;
};
export type UsageRequestCreateManyAccountInputEnvelope = {
    data: Prisma.UsageRequestCreateManyAccountInput | Prisma.UsageRequestCreateManyAccountInput[];
    skipDuplicates?: boolean;
};
export type UsageRequestUpsertWithWhereUniqueWithoutAccountInput = {
    where: Prisma.UsageRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.UsageRequestUpdateWithoutAccountInput, Prisma.UsageRequestUncheckedUpdateWithoutAccountInput>;
    create: Prisma.XOR<Prisma.UsageRequestCreateWithoutAccountInput, Prisma.UsageRequestUncheckedCreateWithoutAccountInput>;
};
export type UsageRequestUpdateWithWhereUniqueWithoutAccountInput = {
    where: Prisma.UsageRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.UsageRequestUpdateWithoutAccountInput, Prisma.UsageRequestUncheckedUpdateWithoutAccountInput>;
};
export type UsageRequestUpdateManyWithWhereWithoutAccountInput = {
    where: Prisma.UsageRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.UsageRequestUpdateManyMutationInput, Prisma.UsageRequestUncheckedUpdateManyWithoutAccountInput>;
};
export type UsageRequestScalarWhereInput = {
    AND?: Prisma.UsageRequestScalarWhereInput | Prisma.UsageRequestScalarWhereInput[];
    OR?: Prisma.UsageRequestScalarWhereInput[];
    NOT?: Prisma.UsageRequestScalarWhereInput | Prisma.UsageRequestScalarWhereInput[];
    id?: Prisma.IntFilter<"UsageRequest"> | number;
    accountId?: Prisma.IntFilter<"UsageRequest"> | number;
    userId?: Prisma.IntFilter<"UsageRequest"> | number;
    requestId?: Prisma.StringFilter<"UsageRequest"> | string;
    requestedUnits?: Prisma.IntFilter<"UsageRequest"> | number;
    accepted?: Prisma.BoolFilter<"UsageRequest"> | boolean;
    rejectionCode?: Prisma.StringNullableFilter<"UsageRequest"> | string | null;
    rejectionScope?: Prisma.StringNullableFilter<"UsageRequest"> | string | null;
    accountedYear?: Prisma.IntFilter<"UsageRequest"> | number;
    accountedMonth?: Prisma.IntFilter<"UsageRequest"> | number;
    accountPlanId?: Prisma.IntFilter<"UsageRequest"> | number;
    userPlanId?: Prisma.IntFilter<"UsageRequest"> | number;
    accountMaxPerRequest?: Prisma.IntFilter<"UsageRequest"> | number;
    userMaxPerRequest?: Prisma.IntFilter<"UsageRequest"> | number;
    accountMonthlyAllowance?: Prisma.IntFilter<"UsageRequest"> | number;
    userMonthlyAllowance?: Prisma.IntFilter<"UsageRequest"> | number;
    accountUsedBefore?: Prisma.IntFilter<"UsageRequest"> | number;
    userUsedBefore?: Prisma.IntFilter<"UsageRequest"> | number;
    accountRemainingBefore?: Prisma.IntFilter<"UsageRequest"> | number;
    userRemainingBefore?: Prisma.IntFilter<"UsageRequest"> | number;
    unitsConsumed?: Prisma.IntFilter<"UsageRequest"> | number;
    processedAt?: Prisma.DateTimeFilter<"UsageRequest"> | Date | string;
};
export type UsageRequestCreateWithoutUserInput = {
    requestId: string;
    requestedUnits: number;
    accepted: boolean;
    rejectionCode?: string | null;
    rejectionScope?: string | null;
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
    unitsConsumed?: number;
    processedAt?: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutUsageRequestsInput;
};
export type UsageRequestUncheckedCreateWithoutUserInput = {
    id?: number;
    accountId: number;
    requestId: string;
    requestedUnits: number;
    accepted: boolean;
    rejectionCode?: string | null;
    rejectionScope?: string | null;
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
    unitsConsumed?: number;
    processedAt?: Date | string;
};
export type UsageRequestCreateOrConnectWithoutUserInput = {
    where: Prisma.UsageRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.UsageRequestCreateWithoutUserInput, Prisma.UsageRequestUncheckedCreateWithoutUserInput>;
};
export type UsageRequestCreateManyUserInputEnvelope = {
    data: Prisma.UsageRequestCreateManyUserInput | Prisma.UsageRequestCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type UsageRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.UsageRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.UsageRequestUpdateWithoutUserInput, Prisma.UsageRequestUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UsageRequestCreateWithoutUserInput, Prisma.UsageRequestUncheckedCreateWithoutUserInput>;
};
export type UsageRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.UsageRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.UsageRequestUpdateWithoutUserInput, Prisma.UsageRequestUncheckedUpdateWithoutUserInput>;
};
export type UsageRequestUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.UsageRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.UsageRequestUpdateManyMutationInput, Prisma.UsageRequestUncheckedUpdateManyWithoutUserInput>;
};
export type UsageRequestCreateManyAccountInput = {
    id?: number;
    userId: number;
    requestId: string;
    requestedUnits: number;
    accepted: boolean;
    rejectionCode?: string | null;
    rejectionScope?: string | null;
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
    unitsConsumed?: number;
    processedAt?: Date | string;
};
export type UsageRequestUpdateWithoutAccountInput = {
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
    accepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    rejectionCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountedYear?: Prisma.IntFieldUpdateOperationsInput | number;
    accountedMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    accountPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    userPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    userMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    userMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    accountUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    accountRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    unitsConsumed?: Prisma.IntFieldUpdateOperationsInput | number;
    processedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutUsageRequestsNestedInput;
};
export type UsageRequestUncheckedUpdateWithoutAccountInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
    accepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    rejectionCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountedYear?: Prisma.IntFieldUpdateOperationsInput | number;
    accountedMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    accountPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    userPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    userMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    userMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    accountUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    accountRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    unitsConsumed?: Prisma.IntFieldUpdateOperationsInput | number;
    processedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UsageRequestUncheckedUpdateManyWithoutAccountInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
    accepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    rejectionCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountedYear?: Prisma.IntFieldUpdateOperationsInput | number;
    accountedMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    accountPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    userPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    userMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    userMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    accountUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    accountRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    unitsConsumed?: Prisma.IntFieldUpdateOperationsInput | number;
    processedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UsageRequestCreateManyUserInput = {
    id?: number;
    accountId: number;
    requestId: string;
    requestedUnits: number;
    accepted: boolean;
    rejectionCode?: string | null;
    rejectionScope?: string | null;
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
    unitsConsumed?: number;
    processedAt?: Date | string;
};
export type UsageRequestUpdateWithoutUserInput = {
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
    accepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    rejectionCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountedYear?: Prisma.IntFieldUpdateOperationsInput | number;
    accountedMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    accountPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    userPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    userMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    userMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    accountUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    accountRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    unitsConsumed?: Prisma.IntFieldUpdateOperationsInput | number;
    processedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutUsageRequestsNestedInput;
};
export type UsageRequestUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    accountId?: Prisma.IntFieldUpdateOperationsInput | number;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
    accepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    rejectionCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountedYear?: Prisma.IntFieldUpdateOperationsInput | number;
    accountedMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    accountPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    userPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    userMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    userMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    accountUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    accountRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    unitsConsumed?: Prisma.IntFieldUpdateOperationsInput | number;
    processedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UsageRequestUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    accountId?: Prisma.IntFieldUpdateOperationsInput | number;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
    accepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    rejectionCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountedYear?: Prisma.IntFieldUpdateOperationsInput | number;
    accountedMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    accountPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    userPlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    userMaxPerRequest?: Prisma.IntFieldUpdateOperationsInput | number;
    accountMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    userMonthlyAllowance?: Prisma.IntFieldUpdateOperationsInput | number;
    accountUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userUsedBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    accountRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    userRemainingBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    unitsConsumed?: Prisma.IntFieldUpdateOperationsInput | number;
    processedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UsageRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    userId?: boolean;
    requestId?: boolean;
    requestedUnits?: boolean;
    accepted?: boolean;
    rejectionCode?: boolean;
    rejectionScope?: boolean;
    accountedYear?: boolean;
    accountedMonth?: boolean;
    accountPlanId?: boolean;
    userPlanId?: boolean;
    accountMaxPerRequest?: boolean;
    userMaxPerRequest?: boolean;
    accountMonthlyAllowance?: boolean;
    userMonthlyAllowance?: boolean;
    accountUsedBefore?: boolean;
    userUsedBefore?: boolean;
    accountRemainingBefore?: boolean;
    userRemainingBefore?: boolean;
    unitsConsumed?: boolean;
    processedAt?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["usageRequest"]>;
export type UsageRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    userId?: boolean;
    requestId?: boolean;
    requestedUnits?: boolean;
    accepted?: boolean;
    rejectionCode?: boolean;
    rejectionScope?: boolean;
    accountedYear?: boolean;
    accountedMonth?: boolean;
    accountPlanId?: boolean;
    userPlanId?: boolean;
    accountMaxPerRequest?: boolean;
    userMaxPerRequest?: boolean;
    accountMonthlyAllowance?: boolean;
    userMonthlyAllowance?: boolean;
    accountUsedBefore?: boolean;
    userUsedBefore?: boolean;
    accountRemainingBefore?: boolean;
    userRemainingBefore?: boolean;
    unitsConsumed?: boolean;
    processedAt?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["usageRequest"]>;
export type UsageRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    userId?: boolean;
    requestId?: boolean;
    requestedUnits?: boolean;
    accepted?: boolean;
    rejectionCode?: boolean;
    rejectionScope?: boolean;
    accountedYear?: boolean;
    accountedMonth?: boolean;
    accountPlanId?: boolean;
    userPlanId?: boolean;
    accountMaxPerRequest?: boolean;
    userMaxPerRequest?: boolean;
    accountMonthlyAllowance?: boolean;
    userMonthlyAllowance?: boolean;
    accountUsedBefore?: boolean;
    userUsedBefore?: boolean;
    accountRemainingBefore?: boolean;
    userRemainingBefore?: boolean;
    unitsConsumed?: boolean;
    processedAt?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["usageRequest"]>;
export type UsageRequestSelectScalar = {
    id?: boolean;
    accountId?: boolean;
    userId?: boolean;
    requestId?: boolean;
    requestedUnits?: boolean;
    accepted?: boolean;
    rejectionCode?: boolean;
    rejectionScope?: boolean;
    accountedYear?: boolean;
    accountedMonth?: boolean;
    accountPlanId?: boolean;
    userPlanId?: boolean;
    accountMaxPerRequest?: boolean;
    userMaxPerRequest?: boolean;
    accountMonthlyAllowance?: boolean;
    userMonthlyAllowance?: boolean;
    accountUsedBefore?: boolean;
    userUsedBefore?: boolean;
    accountRemainingBefore?: boolean;
    userRemainingBefore?: boolean;
    unitsConsumed?: boolean;
    processedAt?: boolean;
};
export type UsageRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "accountId" | "userId" | "requestId" | "requestedUnits" | "accepted" | "rejectionCode" | "rejectionScope" | "accountedYear" | "accountedMonth" | "accountPlanId" | "userPlanId" | "accountMaxPerRequest" | "userMaxPerRequest" | "accountMonthlyAllowance" | "userMonthlyAllowance" | "accountUsedBefore" | "userUsedBefore" | "accountRemainingBefore" | "userRemainingBefore" | "unitsConsumed" | "processedAt", ExtArgs["result"]["usageRequest"]>;
export type UsageRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UsageRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UsageRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UsageRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UsageRequest";
    objects: {
        account: Prisma.$AccountPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        accountId: number;
        userId: number;
        requestId: string;
        requestedUnits: number;
        accepted: boolean;
        rejectionCode: string | null;
        rejectionScope: string | null;
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
        unitsConsumed: number;
        processedAt: Date;
    }, ExtArgs["result"]["usageRequest"]>;
    composites: {};
};
export type UsageRequestGetPayload<S extends boolean | null | undefined | UsageRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UsageRequestPayload, S>;
export type UsageRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UsageRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UsageRequestCountAggregateInputType | true;
};
export interface UsageRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UsageRequest'];
        meta: {
            name: 'UsageRequest';
        };
    };
    /**
     * Find zero or one UsageRequest that matches the filter.
     * @param {UsageRequestFindUniqueArgs} args - Arguments to find a UsageRequest
     * @example
     * // Get one UsageRequest
     * const usageRequest = await prisma.usageRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsageRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, UsageRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UsageRequestClient<runtime.Types.Result.GetResult<Prisma.$UsageRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one UsageRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsageRequestFindUniqueOrThrowArgs} args - Arguments to find a UsageRequest
     * @example
     * // Get one UsageRequest
     * const usageRequest = await prisma.usageRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsageRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UsageRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UsageRequestClient<runtime.Types.Result.GetResult<Prisma.$UsageRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first UsageRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageRequestFindFirstArgs} args - Arguments to find a UsageRequest
     * @example
     * // Get one UsageRequest
     * const usageRequest = await prisma.usageRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsageRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, UsageRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__UsageRequestClient<runtime.Types.Result.GetResult<Prisma.$UsageRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first UsageRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageRequestFindFirstOrThrowArgs} args - Arguments to find a UsageRequest
     * @example
     * // Get one UsageRequest
     * const usageRequest = await prisma.usageRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsageRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UsageRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UsageRequestClient<runtime.Types.Result.GetResult<Prisma.$UsageRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more UsageRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsageRequests
     * const usageRequests = await prisma.usageRequest.findMany()
     *
     * // Get first 10 UsageRequests
     * const usageRequests = await prisma.usageRequest.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const usageRequestWithIdOnly = await prisma.usageRequest.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UsageRequestFindManyArgs>(args?: Prisma.SelectSubset<T, UsageRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UsageRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a UsageRequest.
     * @param {UsageRequestCreateArgs} args - Arguments to create a UsageRequest.
     * @example
     * // Create one UsageRequest
     * const UsageRequest = await prisma.usageRequest.create({
     *   data: {
     *     // ... data to create a UsageRequest
     *   }
     * })
     *
     */
    create<T extends UsageRequestCreateArgs>(args: Prisma.SelectSubset<T, UsageRequestCreateArgs<ExtArgs>>): Prisma.Prisma__UsageRequestClient<runtime.Types.Result.GetResult<Prisma.$UsageRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many UsageRequests.
     * @param {UsageRequestCreateManyArgs} args - Arguments to create many UsageRequests.
     * @example
     * // Create many UsageRequests
     * const usageRequest = await prisma.usageRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UsageRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, UsageRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many UsageRequests and returns the data saved in the database.
     * @param {UsageRequestCreateManyAndReturnArgs} args - Arguments to create many UsageRequests.
     * @example
     * // Create many UsageRequests
     * const usageRequest = await prisma.usageRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many UsageRequests and only return the `id`
     * const usageRequestWithIdOnly = await prisma.usageRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UsageRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UsageRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UsageRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a UsageRequest.
     * @param {UsageRequestDeleteArgs} args - Arguments to delete one UsageRequest.
     * @example
     * // Delete one UsageRequest
     * const UsageRequest = await prisma.usageRequest.delete({
     *   where: {
     *     // ... filter to delete one UsageRequest
     *   }
     * })
     *
     */
    delete<T extends UsageRequestDeleteArgs>(args: Prisma.SelectSubset<T, UsageRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__UsageRequestClient<runtime.Types.Result.GetResult<Prisma.$UsageRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one UsageRequest.
     * @param {UsageRequestUpdateArgs} args - Arguments to update one UsageRequest.
     * @example
     * // Update one UsageRequest
     * const usageRequest = await prisma.usageRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UsageRequestUpdateArgs>(args: Prisma.SelectSubset<T, UsageRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__UsageRequestClient<runtime.Types.Result.GetResult<Prisma.$UsageRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more UsageRequests.
     * @param {UsageRequestDeleteManyArgs} args - Arguments to filter UsageRequests to delete.
     * @example
     * // Delete a few UsageRequests
     * const { count } = await prisma.usageRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UsageRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, UsageRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more UsageRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsageRequests
     * const usageRequest = await prisma.usageRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UsageRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, UsageRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more UsageRequests and returns the data updated in the database.
     * @param {UsageRequestUpdateManyAndReturnArgs} args - Arguments to update many UsageRequests.
     * @example
     * // Update many UsageRequests
     * const usageRequest = await prisma.usageRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more UsageRequests and only return the `id`
     * const usageRequestWithIdOnly = await prisma.usageRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UsageRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UsageRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UsageRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one UsageRequest.
     * @param {UsageRequestUpsertArgs} args - Arguments to update or create a UsageRequest.
     * @example
     * // Update or create a UsageRequest
     * const usageRequest = await prisma.usageRequest.upsert({
     *   create: {
     *     // ... data to create a UsageRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsageRequest we want to update
     *   }
     * })
     */
    upsert<T extends UsageRequestUpsertArgs>(args: Prisma.SelectSubset<T, UsageRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__UsageRequestClient<runtime.Types.Result.GetResult<Prisma.$UsageRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of UsageRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageRequestCountArgs} args - Arguments to filter UsageRequests to count.
     * @example
     * // Count the number of UsageRequests
     * const count = await prisma.usageRequest.count({
     *   where: {
     *     // ... the filter for the UsageRequests we want to count
     *   }
     * })
    **/
    count<T extends UsageRequestCountArgs>(args?: Prisma.Subset<T, UsageRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UsageRequestCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a UsageRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsageRequestAggregateArgs>(args: Prisma.Subset<T, UsageRequestAggregateArgs>): Prisma.PrismaPromise<GetUsageRequestAggregateType<T>>;
    /**
     * Group by UsageRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends UsageRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UsageRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: UsageRequestGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UsageRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsageRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the UsageRequest model
     */
    readonly fields: UsageRequestFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for UsageRequest.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UsageRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    account<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the UsageRequest model
 */
export interface UsageRequestFieldRefs {
    readonly id: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly accountId: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly userId: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly requestId: Prisma.FieldRef<"UsageRequest", 'String'>;
    readonly requestedUnits: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly accepted: Prisma.FieldRef<"UsageRequest", 'Boolean'>;
    readonly rejectionCode: Prisma.FieldRef<"UsageRequest", 'String'>;
    readonly rejectionScope: Prisma.FieldRef<"UsageRequest", 'String'>;
    readonly accountedYear: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly accountedMonth: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly accountPlanId: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly userPlanId: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly accountMaxPerRequest: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly userMaxPerRequest: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly accountMonthlyAllowance: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly userMonthlyAllowance: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly accountUsedBefore: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly userUsedBefore: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly accountRemainingBefore: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly userRemainingBefore: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly unitsConsumed: Prisma.FieldRef<"UsageRequest", 'Int'>;
    readonly processedAt: Prisma.FieldRef<"UsageRequest", 'DateTime'>;
}
/**
 * UsageRequest findUnique
 */
export type UsageRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRequest
     */
    select?: Prisma.UsageRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UsageRequest
     */
    omit?: Prisma.UsageRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UsageRequestInclude<ExtArgs> | null;
    /**
     * Filter, which UsageRequest to fetch.
     */
    where: Prisma.UsageRequestWhereUniqueInput;
};
/**
 * UsageRequest findUniqueOrThrow
 */
export type UsageRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRequest
     */
    select?: Prisma.UsageRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UsageRequest
     */
    omit?: Prisma.UsageRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UsageRequestInclude<ExtArgs> | null;
    /**
     * Filter, which UsageRequest to fetch.
     */
    where: Prisma.UsageRequestWhereUniqueInput;
};
/**
 * UsageRequest findFirst
 */
export type UsageRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRequest
     */
    select?: Prisma.UsageRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UsageRequest
     */
    omit?: Prisma.UsageRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UsageRequestInclude<ExtArgs> | null;
    /**
     * Filter, which UsageRequest to fetch.
     */
    where?: Prisma.UsageRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UsageRequests to fetch.
     */
    orderBy?: Prisma.UsageRequestOrderByWithRelationInput | Prisma.UsageRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UsageRequests.
     */
    cursor?: Prisma.UsageRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UsageRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UsageRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UsageRequests.
     */
    distinct?: Prisma.UsageRequestScalarFieldEnum | Prisma.UsageRequestScalarFieldEnum[];
};
/**
 * UsageRequest findFirstOrThrow
 */
export type UsageRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRequest
     */
    select?: Prisma.UsageRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UsageRequest
     */
    omit?: Prisma.UsageRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UsageRequestInclude<ExtArgs> | null;
    /**
     * Filter, which UsageRequest to fetch.
     */
    where?: Prisma.UsageRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UsageRequests to fetch.
     */
    orderBy?: Prisma.UsageRequestOrderByWithRelationInput | Prisma.UsageRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UsageRequests.
     */
    cursor?: Prisma.UsageRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UsageRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UsageRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UsageRequests.
     */
    distinct?: Prisma.UsageRequestScalarFieldEnum | Prisma.UsageRequestScalarFieldEnum[];
};
/**
 * UsageRequest findMany
 */
export type UsageRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRequest
     */
    select?: Prisma.UsageRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UsageRequest
     */
    omit?: Prisma.UsageRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UsageRequestInclude<ExtArgs> | null;
    /**
     * Filter, which UsageRequests to fetch.
     */
    where?: Prisma.UsageRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UsageRequests to fetch.
     */
    orderBy?: Prisma.UsageRequestOrderByWithRelationInput | Prisma.UsageRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing UsageRequests.
     */
    cursor?: Prisma.UsageRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UsageRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UsageRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UsageRequests.
     */
    distinct?: Prisma.UsageRequestScalarFieldEnum | Prisma.UsageRequestScalarFieldEnum[];
};
/**
 * UsageRequest create
 */
export type UsageRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRequest
     */
    select?: Prisma.UsageRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UsageRequest
     */
    omit?: Prisma.UsageRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UsageRequestInclude<ExtArgs> | null;
    /**
     * The data needed to create a UsageRequest.
     */
    data: Prisma.XOR<Prisma.UsageRequestCreateInput, Prisma.UsageRequestUncheckedCreateInput>;
};
/**
 * UsageRequest createMany
 */
export type UsageRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsageRequests.
     */
    data: Prisma.UsageRequestCreateManyInput | Prisma.UsageRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * UsageRequest createManyAndReturn
 */
export type UsageRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRequest
     */
    select?: Prisma.UsageRequestSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UsageRequest
     */
    omit?: Prisma.UsageRequestOmit<ExtArgs> | null;
    /**
     * The data used to create many UsageRequests.
     */
    data: Prisma.UsageRequestCreateManyInput | Prisma.UsageRequestCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UsageRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * UsageRequest update
 */
export type UsageRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRequest
     */
    select?: Prisma.UsageRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UsageRequest
     */
    omit?: Prisma.UsageRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UsageRequestInclude<ExtArgs> | null;
    /**
     * The data needed to update a UsageRequest.
     */
    data: Prisma.XOR<Prisma.UsageRequestUpdateInput, Prisma.UsageRequestUncheckedUpdateInput>;
    /**
     * Choose, which UsageRequest to update.
     */
    where: Prisma.UsageRequestWhereUniqueInput;
};
/**
 * UsageRequest updateMany
 */
export type UsageRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update UsageRequests.
     */
    data: Prisma.XOR<Prisma.UsageRequestUpdateManyMutationInput, Prisma.UsageRequestUncheckedUpdateManyInput>;
    /**
     * Filter which UsageRequests to update
     */
    where?: Prisma.UsageRequestWhereInput;
    /**
     * Limit how many UsageRequests to update.
     */
    limit?: number;
};
/**
 * UsageRequest updateManyAndReturn
 */
export type UsageRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRequest
     */
    select?: Prisma.UsageRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UsageRequest
     */
    omit?: Prisma.UsageRequestOmit<ExtArgs> | null;
    /**
     * The data used to update UsageRequests.
     */
    data: Prisma.XOR<Prisma.UsageRequestUpdateManyMutationInput, Prisma.UsageRequestUncheckedUpdateManyInput>;
    /**
     * Filter which UsageRequests to update
     */
    where?: Prisma.UsageRequestWhereInput;
    /**
     * Limit how many UsageRequests to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UsageRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * UsageRequest upsert
 */
export type UsageRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRequest
     */
    select?: Prisma.UsageRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UsageRequest
     */
    omit?: Prisma.UsageRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UsageRequestInclude<ExtArgs> | null;
    /**
     * The filter to search for the UsageRequest to update in case it exists.
     */
    where: Prisma.UsageRequestWhereUniqueInput;
    /**
     * In case the UsageRequest found by the `where` argument doesn't exist, create a new UsageRequest with this data.
     */
    create: Prisma.XOR<Prisma.UsageRequestCreateInput, Prisma.UsageRequestUncheckedCreateInput>;
    /**
     * In case the UsageRequest was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UsageRequestUpdateInput, Prisma.UsageRequestUncheckedUpdateInput>;
};
/**
 * UsageRequest delete
 */
export type UsageRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRequest
     */
    select?: Prisma.UsageRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UsageRequest
     */
    omit?: Prisma.UsageRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UsageRequestInclude<ExtArgs> | null;
    /**
     * Filter which UsageRequest to delete.
     */
    where: Prisma.UsageRequestWhereUniqueInput;
};
/**
 * UsageRequest deleteMany
 */
export type UsageRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UsageRequests to delete
     */
    where?: Prisma.UsageRequestWhereInput;
    /**
     * Limit how many UsageRequests to delete.
     */
    limit?: number;
};
/**
 * UsageRequest without action
 */
export type UsageRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRequest
     */
    select?: Prisma.UsageRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UsageRequest
     */
    omit?: Prisma.UsageRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UsageRequestInclude<ExtArgs> | null;
};
//# sourceMappingURL=UsageRequest.d.ts.map
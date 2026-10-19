import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model AccountUsage
 *
 */
export type AccountUsageModel = runtime.Types.Result.DefaultSelection<Prisma.$AccountUsagePayload>;
export type AggregateAccountUsage = {
    _count: AccountUsageCountAggregateOutputType | null;
    _avg: AccountUsageAvgAggregateOutputType | null;
    _sum: AccountUsageSumAggregateOutputType | null;
    _min: AccountUsageMinAggregateOutputType | null;
    _max: AccountUsageMaxAggregateOutputType | null;
};
export type AccountUsageAvgAggregateOutputType = {
    id: number | null;
    accountId: number | null;
    year: number | null;
    month: number | null;
    consumedUnits: number | null;
};
export type AccountUsageSumAggregateOutputType = {
    id: number | null;
    accountId: number | null;
    year: number | null;
    month: number | null;
    consumedUnits: number | null;
};
export type AccountUsageMinAggregateOutputType = {
    id: number | null;
    accountId: number | null;
    year: number | null;
    month: number | null;
    consumedUnits: number | null;
};
export type AccountUsageMaxAggregateOutputType = {
    id: number | null;
    accountId: number | null;
    year: number | null;
    month: number | null;
    consumedUnits: number | null;
};
export type AccountUsageCountAggregateOutputType = {
    id: number;
    accountId: number;
    year: number;
    month: number;
    consumedUnits: number;
    _all: number;
};
export type AccountUsageAvgAggregateInputType = {
    id?: true;
    accountId?: true;
    year?: true;
    month?: true;
    consumedUnits?: true;
};
export type AccountUsageSumAggregateInputType = {
    id?: true;
    accountId?: true;
    year?: true;
    month?: true;
    consumedUnits?: true;
};
export type AccountUsageMinAggregateInputType = {
    id?: true;
    accountId?: true;
    year?: true;
    month?: true;
    consumedUnits?: true;
};
export type AccountUsageMaxAggregateInputType = {
    id?: true;
    accountId?: true;
    year?: true;
    month?: true;
    consumedUnits?: true;
};
export type AccountUsageCountAggregateInputType = {
    id?: true;
    accountId?: true;
    year?: true;
    month?: true;
    consumedUnits?: true;
    _all?: true;
};
export type AccountUsageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AccountUsage to aggregate.
     */
    where?: Prisma.AccountUsageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AccountUsages to fetch.
     */
    orderBy?: Prisma.AccountUsageOrderByWithRelationInput | Prisma.AccountUsageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.AccountUsageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AccountUsages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AccountUsages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned AccountUsages
    **/
    _count?: true | AccountUsageCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: AccountUsageAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: AccountUsageSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AccountUsageMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AccountUsageMaxAggregateInputType;
};
export type GetAccountUsageAggregateType<T extends AccountUsageAggregateArgs> = {
    [P in keyof T & keyof AggregateAccountUsage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAccountUsage[P]> : Prisma.GetScalarType<T[P], AggregateAccountUsage[P]>;
};
export type AccountUsageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AccountUsageWhereInput;
    orderBy?: Prisma.AccountUsageOrderByWithAggregationInput | Prisma.AccountUsageOrderByWithAggregationInput[];
    by: Prisma.AccountUsageScalarFieldEnum[] | Prisma.AccountUsageScalarFieldEnum;
    having?: Prisma.AccountUsageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AccountUsageCountAggregateInputType | true;
    _avg?: AccountUsageAvgAggregateInputType;
    _sum?: AccountUsageSumAggregateInputType;
    _min?: AccountUsageMinAggregateInputType;
    _max?: AccountUsageMaxAggregateInputType;
};
export type AccountUsageGroupByOutputType = {
    id: number;
    accountId: number;
    year: number;
    month: number;
    consumedUnits: number;
    _count: AccountUsageCountAggregateOutputType | null;
    _avg: AccountUsageAvgAggregateOutputType | null;
    _sum: AccountUsageSumAggregateOutputType | null;
    _min: AccountUsageMinAggregateOutputType | null;
    _max: AccountUsageMaxAggregateOutputType | null;
};
export type GetAccountUsageGroupByPayload<T extends AccountUsageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AccountUsageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AccountUsageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AccountUsageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AccountUsageGroupByOutputType[P]>;
}>>;
export type AccountUsageWhereInput = {
    AND?: Prisma.AccountUsageWhereInput | Prisma.AccountUsageWhereInput[];
    OR?: Prisma.AccountUsageWhereInput[];
    NOT?: Prisma.AccountUsageWhereInput | Prisma.AccountUsageWhereInput[];
    id?: Prisma.IntFilter<"AccountUsage"> | number;
    accountId?: Prisma.IntFilter<"AccountUsage"> | number;
    year?: Prisma.IntFilter<"AccountUsage"> | number;
    month?: Prisma.IntFilter<"AccountUsage"> | number;
    consumedUnits?: Prisma.IntFilter<"AccountUsage"> | number;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
};
export type AccountUsageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    consumedUnits?: Prisma.SortOrder;
    account?: Prisma.AccountOrderByWithRelationInput;
};
export type AccountUsageWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    accountId_year_month?: Prisma.AccountUsageAccountIdYearMonthCompoundUniqueInput;
    AND?: Prisma.AccountUsageWhereInput | Prisma.AccountUsageWhereInput[];
    OR?: Prisma.AccountUsageWhereInput[];
    NOT?: Prisma.AccountUsageWhereInput | Prisma.AccountUsageWhereInput[];
    accountId?: Prisma.IntFilter<"AccountUsage"> | number;
    year?: Prisma.IntFilter<"AccountUsage"> | number;
    month?: Prisma.IntFilter<"AccountUsage"> | number;
    consumedUnits?: Prisma.IntFilter<"AccountUsage"> | number;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
}, "id" | "accountId_year_month">;
export type AccountUsageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    consumedUnits?: Prisma.SortOrder;
    _count?: Prisma.AccountUsageCountOrderByAggregateInput;
    _avg?: Prisma.AccountUsageAvgOrderByAggregateInput;
    _max?: Prisma.AccountUsageMaxOrderByAggregateInput;
    _min?: Prisma.AccountUsageMinOrderByAggregateInput;
    _sum?: Prisma.AccountUsageSumOrderByAggregateInput;
};
export type AccountUsageScalarWhereWithAggregatesInput = {
    AND?: Prisma.AccountUsageScalarWhereWithAggregatesInput | Prisma.AccountUsageScalarWhereWithAggregatesInput[];
    OR?: Prisma.AccountUsageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AccountUsageScalarWhereWithAggregatesInput | Prisma.AccountUsageScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"AccountUsage"> | number;
    accountId?: Prisma.IntWithAggregatesFilter<"AccountUsage"> | number;
    year?: Prisma.IntWithAggregatesFilter<"AccountUsage"> | number;
    month?: Prisma.IntWithAggregatesFilter<"AccountUsage"> | number;
    consumedUnits?: Prisma.IntWithAggregatesFilter<"AccountUsage"> | number;
};
export type AccountUsageCreateInput = {
    year: number;
    month: number;
    consumedUnits?: number;
    account: Prisma.AccountCreateNestedOneWithoutAccountUsageInput;
};
export type AccountUsageUncheckedCreateInput = {
    id?: number;
    accountId: number;
    year: number;
    month: number;
    consumedUnits?: number;
};
export type AccountUsageUpdateInput = {
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    consumedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
    account?: Prisma.AccountUpdateOneRequiredWithoutAccountUsageNestedInput;
};
export type AccountUsageUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    accountId?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    consumedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AccountUsageCreateManyInput = {
    id?: number;
    accountId: number;
    year: number;
    month: number;
    consumedUnits?: number;
};
export type AccountUsageUpdateManyMutationInput = {
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    consumedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AccountUsageUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    accountId?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    consumedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AccountUsageListRelationFilter = {
    every?: Prisma.AccountUsageWhereInput;
    some?: Prisma.AccountUsageWhereInput;
    none?: Prisma.AccountUsageWhereInput;
};
export type AccountUsageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AccountUsageAccountIdYearMonthCompoundUniqueInput = {
    accountId: number;
    year: number;
    month: number;
};
export type AccountUsageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    consumedUnits?: Prisma.SortOrder;
};
export type AccountUsageAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    consumedUnits?: Prisma.SortOrder;
};
export type AccountUsageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    consumedUnits?: Prisma.SortOrder;
};
export type AccountUsageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    consumedUnits?: Prisma.SortOrder;
};
export type AccountUsageSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    consumedUnits?: Prisma.SortOrder;
};
export type AccountUsageCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.AccountUsageCreateWithoutAccountInput, Prisma.AccountUsageUncheckedCreateWithoutAccountInput> | Prisma.AccountUsageCreateWithoutAccountInput[] | Prisma.AccountUsageUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.AccountUsageCreateOrConnectWithoutAccountInput | Prisma.AccountUsageCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.AccountUsageCreateManyAccountInputEnvelope;
    connect?: Prisma.AccountUsageWhereUniqueInput | Prisma.AccountUsageWhereUniqueInput[];
};
export type AccountUsageUncheckedCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.AccountUsageCreateWithoutAccountInput, Prisma.AccountUsageUncheckedCreateWithoutAccountInput> | Prisma.AccountUsageCreateWithoutAccountInput[] | Prisma.AccountUsageUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.AccountUsageCreateOrConnectWithoutAccountInput | Prisma.AccountUsageCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.AccountUsageCreateManyAccountInputEnvelope;
    connect?: Prisma.AccountUsageWhereUniqueInput | Prisma.AccountUsageWhereUniqueInput[];
};
export type AccountUsageUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.AccountUsageCreateWithoutAccountInput, Prisma.AccountUsageUncheckedCreateWithoutAccountInput> | Prisma.AccountUsageCreateWithoutAccountInput[] | Prisma.AccountUsageUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.AccountUsageCreateOrConnectWithoutAccountInput | Prisma.AccountUsageCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.AccountUsageUpsertWithWhereUniqueWithoutAccountInput | Prisma.AccountUsageUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.AccountUsageCreateManyAccountInputEnvelope;
    set?: Prisma.AccountUsageWhereUniqueInput | Prisma.AccountUsageWhereUniqueInput[];
    disconnect?: Prisma.AccountUsageWhereUniqueInput | Prisma.AccountUsageWhereUniqueInput[];
    delete?: Prisma.AccountUsageWhereUniqueInput | Prisma.AccountUsageWhereUniqueInput[];
    connect?: Prisma.AccountUsageWhereUniqueInput | Prisma.AccountUsageWhereUniqueInput[];
    update?: Prisma.AccountUsageUpdateWithWhereUniqueWithoutAccountInput | Prisma.AccountUsageUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.AccountUsageUpdateManyWithWhereWithoutAccountInput | Prisma.AccountUsageUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.AccountUsageScalarWhereInput | Prisma.AccountUsageScalarWhereInput[];
};
export type AccountUsageUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.AccountUsageCreateWithoutAccountInput, Prisma.AccountUsageUncheckedCreateWithoutAccountInput> | Prisma.AccountUsageCreateWithoutAccountInput[] | Prisma.AccountUsageUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.AccountUsageCreateOrConnectWithoutAccountInput | Prisma.AccountUsageCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.AccountUsageUpsertWithWhereUniqueWithoutAccountInput | Prisma.AccountUsageUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.AccountUsageCreateManyAccountInputEnvelope;
    set?: Prisma.AccountUsageWhereUniqueInput | Prisma.AccountUsageWhereUniqueInput[];
    disconnect?: Prisma.AccountUsageWhereUniqueInput | Prisma.AccountUsageWhereUniqueInput[];
    delete?: Prisma.AccountUsageWhereUniqueInput | Prisma.AccountUsageWhereUniqueInput[];
    connect?: Prisma.AccountUsageWhereUniqueInput | Prisma.AccountUsageWhereUniqueInput[];
    update?: Prisma.AccountUsageUpdateWithWhereUniqueWithoutAccountInput | Prisma.AccountUsageUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.AccountUsageUpdateManyWithWhereWithoutAccountInput | Prisma.AccountUsageUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.AccountUsageScalarWhereInput | Prisma.AccountUsageScalarWhereInput[];
};
export type AccountUsageCreateWithoutAccountInput = {
    year: number;
    month: number;
    consumedUnits?: number;
};
export type AccountUsageUncheckedCreateWithoutAccountInput = {
    id?: number;
    year: number;
    month: number;
    consumedUnits?: number;
};
export type AccountUsageCreateOrConnectWithoutAccountInput = {
    where: Prisma.AccountUsageWhereUniqueInput;
    create: Prisma.XOR<Prisma.AccountUsageCreateWithoutAccountInput, Prisma.AccountUsageUncheckedCreateWithoutAccountInput>;
};
export type AccountUsageCreateManyAccountInputEnvelope = {
    data: Prisma.AccountUsageCreateManyAccountInput | Prisma.AccountUsageCreateManyAccountInput[];
    skipDuplicates?: boolean;
};
export type AccountUsageUpsertWithWhereUniqueWithoutAccountInput = {
    where: Prisma.AccountUsageWhereUniqueInput;
    update: Prisma.XOR<Prisma.AccountUsageUpdateWithoutAccountInput, Prisma.AccountUsageUncheckedUpdateWithoutAccountInput>;
    create: Prisma.XOR<Prisma.AccountUsageCreateWithoutAccountInput, Prisma.AccountUsageUncheckedCreateWithoutAccountInput>;
};
export type AccountUsageUpdateWithWhereUniqueWithoutAccountInput = {
    where: Prisma.AccountUsageWhereUniqueInput;
    data: Prisma.XOR<Prisma.AccountUsageUpdateWithoutAccountInput, Prisma.AccountUsageUncheckedUpdateWithoutAccountInput>;
};
export type AccountUsageUpdateManyWithWhereWithoutAccountInput = {
    where: Prisma.AccountUsageScalarWhereInput;
    data: Prisma.XOR<Prisma.AccountUsageUpdateManyMutationInput, Prisma.AccountUsageUncheckedUpdateManyWithoutAccountInput>;
};
export type AccountUsageScalarWhereInput = {
    AND?: Prisma.AccountUsageScalarWhereInput | Prisma.AccountUsageScalarWhereInput[];
    OR?: Prisma.AccountUsageScalarWhereInput[];
    NOT?: Prisma.AccountUsageScalarWhereInput | Prisma.AccountUsageScalarWhereInput[];
    id?: Prisma.IntFilter<"AccountUsage"> | number;
    accountId?: Prisma.IntFilter<"AccountUsage"> | number;
    year?: Prisma.IntFilter<"AccountUsage"> | number;
    month?: Prisma.IntFilter<"AccountUsage"> | number;
    consumedUnits?: Prisma.IntFilter<"AccountUsage"> | number;
};
export type AccountUsageCreateManyAccountInput = {
    id?: number;
    year: number;
    month: number;
    consumedUnits?: number;
};
export type AccountUsageUpdateWithoutAccountInput = {
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    consumedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AccountUsageUncheckedUpdateWithoutAccountInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    consumedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AccountUsageUncheckedUpdateManyWithoutAccountInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    consumedUnits?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AccountUsageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    year?: boolean;
    month?: boolean;
    consumedUnits?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["accountUsage"]>;
export type AccountUsageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    year?: boolean;
    month?: boolean;
    consumedUnits?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["accountUsage"]>;
export type AccountUsageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    year?: boolean;
    month?: boolean;
    consumedUnits?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["accountUsage"]>;
export type AccountUsageSelectScalar = {
    id?: boolean;
    accountId?: boolean;
    year?: boolean;
    month?: boolean;
    consumedUnits?: boolean;
};
export type AccountUsageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "accountId" | "year" | "month" | "consumedUnits", ExtArgs["result"]["accountUsage"]>;
export type AccountUsageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
};
export type AccountUsageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
};
export type AccountUsageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
};
export type $AccountUsagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AccountUsage";
    objects: {
        account: Prisma.$AccountPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        accountId: number;
        year: number;
        month: number;
        consumedUnits: number;
    }, ExtArgs["result"]["accountUsage"]>;
    composites: {};
};
export type AccountUsageGetPayload<S extends boolean | null | undefined | AccountUsageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AccountUsagePayload, S>;
export type AccountUsageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AccountUsageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AccountUsageCountAggregateInputType | true;
};
export interface AccountUsageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AccountUsage'];
        meta: {
            name: 'AccountUsage';
        };
    };
    /**
     * Find zero or one AccountUsage that matches the filter.
     * @param {AccountUsageFindUniqueArgs} args - Arguments to find a AccountUsage
     * @example
     * // Get one AccountUsage
     * const accountUsage = await prisma.accountUsage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountUsageFindUniqueArgs>(args: Prisma.SelectSubset<T, AccountUsageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AccountUsageClient<runtime.Types.Result.GetResult<Prisma.$AccountUsagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one AccountUsage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountUsageFindUniqueOrThrowArgs} args - Arguments to find a AccountUsage
     * @example
     * // Get one AccountUsage
     * const accountUsage = await prisma.accountUsage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountUsageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AccountUsageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AccountUsageClient<runtime.Types.Result.GetResult<Prisma.$AccountUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AccountUsage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUsageFindFirstArgs} args - Arguments to find a AccountUsage
     * @example
     * // Get one AccountUsage
     * const accountUsage = await prisma.accountUsage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountUsageFindFirstArgs>(args?: Prisma.SelectSubset<T, AccountUsageFindFirstArgs<ExtArgs>>): Prisma.Prisma__AccountUsageClient<runtime.Types.Result.GetResult<Prisma.$AccountUsagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AccountUsage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUsageFindFirstOrThrowArgs} args - Arguments to find a AccountUsage
     * @example
     * // Get one AccountUsage
     * const accountUsage = await prisma.accountUsage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountUsageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AccountUsageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AccountUsageClient<runtime.Types.Result.GetResult<Prisma.$AccountUsagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more AccountUsages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUsageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccountUsages
     * const accountUsages = await prisma.accountUsage.findMany()
     *
     * // Get first 10 AccountUsages
     * const accountUsages = await prisma.accountUsage.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const accountUsageWithIdOnly = await prisma.accountUsage.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AccountUsageFindManyArgs>(args?: Prisma.SelectSubset<T, AccountUsageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a AccountUsage.
     * @param {AccountUsageCreateArgs} args - Arguments to create a AccountUsage.
     * @example
     * // Create one AccountUsage
     * const AccountUsage = await prisma.accountUsage.create({
     *   data: {
     *     // ... data to create a AccountUsage
     *   }
     * })
     *
     */
    create<T extends AccountUsageCreateArgs>(args: Prisma.SelectSubset<T, AccountUsageCreateArgs<ExtArgs>>): Prisma.Prisma__AccountUsageClient<runtime.Types.Result.GetResult<Prisma.$AccountUsagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many AccountUsages.
     * @param {AccountUsageCreateManyArgs} args - Arguments to create many AccountUsages.
     * @example
     * // Create many AccountUsages
     * const accountUsage = await prisma.accountUsage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AccountUsageCreateManyArgs>(args?: Prisma.SelectSubset<T, AccountUsageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many AccountUsages and returns the data saved in the database.
     * @param {AccountUsageCreateManyAndReturnArgs} args - Arguments to create many AccountUsages.
     * @example
     * // Create many AccountUsages
     * const accountUsage = await prisma.accountUsage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AccountUsages and only return the `id`
     * const accountUsageWithIdOnly = await prisma.accountUsage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AccountUsageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AccountUsageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountUsagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a AccountUsage.
     * @param {AccountUsageDeleteArgs} args - Arguments to delete one AccountUsage.
     * @example
     * // Delete one AccountUsage
     * const AccountUsage = await prisma.accountUsage.delete({
     *   where: {
     *     // ... filter to delete one AccountUsage
     *   }
     * })
     *
     */
    delete<T extends AccountUsageDeleteArgs>(args: Prisma.SelectSubset<T, AccountUsageDeleteArgs<ExtArgs>>): Prisma.Prisma__AccountUsageClient<runtime.Types.Result.GetResult<Prisma.$AccountUsagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one AccountUsage.
     * @param {AccountUsageUpdateArgs} args - Arguments to update one AccountUsage.
     * @example
     * // Update one AccountUsage
     * const accountUsage = await prisma.accountUsage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AccountUsageUpdateArgs>(args: Prisma.SelectSubset<T, AccountUsageUpdateArgs<ExtArgs>>): Prisma.Prisma__AccountUsageClient<runtime.Types.Result.GetResult<Prisma.$AccountUsagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more AccountUsages.
     * @param {AccountUsageDeleteManyArgs} args - Arguments to filter AccountUsages to delete.
     * @example
     * // Delete a few AccountUsages
     * const { count } = await prisma.accountUsage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AccountUsageDeleteManyArgs>(args?: Prisma.SelectSubset<T, AccountUsageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AccountUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUsageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccountUsages
     * const accountUsage = await prisma.accountUsage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AccountUsageUpdateManyArgs>(args: Prisma.SelectSubset<T, AccountUsageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AccountUsages and returns the data updated in the database.
     * @param {AccountUsageUpdateManyAndReturnArgs} args - Arguments to update many AccountUsages.
     * @example
     * // Update many AccountUsages
     * const accountUsage = await prisma.accountUsage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more AccountUsages and only return the `id`
     * const accountUsageWithIdOnly = await prisma.accountUsage.updateManyAndReturn({
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
    updateManyAndReturn<T extends AccountUsageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AccountUsageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountUsagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one AccountUsage.
     * @param {AccountUsageUpsertArgs} args - Arguments to update or create a AccountUsage.
     * @example
     * // Update or create a AccountUsage
     * const accountUsage = await prisma.accountUsage.upsert({
     *   create: {
     *     // ... data to create a AccountUsage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccountUsage we want to update
     *   }
     * })
     */
    upsert<T extends AccountUsageUpsertArgs>(args: Prisma.SelectSubset<T, AccountUsageUpsertArgs<ExtArgs>>): Prisma.Prisma__AccountUsageClient<runtime.Types.Result.GetResult<Prisma.$AccountUsagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of AccountUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUsageCountArgs} args - Arguments to filter AccountUsages to count.
     * @example
     * // Count the number of AccountUsages
     * const count = await prisma.accountUsage.count({
     *   where: {
     *     // ... the filter for the AccountUsages we want to count
     *   }
     * })
    **/
    count<T extends AccountUsageCountArgs>(args?: Prisma.Subset<T, AccountUsageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AccountUsageCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a AccountUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUsageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountUsageAggregateArgs>(args: Prisma.Subset<T, AccountUsageAggregateArgs>): Prisma.PrismaPromise<GetAccountUsageAggregateType<T>>;
    /**
     * Group by AccountUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUsageGroupByArgs} args - Group by arguments.
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
    groupBy<T extends AccountUsageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AccountUsageGroupByArgs['orderBy'];
    } : {
        orderBy?: AccountUsageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AccountUsageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountUsageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the AccountUsage model
     */
    readonly fields: AccountUsageFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for AccountUsage.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__AccountUsageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    account<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the AccountUsage model
 */
export interface AccountUsageFieldRefs {
    readonly id: Prisma.FieldRef<"AccountUsage", 'Int'>;
    readonly accountId: Prisma.FieldRef<"AccountUsage", 'Int'>;
    readonly year: Prisma.FieldRef<"AccountUsage", 'Int'>;
    readonly month: Prisma.FieldRef<"AccountUsage", 'Int'>;
    readonly consumedUnits: Prisma.FieldRef<"AccountUsage", 'Int'>;
}
/**
 * AccountUsage findUnique
 */
export type AccountUsageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUsage
     */
    select?: Prisma.AccountUsageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AccountUsage
     */
    omit?: Prisma.AccountUsageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AccountUsageInclude<ExtArgs> | null;
    /**
     * Filter, which AccountUsage to fetch.
     */
    where: Prisma.AccountUsageWhereUniqueInput;
};
/**
 * AccountUsage findUniqueOrThrow
 */
export type AccountUsageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUsage
     */
    select?: Prisma.AccountUsageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AccountUsage
     */
    omit?: Prisma.AccountUsageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AccountUsageInclude<ExtArgs> | null;
    /**
     * Filter, which AccountUsage to fetch.
     */
    where: Prisma.AccountUsageWhereUniqueInput;
};
/**
 * AccountUsage findFirst
 */
export type AccountUsageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUsage
     */
    select?: Prisma.AccountUsageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AccountUsage
     */
    omit?: Prisma.AccountUsageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AccountUsageInclude<ExtArgs> | null;
    /**
     * Filter, which AccountUsage to fetch.
     */
    where?: Prisma.AccountUsageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AccountUsages to fetch.
     */
    orderBy?: Prisma.AccountUsageOrderByWithRelationInput | Prisma.AccountUsageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AccountUsages.
     */
    cursor?: Prisma.AccountUsageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AccountUsages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AccountUsages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AccountUsages.
     */
    distinct?: Prisma.AccountUsageScalarFieldEnum | Prisma.AccountUsageScalarFieldEnum[];
};
/**
 * AccountUsage findFirstOrThrow
 */
export type AccountUsageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUsage
     */
    select?: Prisma.AccountUsageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AccountUsage
     */
    omit?: Prisma.AccountUsageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AccountUsageInclude<ExtArgs> | null;
    /**
     * Filter, which AccountUsage to fetch.
     */
    where?: Prisma.AccountUsageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AccountUsages to fetch.
     */
    orderBy?: Prisma.AccountUsageOrderByWithRelationInput | Prisma.AccountUsageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AccountUsages.
     */
    cursor?: Prisma.AccountUsageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AccountUsages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AccountUsages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AccountUsages.
     */
    distinct?: Prisma.AccountUsageScalarFieldEnum | Prisma.AccountUsageScalarFieldEnum[];
};
/**
 * AccountUsage findMany
 */
export type AccountUsageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUsage
     */
    select?: Prisma.AccountUsageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AccountUsage
     */
    omit?: Prisma.AccountUsageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AccountUsageInclude<ExtArgs> | null;
    /**
     * Filter, which AccountUsages to fetch.
     */
    where?: Prisma.AccountUsageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AccountUsages to fetch.
     */
    orderBy?: Prisma.AccountUsageOrderByWithRelationInput | Prisma.AccountUsageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing AccountUsages.
     */
    cursor?: Prisma.AccountUsageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AccountUsages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AccountUsages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AccountUsages.
     */
    distinct?: Prisma.AccountUsageScalarFieldEnum | Prisma.AccountUsageScalarFieldEnum[];
};
/**
 * AccountUsage create
 */
export type AccountUsageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUsage
     */
    select?: Prisma.AccountUsageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AccountUsage
     */
    omit?: Prisma.AccountUsageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AccountUsageInclude<ExtArgs> | null;
    /**
     * The data needed to create a AccountUsage.
     */
    data: Prisma.XOR<Prisma.AccountUsageCreateInput, Prisma.AccountUsageUncheckedCreateInput>;
};
/**
 * AccountUsage createMany
 */
export type AccountUsageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many AccountUsages.
     */
    data: Prisma.AccountUsageCreateManyInput | Prisma.AccountUsageCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * AccountUsage createManyAndReturn
 */
export type AccountUsageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUsage
     */
    select?: Prisma.AccountUsageSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AccountUsage
     */
    omit?: Prisma.AccountUsageOmit<ExtArgs> | null;
    /**
     * The data used to create many AccountUsages.
     */
    data: Prisma.AccountUsageCreateManyInput | Prisma.AccountUsageCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AccountUsageIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * AccountUsage update
 */
export type AccountUsageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUsage
     */
    select?: Prisma.AccountUsageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AccountUsage
     */
    omit?: Prisma.AccountUsageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AccountUsageInclude<ExtArgs> | null;
    /**
     * The data needed to update a AccountUsage.
     */
    data: Prisma.XOR<Prisma.AccountUsageUpdateInput, Prisma.AccountUsageUncheckedUpdateInput>;
    /**
     * Choose, which AccountUsage to update.
     */
    where: Prisma.AccountUsageWhereUniqueInput;
};
/**
 * AccountUsage updateMany
 */
export type AccountUsageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update AccountUsages.
     */
    data: Prisma.XOR<Prisma.AccountUsageUpdateManyMutationInput, Prisma.AccountUsageUncheckedUpdateManyInput>;
    /**
     * Filter which AccountUsages to update
     */
    where?: Prisma.AccountUsageWhereInput;
    /**
     * Limit how many AccountUsages to update.
     */
    limit?: number;
};
/**
 * AccountUsage updateManyAndReturn
 */
export type AccountUsageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUsage
     */
    select?: Prisma.AccountUsageSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AccountUsage
     */
    omit?: Prisma.AccountUsageOmit<ExtArgs> | null;
    /**
     * The data used to update AccountUsages.
     */
    data: Prisma.XOR<Prisma.AccountUsageUpdateManyMutationInput, Prisma.AccountUsageUncheckedUpdateManyInput>;
    /**
     * Filter which AccountUsages to update
     */
    where?: Prisma.AccountUsageWhereInput;
    /**
     * Limit how many AccountUsages to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AccountUsageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * AccountUsage upsert
 */
export type AccountUsageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUsage
     */
    select?: Prisma.AccountUsageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AccountUsage
     */
    omit?: Prisma.AccountUsageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AccountUsageInclude<ExtArgs> | null;
    /**
     * The filter to search for the AccountUsage to update in case it exists.
     */
    where: Prisma.AccountUsageWhereUniqueInput;
    /**
     * In case the AccountUsage found by the `where` argument doesn't exist, create a new AccountUsage with this data.
     */
    create: Prisma.XOR<Prisma.AccountUsageCreateInput, Prisma.AccountUsageUncheckedCreateInput>;
    /**
     * In case the AccountUsage was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.AccountUsageUpdateInput, Prisma.AccountUsageUncheckedUpdateInput>;
};
/**
 * AccountUsage delete
 */
export type AccountUsageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUsage
     */
    select?: Prisma.AccountUsageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AccountUsage
     */
    omit?: Prisma.AccountUsageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AccountUsageInclude<ExtArgs> | null;
    /**
     * Filter which AccountUsage to delete.
     */
    where: Prisma.AccountUsageWhereUniqueInput;
};
/**
 * AccountUsage deleteMany
 */
export type AccountUsageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AccountUsages to delete
     */
    where?: Prisma.AccountUsageWhereInput;
    /**
     * Limit how many AccountUsages to delete.
     */
    limit?: number;
};
/**
 * AccountUsage without action
 */
export type AccountUsageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUsage
     */
    select?: Prisma.AccountUsageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AccountUsage
     */
    omit?: Prisma.AccountUsageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AccountUsageInclude<ExtArgs> | null;
};
//# sourceMappingURL=AccountUsage.d.ts.map
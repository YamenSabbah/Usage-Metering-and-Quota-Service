import { PrismaClient } from "../../generated/prisma/client";
import type { RejectionCode, Scope } from "../types";
export type ConsumptionDecision = {
    accepted: boolean;
    requestedUnits: number;
    unitsConsumed: number;
    rejectionCode: RejectionCode | null;
    rejectionScope: Scope | null;
    account: {
        planId: number;
        planName: string;
        monthlyAllowance: number;
        consumedUnits: number;
        remaining: number;
        maxPerRequest: number;
    };
    user: {
        planId: number;
        planName: string;
        monthlyAllowance: number;
        consumedUnits: number;
        remaining: number;
        maxPerRequest: number;
    };
};
/**
 * Concurrency strategy
 * ────────────────────
 * We use a Prisma interactive transaction with SERIALIZABLE isolation plus explicit
 * `SELECT ... FOR UPDATE` row locks on the account+month and user+month usage rows.
 *
 * Lock order (always account first, then user) prevents deadlocks between two requests
 * for different users sharing one account.
 *
 * The actual usage increment uses a conditional UPDATE (consumedUnits = :expected) as a
 * second safety net. If the predicate fails, the request is rejected. This guards against
 * any remaining anomaly even though the FOR UPDATE path should be sufficient.
 *
 * Idempotency is enforced by a DB unique constraint on (accountId, requestId). Duplicate
 * requests return the original recorded decision without consuming additional units.
 * Rejected decisions are also persisted.
 */
export declare function processConsumption(prisma: PrismaClient, accountId: number, userId: number, requestedUnits: number, requestId: string): Promise<ConsumptionDecision>;
//# sourceMappingURL=consumption.d.ts.map
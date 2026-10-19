import type { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            accountId: number;
            accountName: string;
        }
    }
}
export type AuthenticatedRequest = Request;
/**
 * Authenticate the caller using the X-API-Key header.
 *
 * Lookup strategy:
 *  - We store a short prefix (first 8 hex chars of the key) in apiKeyPrefix
 *    to enable an efficient indexed lookup.
 *  - We then verify the full plaintext key against the stored argon2id hash.
 *  - This avoids timing attacks and never stores plaintext keys.
 */
export declare function apiKeyAuth(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=api-key-auth.d.ts.map
import { prisma } from "../lib/prisma";
import { verifyApiKey } from "../utils/crypto";
import { unauthorized } from "./errors";
/**
 * Authenticate the caller using the X-API-Key header.
 *
 * Lookup strategy:
 *  - We store a short prefix (first 8 hex chars of the key) in apiKeyPrefix
 *    to enable an efficient indexed lookup.
 *  - We then verify the full plaintext key against the stored argon2id hash.
 *  - This avoids timing attacks and never stores plaintext keys.
 */
export function apiKeyAuth() {
    return async (req, res, next) => {
        try {
            const key = req.header("x-api-key");
            if (!key || typeof key !== "string" || key.length < 8) {
                return next(unauthorized("Missing or malformed API key. Provide the X-API-Key header."));
            }
            const prefix = key.slice(0, 8);
            const row = await prisma.account.findUnique({
                where: { apiKeyPrefix: prefix },
                select: { id: true, name: true, apiKeyHash: true },
            });
            if (!row) {
                return next(unauthorized("Invalid API key."));
            }
            const valid = await verifyApiKey(key, row.apiKeyHash);
            if (!valid) {
                return next(unauthorized("Invalid API key."));
            }
            req.accountId = row.id;
            req.accountName = row.name;
            next();
        }
        catch (err) {
            next(err instanceof Error && "statusCode" in err ? err : unauthorized("Authentication failed."));
        }
    };
}
//# sourceMappingURL=api-key-auth.js.map
import argon2 from "argon2";
import { randomBytes } from "crypto";
const KEY_BYTES = 32;
/**
 * Generate a cryptographically secure random API key.
 * The returned string is the plaintext key that must be shown once to the account owner.
 */
export function generateApiKey() {
    return randomBytes(KEY_BYTES).toString("hex");
}
/**
 * Hash an API key with argon2id for storage.
 * We hash only the key (no per-row salt needed beyond argon2's built-in salt).
 */
export async function hashApiKey(plaintext) {
    return argon2.hash(plaintext, {
        type: argon2.argon2id,
        memoryCost: 65536, // 64 MB
        timeCost: 3,
        parallelism: 4,
    });
}
/**
 * Verify a plaintext API key against a stored hash.
 */
export async function verifyApiKey(plaintext, hash) {
    try {
        return argon2.verify(hash, plaintext);
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=crypto.js.map
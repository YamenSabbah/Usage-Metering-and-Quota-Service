/**
 * Generate a cryptographically secure random API key.
 * The returned string is the plaintext key that must be shown once to the account owner.
 */
export declare function generateApiKey(): string;
/**
 * Hash an API key with argon2id for storage.
 * We hash only the key (no per-row salt needed beyond argon2's built-in salt).
 */
export declare function hashApiKey(plaintext: string): Promise<string>;
/**
 * Verify a plaintext API key against a stored hash.
 */
export declare function verifyApiKey(plaintext: string, hash: string): Promise<boolean>;
//# sourceMappingURL=crypto.d.ts.map
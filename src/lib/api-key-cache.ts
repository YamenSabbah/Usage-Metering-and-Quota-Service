import { createHash } from "crypto";

/**
 * In-process cache of successfully verified API keys.
 *
 * argon2id is deliberately expensive (~64 MB, ~200 ms) — the right cost for
 * hashing a key at rest, but wrong to pay on *every* request of a metering API
 * that is expected to absorb high request rates. Under load the concurrent
 * verifications saturate CPU and memory and starve the rest of the process.
 *
 * So we keep argon2 for storage and for the first sighting of a key, then
 * remember the successful result. Entries are bound to the exact stored hash:
 * if the row's `apiKeyHash` ever changes (rotation/rehash), the comparison
 * fails and we fall back to a full argon2 verify. This never lets a key
 * through that was not already proven against the hash currently in the
 * database.
 */

const TTL_MS = 5 * 60 * 1000;
const MAX_ENTRIES = 1000;

type Entry = {
  apiKeyHash: string;
  expiresAt: number;
};

const cache = new Map<string, Entry>();

/** SHA-256 the presented key so the cache never holds plaintext API keys. */
function fingerprint(apiKey: string): string {
  return createHash("sha256").update(apiKey).digest("hex");
}

/**
 * True when this exact key was already verified against `currentHash`.
 * A stale entry for a rotated hash is discarded.
 */
export function isCachedVerification(apiKey: string, currentHash: string): boolean {
  const fp = fingerprint(apiKey);
  const entry = cache.get(fp);
  if (!entry) return false;

  if (Date.now() > entry.expiresAt || entry.apiKeyHash !== currentHash) {
    cache.delete(fp);
    return false;
  }
  return true;
}

export function rememberVerification(apiKey: string, apiKeyHash: string): void {
  const fp = fingerprint(apiKey);

  if (cache.size >= MAX_ENTRIES && !cache.has(fp)) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }

  cache.set(fp, { apiKeyHash, expiresAt: Date.now() + TTL_MS });
}

/** Test/reset hook. */
export function clearApiKeyCache(): void {
  cache.clear();
}

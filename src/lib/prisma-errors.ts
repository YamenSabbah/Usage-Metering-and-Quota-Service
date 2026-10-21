/**
 * True when the error is a Prisma unique-constraint violation (P2002).
 *
 * Services use this to turn a database-level uniqueness clash — for example a
 * duplicate `User.externalRef` within an account, or a duplicate custom plan
 * name — into a client-facing 409 instead of an opaque 500.
 */
export function isUniqueViolation(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as Record<string, unknown>;

  if (e["code"] === "P2002") return true;

  // The pg driver adapter can surface the SQLSTATE instead of the Prisma code.
  const msg = String(e["message"] ?? "");
  return msg.includes("23505") || msg.includes("duplicate key value violates unique constraint");
}

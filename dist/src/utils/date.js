/**
 * Return the current UTC calendar month as "YYYY-MM".
 */
export function currentUtcMonth() {
    const now = new Date();
    const y = now.getUTCFullYear();
    const m = String(now.getUTCMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
}
/**
 * Parse a "YYYY-MM" string into { year, month } (1-indexed month).
 * Returns null for invalid input.
 */
export function parseUtcMonth(ym) {
    const m = ym.match(/^(\d{4})-(\d{2})$/);
    if (!m || !m[1] || !m[2])
        return null;
    const year = parseInt(m[1], 10);
    const month = parseInt(m[2], 10);
    if (month < 1 || month > 12)
        return null;
    return { year, month };
}
/**
 * Build the UTC year + month for a given Date (defaults to now).
 */
export function utcYearMonth(now = new Date()) {
    return {
        year: now.getUTCFullYear(),
        month: now.getUTCMonth() + 1,
    };
}
//# sourceMappingURL=date.js.map
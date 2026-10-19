/**
 * Return the current UTC calendar month as "YYYY-MM".
 */
export declare function currentUtcMonth(): string;
/**
 * Parse a "YYYY-MM" string into { year, month } (1-indexed month).
 * Returns null for invalid input.
 */
export declare function parseUtcMonth(ym: string): {
    year: number;
    month: number;
} | null;
/**
 * Build the UTC year + month for a given Date (defaults to now).
 */
export declare function utcYearMonth(now?: Date): {
    year: number;
    month: number;
};
//# sourceMappingURL=date.d.ts.map
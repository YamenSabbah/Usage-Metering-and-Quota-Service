import { describe, it, expect } from "vitest";
import { parseUtcMonth, utcYearMonth, currentUtcMonth } from "../../src/utils/date";
import { generateApiKey, hashApiKey, verifyApiKey } from "../../src/utils/crypto";

describe("parseUtcMonth", () => {
  it("parses valid YYYY-MM", () => {
    expect(parseUtcMonth("2026-10")).toEqual({ year: 2026, month: 10 });
    expect(parseUtcMonth("2026-01")).toEqual({ year: 2026, month: 1 });
    expect(parseUtcMonth("2026-12")).toEqual({ year: 2026, month: 12 });
  });

  it("returns null for invalid format", () => {
    expect(parseUtcMonth("2026")).toBeNull();
    expect(parseUtcMonth("2026/10")).toBeNull();
    expect(parseUtcMonth("26-10")).toBeNull();
    expect(parseUtcMonth("2026-1")).toBeNull();
    expect(parseUtcMonth("")).toBeNull();
    expect(parseUtcMonth("abc")).toBeNull();
  });

  it("returns null for invalid month", () => {
    expect(parseUtcMonth("2026-00")).toBeNull();
    expect(parseUtcMonth("2026-13")).toBeNull();
    expect(parseUtcMonth("2026-99")).toBeNull();
  });
});

describe("utcYearMonth", () => {
  it("returns current UTC year and month", () => {
    const { year, month } = utcYearMonth();
    expect(year).toBeGreaterThanOrEqual(2024);
    expect(month).toBeGreaterThanOrEqual(1);
    expect(month).toBeLessThanOrEqual(12);
  });

  it("returns correct values for a specific date", () => {
    expect(utcYearMonth(new Date("2026-10-15T12:00:00Z"))).toEqual({ year: 2026, month: 10 });
    expect(utcYearMonth(new Date("2026-01-01T00:00:00Z"))).toEqual({ year: 2026, month: 1 });
    expect(utcYearMonth(new Date("2026-12-31T23:59:59Z"))).toEqual({ year: 2026, month: 12 });
  });
});

describe("currentUtcMonth", () => {
  it("returns YYYY-MM format", () => {
    const m = currentUtcMonth();
    expect(m).toMatch(/^\d{4}-\d{2}$/);
  });
});

describe("crypto utilities", () => {
  it("generates a unique hex key of expected length", () => {
    const key1 = generateApiKey();
    const key2 = generateApiKey();
    expect(key1).toMatch(/^[0-9a-f]{64}$/); // 32 bytes = 64 hex chars
    expect(key1).not.toBe(key2);
  });

  it("hashes and verifies an API key", async () => {
    const key = generateApiKey();
    const hash = await hashApiKey(key);
    expect(hash).toMatch(/^\$argon2id\$/);
    expect(await verifyApiKey(key, hash)).toBe(true);
  });

  it("rejects wrong key against valid hash", async () => {
    const key = generateApiKey();
    const wrongKey = generateApiKey();
    const hash = await hashApiKey(key);
    expect(await verifyApiKey(wrongKey, hash)).toBe(false);
  });

  it("rejects malformed hash", async () => {
    const key = generateApiKey();
    expect(await verifyApiKey(key, "not-a-hash")).toBe(false);
    expect(await verifyApiKey(key, "")).toBe(false);
  });
});

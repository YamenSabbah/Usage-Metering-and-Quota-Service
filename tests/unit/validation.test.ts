import { describe, it, expect } from "vitest";
import { z } from "zod";
import { validate } from "../../src/validation/middleware";
import {
  consumeBody,
  createAccountBody,
  createPlanBody,
  changeAccountPlanBody,
  changeUserPlanBody,
  createUserBody,
  paginationQuery,
} from "../../src/validation/schemas";

describe("Validation schemas", () => {
  describe("consumeBody", () => {
    it("accepts valid input", () => {
      const result = consumeBody.parse({ userId: 1, units: 10, requestId: "req-1" });
      expect(result).toEqual({ userId: 1, units: 10, requestId: "req-1" });
    });

    it("coerces string numbers", () => {
      const result = consumeBody.parse({ userId: "5", units: "10", requestId: "req-1" });
      expect(result.userId).toBe(5);
      expect(result.units).toBe(10);
    });

    it("rejects zero units", () => {
      expect(() => consumeBody.parse({ userId: 1, units: 0, requestId: "r" })).toThrow();
    });

    it("rejects negative units", () => {
      expect(() => consumeBody.parse({ userId: 1, units: -5, requestId: "r" })).toThrow();
    });

    it("rejects non-integer units", () => {
      expect(() => consumeBody.parse({ userId: 1, units: 1.5, requestId: "r" })).toThrow();
    });

    it("rejects zero userId", () => {
      expect(() => consumeBody.parse({ userId: 0, units: 1, requestId: "r" })).toThrow();
    });

    it("rejects empty requestId", () => {
      expect(() => consumeBody.parse({ userId: 1, units: 1, requestId: "" })).toThrow();
    });

    it("rejects missing fields", () => {
      expect(() => consumeBody.parse({})).toThrow();
      expect(() => consumeBody.parse({ userId: 1 })).toThrow();
    });
  });

  describe("createAccountBody", () => {
    it("accepts valid name", () => {
      expect(createAccountBody.parse({ name: "Acme" })).toEqual({ name: "Acme" });
    });

    it("rejects empty name", () => {
      expect(() => createAccountBody.parse({ name: "" })).toThrow();
    });

    it("rejects missing name", () => {
      expect(() => createAccountBody.parse({})).toThrow();
    });

    it("rejects name longer than 255", () => {
      expect(() => createAccountBody.parse({ name: "x".repeat(256) })).toThrow();
    });
  });

  describe("createPlanBody", () => {
    it("accepts valid plan", () => {
      const r = createPlanBody.parse({ name: "P", scope: "USER", monthlyAllowance: 100, maxPerRequest: 10 });
      expect(r.scope).toBe("USER");
      expect(r.monthlyAllowance).toBe(100);
    });

    it("rejects invalid scope", () => {
      expect(() => createPlanBody.parse({ name: "P", scope: "INVALID", monthlyAllowance: 1, maxPerRequest: 1 })).toThrow();
    });

    it("rejects negative allowance", () => {
      expect(() => createPlanBody.parse({ name: "P", scope: "USER", monthlyAllowance: -1, maxPerRequest: 1 })).toThrow();
    });

    it("rejects non-integer allowance", () => {
      expect(() => createPlanBody.parse({ name: "P", scope: "USER", monthlyAllowance: 1.5, maxPerRequest: 1 })).toThrow();
    });

    it("accepts zero allowance (documented convention)", () => {
      const r = createPlanBody.parse({ name: "P", scope: "USER", monthlyAllowance: 0, maxPerRequest: 0 });
      expect(r.monthlyAllowance).toBe(0);
    });
  });

  describe("changeAccountPlanBody / changeUserPlanBody", () => {
    it("accepts valid planId", () => {
      expect(changeAccountPlanBody.parse({ planId: 1 })).toEqual({ planId: 1 });
      expect(changeUserPlanBody.parse({ planId: 1 })).toEqual({ planId: 1 });
    });

    it("coerces string planId", () => {
      expect(changeAccountPlanBody.parse({ planId: "3" }).planId).toBe(3);
    });

    it("rejects non-positive planId", () => {
      expect(() => changeAccountPlanBody.parse({ planId: 0 })).toThrow();
    });
  });

  describe("createUserBody", () => {
    it("accepts valid input", () => {
      const r = createUserBody.parse({ externalRef: "alice" });
      expect(r.externalRef).toBe("alice");
      expect(r.planId).toBeUndefined();
    });

    it("accepts with planId", () => {
      expect(createUserBody.parse({ externalRef: "alice", planId: 3 }).planId).toBe(3);
    });

    it("rejects empty externalRef", () => {
      expect(() => createUserBody.parse({ externalRef: "" })).toThrow();
    });
  });

  describe("paginationQuery", () => {
    it("defaults page=1 limit=20", () => {
      const r = paginationQuery.parse({});
      expect(r.page).toBe(1);
      expect(r.limit).toBe(20);
    });

    it("coerces string values", () => {
      const r = paginationQuery.parse({ page: "3", limit: "50" });
      expect(r.page).toBe(3);
      expect(r.limit).toBe(50);
    });

    it("rejects limit > 100", () => {
      expect(() => paginationQuery.parse({ limit: "101" })).toThrow();
    });

    it("rejects page < 1", () => {
      expect(() => paginationQuery.parse({ page: "0" })).toThrow();
    });
  });
});

describe("validate middleware", () => {
  function runValidation(schema: z.ZodType, body: unknown) {
    const req = { body } as any;
    const res = {
      statusCode: 0,
      payload: null as unknown,
      status(code: number) { this.statusCode = code; return this; },
      json(data: unknown) { this.payload = data; return this; },
    };
    let nextCalled = false;
    let nextError: unknown = null;

    validate(schema)(req, res as any, (err?: unknown) => {
      nextCalled = true;
      nextError = err ?? null;
    });

    return { req, res, nextCalled, nextError };
  }

  it("calls next() on valid body and replaces req.body", () => {
    const r = runValidation(consumeBody, { userId: 1, units: 5, requestId: "x" });
    expect(r.nextCalled).toBe(true);
    expect(r.nextError).toBeNull();
    expect(r.req.body.units).toBe(5);
  });

  it("responds 400 with details on invalid body", () => {
    const r = runValidation(consumeBody, { userId: -1, units: 0, requestId: "" });
    expect(r.nextCalled).toBe(false);
    expect(r.res.statusCode).toBe(400);
    expect((r.res.payload as any).error).toBe("VALIDATION_FAILED");
    expect((r.res.payload as any).details.length).toBeGreaterThan(0);
  });

  it("passes non-Zod errors to next()", () => {
    const badSchema = { parse: () => { throw new Error("boom"); } } as any;
    const r = runValidation(badSchema, {});
    expect(r.nextCalled).toBe(true);
    expect((r.nextError as Error).message).toBe("boom");
  });
});

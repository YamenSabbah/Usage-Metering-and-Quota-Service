import "dotenv/config";

export const config = {
  port: parseInt(process.env.PORT ?? "3000", 10) || 3000,
  nodeEnv: (process.env.NODE_ENV ?? "development") as "development" | "production" | "test",
  databaseUrl: process.env.DATABASE_URL,
  idempotencyRetentionDays: parseInt(process.env.IDEMPOTENCY_RETENTION_DAYS ?? "90", 10),
  maxPageSize: parseInt(process.env.MAX_PAGE_SIZE ?? "100", 10),
  defaultPageSize: parseInt(process.env.DEFAULT_PAGE_SIZE ?? "20", 10),
} as const;

if (!config.databaseUrl) {
  throw new Error("DATABASE_URL environment variable is required");
}

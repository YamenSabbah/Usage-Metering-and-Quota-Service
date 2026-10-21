import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

/**
 * Connection pool configuration.
 *
 * The `pg` default is a pool of 10 connections, and every interactive
 * `$transaction` holds one for its whole duration. Under a burst of concurrent
 * consumption requests that default saturates almost immediately, and Prisma
 * surfaces `P2028: Unable to start a transaction in the given time` as a 500.
 *
 * `max` must stay well under the server's `max_connections` (100 by default) to
 * leave headroom for migrations, seeding, and other clients.
 */
const max = Number(process.env.DATABASE_POOL_MAX || 25);

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  max,
  // Queue for a pooled connection instead of failing fast, so a momentary burst
  // delays requests rather than erroring them.
  connectionTimeoutMillis: Number(process.env.DATABASE_CONNECT_TIMEOUT_MS || 10_000),
  idleTimeoutMillis: 30_000,
});

const prisma = new PrismaClient({ adapter });

export { prisma };

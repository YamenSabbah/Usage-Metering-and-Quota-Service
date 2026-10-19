import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const PREDEFINED_PLANS = [
  // Account plans
  { name: "Starter", scope: "ACCOUNT" as const, monthlyAllowance: 10_000, maxPerRequest: 100 },
  { name: "Pro", scope: "ACCOUNT" as const, monthlyAllowance: 100_000, maxPerRequest: 1_000 },
  // User plans
  { name: "Basic", scope: "USER" as const, monthlyAllowance: 1_000, maxPerRequest: 20 },
  { name: "Premium", scope: "USER" as const, monthlyAllowance: 10_000, maxPerRequest: 200 },
] as const;

async function main() {
  console.log("Seeding predefined plans...");

  for (const p of PREDEFINED_PLANS) {
    // Predefined plans are identified by name + scope. Use findFirst to locate
    // an existing predefined plan (accountId is null for these).
    const existing = await prisma.plan.findFirst({
      where: { name: p.name, scope: p.scope, source: "PREDEFINED" },
    });

    if (existing) {
      console.log(`  ✓ ${p.name} (${p.scope}) — already exists`);
      continue;
    }

    await prisma.plan.create({
      data: {
        name: p.name,
        scope: p.scope,
        monthlyAllowance: p.monthlyAllowance,
        maxPerRequest: p.maxPerRequest,
        source: "PREDEFINED",
        accountId: null,
      },
    });
    console.log(`  ✓ ${p.name} (${p.scope})`);
  }

  console.log("Seed complete. Predefined plans are idempotent.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

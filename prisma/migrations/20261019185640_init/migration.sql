-- CreateEnum
CREATE TYPE "PlanScope" AS ENUM ('ACCOUNT', 'USER');

-- CreateEnum
CREATE TYPE "PlanSource" AS ENUM ('PREDEFINED', 'CUSTOM');

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "scope" "PlanScope" NOT NULL,
    "monthlyAllowance" INTEGER NOT NULL DEFAULT 0,
    "maxPerRequest" INTEGER NOT NULL DEFAULT 0,
    "source" "PlanSource" NOT NULL DEFAULT 'CUSTOM',
    "accountId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "apiKeyHash" TEXT NOT NULL,
    "planId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "externalRef" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountUsage" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "consumedUnits" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AccountUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserUsage" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "consumedUnits" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsageRequest" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "requestId" TEXT NOT NULL,
    "requestedUnits" INTEGER NOT NULL,
    "accepted" BOOLEAN NOT NULL,
    "rejectionCode" TEXT,
    "rejectionScope" TEXT,
    "accountedYear" INTEGER NOT NULL,
    "accountedMonth" INTEGER NOT NULL,
    "accountPlanId" INTEGER NOT NULL,
    "userPlanId" INTEGER NOT NULL,
    "accountMaxPerRequest" INTEGER NOT NULL,
    "userMaxPerRequest" INTEGER NOT NULL,
    "accountMonthlyAllowance" INTEGER NOT NULL,
    "userMonthlyAllowance" INTEGER NOT NULL,
    "accountUsedBefore" INTEGER NOT NULL,
    "userUsedBefore" INTEGER NOT NULL,
    "accountRemainingBefore" INTEGER NOT NULL,
    "userRemainingBefore" INTEGER NOT NULL,
    "unitsConsumed" INTEGER NOT NULL DEFAULT 0,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsageRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Plan_scope_source_idx" ON "Plan"("scope", "source");

-- CreateIndex
CREATE INDEX "Plan_accountId_idx" ON "Plan"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_scope_accountId_key" ON "Plan"("name", "scope", "accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_apiKeyHash_key" ON "Account"("apiKeyHash");

-- CreateIndex
CREATE UNIQUE INDEX "Account_planId_key" ON "Account"("planId");

-- CreateIndex
CREATE INDEX "Account_planId_idx" ON "Account"("planId");

-- CreateIndex
CREATE INDEX "User_accountId_idx" ON "User"("accountId");

-- CreateIndex
CREATE INDEX "User_planId_idx" ON "User"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "User_accountId_externalRef_key" ON "User"("accountId", "externalRef");

-- CreateIndex
CREATE INDEX "AccountUsage_accountId_idx" ON "AccountUsage"("accountId");

-- CreateIndex
CREATE INDEX "AccountUsage_year_month_idx" ON "AccountUsage"("year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "AccountUsage_accountId_year_month_key" ON "AccountUsage"("accountId", "year", "month");

-- CreateIndex
CREATE INDEX "UserUsage_userId_idx" ON "UserUsage"("userId");

-- CreateIndex
CREATE INDEX "UserUsage_year_month_idx" ON "UserUsage"("year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "UserUsage_userId_year_month_key" ON "UserUsage"("userId", "year", "month");

-- CreateIndex
CREATE INDEX "UsageRequest_accountId_accountedYear_accountedMonth_idx" ON "UsageRequest"("accountId", "accountedYear", "accountedMonth");

-- CreateIndex
CREATE INDEX "UsageRequest_accountId_processedAt_idx" ON "UsageRequest"("accountId", "processedAt");

-- CreateIndex
CREATE INDEX "UsageRequest_userId_idx" ON "UsageRequest"("userId");

-- CreateIndex
CREATE INDEX "UsageRequest_requestId_idx" ON "UsageRequest"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "UsageRequest_accountId_requestId_key" ON "UsageRequest"("accountId", "requestId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountUsage" ADD CONSTRAINT "AccountUsage_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUsage" ADD CONSTRAINT "UserUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsageRequest" ADD CONSTRAINT "UsageRequest_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsageRequest" ADD CONSTRAINT "UsageRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

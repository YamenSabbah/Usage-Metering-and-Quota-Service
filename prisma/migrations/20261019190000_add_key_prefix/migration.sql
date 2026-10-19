-- Add apiKeyPrefix column for efficient API key lookup
ALTER TABLE "Account" ADD COLUMN "apiKeyPrefix" TEXT NOT NULL DEFAULT '';
-- Backfill with first 8 chars of the hash (a unique-enough prefix)
UPDATE "Account" SET "apiKeyPrefix" = left("apiKeyHash", 8);
ALTER TABLE "Account" ALTER COLUMN "apiKeyPrefix" DROP DEFAULT;
CREATE UNIQUE INDEX "Account_apiKeyPrefix_key" ON "Account"("apiKeyPrefix");

FROM node:22-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
COPY prisma7.config.ts ./
RUN npm ci

# Copy source
COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./

# Generate Prisma client.
# prisma7.config.ts resolves DATABASE_URL eagerly, and `generate` never opens a
# connection, so a throwaway value is enough to satisfy config loading here.
RUN DATABASE_URL="postgresql://build:build@localhost:5432/build" npx prisma generate

# Production stage
FROM node:22-alpine
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/generated ./generated
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/src ./src
COPY --from=base /app/tsconfig.json ./
COPY --from=base /app/prisma7.config.ts ./
COPY --from=base /app/package.json ./

# Run migrations and start
CMD ["sh", "-c", "npx prisma migrate deploy && npx tsx prisma/seed.ts && npx tsx src/server.ts"]

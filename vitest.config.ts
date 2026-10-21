import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    testTimeout: 30000,
    hookTimeout: 30000,
    // DB tests must run sequentially to avoid lock contention.
    fileParallelism: false,
    pool: "forks",
    isolate: true,
  },
});

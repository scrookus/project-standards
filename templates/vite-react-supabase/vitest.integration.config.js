import { defineConfig } from 'vitest/config'

// Integration tests run against a local Supabase stack (`supabase start`).
// Lives outside src/**/*.test.{js,jsx} so the default `npm test` stays
// unit-only and Supabase-free.
export default defineConfig({
  test: {
    include: ['tests/integration/**/*.test.js'],
    exclude: ['node_modules', 'dist'],
    globalSetup: ['./tests/integration/global-setup.js'],
    setupFiles: ['./tests/integration/setup.js'],
    // Tests share a single Postgres instance; serial prevents fixture collisions.
    fileParallelism: false,
    testTimeout: 15_000,
    hookTimeout: 15_000,
  },
})

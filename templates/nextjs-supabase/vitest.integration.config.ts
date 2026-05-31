import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
  test: {
    environment: 'node',
    include: ['__tests__/integration/**/*.test.ts'],
    setupFiles: ['__tests__/integration/setup.ts'],
    testTimeout: 15_000,
    hookTimeout: 15_000,
    sequence: { concurrent: false },
  },
})

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{js,jsx}'],
    exclude: ['node_modules', 'dist', 'e2e'],
    setupFiles: ['./src/test-setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'lcov'],
      include: ['src/**'],
      exclude: [
        'src/test-setup.js',
        'src/**/*.test.{js,jsx}',
        // CUSTOMISE THIS: add project-specific exclusions below.
        // Pages and route components are typically E2E-only surfaces.
        // 'src/pages/**',
        // Transport-only API modules (thin Supabase RPC wrappers) can be excluded.
        // 'src/data/api/**',
        'node_modules',
        'dist',
      ],
      // CUSTOMISE THIS: calibrate thresholds against post-exclusion actuals.
      thresholds: {
        branches:   70,
        functions:  75,
        statements: 75,
        lines:      80,
      },
    },
  },
})

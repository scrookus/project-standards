// Phase A — anonymous e2e tests that do not require auth state or Supabase.
//
// Covers smoke tests, public flows, and fixture-based scenarios.
// Runs on every push — fast and infra-free.
//
// Authenticated / persona flows live in playwright.authenticated.config.js.

import { defineConfig, devices } from '@playwright/test'

const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  // CUSTOMISE THIS: list the spec files that run without auth state.
  testMatch: /\/(smoke|browse)\.spec\.js$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    // CUSTOMISE THIS: adjust the build command if your project uses a different
    // output directory or needs env vars stripped for anonymous-only mode.
    command: `npm run build && npm run preview -- --port ${PORT} --strictPort`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})

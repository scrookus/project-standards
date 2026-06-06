import { defineConfig, devices } from '@playwright/test'

// Env knobs (all optional):
//   E2E_BASE_URL          override the base URL (default http://localhost:3000)
//   E2E_SKIP_WEB_SERVER   set to "1" to skip Playwright's webServer block
//                          — useful when an external dev server is already running
const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:3000'
const WEB_SERVER = process.env.E2E_SKIP_WEB_SERVER === '1'
  ? undefined
  : {
      command: process.env.CI
        ? 'npm run build && npm run start'
        : 'npm run dev',
      url: `${BASE_URL}/api/health`,
      reuseExistingServer: !process.env.CI,
      timeout: process.env.CI ? 120_000 : 60_000,
    }

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? 'github' : 'list',
  globalSetup: './e2e/setup/global-setup.ts',
  globalTeardown: './e2e/setup/global-teardown.ts',

  use: {
    baseURL: BASE_URL,
    storageState: 'e2e/auth-state/user.json',
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],

  webServer: WEB_SERVER,
})

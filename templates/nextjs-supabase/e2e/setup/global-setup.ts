import { chromium } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'
import { mkdirSync } from 'fs'
import { AUTH_DIR, BASE_URL, E2E_EMAIL, E2E_PASSWORD } from './constants'

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('e2e setup: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
}

export default async function globalSetup() {
  const admin = adminClient()

  // Clean any leftovers from a previous run
  const { data: { users } } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const existing = users.find(u => u.email === E2E_EMAIL)
  if (existing) {
    await admin.auth.admin.deleteUser(existing.id)
    console.log('[e2e:setup] removed stale test user')
  }

  // Create test user — email_confirm skips the confirmation flow
  const { data: { user }, error: userErr } = await admin.auth.admin.createUser({
    email: E2E_EMAIL,
    password: E2E_PASSWORD,
    email_confirm: true,
  })
  if (userErr || !user) throw new Error(`e2e setup: createUser: ${userErr?.message}`)

  // ── Seed app data ──────────────────────────────────────────────────────────
  // CUSTOMISE THIS: create whatever rows your app needs for the test user.
  // Use `admin` (service-role client) to bypass RLS.
  //
  // Example:
  //   const { data: workspace } = await admin.from('workspaces').insert({ name: 'E2E Workspace' }).select().single()
  //   await admin.from('workspace_members').insert({ workspace_id: workspace.id, user_id: user.id, role: 'member' })
  // ──────────────────────────────────────────────────────────────────────────

  // Sign in via real browser to capture the @supabase/ssr cookie-based session
  mkdirSync(AUTH_DIR, { recursive: true })
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto(`${BASE_URL}/login`)
  await page.getByLabel('Email').fill(E2E_EMAIL)
  await page.getByLabel('Password').fill(E2E_PASSWORD)
  await page.getByRole('button', { name: 'Sign in' }).click()

  // CUSTOMISE THIS: update the URL pattern to match your post-login redirect
  await page.waitForURL(`${BASE_URL}/dashboard`, { timeout: 15_000 })

  await context.storageState({ path: `${AUTH_DIR}/user.json` })
  await browser.close()

  console.log('[e2e:setup] done — test data seeded, session saved')
}

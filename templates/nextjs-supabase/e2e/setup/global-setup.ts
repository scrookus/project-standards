import { chromium } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'
import { mkdirSync } from 'fs'
import { AUTH_DIR, BASE_URL, E2E_EMAIL, E2E_PASSWORD } from './constants'

// Env-var name compatibility:
// Supabase has rolled out renamed local keys
// (NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY / SUPABASE_SECRET_KEY) alongside
// the older names (NEXT_PUBLIC_SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY).
// Read the new names first and fall back to the legacy names so a project
// can rename on its own schedule without forking this setup.
function requireLocalE2eEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const publishable = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const secret = process.env.SUPABASE_SECRET_KEY
    ?? process.env.SUPABASE_SERVICE_ROLE_KEY

  const missing = [
    !url && 'NEXT_PUBLIC_SUPABASE_URL',
    !publishable && 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or legacy NEXT_PUBLIC_SUPABASE_ANON_KEY)',
    !secret && 'SUPABASE_SECRET_KEY (or legacy SUPABASE_SERVICE_ROLE_KEY)',
  ].filter(Boolean)

  if (missing.length > 0) {
    throw new Error(
      `e2e setup requires local Supabase env in .env.local. Missing: ${missing.join(', ')}. Copy local values from "supabase status -o env".`
    )
  }
  return { url: url!, secret: secret! }
}

function adminClient() {
  const { url, secret } = requireLocalE2eEnv()
  return createClient(url, secret, { auth: { autoRefreshToken: false, persistSession: false } })
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

// ── Growing past the single-user template ─────────────────────────────────
// When the app needs multiple test personas, MFA enrollment, or per-persona
// storage state, the typical evolution is:
//   1. Replace E2E_EMAIL/E2E_PASSWORD with a fixtures file (e.g.
//      `e2e/fixtures/personas.json`) keyed by persona name.
//   2. Drive the persona selection from an `E2E_PERSONA` env var with a
//      sensible default; write storage state per persona under
//      `${AUTH_DIR}/${personaKey}.json`.
//   3. If the app gates login on MFA, walk the enrollment flow once during
//      setup (TOTP secret read from the "enter key manually" disclosure;
//      compute the 6-digit code via base32-decode + HMAC-SHA1).
//   4. Document a `npm run db:reset:local` recovery path for stale local
//      auth factors — MFA enrollment is the most fragile step.
// See `take-me-to-church` (PLT-010) for a reference implementation. The
// template stays single-persona by default because the MFA enrollment
// selectors are necessarily app-shaped.
// ──────────────────────────────────────────────────────────────────────────

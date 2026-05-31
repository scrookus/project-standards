// Phase B e2e auth setup — signs in as pre-existing test accounts,
// then writes Playwright storageState to e2e/auth-state/*.json.
//
// Required accounts (must exist in Supabase before Phase B runs):
//   user.json    — E2E_USER_EMAIL
//   admin.json   — E2E_ADMIN_EMAIL   (profile: { is_admin: true })
//
// Credentials default to the same values used by the local seed script,
// so local runs work without explicit env var configuration.
// Override via .env.e2e.local or CI env vars.
//
// Run once before the authenticated test suite (re-run when sessions expire):
//   npm run test:e2e:setup

import { createClient } from '@supabase/supabase-js'
import { chmod, mkdir, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { loadEnvFile } from '../../scripts/load-env-file.js'

const ENV_FILE = '.env.e2e.local'
const AUTH_DIR = 'e2e/auth-state'

// Falls through silently if the file doesn't exist — CI uses real env vars.
loadEnvFile(ENV_FILE)

const URL           = process.env.VITE_SUPABASE_URL
const ANON_KEY      = process.env.VITE_SUPABASE_ANON_KEY
const USER_EMAIL    = process.env.E2E_USER_EMAIL    ?? 'e2e-user@example.test'
const USER_PASSWORD = process.env.E2E_USER_PASSWORD ?? 'local-e2e-password'
const ADMIN_EMAIL    = process.env.E2E_ADMIN_EMAIL    ?? 'e2e-admin@example.test'
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'local-e2e-password'

function requireEnv() {
  const missing = [
    ['VITE_SUPABASE_URL',      URL],
    ['VITE_SUPABASE_ANON_KEY', ANON_KEY],
    ['E2E_USER_EMAIL',         USER_EMAIL],
    ['E2E_USER_PASSWORD',      USER_PASSWORD],
    ['E2E_ADMIN_EMAIL',        ADMIN_EMAIL],
    ['E2E_ADMIN_PASSWORD',     ADMIN_PASSWORD],
  ].filter(([, v]) => !v).map(([k]) => k)
  if (missing.length) throw new Error(`auth.setup.js: missing env vars: ${missing.join(', ')}`)
}

// Derive the Supabase localStorage key from the project URL.
// Pattern: sb-{project-ref}-auth-token (matches @supabase/auth-js STORAGE_KEY).
function storageKey(url) {
  const ref = new globalThis.URL(url).hostname.split('.')[0]
  return `sb-${ref}-auth-token`
}

function originFor(url) {
  return new globalThis.URL(url).origin
}

async function signIn(email, password) {
  const client = createClient(URL, ANON_KEY, { auth: { persistSession: false } })
  const { data, error } = await client.auth.signInWithPassword({ email, password })
  if (error) throw new Error(`auth.setup sign-in failed for ${email}: ${error.message}`)
  return data.session
}

async function saveState(url, session, key, outPath) {
  const state = {
    cookies: [],
    origins: [{
      origin: originFor(url),
      localStorage: [{
        name: key,
        value: JSON.stringify({
          access_token:  session.access_token,
          refresh_token: session.refresh_token,
          expires_at:    session.expires_at,
          token_type:    'bearer',
          user:          session.user,
        }),
      }],
    }],
  }
  await writeFile(outPath, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 })
  await chmod(outPath, 0o600)
}

export default async function globalSetup() {
  requireEnv()

  const key  = storageKey(URL)
  const BASE = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:4174`

  await mkdir(AUTH_DIR, { recursive: true })

  console.log('[auth.setup] signing in user account…')
  const userSession = await signIn(USER_EMAIL, USER_PASSWORD)
  await saveState(BASE, userSession, key, resolve(AUTH_DIR, 'user.json'))
  console.log('[auth.setup] saved → e2e/auth-state/user.json')

  console.log('[auth.setup] signing in admin account…')
  const adminSession = await signIn(ADMIN_EMAIL, ADMIN_PASSWORD)
  await saveState(BASE, adminSession, key, resolve(AUTH_DIR, 'admin.json'))
  console.log('[auth.setup] saved → e2e/auth-state/admin.json')

  // CUSTOMISE THIS: add profile flag validation and journey fixture checks.
  // Example:
  //   const adminClient = createClient(URL, ANON_KEY, {
  //     auth: { persistSession: false, autoRefreshToken: false },
  //     global: { headers: { Authorization: `Bearer ${adminSession.access_token}` } },
  //   })
  //   const { data } = await adminClient.rpc('get_my_profile')
  //   if (!data?.[0]?.is_admin) throw new Error('admin account missing is_admin flag')
}

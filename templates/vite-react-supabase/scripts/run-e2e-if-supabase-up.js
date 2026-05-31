#!/usr/bin/env node
// Checks if local Supabase is running before running Phase B e2e tests.
// Exits 0 (non-blocking) if Supabase is down — advisory only.
// Phase A anonymous e2e runs independently via `npm run test:e2e`.

import { execSync } from 'child_process'

let up = false
try {
  const r = await fetch('http://localhost:54321/rest/v1/', { signal: AbortSignal.timeout(1000) })
  up = r.status < 500
} catch { up = false }

if (!up) {
  console.log('[ci:local] Supabase not running — Phase B e2e tests skipped (advisory)')
  process.exit(0)
}

console.log('[ci:local] Supabase running — executing Phase B e2e tests')
try {
  execSync('npm run test:e2e:auth', { stdio: 'inherit' })
  process.exit(0)
} catch (err) { process.exit(err.status ?? 1) }

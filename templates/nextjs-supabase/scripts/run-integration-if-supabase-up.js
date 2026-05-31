#!/usr/bin/env node
// Checks if local Supabase is running before running integration tests.
// Exits 0 (non-blocking) if Supabase is down — advisory only.

import { execSync } from 'child_process'

let up = false
try {
  const r = await fetch('http://localhost:54321/rest/v1/', { signal: AbortSignal.timeout(1000) })
  up = r.status < 500
} catch { up = false }

if (!up) {
  console.log('[ci:local] Supabase not running — integration tests skipped (advisory)')
  process.exit(0)
}

console.log('[ci:local] Supabase running — executing integration tests')
try {
  execSync('npm run test:integration', { stdio: 'inherit' })
  process.exit(0)
} catch (err) { process.exit(err.status ?? 1) }

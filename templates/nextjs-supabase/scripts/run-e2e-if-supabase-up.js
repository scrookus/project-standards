#!/usr/bin/env node
// scripts/run-e2e-if-supabase-up.js
//
// Checks if the local Supabase stack is running by probing a TCP connection
// to the REST API port. If reachable: runs `npm run test:e2e` and exits
// with its exit code. If not reachable: prints an advisory message and
// exits 0 (non-blocking).
//
// Invoked by `npm run test:e2e:ifup`, part of `npm run ci:local:full`.
//
// Why TCP socket and not fetch: a raw socket probe is faster than HTTP,
// doesn't care about response shape, and doesn't require AbortSignal.timeout
// polyfills on older Node.

const { execSync } = require('child_process')
const { existsSync, readFileSync } = require('fs')
const { createConnection } = require('net')

function envFromLocalFile(key) {
  if (!existsSync('.env.local')) return undefined
  const line = readFileSync('.env.local', 'utf8')
    .split(/\r?\n/)
    .find((entry) => entry.startsWith(`${key}=`))
  if (!line) return undefined
  return line.slice(key.length + 1).trim().replace(/^['"]|['"]$/g, '')
}

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  envFromLocalFile('NEXT_PUBLIC_SUPABASE_URL') ??
  'http://localhost:54321'

function canConnect(urlString) {
  return new Promise((resolve) => {
    let url
    try {
      url = new URL(urlString)
    } catch {
      resolve(false)
      return
    }

    const socket = createConnection({
      host: url.hostname,
      port: Number(url.port || (url.protocol === 'https:' ? 443 : 80)),
    })

    const finish = (result) => {
      socket.removeAllListeners()
      socket.destroy()
      resolve(result)
    }

    socket.setTimeout(1000)
    socket.once('connect', () => finish(true))
    socket.once('timeout', () => finish(false))
    socket.once('error', () => finish(false))
  })
}

;(async () => {
  const up = await canConnect(supabaseUrl)
  if (!up) {
    console.log(`[ci:local] Supabase not reachable at ${supabaseUrl} — e2e tests skipped (advisory)`)
    process.exit(0)
  }
  console.log(`[ci:local] Supabase reachable at ${supabaseUrl} — executing e2e tests`)
  try {
    execSync('npm run test:e2e', { stdio: 'inherit' })
    process.exit(0)
  } catch (err) {
    process.exit(err.status ?? 1)
  }
})()

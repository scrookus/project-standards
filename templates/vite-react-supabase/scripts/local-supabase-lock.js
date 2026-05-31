#!/usr/bin/env node
import { mkdir, readFile, rm, writeFile } from 'fs/promises'
import os from 'os'
import path from 'path'

export const LOCK_DIR = process.env.LOCAL_SUPABASE_LOCK_DIR
  || path.join(os.tmpdir(), '{{PROJECT_NAME}}-local-supabase.lock')
const OWNER_FILE = path.join(LOCK_DIR, 'owner.json')

function isProcessAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    return error.code === 'EPERM'
  }
}

async function readOwner() {
  try {
    return JSON.parse(await readFile(OWNER_FILE, 'utf8'))
  } catch {
    return null
  }
}

function formatAge(startedAt) {
  const started = Date.parse(startedAt)
  if (!Number.isFinite(started)) return 'unknown age'
  const seconds = Math.max(0, Math.round((Date.now() - started) / 1000))
  if (seconds < 90) return `${seconds}s`
  return `${Math.round(seconds / 60)}m`
}

function conflictMessage(owner) {
  if (!owner) {
    return [
      '[local-supabase-lock] Local Supabase is already in use.',
      `Lock: ${LOCK_DIR}`,
      'If no run is active, inspect and remove the stale lock manually.',
    ].join('\n')
  }

  const alive = isProcessAlive(owner.pid)
  const state = alive ? 'active' : 'stale'
  return [
    '[local-supabase-lock] Local Supabase is already in use by another repo worktree or agent.',
    `Lock: ${LOCK_DIR}`,
    `Owner: pid ${owner.pid ?? 'unknown'} on ${owner.hostname ?? 'unknown host'} (${state}, age ${formatAge(owner.startedAt)})`,
    `Worktree: ${owner.cwd ?? 'unknown'}`,
    `Command: ${owner.command ?? 'unknown'}`,
    alive
      ? 'Wait for that run to finish before resetting, seeding, or canarying local Supabase.'
      : 'The recorded process is not running. Inspect the lock, then remove it manually if it is stale.',
  ].join('\n')
}

export async function withLocalSupabaseLock(commandLabel, fn) {
  if (process.env.LOCAL_SUPABASE_LOCK_HELD === LOCK_DIR) {
    return fn()
  }

  const owner = {
    pid: process.pid,
    hostname: os.hostname(),
    cwd: process.cwd(),
    startedAt: new Date().toISOString(),
    command: commandLabel,
  }

  try {
    await mkdir(LOCK_DIR, { mode: 0o700 })
    await writeFile(OWNER_FILE, `${JSON.stringify(owner, null, 2)}\n`, { mode: 0o600 })
  } catch (error) {
    if (error.code !== 'EEXIST') throw error
    throw new Error(conflictMessage(await readOwner()))
  }

  const previous = process.env.LOCAL_SUPABASE_LOCK_HELD
  process.env.LOCAL_SUPABASE_LOCK_HELD = LOCK_DIR

  let released = false
  async function release() {
    if (released) return
    released = true
    if (previous === undefined) delete process.env.LOCAL_SUPABASE_LOCK_HELD
    else process.env.LOCAL_SUPABASE_LOCK_HELD = previous
    await rm(LOCK_DIR, { recursive: true, force: true })
  }

  const releaseOnSignal = signal => {
    release().finally(() => {
      process.kill(process.pid, signal)
    })
  }
  process.once('SIGINT', releaseOnSignal)
  process.once('SIGTERM', releaseOnSignal)

  try {
    return await fn()
  } finally {
    process.off('SIGINT', releaseOnSignal)
    process.off('SIGTERM', releaseOnSignal)
    await release()
  }
}

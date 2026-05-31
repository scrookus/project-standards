#!/usr/bin/env node
import { spawn } from 'child_process'
import { withLocalSupabaseLock } from './local-supabase-lock.js'

const separator = process.argv.indexOf('--')
const command = separator >= 0 ? process.argv.slice(separator + 1) : process.argv.slice(2)

if (command.length === 0) {
  console.error('Usage: node scripts/with-local-supabase-lock.js -- <command> [args...]')
  process.exit(2)
}

function run(commandParts) {
  return new Promise((resolve, reject) => {
    const child = spawn(commandParts[0], commandParts.slice(1), {
      stdio: 'inherit',
      shell: process.platform === 'win32',
      env: process.env,
    })
    child.on('error', reject)
    child.on('exit', (code, signal) => {
      if (signal) reject(new Error(`${commandParts[0]} exited from signal ${signal}`))
      else resolve(code ?? 1)
    })
  })
}

try {
  const exitCode = await withLocalSupabaseLock(command.join(' '), () => run(command))
  process.exit(exitCode)
} catch (error) {
  console.error(error.message ?? error)
  process.exit(1)
}

# project-standards

Personal project bootstrap standards for Stuart Crook.

Installs a set of Claude Code slash commands and project templates that wire up the full testing stack, CI workflows, and agent operating model onto any new project in one command.

---

## Prerequisites

- [Claude Code](https://claude.ai/code) installed
- Node.js 20+
- For integration and e2e tests: [Supabase CLI](https://supabase.com/docs/guides/cli)

---

## Install

```bash
git clone git@github.com:scrookus/project-standards.git ~/Documents/GitHub/project-standards
cd ~/Documents/GitHub/project-standards
chmod +x install.sh
./install.sh
```

This symlinks commands and templates into `~/.claude/` so they are available in every Claude Code session. The canonical source stays in this repo — `git pull && ./install.sh` to update.

---

## Update

```bash
cd ~/Documents/GitHub/project-standards
git pull
./install.sh   # re-links anything new; updates existing symlinks
```

---

## What you get

### Slash command: `/bootstrap`

Run `/bootstrap` inside any project to scaffold:

| What | Files |
|---|---|
| Test configs | stack-appropriate Vitest and Playwright configs |
| E2e setup | auth setup, persona manifest, global teardown |
| CI helper scripts | Supabase-up guards, lock wrapper |
| GitHub Actions | `.github/workflows/ci.yml`, `integration.yml`, `e2e.yml` |
| Agent model | `AGENTS.md`, `CLAUDE.md` |
| `package.json` scripts | full test + CI script set |
| `.gitignore` entries | Playwright output dirs |

### Available stacks

| Stack | Folder | When to use |
|---|---|---|
| Next.js + Supabase | `templates/nextjs-supabase/` | Next.js App Router projects with `@supabase/ssr` cookie auth |
| Vite + React + Supabase | `templates/vite-react-supabase/` | Vite + React SPA projects with Supabase localStorage auth |

`/bootstrap` auto-detects the stack from `package.json` — no manual selection needed.

---

## Starting a new project

```bash
# 1. Create your project however you normally would
npx create-next-app@latest my-project        # Next.js
# or
npm create vite@latest my-project -- --template react  # Vite + React

cd my-project

# 2. Add Supabase (if not already present)
npm install @supabase/supabase-js

# 3. Open Claude Code
claude

# 4. Run bootstrap
/bootstrap
```

Claude will detect the stack, confirm, then scaffold everything.

### After bootstrapping

**Both stacks — fill in these two sections of `AGENTS.md`:**
1. `## Project` — one paragraph describing what the project does and who it's for
2. `## Current Mode` — e.g. "CTO/bootstrap mode. Direct-to-main acceptable."

**Next.js + Supabase — customise:**
- `e2e/setup/global-setup.ts` — the data seeding block (marked `CUSTOMISE THIS`)

**Vite + React + Supabase — customise:**
- `playwright.config.js` — `testMatch` for your Phase A (anonymous) spec files
- `playwright.authenticated.config.js` — projects array for your persona set
- `e2e/setup/auth.setup.js` — profile flag validation and fixture checks
- `e2e/setup/seed-auth.js` — create this file to seed test accounts in local Supabase
- `check:schema` / `check:architecture` npm scripts — replace stubs with real validators

Run `npm run ci:local` (Next.js) or `npm run ci:local:light` (Vite) to verify the baseline.

---

## Local dev gate (Vite projects)

The Vite template ships a tiered pre-push hook. Wire it once after cloning your project:

```bash
chmod +x .git/hooks/pre-push
```

- Every push: `ci:local:light` (lint + schema + architecture + unit tests + build)
- Push to `main`: full `merge-gate` (adds Phase A e2e)

---

## CI budget

The three GitHub Actions workflows are path-filtered to stay within ~3 000 free minutes/month:

| Workflow | Triggers | ~Cost per run |
|---|---|---|
| `ci.yml` | Every push/PR to main (skip docs/md) | ~1 min |
| `integration.yml` | Only when migrations or integration tests change | ~3 min |
| `e2e.yml` | Only when app code, e2e specs, or Supabase schema change | ~5–10 min |

---

## Adding a new stack

1. Create `templates/<stack-name>/` with the relevant files (use `{{PROJECT_NAME}}`, `{{NODE_VERSION}}`, `{{SUPABASE_CLI_VERSION}}`, `{{DATE}}` as placeholders)
2. Add stack detection logic and file list to `commands/bootstrap.md`
3. Run `./install.sh` (no-op for existing symlinks, picks up new template dir)

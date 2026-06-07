# /bootstrap

Scaffold the standard testing stack, CI workflows, and agent operating model onto the current project.

## What this installs

- **Vitest** — unit and integration test configs and helper scripts
- **Playwright** — e2e config, global setup/teardown, first spec scaffold
- **GitHub Actions** — three path-filtered workflows (ci, integration, e2e)
- **Agent operating model** — AGENTS.md skeleton and CLAUDE.md wrapper

## Steps

### 1. Detect stack and gather context

Read `package.json` and check dependencies for the following stacks in order:

**Next.js + Supabase** — `next` present AND `@supabase/supabase-js` present
→ template: `nextjs-supabase`
→ confirm: "Detected Next.js + Supabase — applying `nextjs-supabase` stack. Proceed?"

**Vite + React + Supabase** — `vite` in devDependencies AND `@supabase/supabase-js` present AND `next` NOT present
→ template: `vite-react-supabase`
→ confirm: "Detected Vite + React + Supabase — applying `vite-react-supabase` stack. Proceed?"

If no stack is detected, ask: "What stack is this project using?" Only the two stacks above are currently supported — say so if a different stack is named.

Read from `package.json`:
- `name` → `{{PROJECT_NAME}}`
- `engines.node` → `{{NODE_VERSION}}` (default `24.x` if absent)

Set `{{SUPABASE_CLI_VERSION}}` = `2.90.0`.

### 2. Check for conflicts

Before writing any file, check whether it already exists. Collect a list of conflicts. If any exist, show the list and ask: "These files already exist — skip them all and continue?" Do not overwrite without explicit confirmation.

### 3. Apply templates

Template source: `~/.claude/templates/<detected-stack>/`

For each template file, read it, replace all `{{PLACEHOLDER}}` tokens with resolved values, and write to the corresponding path in the current project directory. Create parent directories as needed.

**nextjs-supabase** — files to apply (source → destination):

```
playwright.config.ts                          → playwright.config.ts
vitest.config.ts                              → vitest.config.ts
vitest.integration.config.ts                  → vitest.integration.config.ts
e2e/setup/constants.ts                        → e2e/setup/constants.ts
e2e/setup/global-setup.ts                     → e2e/setup/global-setup.ts
e2e/setup/global-teardown.ts                  → e2e/setup/global-teardown.ts
e2e/auth-state/.gitkeep                       → e2e/auth-state/.gitkeep
scripts/run-integration-if-supabase-up.js     → scripts/run-integration-if-supabase-up.js
scripts/run-e2e-if-supabase-up.js             → scripts/run-e2e-if-supabase-up.js
.github/workflows/ci.yml                      → .github/workflows/ci.yml
.github/workflows/integration.yml            → .github/workflows/integration.yml
.github/workflows/e2e.yml                    → .github/workflows/e2e.yml
.gitleaks.toml                                → .gitleaks.toml
AGENTS.md                                     → AGENTS.md
CLAUDE.md                                     → CLAUDE.md
```

**vite-react-supabase** — files to apply (source → destination):

```
vitest.config.js                              → vitest.config.js
vitest.integration.config.js                  → vitest.integration.config.js
playwright.config.js                          → playwright.config.js
playwright.authenticated.config.js            → playwright.authenticated.config.js
e2e/setup/personas.js                         → e2e/setup/personas.js
e2e/setup/auth.setup.js                       → e2e/setup/auth.setup.js
e2e/auth-state/.gitkeep                       → e2e/auth-state/.gitkeep
scripts/load-env-file.js                      → scripts/load-env-file.js
scripts/local-supabase-lock.js                → scripts/local-supabase-lock.js
scripts/with-local-supabase-lock.js           → scripts/with-local-supabase-lock.js
scripts/run-integration-if-supabase-up.js     → scripts/run-integration-if-supabase-up.js
scripts/run-e2e-if-supabase-up.js             → scripts/run-e2e-if-supabase-up.js
.github/workflows/ci.yml                      → .github/workflows/ci.yml
.github/workflows/integration.yml            → .github/workflows/integration.yml
.github/workflows/e2e.yml                    → .github/workflows/e2e.yml
AGENTS.md                                     → AGENTS.md
CLAUDE.md                                     → CLAUDE.md
```

Skip any file that was flagged as a conflict (unless the user confirmed overwrite).

### 4. Update package.json scripts

Merge the following scripts into `package.json`. Do not remove existing scripts — only add missing ones.

**nextjs-supabase scripts:**

```json
"test": "vitest run",
"test:watch": "vitest",
"test:unit": "vitest run --config vitest.config.ts",
"test:coverage": "vitest run --coverage",
"test:integration": "dotenv -e .env.local -- vitest run --config vitest.integration.config.ts",
"test:integration:watch": "dotenv -e .env.local -- vitest --config vitest.integration.config.ts",
"test:integration:ifup": "node scripts/run-integration-if-supabase-up.js",
"test:e2e": "dotenv -e .env.local -- playwright test",
"test:e2e:ui": "dotenv -e .env.local -- playwright test --ui",
"test:e2e:debug": "dotenv -e .env.local -- playwright test --debug",
"test:e2e:ifup": "node scripts/run-e2e-if-supabase-up.js",
"typecheck": "tsc --noEmit",
"ci:local": "npm run typecheck && npm run lint && npm run test:unit && npm run test:integration:ifup",
"ci:local:full": "npm run typecheck && npm run lint && npm run test:unit && npm run test:integration:ifup && npm run test:e2e:ifup"
```

**vite-react-supabase scripts:**

```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage",
"test:integration": "node scripts/with-local-supabase-lock.js -- vitest run --config vitest.integration.config.js",
"test:integration:raw": "vitest run --config vitest.integration.config.js",
"test:integration:ifup": "node scripts/run-integration-if-supabase-up.js",
"test:e2e": "playwright test",
"test:e2e:auth": "node scripts/with-local-supabase-lock.js -- playwright test --config playwright.authenticated.config.js",
"test:e2e:auth:raw": "playwright test --config playwright.authenticated.config.js",
"test:e2e:local-auth": "node scripts/with-local-supabase-lock.js -- node e2e/setup/seed-auth.js",
"test:e2e:ifup": "node scripts/run-e2e-if-supabase-up.js",
"check:schema": "echo 'CUSTOMISE THIS: replace with your schema validation script'",
"check:architecture": "echo 'CUSTOMISE THIS: replace with your architecture fitness check'",
"merge-gate": "npm run lint && npm run check:schema && npm run check:architecture && npm run test:coverage && npm run build && npm run test:e2e",
"ci:local:light": "npm run lint && npm run check:schema && npm run check:architecture && npm run test && npm run build",
"ci:local": "npm run merge-gate"
```

### 5. Update .gitignore

Append the following if not already present:

```
# Playwright
e2e/auth-state/*.json
playwright-report/
test-results/
```

### 6. Install dependencies

Run these commands:

```bash
npm install -D @playwright/test @vitest/coverage-v8 vitest dotenv-cli
npx playwright install chromium
```

### 7. Report

Print a summary:
- Stack detected and template applied
- Files created (list)
- Files skipped (list, if any)
- Scripts added to package.json
- Next steps (nextjs-supabase):
  1. Fill in the `## Project` section in `AGENTS.md`
  2. Fill in the `## Current Mode` section in `AGENTS.md`
  3. Customise `e2e/setup/global-setup.ts` with your app's data seeding
  4. Run `npm run ci:local` to verify the unit test baseline
  5. Run `npm run test:e2e` (with `supabase start` and dev server running) to verify e2e
- Next steps (vite-react-supabase):
  1. Fill in the `## Project` section in `AGENTS.md`
  2. Fill in the `## Current Mode` section in `AGENTS.md`
  3. Implement `check:schema` and `check:architecture` scripts (currently stubs)
  4. Customise `playwright.config.js` `testMatch` for your Phase A spec files
  5. Customise `playwright.authenticated.config.js` projects for your persona set
  6. Customise `e2e/setup/auth.setup.js` with profile flag validation and fixture checks
  7. Create `e2e/setup/seed-auth.js` to seed test accounts in local Supabase
  8. Run `npm run ci:local:light` to verify the baseline (no Supabase needed)
  9. With `supabase start` running: `npm run test:integration` and `npm run test:e2e:auth`

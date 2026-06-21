# project-standards

Canonical shared standards and project bootstrap templates for Stuart Crook projects.

This repo is the shared standards home for PickSix, Connections, and Take Me To Church. Product repos adopt the shared baseline from here, then keep their own stack-specific overlays, exceptions, and live task state locally.

It also installs Claude Code slash commands and project templates that wire up testing, CI workflows, and agent operating models onto new projects.

---

## Prerequisites

- [Claude Code](https://claude.ai/code) installed
- Node.js 20+
- For current Supabase template integration and e2e tests: [Supabase CLI](https://supabase.com/docs/guides/cli)

The shared standards baseline itself has no stack tooling prerequisite.

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

### Shared standards baseline

Current baseline: `standards-v0.5`

| Standard | File |
|---|---|
| Agent contract | `standards/agent-contract.md` |
| Agent permission boundaries | `standards/agent-permission-boundaries.md` |
| Agent permission user baseline | `standards/agent-permission-user-baseline.md` |
| Documentation governance | `standards/documentation-governance.md` |
| Review routing | `standards/review-routing.md` |
| Security baseline | `standards/security-baseline.md` |
| Disclosure response | `standards/disclosure-response.md` |
| Task queue | `standards/task-queue.md` |
| Branch and worktree | `standards/branch-and-worktree.md` |
| Context budget | `standards/context-budget.md` |
| Cost and subscriptions | `standards/cost-and-subscriptions.md` |
| Local gates | `standards/local-gates.md` |
| Dependency risk | `standards/dependency-risk.md` |
| Release and deploy | `standards/release-and-deploy.md` |
| Repository controls | `standards/repository-controls.md` |
| Dev tooling and package versioning | `standards/dev-tooling-and-package-versioning.md` |

Shared template: `templates/shared/agent-runtime-permission-report.md` provides an inspect-only report for agent runtime permission state, including Codex-style sandbox/session approvals and Claude-style settings.

Product adoption prompt: `docs/cross-project-standards/standards-v0.5-adoption-prompt.md`.

Proposed next-baseline standards are not adopted obligations until the CTO approves a version bump. Current proposals:

- `standards/knowledge-format.md` for a future OKF-compatible Markdown/frontmatter metadata, indexes, logs, and linkable agent-readable knowledge baseline. `project-standards/` is piloting this profile, but product repos are not required to adopt it for `standards-v0.5`.

Governance is recorded in `docs/adr/0001-shared-standards-home.md`. Changes are tracked in `CHANGELOG.md`. Git baseline tags start at `standards-v0.3` and continue forward.

Product adoption agents should read the published tag for the baseline they are adopting, such as `standards-v0.5`, rather than an arbitrary local checkout of `project-standards`. Standards drafting should happen on a separate visible worktree/branch until a new baseline is locked, tagged, and pushed.

This repo adopts the baseline it publishes. Its local adoption record is `docs/ops/standards-adoption.md`; agents should read `AGENTS.md` before changing shared standards or templates.

`project-standards/` is also the first adopter of the local OKF-compatible knowledge profile recorded in `docs/adr/0002-okf-compatible-knowledge-profile.md`. Shared standards now include YAML frontmatter and `standards/index.md` for progressive disclosure.

Acceptance review is recorded in `docs/cross-project-standards/standards-v0.1-acceptance-review.md`.

### Adoption model

Projects use a two-layer model:

1. Shared baseline in `project-standards/standards/`.
2. Product-local overlays in each repo.

To adopt the baseline:

1. Copy `templates/shared/standards-adoption.md` to the product repo as `docs/ops/standards-adoption.md`.
2. Record the branch/ref checked, adopted baseline version, upstream-current state, conformance debt, local overlays, deferred standards, known exceptions, and next convergence task.
3. Update local `AGENTS.md`, review routing, branch/worktree rules, context/read-tier notes, cost/subscription notes, security docs, local gates, dependency-risk policy, and release/deploy docs to point to the shared baseline and preserve stack-specific rules.
4. Route adoption review through DOC primary, with ARC for architecture language, CTO for cost/subscription posture, PLT for gates and deploy language, and SEC for security, dependency, and disclosure language.

Coverage methodology is an optional product-local overlay. Adopt coverage docs only when they match the repo's actual test stack, paths, thresholds, and domain risks; stale or wrong-project coverage files should be cleaned up separately from standards adoption.

When a product-local methodology decision should apply elsewhere, do not copy the product doc directly. Record it as an upstream candidate, move the reusable principle into `project-standards/`, then open explicit adoption tasks in the affected product queues.

PickSix is the AWS/CDK proof case for this baseline. Its retrofit should preserve AWS CDK, Lambda, DynamoDB, split frontend/backend coordination, deploy-context hazards, and standings backtests as local overlay rules rather than forcing Supabase-shaped assumptions onto the project.

Connections should keep MCP/content, Supabase Edge Function, and release/dogfood rituals local. Take Me To Church should keep launch-gate security, RLS, service-role, AAL, and capability-model work local.

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

## CI And Cost Budget

Templates should stay aligned with the user's actual subscriptions. Do not assume paid GitHub, Supabase, AWS, OpenAI, vendor API, or hosting capacity exists unless the product overlay records that subscription.

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

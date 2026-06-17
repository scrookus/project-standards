# Dev Tooling And Package Versioning Audit Prompt

Status: active
Owner: PLT
Audience: CTO / PLT / ENG / SEC / DOC
Last reviewed: 2026-06-17

## Purpose

Use this prompt in PickSix, Connections, and TMTC to evaluate the proposed `project-standards/standards/dev-tooling-and-package-versioning.md` standard before deciding whether it becomes part of `standards-v0.3`.

This is a read-only audit. Do not upgrade packages, rewrite lockfiles, change CI versions, or alter release tooling during the audit.

## Prompt

Start in `<PRODUCT_REPO>`.

Read first:

1. `AGENTS.md`
2. `docs/ops/standards-adoption.md`, if present
3. `docs/security/dependency-risk.md` or local equivalent, if present
4. `docs/testing/local-gates.md` or local equivalent, if present
5. `docs/release/release-and-deploy.md` or local equivalent, if present
6. `package.json`, lockfiles, `.nvmrc`, `.node-version`, Dockerfiles, and tool config files
7. `.github/dependabot.yml`, `.github/workflows/*`, and local hook scripts, if present
8. `project-standards/standards/dev-tooling-and-package-versioning.md`

Mission:

Audit whether this repo has a clear, accurate, enforceable record for development tooling and package versioning:

- runtime versions used locally and in CI
- package manager and deterministic install command
- lockfile policy and lockfile ownership
- where tool versions are pinned
- setup commands after clone or worktree creation
- generated tooling artifacts: committed vs local-only
- local hook setup/update process
- dependency version style by class
- major upgrade rules
- GitHub Actions/action versioning posture
- Dependabot/Renovate grouping and auto-merge posture
- accepted audit findings and allowlist process
- internal package, MCP tool, template, or content-bundle versioning
- package publication checks, release notes, rollback/yank path, and consumer adoption path
- cost/subscription implications of tooling changes

Constraints:

- Do not edit files.
- Do not run package upgrades.
- Do not regenerate lockfiles.
- Do not install new tools unless explicitly asked.
- Separate product-local rules from upstream-standard candidates.
- Preserve stack-specific tooling; the goal is a consistent record, not identical versions across projects.

Expected output:

1. Branch/status/dirty-file risk.
2. Evidence table:
   - Tooling/version surface
   - Documented where
   - Observed where
   - Gap
   - Suggested owner
3. Required product-local follow-up tasks.
4. Proposed upstream changes to `project-standards/standards/dev-tooling-and-package-versioning.md`, if any.
5. CTO recommendation: promote as-is, promote with edits, or keep proposed.

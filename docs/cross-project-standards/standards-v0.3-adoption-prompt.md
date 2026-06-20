# Standards v0.3 Adoption Prompt

Status: active
Owner: DOC
Audience: CTO / DOC / PLT / ENG / SEC
Last reviewed: 2026-06-18

## Purpose

Use this prompt in PickSix, Connections, and TMTC after the CTO promotes `standards-v0.3`.

This prompt is for adoption documentation and product-local overlay alignment. It is not permission to change GitHub repository settings, upgrade packages, rewrite lockfiles, alter branch protection, rotate secrets, or change CI behavior unless the user explicitly asks for implementation after the adoption pass.

## Prompt

Start in `<PRODUCT_REPO>`.

Read first:

1. `AGENTS.md`
2. `docs/ops/standards-adoption.md`
3. `docs/ops/task-queue.md`
4. Product-local branch/worktree, local-gates, release/deploy, dependency-risk, and cost/subscription docs, if present
5. `project-standards/standards/repository-controls.md`
6. `project-standards/standards/dev-tooling-and-package-versioning.md`
7. `project-standards/standards/documentation-governance.md`
8. `project-standards/templates/shared/standards-adoption.md`

Mission:

Adopt `standards-v0.3` locally while preserving the two-layer model:

- Shared baseline lives in `project-standards`.
- Product-local overlays record exact branch names, tools, settings, commands, exceptions, and follow-up tasks.
- Stack-specific rules stay local.

Required v0.3 adoption scope:

1. Update `docs/ops/standards-adoption.md` from `standards-v0.2` to `standards-v0.3`.
2. Add local overlay coverage for repository controls:
   - default/production branches
   - protected branches and intended settings
   - merge methods and review requirements
   - required checks and CI workflow names
   - push policy and origin-publication triggers
   - direct-to-main/bypass rules
   - branch cleanup policy
   - CI/deploy secrets and environment ownership
   - worktree-sensitive artifact classes: versioned shared, shared local authority, generated mirrors, and private worktree-local files
3. Add local overlay coverage for dev tooling and package versioning:
   - runtime/toolchain versions
   - package manager and deterministic install command
   - lockfile policy
   - dependency version style
   - major-upgrade rules
   - Dependabot/Renovate posture
   - GitHub Actions/tooling pinning
   - package publication/versioning, if applicable
4. Tighten deferred standards and upstream candidates:
   - Each deferral must name a queue item, review date, or explicit trigger.
   - Each upstream candidate must name a queue item, review date, or explicit trigger.
   - Do not leave ledger-only aspirations with no mechanism to resurface.
5. Update `AGENTS.md` only if it needs a short pointer to the adopted baseline or new overlays.
6. Add product-local task queue entries for gaps found during adoption.

Constraints:

- Do not change actual GitHub settings during this pass.
- Do not upgrade dependencies or regenerate lockfiles during this pass.
- Do not invent branch protection facts. If a setting cannot be observed locally, mark it as "needs GitHub verification" and queue it.
- When writing inventory tables for workflows, runtimes, secrets, branch protections, required checks, package/tool versions, or CI jobs, read the source file during table construction rather than relying on memory from an earlier scan.
- Mark uncertain facts as "needs verification" instead of presenting them as current state.
- Keep product-specific details local; do not copy another product's overlay.
- Keep edits short and enforceable.
- Route DOC primary, or the local role that absorbs DOC. Route PLT, or the local platform/tooling owner, for repo controls/tooling/CI; ENG for build/runtime impact; SEC for branch bypass/secrets/dependency posture; and CTO for version/cost/subscription decisions.

Expected output:

1. Files changed.
2. Baseline updated to `standards-v0.3`.
3. New or updated local overlays.
4. Gaps queued with task IDs.
5. Any GitHub-setting or package-version facts that still need human/`gh` verification.
6. Recommended review lanes before merge.

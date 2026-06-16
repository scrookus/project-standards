# project-standards Agent Contract

Status: active
Owner: DOC
Audience: CTO / DOC / ARC / PLT / SEC / ENG / QAT / UAT / REV / UXD
Last reviewed: 2026-06-16

## Project

`project-standards/` is the canonical shared standards home for PickSix, Connections, and Take Me To Church. It also contains bootstrap templates and Claude command assets.

## Standards Baseline

This repo adopts the same `standards-v0.2` baseline that it publishes.

Local overlays:

- `docs/ops/standards-adoption.md`
- `docs/ops/task-queue.md`
- `docs/ops/branch-and-worktree.md`
- `docs/ops/context-budget.md`
- `docs/ops/cost-and-subscriptions.md`
- `docs/review/routing.md`
- `docs/testing/local-gates.md`
- `docs/release/release-and-deploy.md`
- `docs/security/dependency-risk.md`

## Current Mode

Canonical standards and template maintenance. This repo is authoritative, not exempt: material changes to shared standards require review, changelog updates, and product adoption tasks when they affect product repos.

## First-Read Rules

- Read `README.md`, `CHANGELOG.md`, and `docs/ops/standards-adoption.md` before changing shared standards.
- Preserve the two-layer model: shared baseline here, product-local overlays in product repos.
- Keep first-read context concise; put long methodology and history behind linked read triggers.
- Prefer concise, high-signal responses and minimal sufficient code. Avoid generated prose, broad diffs, and speculative implementation that do not move the task forward.
- Do not copy product-local methodology into shared standards wholesale. Extract the reusable principle and leave stack-specific details local.
- Cost/subscription assumptions must match `docs/ops/cost-and-subscriptions.md`; do not assume paid tiers or higher quotas.
- Use `docs/ops/branch-and-worktree.md` before switching branches or running parallel work.
- Shared standards changes must update `CHANGELOG.md`.
- Standards version bump decisions are owned by CTO. Reviewers may recommend no bump, patch, minor, or major, but CTO decides the baseline version.
- Product-impacting standards changes must create or identify adoption tasks for affected product queues.

## Review

Route by touched surface using `docs/review/routing.md`.

DOC is primary for standards text and adoption templates. CTO reviews governance, task ownership, and cost/subscription posture. ARC reviews shared-vs-local boundaries. PLT reviews gates, branch/worktree, release, and workflow language. SEC reviews security, dependency, disclosure, vendor, and public-risk language.

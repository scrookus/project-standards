---
type: Template
title: Standards v0.5 Adoption Prompt
description: Prompt for product repos adopting the agent permission boundary v0.5 baseline.
resource: docs/cross-project-standards/standards-v0.5-adoption-prompt.md
tags: [standards, adoption, v0.5, permissions, security]
timestamp: 2026-06-21T00:00:00-07:00
status: active
owner: SEC
okf_version: "0.1"
---
# Standards v0.5 Adoption Prompt

Status: active
Owner: SEC
Audience: CTO / SEC / PLT / DOC
Last reviewed: 2026-06-21

## Purpose

Use this prompt for product repos adopting `standards-v0.5`.

`standards-v0.5` is an agent permission boundary baseline. It adds:

- `standards/agent-permission-user-baseline.md`
- `standards/agent-permission-boundaries.md`
- `templates/shared/agent-runtime-permission-report.md`

This is security-sensitive work. Do not change runtime permissions during the initial inventory pass.

## Prompt

Start in `<PRODUCT_REPO>`.

Before answering adoption status, record the current branch/ref, commit SHA, and date. Adoption state is not repo-wide when branches diverge.

Use `project-standards` at the published `standards-v0.5` tag. Do not read a local `project-standards` checkout's current branch as the baseline unless the user explicitly asks for unreleased standards work.

Read first:

1. `AGENTS.md`
2. `docs/ops/standards-adoption.md`
3. Product-local security, branch/worktree, repository-controls, dev-tooling/package-versioning, local-gates, and release/deploy overlays
4. `project-standards/standards/agent-permission-user-baseline.md`
5. `project-standards/standards/agent-permission-boundaries.md`
6. `project-standards/templates/shared/agent-runtime-permission-report.md`

Mission:

Adopt `standards-v0.5` in stages while preserving product-local overlays and without silently expanding or narrowing agent authority.

Stage A: inventory and classification only.

1. Fill out the runtime permission report or a product-local equivalent.
2. Classify user-level, managed, project-level, session-level, and worktree-local permission state.
3. Record the expected user-level baseline source and whether it is enforced, detected, reviewed, or absent.
4. Name local/session drift and any credential-bearing approval entries without printing secrets.
5. Update `docs/ops/standards-adoption.md` with permission authority layers, adoption status, and conformance debt.
6. Queue product-local follow-ups for empirical verification, drift detection, deny/ask policy, local approval cleanup, and credential cleanup.

Stage B and later: permission-change sessions only.

Do not implement these during Stage A unless the user explicitly starts a permission-change session.

1. Empirically verify runtime precedence across user, managed, project, session, and local settings.
2. Add detection for local/session drift if hard prevention is unavailable.
3. Add or verify deny rules for the user-level baseline.
4. Add or verify ask rules for high-blast-radius operations.
5. Promote safe routine allows only after reviewing local approval drift.
6. Clean up broad, stale, or credential-bearing local approvals.

Constraints:

- Do not edit user-level, project-level, session-level, or local permission settings during Stage A.
- Do not print secrets, tokens, credential values, or secret-bearing command contents.
- Do not treat prompt approval as permission to broaden future authority.
- Do not claim hard prevention unless managed policy or verified runtime semantics prove lower-scope settings cannot override the baseline.
- If only detection and review controls exist, say so plainly.
- Route SEC primary, PLT for enforcement/tooling, CTO for user-level authority and task priority, DOC for adoption ledger clarity.

Expected output:

1. Files changed.
2. Branch/ref checked, adopted version, upstream-current state, and conformance debt.
3. Permission authority layers and runtime report location.
4. Enforcement posture: hard prevention, detection/review only, or unknown.
5. Empirical verification status and follow-up task IDs.
6. Credential or local-drift cleanup tasks, with no secrets printed.
7. Local gates or verification run, or reason not run.
8. Review lanes before merge.

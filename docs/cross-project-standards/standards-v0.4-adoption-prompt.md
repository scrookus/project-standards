---
type: Template
title: Standards v0.4 Adoption Prompt
description: Prompt for product repos adopting the operational coordination and worktree-safety v0.4 baseline.
resource: docs/cross-project-standards/standards-v0.4-adoption-prompt.md
tags: [standards, adoption, v0.4, worktrees, coordination]
timestamp: 2026-06-21T00:00:00-07:00
status: active
owner: DOC
okf_version: "0.1"
---
# Standards v0.4 Adoption Prompt

Status: active
Owner: DOC
Audience: CTO / DOC / PLT / SEC
Last reviewed: 2026-06-21

## Purpose

Use this prompt for product repos adopting or upgrading to `standards-v0.4`.

`standards-v0.4` is an operational coordination and worktree-safety baseline. It assumes the repo has already adopted `standards-v0.3`, including repository-controls and dev-tooling/package-versioning obligations. If the repo has not adopted `standards-v0.3`, complete that adoption first or include the missing v0.3 scope explicitly.

`standards-v0.4` does not require product repos to adopt the proposed OKF-compatible knowledge format or `standards-v0.5` agent-permission obligations.

## Prompt

Start in `<PRODUCT_REPO>`.

Before answering adoption status, record the current branch/ref, commit SHA, and date. Adoption state is not repo-wide when branches diverge.

Read first:

1. `AGENTS.md`
2. `docs/ops/standards-adoption.md`
3. `docs/ops/task-queue.md`
4. Product-local branch/worktree and repository-controls overlays, if present
5. `project-standards/standards/branch-and-worktree.md`
6. `project-standards/standards/task-queue.md`
7. `project-standards/standards/repository-controls.md`
8. `project-standards/standards/documentation-governance.md`

Use `project-standards` at the published `standards-v0.4` tag. Do not read a local `project-standards` checkout's current branch as the baseline unless the user explicitly asks for unreleased standards work.

Mission:

Adopt `standards-v0.4` locally while preserving product-local overlays and active work arcs.

Required scope:

1. Update `docs/ops/standards-adoption.md` to `standards-v0.4`.
   - Record branch/ref checked, commit SHA, adopted version, upstream-current state, and conformance debt separately when the local ledger supports it.
2. Update branch/worktree policy for:
   - local-first Git communication and origin-publication triggers
   - preferred visible worktree layout
   - no new `.claude/worktrees/` or other hidden/tool-specific worktrees
   - stale worktree cleanup and retained-worktree ownership
   - mandatory closure summary, lessons learned, and follow-up proposals
3. Update task queue or coordination policy for:
   - shared-local authority versus generated mirrors
   - stale worktree mitigation
   - where reusable lessons and standards candidates are queued
4. Update repository-controls overlay for push policy and any CI/deploy side effects from origin pushes.
5. Queue product-local follow-ups for active worktrees that must complete current arcs before cleanup or migration.

Constraints:

- Do not interrupt active product work arcs.
- Do not remove a worktree unless it is clean, merged or abandoned, and clearly owned by the current closure task.
- Do not make OKF/frontmatter backfill part of this adoption unless the user explicitly asks.
- Do not change agent permission policy, approved command prefixes, runtime permission settings, or local permission files as part of this adoption. If permission state is relevant, inventory it read-only and queue `standards-v0.5` follow-up work.
- Do not edit CTO-owned active queue state unless the session is explicitly acting as CTO or the user confirms the queue update. Otherwise, propose queue entries or record the needed CTO follow-up.
- Keep product-specific paths, branch names, and automation local.
- Route DOC primary, PLT for worktree/repo controls, SEC for bypass or sensitive coordination language, and CTO for queue authority.

Expected output:

1. Files changed.
2. Baseline updated to `standards-v0.4`, with branch/ref checked, adopted version, upstream-current state, and conformance debt named where applicable.
3. Worktrees retained, removed, or queued for cleanup.
4. Product-local follow-up task IDs.
5. Local gates or verification run, or reason not run.
6. Review lanes before merge.

# Repository Controls Audit Prompt

Status: active
Owner: PLT
Audience: CTO / PLT / SEC / DOC
Last reviewed: 2026-06-17

## Purpose

Use this prompt in PickSix, Connections, and TMTC to evaluate the proposed `project-standards/standards/repository-controls.md` standard before deciding whether it becomes part of `standards-v0.3`.

This is a read-only audit. Do not change repository settings, branch protection, workflows, secrets, or merge rules during the audit.

## Prompt

Start in `<PRODUCT_REPO>`.

Read first:

1. `AGENTS.md`
2. `docs/ops/standards-adoption.md`, if present
3. `docs/ops/branch-and-worktree.md`, if present
4. `docs/testing/local-gates.md` or local equivalent, if present
5. `docs/release/release-and-deploy.md` or local equivalent, if present
6. `.github/workflows/*`, if present
7. `project-standards/standards/repository-controls.md`

Mission:

Audit whether this repo has a clear, accurate, enforceable record for repository controls:

- default branch and production branch
- protected branches and intended protections
- merge methods allowed
- linear-history expectations
- required PR reviews and review lanes
- required status checks by branch
- bypass permissions and emergency process
- direct-to-main carve-outs and notation
- branch cleanup after merge
- local hook installation expectations
- dependency-update merge posture
- CI workflow names, triggers, path filters, concurrency, and cost posture
- CI/deploy secrets and environment ownership

Constraints:

- Do not edit files.
- Do not change GitHub repository settings.
- Do not infer settings from intent alone. Separate "documented", "observed", and "unknown".
- If GitHub settings are not locally visible, say exactly what needs to be checked by a human or via `gh`.
- Preserve product-local exceptions. The goal is consistency of record, not identical settings across projects.

Expected output:

1. Branch/status/dirty-file risk.
2. Evidence table:
   - Control
   - Documented where
   - Observed where
   - Gap
   - Suggested owner
3. Required product-local follow-up tasks.
4. Proposed upstream changes to `project-standards/standards/repository-controls.md`, if any.
5. CTO recommendation: promote as-is, promote with edits, or keep proposed.

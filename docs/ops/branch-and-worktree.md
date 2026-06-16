# project-standards Branch And Worktree Rules

Status: active
Owner: PLT
Audience: CTO / PLT / DOC / SEC / ENG / REV
Last reviewed: 2026-06-16

Baseline: `standards/branch-and-worktree.md`

## Core Rules

- Parallel agents must use separate branches and separate worktrees.
- Branches isolate history; worktrees isolate files.
- Do not switch branches in a dirty shared checkout unless you own the dirty files.
- Standards, templates, commands, and docs that change operating behavior should land by PR unless CTO explicitly approves a direct-to-main carve-out.
- Low-risk typo or broken-link fixes may go direct only when no operating rule, template behavior, review route, cost posture, or security language changes.

## Worktree Setup

After creating a worktree, copy or recreate local-only agent settings needed for that path. `.claude/settings.local.json` remains local-only per checkout/worktree and must not be committed.

## PR Closure

For queued standards work, include `Closes <ID>` or `Task: <ID>` in the PR body. After merge, update `CHANGELOG.md` and affected product adoption tasks as needed.

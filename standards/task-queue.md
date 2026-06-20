---
type: Standard
title: Task Queue Standard
description: CTO-owned task queue, authority, mirror, and coordination rules.
resource: standards/task-queue.md
tags: [standards, task, queue]
timestamp: 2026-06-20T00:00:00-07:00
standards_version: standards-v0.4
status: baseline
owner: CTO
okf_version: "0.1"
---
# Task Queue Standard

Version: standards-v0.4
Status: baseline
Owner: CTO
Review: DOC primary for format; CTO for active work ownership; PLT, SEC for active work lanes

## Requirement

Each product repo must have one visible CTO-owned active-work queue or a documented coordination model if the product spans multiple repos.

Recommended path:

- `docs/ops/task-queue.md`

Recommended adoption path:

- `docs/ops/standards-adoption.md`

## Queue Rules

- The queue is for active work, blockers, next actions, and near-term decisions.
- It is not the permanent history log.
- Each product must declare the queue authority: the place where accepted task state is changed and audited.
- A tracked Markdown queue may be the authority for small or low-concurrency repos, but the product must document stale-worktree mitigation if multiple agents or long-lived worktrees are active.
- For high-concurrency repos, prefer latest-wins authority outside per-branch snapshots, such as GitHub Issues, with an optional generated read-only Markdown mirror for agent context.
- Products may choose a local-first authority instead of GitHub when it is faster, resilient, and branch-independent. Local-first authority must have a single writer or an append-only/transactional write path so parallel agents do not overwrite each other.
- If a repo keeps a generated queue mirror, the mirror must say it is generated and local edits must be rejected by hook, CI, or documented review rule.
- CTO owns active priority and queue state unless the product explicitly delegates a scoped write.
- Agents acting as CTO must make that authority explicit in the session, task, commit/PR body, or queue note.
- Unknown dirty queue edits are treated as owned by another human or agent. Preserve them; do not overwrite, reorder, or fold new queue changes into them without explicit confirmation.
- Keep entries skim-sized.
- Move long closure detail to ADRs, release notes, postmortems, review records, or archived queue notes.
- Keep only the most useful recent completed entries, with a local cap documented by the project.
- Include role owner, status, priority, next action, and blocker if present.
- Avoid making agents read the whole queue by default when a scoped "next/active for my lane" view is available.

## Entry Shape

```md
| ID | Owner | Status | Priority | Summary | Next Action | Blocker |
|---|---|---|---|---|---|---|
| STD-001 | DOC | Active | High | Adopt standards-v0.2 | Draft local overlay | None |
```

Cost, subscription, or quota decisions belong to CTO-owned queue entries or ADRs when they affect recurring spend, paid tier changes, production readiness, or ongoing automation.

## Dirty Queue Handoff

When a session finds uncommitted changes in the CTO-owned queue:

1. Identify the changed rows or sections.
2. State whether they appear related to the current task.
3. Ask for confirmation before editing the queue unless the session is explicitly acting as CTO.
4. Prefer a separate worktree for unrelated work rather than switching branches or staging around unknown queue edits.

## Authority Versus Mirror

Active task authority and agent-readable context do not have to be the same artifact.

- Authority is where task state changes: accepted, active, blocked, done, deferred, owner, blocker, and next action.
- A mirror is a generated or copied view used for startup context, summaries, dashboards, or docs.
- If authority and mirror differ, the mirror must state where authority lives and how freshness is checked.
- If authority stays in a tracked repo file, the product must explain how agents avoid stale queue snapshots in worktrees.
- If authority moves to GitHub Issues or another tracker, the product must explain label/status mapping, ID mapping, review ownership, and how repo-local mirrors are regenerated.
- If authority moves to local state outside Git history, such as an append-only log, SQLite database, local memory directory, or generated queue store, the product must explain locking, backup, mirror generation, and when state is published to origin.
- Shared local authority must be outside per-worktree branch snapshots or must use a documented refresh/lock protocol that prevents stale worktrees from overwriting newer task state.

Do not let a stale mirror override the authority source. When task state affects current work, agents should check the authority or a documented fresh sync point before changing status, staging queue files, or committing queue-related edits.

## Split-Repo Products

Split products must avoid competing queues. PickSix should decide during retrofit whether `picksix/` and `picksix-frontend/` share one canonical queue or each repo keeps a local queue with a parent coordination index.

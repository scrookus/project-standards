# Task Queue Standard

Version: standards-v0.2
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

## Split-Repo Products

Split products must avoid competing queues. PickSix should decide during retrofit whether `picksix/` and `picksix-frontend/` share one canonical queue or each repo keeps a local queue with a parent coordination index.

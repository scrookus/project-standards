---
type: Standard
title: Context Budget Standard
description: Context size, read-tier, and startup-load rules for agent work.
resource: standards/context-budget.md
tags: [standards, context, budget]
timestamp: 2026-06-20T00:00:00-07:00
standards_version: standards-v0.2
status: baseline
owner: DOC
okf_version: "0.1"
---
# Context Budget Standard

Version: standards-v0.2
Status: baseline
Owner: DOC
Review: DOC primary; CTO for operating priority; PLT for agent workflow; SEC for sensitive-context handling

## Requirement

Each product repo must keep first-read agent context small enough that agents can reliably apply the rules. Long history, methodology, transcripts, audits, and examples belong in linked docs, not in the startup contract.

Context bloat is an operating risk: agents may drop rules, miss ownership boundaries, or fail to apply safety guidance when required reading becomes too large or repetitive.

## Rules

- `AGENTS.md` is the startup contract, not the full project manual.
- `CLAUDE.md` should be a thin wrapper or pointer to `AGENTS.md`.
- First-read docs must link to deeper overlays instead of copying their full content.
- Role-specific or surface-specific rules belong in focused docs or specialist wrappers.
- Historical detail belongs in ADRs, changelogs, review records, postmortems, or archives, not active startup context.
- Active queues should stay skim-sized and move closure detail elsewhere.
- Sensitive material should not be kept in large always-read files; keep it local-only or in the appropriate restricted surface.
- Product overlays must document what agents read by default versus what they read only when a touched surface requires it.
- Context reviews should consider output volume as well as input size. Prefer concise, high-signal responses and minimal sufficient code. Avoid generated prose, broad diffs, and speculative implementation that do not move the task forward.

## Read Tiers

Use three tiers:

| Tier | Purpose | Examples |
|---|---|---|
| First-read | Always read before substantive work. | `AGENTS.md`, current task queue, adoption pointer. |
| Surface-read | Read when a touched surface requires it. | Security baseline, release/deploy, local gates, coverage methodology, architecture docs. |
| Reference | Read only for decisions, audits, or historical context. | ADRs, postmortems, long reviews, archived queues. |

## Review Cadence

Run a context budget check:

- During standards adoption or baseline upgrade.
- Before material changes to `AGENTS.md`, `CLAUDE.md`, task queue, review routing, or specialist agent wrappers.
- After an agent misses a rule, applies the wrong owner, or reads the wrong surface.
- During a periodic CTO/DOC standards sweep.
- Before adding a new required first-read doc.

## Validation Checklist

Use these checks:

- `AGENTS.md` stays concise enough to read in one pass.
- `CLAUDE.md` remains a wrapper or pointer.
- First-read set is limited and explicitly named.
- Surface-read docs have clear triggers.
- Long docs are not required startup reading.
- Duplicate rules are consolidated or linked to one canonical wording.
- Task queue startup can focus on current/next active work rather than full history.
- Specialist rules live in specialist overlays or wrappers.
- Stale or wrong-project docs are archived, rewritten, or queued for cleanup.

## Review

DOC reviews context size, duplication, and readability. CTO decides whether a rule belongs in first-read context. PLT reviews whether agent startup and worktree setup reliably surface required rules. SEC reviews sensitive-context placement.

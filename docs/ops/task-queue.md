---
type: TaskQueue
title: project-standards Task Queue
description: CTO-owned queue for shared standards and template work.
resource: docs/ops/task-queue.md
tags: [ops, task-queue, cto]
timestamp: 2026-06-20T00:00:00-07:00
status: active
owner: CTO
okf_version: "0.1"
---
# project-standards Task Queue

Status: active
Owner: CTO
Audience: CTO / DOC / ARC / PLT / SEC / ENG / QAT
Last reviewed: 2026-06-18

This is the CTO-owned queue for shared standards and template work. Product repos keep their own active queues; this queue tracks shared baseline changes and cross-product adoption handoffs.

| ID | Owner | Status | Priority | Summary | Next Action | Blocker |
|---|---|---|---|---|---|---|
| PSTD-001 | DOC | Active | High | Self-adopt `standards-v0.2` in `project-standards`. | Run self-adoption review and commit/PR the baseline. | None |
| PSTD-002 | CTO | Pending | High | Track cross-project adoption of `standards-v0.2`. | PickSix and TMTC have adopted v0.2; drive PSTD-005 for Connections and keep adoption follow-ups visible in product queues. | `standards-v0.2` branch must merge first. |
| PSTD-003 | CTO | Done | Medium | Triage PickSix upstream standards candidates. | Promoted reusable principles into release/deploy, dependency-risk, and local-gates standards; product-specific syntax stays local. | None |
| PSTD-004 | CTO | Done | High | PickSix `standards-v0.2` adoption handoff. | PickSix v0.2 follow-up was created/handled by CTO; product-local queue/history owns implementation detail. | None |
| PSTD-005 | DOC | Pending | High | Connections `standards-v0.2` adoption handoff. | Create/identify a Connections queue item to adopt v0.2 while keeping MCP/content, SET/PUZ/CON, Supabase, and release/dogfood rules local. Focus on context budget and active queue size. | `standards-v0.2` branch must merge first. |
| PSTD-006 | DOC | Done | High | TMTC `standards-v0.2` adoption handoff. | TMTC adopted v0.2; product-local queue/history owns implementation detail and follow-ups. | None |
| PSTD-007 | DOC | Done | Medium | Triage reusable PickSix agent-handoff patterns. | Inventory recorded in `docs/cross-project-standards/picksix-agent-handoff-inventory.md`; reusable coverage, migration-safety, data-boundary, and auth-assurance principles were promoted into standards; design-system and observability remain future candidates. | PickSix `PK6-STD-006` should use the inventory to decide keep, replace, archive, or delete per file. |
| PSTD-008 | PLT | Pending | High | Decide repository-controls baseline for `standards-v0.3`. | Run `docs/cross-project-standards/repository-controls-audit-prompt.md` against PickSix, Connections, and TMTC; then decide whether to promote `standards/repository-controls.md` into the next baseline. | Requires CTO version-bump decision. |
| PSTD-009 | PLT | Pending | High | Decide dev-tooling/package-versioning baseline for `standards-v0.3`. | Run `docs/cross-project-standards/dev-tooling-package-versioning-audit-prompt.md` against PickSix, Connections, and TMTC; then decide whether to promote `standards/dev-tooling-and-package-versioning.md` into the next baseline. | Requires CTO version-bump decision. |
| PSTD-010 | DOC | Pending | Medium | Evaluate agent-session-rituals standard or template. | Compare Connections role identity, `/check-comms`, and `/wrap` with TMTC memory/context containment and PickSix session practices; decide whether to draft shared guidance for session startup, coordination checks, and concise wraps. | Wait until Connections v0.2 adoption exposes which rituals remain product-local. |
| PSTD-011 | DOC | Pending | Medium | Tighten queue-backed triggers and queue authority guidance. | Review `standards/documentation-governance.md`, `standards/task-queue.md`, and `templates/shared/standards-adoption.md`; require upstream candidates and deferred standards to name a queue item, trigger, or review date, and validate task-queue authority/mirror language against TMTC ADR 0016. | Use Connections post-adoption feedback and TMTC ADR 0016 as proof cases. |
| PSTD-012 | DOC | Pending | High | Prepare `standards-v0.3` product adoption prompt. | Drafted `docs/cross-project-standards/standards-v0.3-adoption-prompt.md`; after CTO promotes v0.3, use it to open adoption tasks in PickSix, Connections, and TMTC. | Requires v0.3 promotion decision. |
| PSTD-013 | DOC | Pending | Medium | Backfill OKF-compatible metadata beyond shared standards. | Convert priority overlays, templates, cross-project registers, and ADRs after the shared standards adoption proves the profile. | Do not bulk-edit historical docs without review; start with first-read and surface-read docs. |

## Queue Rules

- CTO owns active priority and queue state.
- CTO owns standards version bump decisions.
- Agents acting as CTO must say so explicitly; unknown dirty queue edits are treated as active coordination state and preserved.
- DOC may update format and standards-adoption details when acting on an approved standards task.
- Material standards changes that affect products should name the downstream product tasks or explicitly say none are needed.

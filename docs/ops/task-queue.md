---
type: TaskQueue
title: project-standards Task Queue
description: CTO-owned queue for shared standards and template work.
resource: docs/ops/task-queue.md
tags: [ops, task-queue, cto]
timestamp: 2026-06-21T00:00:00-07:00
status: active
owner: CTO
okf_version: "0.1"
---
# project-standards Task Queue

Status: active
Owner: CTO
Audience: CTO / DOC / ARC / PLT / SEC / ENG / QAT
Last reviewed: 2026-06-21

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
| PSTD-008 | PLT | Done | High | Decide repository-controls baseline for `standards-v0.3`. | Promoted into `standards-v0.3`; later v0.4 adds push-policy language. | None |
| PSTD-009 | PLT | Done | High | Decide dev-tooling/package-versioning baseline for `standards-v0.3`. | Promoted into `standards-v0.3`; OKF remains a separate future-baseline candidate. | None |
| PSTD-010 | DOC | Pending | Medium | Evaluate agent-session-rituals standard or template. | Compare Connections role identity, `/check-comms`, and `/wrap` with TMTC memory/context containment and PickSix session practices; decide whether to draft shared guidance for session startup, coordination checks, and concise wraps. | Wait until Connections v0.2 adoption exposes which rituals remain product-local. |
| PSTD-011 | DOC | Pending | Medium | Tighten queue-backed triggers and queue authority guidance. | Review `standards/documentation-governance.md`, `standards/task-queue.md`, and `templates/shared/standards-adoption.md`; require upstream candidates and deferred standards to name a queue item, trigger, or review date, and validate task-queue authority/mirror language against TMTC ADR 0016. | Use Connections post-adoption feedback and TMTC ADR 0016 as proof cases. |
| PSTD-012 | DOC | Done | High | Prepare `standards-v0.3` product adoption prompt. | Used as the Connections PR #615 adoption baseline; `standards-v0.3` is tagged from that proof case. | None |
| PSTD-013 | DOC | Pending | Medium | Backfill OKF-compatible metadata beyond shared standards. | Convert priority overlays, templates, cross-project registers, and ADRs after the shared standards adoption proves the profile. | Do not bulk-edit historical docs without review; start with first-read and surface-read docs. |
| PSTD-014 | DOC | Active | High | Coordinate `standards-v0.4` / `standards-v0.4.1` product adoption. | Connections adopted `standards-v0.4.1`; use the published `standards-v0.4.1` tag and adoption prompt for PickSix and TMTC when current work arcs allow. | Do not interrupt active product work arcs. |
| PSTD-015 | SEC | Done | High | Decide agent-permission-boundaries baseline for `standards-v0.5`. | Added `standards/agent-permission-user-baseline.md`, promoted `standards/agent-permission-boundaries.md`, added the runtime report template, and created a staged `standards-v0.5` adoption prompt based on TMTC PLT-030 and Connections readiness feedback. | None |
| PSTD-016 | SEC | Pending | High | Coordinate `standards-v0.5.1` product adoption. | After `standards-v0.5.1` is tagged, use `docs/cross-project-standards/standards-v0.5-adoption-prompt.md`; Connections starts with Stage A inventory/classification, PickSix and TMTC adopt after their current v0.4.1 work arcs allow. | Requires published `standards-v0.5.1` tag. |

## Queue Rules

- CTO owns active priority and queue state.
- CTO owns standards version bump decisions.
- Agents acting as CTO must say so explicitly; unknown dirty queue edits are treated as active coordination state and preserved.
- DOC may update format and standards-adoption details when acting on an approved standards task.
- Material standards changes that affect products should name the downstream product tasks or explicitly say none are needed.

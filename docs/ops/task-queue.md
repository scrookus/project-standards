# project-standards Task Queue

Status: active
Owner: CTO
Audience: CTO / DOC / ARC / PLT / SEC / ENG / QAT
Last reviewed: 2026-06-16

This is the CTO-owned queue for shared standards and template work. Product repos keep their own active queues; this queue tracks shared baseline changes and cross-product adoption handoffs.

| ID | Owner | Status | Priority | Summary | Next Action | Blocker |
|---|---|---|---|---|---|---|
| PSTD-001 | DOC | Active | High | Self-adopt `standards-v0.2` in `project-standards`. | Run self-adoption review and commit/PR the baseline. | None |
| PSTD-002 | CTO | Pending | High | Track cross-project adoption of `standards-v0.2`. | Drive PSTD-004, PSTD-005, and PSTD-006 to product-queue entries or PRs. | `standards-v0.2` branch must merge first. |
| PSTD-003 | CTO | Done | Medium | Triage PickSix upstream standards candidates. | Promoted reusable principles into release/deploy, dependency-risk, and local-gates standards; product-specific syntax stays local. | None |
| PSTD-004 | CTO | Pending | High | PickSix `standards-v0.2` adoption handoff. | After current PickSix adoption PRs settle, create/identify a PickSix queue item for v0.2 follow-up: context budget, cost/subscription posture, deploy confirmation, allowlist rationale, coverage/test-signal guidance, and SPA cache guidance. | PickSix v0.1 adoption still in progress. |
| PSTD-005 | DOC | Pending | High | Connections `standards-v0.2` adoption handoff. | Create/identify a Connections queue item to adopt v0.2 while keeping MCP/content, SET/PUZ/CON, Supabase, and release/dogfood rules local. Focus on context budget and active queue size. | `standards-v0.2` branch must merge first. |
| PSTD-006 | DOC | Pending | High | TMTC `standards-v0.2` adoption handoff. | Create/identify a TMTC queue item to adopt v0.2 while keeping launch-gate security, RLS, AAL, service-role, and capability-model rules local. | `standards-v0.2` branch must merge first. |

## Queue Rules

- CTO owns active priority and queue state.
- CTO owns standards version bump decisions.
- Agents acting as CTO must say so explicitly; unknown dirty queue edits are treated as active coordination state and preserved.
- DOC may update format and standards-adoption details when acting on an approved standards task.
- Material standards changes that affect products should name the downstream product tasks or explicitly say none are needed.

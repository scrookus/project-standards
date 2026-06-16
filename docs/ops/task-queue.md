# project-standards Task Queue

Status: active
Owner: CTO
Audience: CTO / DOC / ARC / PLT / SEC / ENG / QAT
Last reviewed: 2026-06-16

This is the CTO-owned queue for shared standards and template work. Product repos keep their own active queues; this queue tracks shared baseline changes and cross-product adoption handoffs.

| ID | Owner | Status | Priority | Summary | Next Action | Blocker |
|---|---|---|---|---|---|---|
| PSTD-001 | DOC | Active | High | Self-adopt `standards-v0.2` in `project-standards`. | Run self-adoption review and commit/PR the baseline. | None |
| PSTD-002 | CTO | Pending | High | Create product adoption tasks for material standards changes. | After PickSix adoption PRs settle, open/identify Connections and TMTC adoption tasks. | PickSix retrofit still in progress. |
| PSTD-003 | CTO | Done | Medium | Triage PickSix upstream standards candidates. | Promoted reusable principles into release/deploy, dependency-risk, and local-gates standards; product-specific syntax stays local. | None |

## Queue Rules

- CTO owns active priority and queue state.
- CTO owns standards version bump decisions.
- DOC may update format and standards-adoption details when acting on an approved standards task.
- Material standards changes that affect products should name the downstream product tasks or explicitly say none are needed.

---
type: AdoptionLedger
title: project-standards Standards Adoption
description: Local adoption ledger for standards published by project-standards.
resource: docs/ops/standards-adoption.md
tags: [ops, adoption, standards]
timestamp: 2026-06-20T00:00:00-07:00
status: active
owner: DOC
okf_version: "0.1"
---
# project-standards Standards Adoption

Status: active
Owner: DOC
Audience: CTO / DOC / ARC / PLT / SEC / ENG
Last reviewed: 2026-06-17

## Adopted Baseline

Baseline: standards-v0.2
Adopted on: 2026-06-16
Adoption owner: DOC

Shared standards source: `standards/`

## Local Overlays

| Area | Local Doc | Owner | Notes |
|---|---|---|---|
| Agent contract | `AGENTS.md` | DOC | First-read rules for changing shared standards and templates. |
| Review routing | `docs/review/routing.md` | DOC | Routes standards changes by affected lane. |
| Task queue | `docs/ops/task-queue.md` | CTO | Active work and product adoption tasks. |
| Branch/worktree | `docs/ops/branch-and-worktree.md` | PLT | Anti-hijack rules for standards/template work. |
| Context budget | `docs/ops/context-budget.md` | DOC | First-read, surface-read, and reference-only docs. |
| Knowledge format | `docs/ops/knowledge-format.md` | DOC | OKF-compatible frontmatter, index, and durable knowledge profile. |
| Cost/subscriptions | `docs/ops/cost-and-subscriptions.md` | CTO | Subscription posture for this repo and generated templates. |
| Local gates | `docs/testing/local-gates.md` | PLT | Markdown/review checks and template validation expectations. |
| Release/deploy | `docs/release/release-and-deploy.md` | PLT | Standards versioning, install updates, and product adoption handoff. |
| Dependency risk | `docs/security/dependency-risk.md` | SEC | Template and script dependency review. |

## Known Exceptions

| Exception | Rationale | Compensating Control | Owner | Review Date |
|---|---|---|---|---|
| No product runtime | This repo publishes standards/templates rather than running a production app. | Local gates focus on docs, templates, scripts, and downstream adoption impact. | PLT | 2026-07-15 |
| Product adoption happens outside this repo | Product repos own local overlays and task queues. | Standards changes must identify affected product adoption tasks. | CTO | 2026-07-15 |
| Standards version bump authority | Reviewers can recommend bump levels, but CTO decides whether a standards change changes the published baseline version. | Release/deploy overlay requires CTO confirmation before versioned release. | CTO | 2026-07-15 |
| Full OKF backfill deferred | This adoption pass converts shared standards first, not every historical Markdown file. | `PSTD-013` tracks staged backfill for cross-project records, templates, and older overlays. | DOC | 2026-07-20 |

## Upstream Candidates

Cross-project upstream candidates live in `docs/cross-project-standards/upstream-candidate-register.md`.

Keep this adoption ledger focused on how `project-standards/` adopts the current baseline. Use the register for promoted, candidate, deferred, or rejected methodology discovered from product repos.

## Next Convergence Task

Task ID: PSTD-001
Owner: DOC
Next action: Run self-adoption review and commit/PR the baseline before opening adoption tasks for Connections and TMTC.

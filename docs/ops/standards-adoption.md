---
type: AdoptionLedger
title: project-standards Standards Adoption
description: Local adoption ledger for standards published by project-standards.
resource: docs/ops/standards-adoption.md
tags: [ops, adoption, standards]
timestamp: 2026-06-21T00:00:00-07:00
status: active
owner: DOC
okf_version: "0.1"
---
# project-standards Standards Adoption

Status: active
Owner: DOC
Audience: CTO / DOC / ARC / PLT / SEC / ENG
Last reviewed: 2026-06-21

## Adopted Baseline

Baseline: standards-v0.5.1
Baseline tag: standards-v0.5.1
Adoption branch/ref: main
Adoption commit: `standards-v0.5.1` tag target
Adoption checked at: 2026-06-21
Adopted on: 2026-06-21
Adoption owner: DOC

Shared standards source: `standards/`

## Adoption Status

| Axis | Status | Evidence / Notes |
|---|---|---|
| Branch/ref checked | main at the `standards-v0.5.1` tag target on 2026-06-21 | `project-standards` publishes from `main`; agents must still read the published tag for product adoption. |
| Adopted version | standards-v0.5.1 adopted on 2026-06-21 | Local overlays and shared standards updated for the permission-boundary baseline and adopter hardening clarifications. |
| Upstream-current | current | `standards-v0.5.1` is the current baseline once tagged and pushed. |
| Conformance | clean for shared docs; product adoption pending | Product repos must adopt through their own ledgers and queues. |

## Local Overlays

| Area | Local Doc | Owner | Notes |
|---|---|---|---|
| Agent contract | `AGENTS.md` | DOC | First-read rules for changing shared standards and templates. |
| Agent permission boundaries | `standards/agent-permission-boundaries.md` | SEC | Shared permission authority, runtime drift, and permission-change-session rules. |
| Agent permission user baseline | `standards/agent-permission-user-baseline.md` | SEC | Shared deny/ask/allow posture and detection minimum. |
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

Task ID: PSTD-016
Owner: SEC
Next action: Coordinate staged `standards-v0.5.1` product adoption after the tag is published.

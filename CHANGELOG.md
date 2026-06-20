# Changelog

## Unreleased

Changed:

- Added the PickSix agent-handoff inventory and promoted reusable coverage-ratchet, data/migration safety, data-boundary, and privileged-auth assurance principles into existing v0.2 standards.
- Marked design-system and observability handoff patterns as future standards candidates rather than mandatory v0.2 baseline obligations.
- Recorded Connections adoption findings as upstream candidates for memory routing, inbox-to-queue separation, carve-out catalogs, task ID counters, and public-safe pointers to private runbooks.
- Recorded TMTC adoption findings as upstream candidates for keep-and-prefix overlays, product-local role extensions, held-for-trigger queues, migration-safety depth, and agent context containment.
- Split the upstream candidate register out of the `project-standards` self-adoption ledger and grouped it by promoted, candidate, and deferred/rejected status.
- Added a proposed repository-controls standard for git config, merge rules, branch protection, required checks, CI ownership, and bypass governance; queued `PSTD-008` to decide whether this becomes a `standards-v0.3` baseline obligation.
- Marked TMTC `standards-v0.2` adoption handoff complete in the shared standards queue; Connections remains pending.
- Added a proposed dev-tooling/package-versioning standard for runtime/toolchain pins, package managers, lockfiles, dependency upgrade rules, automation, and package publication; queued `PSTD-009` to decide whether this becomes a `standards-v0.3` baseline obligation.
- Added read-only cross-project audit prompts for the proposed repository-controls and dev-tooling/package-versioning standards.
- Recorded Connections `/check-comms` and `/wrap` as upstream candidates for possible agent-session-rituals guidance; queued `PSTD-010` to compare them with TMTC and PickSix before promotion.
- Recorded Connections post-adoption feedback that standards candidates and deferrals need queue-backed triggers, and queued `PSTD-011` to tighten that guidance.
- Added a `standards-v0.3` product adoption prompt covering repository controls, dev tooling/package versioning, and queue-backed deferral triggers.
- Promoted TMTC ADR 0016's task-queue authority versus mirror principle into the shared task-queue standard without mandating GitHub Issues for every repo.
- Added session role identity guidance to the agent contract standard, based on Connections' clearer CTO/ENG role startup model.
- Incorporated Connections `standards-v0.3` adoption feedback: source-backed inventory writing, local role-mapping-aware review routing, fresh-context lane review as a candidate pattern, and canonical Dependabot/Renovate policy ownership in dev-tooling.
- Added local-first Git communication guidance: agents should not use origin pushes as routine coordination, and products must document push policy plus any local queue authority that sits outside Git history.

## standards-v0.2 - 2026-06-16

Material expansion of the shared baseline after PickSix first adoption feedback.

Added:

- Cost/subscription rules requiring product overlays to document current plans, quotas, billing models, paid/free tier posture, AI/tool usage posture, and approval triggers before recurring spend or paid-tier assumptions.
- AI usage guidance distinguishing output volume from cached/input context when reviewing API-equivalent cost.
- Context budget rules and review cadence for keeping first-read agent context concise and moving long methodology/history into read-triggered docs.
- Coverage guidance clarifying that coverage methodology is product-local and must match the adopting repo's real stack, paths, thresholds, and risks.
- Local-to-shared promotion path for methodology decisions that start in one product but may apply across projects.
- Triaged PickSix first-session upstream candidates into shared release/deploy, dependency-risk, local-gates, and host-agnostic SPA cache guidance.
- Explicit role-authority and dirty-queue handoff rules for CTO-owned task queues.
- Self-adoption overlays for `project-standards/`, making the canonical standards repo subject to its own baseline.
- CTO-owned standards version bump authority.

Changed:

- Current baseline is now `standards-v0.2`.
- Deploy and environment-promotion guidance now requires explicit confirmation with target, source, scope, and blast radius.
- Dependency-risk guidance now requires accepted findings to include an identifier and plain-English rationale.
- Local-gates guidance now distinguishes boundary/mock insurance from production integration signal.

## standards-v0.1 - 2026-06-15

Initial shared standards baseline for PickSix, Connections, and Take Me To Church.

Added:

- Governance decision making `project-standards/` the canonical shared standards home.
- Baseline standards for agent contracts, documentation governance, review routing, security, disclosure response, task queues, branch/worktree safety, local gates, dependency risk, and release/deploy.
- Branch/worktree and PR/direct-to-main rules to prevent concurrent-agent branch hijacks.
- Shared adoption template at `templates/shared/standards-adoption.md`.

Notes:

- Preserves the two-layer model: shared baseline here, product-local overlays in each repo.
- Treats PickSix as the AWS/CDK proof case so the baseline is not Supabase-only.
- Routes shared standards review through DOC primary, with ARC, CTO, PLT, and SEC review for architecture, cost/subscription posture, gates, and security language.

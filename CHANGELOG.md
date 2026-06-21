# Changelog

## Unreleased

Changed:

- Clarified that product adoption agents must read published standards tags, not arbitrary local `project-standards` checkouts, and that standards drafting should happen in separate visible worktrees/branches until tagged.
- Adopted an OKF-compatible knowledge profile in `project-standards`: shared standards now carry YAML frontmatter, `standards/index.md` supports progressive disclosure, and `PSTD-013` tracks staged backfill beyond the standards directory. OKF remains proposed for `standards-v0.5`, not mandatory for product `standards-v0.4` adoption.
- Promoted TMTC PLT-020 migration immutability feedback into release/deploy and local-gates guidance: applied migrations are immutable, drift is repaired by forward migration, and emergency unblocks require owner, SHA, verification, and 24-hour review.
- Required branch protection for `main`/`master` and any branch that can deploy, promote environments, publish releases, or run production-support automation; bootstrap exceptions must be tracked as temporary gaps.
- Required GitHub Dependabot alerts for every active or production-support GitHub repo, with any inability to enable alerts tracked as an owned, reviewed exception.
- Added proposed `standards/agent-permission-boundaries.md` for `standards-v0.5`, defining user-level, project-level, and worktree-local permission authority plus explicit permission-change sessions.
- Clarified that tracked project permission files provide auditability, but hard prevention requires managed policy or a verified equivalent when local/user permission rules can still merge in.
- Clarified expected permission defaults: routine source/test/doc edits should be allowed for productive agent work, while permission self-modification and high-risk surfaces remain gated.
- Added initial global deny/ask/allow posture for agent permissions across all sessions.

## standards-v0.4 - 2026-06-20

Baseline tag: `standards-v0.4`

Changed:

- Added local-first Git communication guidance: agents should not use origin pushes as routine coordination, and products must document push policy plus any local queue authority that sits outside Git history.
- Clarified worktree-sensitive artifact classes so shared local authority, generated mirrors, and private worktree-local files such as `.claude/settings.local.json` do not get confused.
- Added worktree closure guidance requiring agents to summarize outcomes, capture reusable lessons, propose follow-ups or standards candidates, and remove stale worktrees unless retention is explicitly owned.
- Added a preferred worktree layout order: sibling directories first, a documented parent next to a bare repo second, and nested in-repo worktrees only as explicit product exceptions; hidden tool-specific worktrees such as `.claude/worktrees/` are not allowed for new work and must be migrated when encountered.

## standards-v0.3 - 2026-06-19

Baseline tag: `standards-v0.3`
Baseline anchor: Connections adoption PR #615

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

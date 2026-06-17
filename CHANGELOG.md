# Changelog

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

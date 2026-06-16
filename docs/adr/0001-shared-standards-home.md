# ADR 0001: Shared Standards Home

Status: accepted
Date: 2026-06-15
Owner: CTO
Review: DOC primary; CTO, ARC, PLT, and SEC for their lanes

## Decision

`project-standards/` is the canonical home for shared engineering, SDLC, documentation, security, review, and agent-operating standards across PickSix, Connections, and Take Me To Church.

`project-standards/` adopts the same baseline it publishes. It is authoritative, not exempt: standards changes route through the local adoption overlays in this repo, update `CHANGELOG.md`, and create product adoption tasks when product repos are affected.

Each product repo remains authoritative for its local overlay: stack-specific hazards, architecture boundaries, live task state, domain invariants, release runbooks, and documented exceptions.

The first shared baseline was `standards-v0.1`. The current published baseline is recorded in `README.md` and `CHANGELOG.md`.

## Rationale

The projects should converge on a shared operating model, not a shared stack.

PickSix proves the baseline must work for AWS CDK, Lambda, DynamoDB, split frontend/backend repos, deploy-context hazards, and historical standings backtests. Connections and Take Me To Church contribute mature agent, Supabase, security, and documentation-governance practices, but neither product repo should become the cross-project source of authority.

Keeping shared standards here prevents product repos from copying each other wholesale and preserves the two-layer model:

- Shared baseline in `project-standards/`.
- Product-local overlays in each product repo.

## Consequences

- Material standards changes are versioned in `project-standards/CHANGELOG.md`.
- Product repos record adoption status in `docs/ops/standards-adoption.md` using the shared template.
- Review of shared standards routes through DOC primary, with ARC for architecture language, CTO for governance/cost/subscription posture, PLT for gates and operational language, and SEC for security, dependency, and disclosure language.
- Product-specific rules stay local unless they have repeated cross-project value.

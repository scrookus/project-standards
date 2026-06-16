# Standards v0.1 Acceptance Review

Status: accepted for product retrofit
Date: 2026-06-15
Owner: DOC
Audience: CTO / DOC / ARC / PLT / SEC

## Scope

Review `standards-v0.1` in `project-standards/` for readiness to drive product retrofits without editing product repos yet.

Reviewed:

- `docs/adr/0001-shared-standards-home.md`
- `standards/*.md`
- `templates/shared/standards-adoption.md`
- `CHANGELOG.md`
- `README.md`

## Outcome

Accepted for the first product retrofit pass.

The baseline is short, enforceable, and template-friendly. It preserves the two-layer model:

- Shared baseline in `project-standards/`.
- Product-local overlays in PickSix, Connections, and Take Me To Church.

## Lane Checks

| Lane | Result | Notes |
|---|---|---|
| DOC | Pass | Canonical home, adoption template, changelog, and README entry are present. |
| ARC | Pass | Shared-vs-local boundary is explicit; stack-specific material remains overlay guidance. |
| PLT | Pass | Local gates and release/deploy standards define shape without mandating one stack. |
| SEC | Pass | Security, disclosure, and dependency-risk standards define required local records and review points. |

## PickSix Handoff

PickSix is the first retrofit target and the AWS/CDK proof case.

The retrofit should preserve local rules for:

- AWS CDK, Lambda, DynamoDB, API Gateway, and split frontend/backend coordination.
- The raw `cdk deploy` hazard.
- Manual production deploy authority.
- Historical standings backtests for scoring and tiebreaker logic.
- Frontend/backend dependency-risk allowlists and SEC review.

## Guardrails

- Do not copy Connections or Take Me To Church wholesale into PickSix.
- Do not turn Supabase practices into mandatory cross-project rules.
- Do not edit product repos until the PickSix retrofit task starts explicitly.
- Route product adoption review through DOC primary, with ARC, PLT, and SEC reviewing their lanes.

## Next Task

Start PickSix `standards-v0.1` retrofit using `templates/shared/standards-adoption.md`.

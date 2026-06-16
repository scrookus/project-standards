# Local Gates Standard

Version: standards-v0.2
Status: baseline
Owner: PLT
Review: DOC primary; PLT for gates; QAT, ARC, SEC by surface

## Requirement

Each product repo must define local gates by changed surface. Gates should be runnable before merge and before deploy when the touched surface warrants it.

## Minimum Gate Tiers

| Changed Surface | Minimum Local Gate |
|---|---|
| Docs only | Markdown or link checks when available; DOC review |
| Product code | Lint/typecheck, unit tests, build |
| Data model or migrations | Schema checks, migration dry run or local reset when feasible |
| Auth/security | Security guard, targeted tests, SEC review |
| Architecture boundaries | Architecture check or documented manual ARC review |
| E2e workflows | Relevant e2e or UAT smoke path |
| Deploy/infrastructure | Stack-specific validation before deploy |
| Cost-sensitive or quota-sensitive command | Product-local cost/subscription check before running |

## Remote CI

Production-support repos should have a remote quality gate. Smaller bootstrap repos may start with local gates, but the CI gap must be tracked in the adoption record.

## Coverage Guidance

Coverage policy is product-local. A repo may document thresholds, ratchets, excluded files, or methodology, but the language must match the actual stack, test runner, files, and risk model in that repo.

Do not copy a coverage methodology from another product unchanged. If a coverage doc mentions paths, tools, domains, or workflows that do not exist in the adopting repo, rewrite it, archive it, or track it as stale-doc cleanup instead of treating it as part of standards adoption.

Coverage thresholds should be treated as ratchets. Lowering a threshold requires an explicit owner-approved exception. When a tool or runtime version changes how coverage is measured, record the measurement context and recalibration rationale in the product-local coverage methodology.

## Test Signal Guidance

Tests must be described honestly. Boundary, mock, and adapter tests are useful insurance against contract drift, but they are not proof that production integrations are healthy unless they exercise the production path.

Product overlays should distinguish:

- Unit/component signal.
- Mocked transport or boundary insurance.
- Integration signal.
- E2e or UAT signal.
- Production smoke signal.

## Stack Overlay Examples

- PickSix: CDK synth should be considered for infrastructure changes; standings backtests are required for scoring and tiebreaker logic; deploy workflows must preserve the raw `cdk deploy` hazard rule.
- Connections: Supabase schema, Edge Function checks, Playwright, Vitest, MCP/content package tests, and prod smoke checks stay local to the product overlay.
- TMTC: Supabase integration and e2e gaps stay visible until PLT provides a CI path.

## Rule

Do not replace stack-specific gates with generic commands if the local gate protects a real production hazard. Do not run quota-burning or paid-service gates unless the product overlay says they are allowed for the current subscription posture.

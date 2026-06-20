---
type: Standard
title: Local Gates Standard
description: Local verification, test, coverage, and pre-merge gate rules.
resource: standards/local-gates.md
tags: [standards, local, gates]
timestamp: 2026-06-20T00:00:00-07:00
standards_version: standards-v0.2
status: baseline
owner: PLT
okf_version: "0.1"
---
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
| Agent permission policy | Permission-policy diff, semantic verification, SEC and PLT review |
| Architecture boundaries | Architecture check or documented manual ARC review |
| E2e workflows | Relevant e2e or UAT smoke path |
| Deploy/infrastructure | Stack-specific validation before deploy |
| Cost-sensitive or quota-sensitive command | Product-local cost/subscription check before running |

## Remote CI

Production-support repos should have a remote quality gate. Smaller bootstrap repos may start with local gates, but the CI gap must be tracked in the adoption record.

## Coverage Guidance

Coverage policy is product-local. A repo may document thresholds, ratchets, excluded files, or methodology, but the language must match the actual stack, test runner, files, and risk model in that repo.

Do not copy a coverage methodology from another product unchanged. If a coverage doc mentions paths, tools, domains, or workflows that do not exist in the adopting repo, rewrite it, archive it, or track it as stale-doc cleanup instead of treating it as part of standards adoption.

Coverage thresholds should be treated as ratchets. When introducing a threshold, measure the current suite under the repo's CI runtime, set the floor from the measured baseline with jitter buffer, and record the method. Lowering a threshold requires an explicit owner-approved exception. When a tool or runtime version changes how coverage is measured, record the measurement context and recalibration rationale in the product-local coverage methodology.

## Data And Migration Safety Reports

Data model changes, migrations, RPC changes, IAM/policy changes, and schema-affecting deploys need a short safety report before execution or review. The report should state:

- What changes.
- Real risks and expected false-positive warnings.
- Rollback or forward-fix path.
- Required local/remote checks.
- Approval or review lane.

Stack examples such as Supabase SQL analyzer warnings, AWS IAM policy diffs, DynamoDB table/index changes, or CDK synthesis output stay product-local.

Agent permission policies need semantic verification before they are treated as enforceable. Product overlays should state how the tool handles precedence, pattern matching, local overrides, shell wrappers, package scripts, and schema keys for the installed tool version.

For migration-backed systems, the safety report must state whether existing migration files were edited. If an applied migration changed, stop and convert the work to a forward migration unless the product proves the file is still local-only and unapplied outside the current checkout.

When repairing drift caused by a historical migration edit, include the verification query or inspection method, the forward migration name, and the expected production/shared-environment reconciliation.

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

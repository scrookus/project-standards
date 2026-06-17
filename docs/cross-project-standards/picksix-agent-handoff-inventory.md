# PickSix Agent Handoff Inventory

Status: active
Owner: DOC
Audience: CTO / DOC / ARC / PLT / SEC / QAT / UXD
Last reviewed: 2026-06-16

## Purpose

This inventory resolves `PSTD-007`: review reusable methodology in `picksix-frontend/docs/agent-handoff/*` and decide what belongs in `project-standards` versus what stays product-local.

Do not copy these docs wholesale into other projects. Promote the reusable principle, then let each product adopt it through local overlays with its own stack, commands, file paths, and risk model.

## Source Classification

| PickSix Source | Classification | Standards Disposition | Product-Local Parts |
|---|---|---|---|
| `ci-coverage-ratchet.md` | Reusable methodology | Promoted into `standards/local-gates.md`: measured floor, ratchet rule, no silent lowering, coverage is not the whole test signal. | Vitest/c8 examples, exact thresholds, project paths. |
| `data-access-boundary.md` | Reusable architecture principle with stack examples | Promoted into `standards/security-baseline.md`: data access boundaries must be named and enforceable, with direct-client/import exceptions documented. | Supabase directory names, env vars, regex script details. |
| `db-safety-reports.md` | Reusable migration/change-control methodology | Promoted into `standards/local-gates.md`: data model changes need a short safety report covering change, risk, false positives, and rollback. | Supabase SQL analyzer warnings, RLS-specific traps, PostgREST details. |
| `design-system-as-source-of-truth.md` | Reusable UXD methodology | Candidate for a future UXD/design standard; not added to v0.2 baseline because current baseline has no UI/design standard file. | Tailwind-specific advice, exact token file names, component list. |
| `e2e-local-supabase-with-auth.md` | Stack-specific overlay with reusable testing principles | Partially covered by `standards/local-gates.md`: integration/e2e signal must exercise real production-shaped paths when claimed. | Supabase CLI, personas, storage state, local DB lock, Playwright wiring. |
| `mfa.md` | Security methodology with stack-specific examples | Promoted into `standards/security-baseline.md`: privileged actions need an auth assurance model, recovery path, and API/server-side enforcement. | Supabase AAL/RLS syntax, TOTP-only examples, exact recovery implementation. |
| `ux-exception-capture.md` | Reusable observability/support principle | Candidate for future release/support or observability guidance; not added as a mandatory baseline obligation in v0.2. | Sentry setup, source-map commands, frontend implementation details. |
| `README.md` | Index only | Replaced by this inventory for standards purposes. | PickSix-local status and shipped list. |

## Product Cleanup Guidance

PickSix should not keep cross-project handoff docs as if they are active local overlays unless each doc is still accurate for PickSix and listed in its local adoption/index docs.

For each file, PickSix should choose one outcome:

- Keep as a PickSix-local overlay because it is accurate and used.
- Replace with a short pointer to the relevant `project-standards` standard plus PickSix-specific commands.
- Archive/delete as stale or wrong-project material.
- Record a new upstream candidate if the reusable principle is not yet captured here.

## Adoption Notes

Connections and TMTC should not adopt these PickSix files directly. During their `standards-v0.2` adoption, they should read this inventory only to understand which principles already moved upstream and which remain candidates.

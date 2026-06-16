# project-standards Local Gates

Status: active
Owner: PLT
Audience: PLT / DOC / QAT / SEC / ENG
Last reviewed: 2026-06-16

Baseline: `standards/local-gates.md`

## Gates

| Changed Surface | Required Gate |
|---|---|
| Shared standards docs | DOC review; check links/paths manually or with available tooling. |
| Adoption template | DOC plus affected lane review; verify placeholders stay stack-neutral. |
| Bootstrap templates | Inspect generated paths and commands for stack fit; run template tests when available. |
| Install/bootstrap scripts | Shell review plus local dry run when safe. |
| Security/dependency/cost language | SEC/CTO/PLT review by surface. |
| Coverage methodology guidance | QAT/PLT review; verify wording is product-neutral unless clearly labeled as an example. |
| Agent contract, task queue, review routing, specialist wrappers | Run context budget checklist in `docs/ops/context-budget.md`. |

## Rule

Do not invent a generic runtime gate for this repo. Gate by changed surface and by downstream product impact.

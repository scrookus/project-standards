# project-standards Context Budget

Status: active
Owner: DOC
Audience: CTO / DOC / PLT / SEC
Last reviewed: 2026-06-16

Baseline: `standards/context-budget.md`

## Read Tiers

| Tier | Read When | Docs |
|---|---|---|
| First-read | Before changing shared standards or templates. | `AGENTS.md`, `README.md`, `CHANGELOG.md`, `docs/ops/standards-adoption.md` |
| Surface-read | When touched surface requires it. | `docs/review/routing.md`, `docs/testing/local-gates.md`, `docs/release/release-and-deploy.md`, `docs/security/dependency-risk.md`, `docs/ops/cost-and-subscriptions.md`, `docs/ops/branch-and-worktree.md` |
| Reference | When investigating history, rationale, or prior convergence work. | `docs/adr/`, `docs/cross-project-standards/` |

## Rules

- Do not expand `AGENTS.md` into a full manual.
- Put long methodology, examples, convergence history, and acceptance reviews in linked docs.
- Keep active task entries short; move closure detail to changelog, ADR, or review records.
- Standards changes should add read triggers when adding new local overlays.
- Prefer concise, high-signal responses and minimal sufficient code. Avoid generated prose, broad diffs, and speculative implementation that do not move the task forward.

## Review Cadence

Run a context budget check:

- During standards adoption or baseline upgrade.
- Before material changes to `AGENTS.md`, `CLAUDE.md`, `docs/ops/task-queue.md`, `docs/review/routing.md`, or specialist wrappers/templates.
- After an agent misses standards rules or applies the wrong owner.
- During CTO/DOC standards sweeps.
- Before adding a new first-read doc.

## Validation Checklist

- First-read docs remain `AGENTS.md`, `README.md`, `CHANGELOG.md`, and `docs/ops/standards-adoption.md`.
- Long convergence history stays under `docs/cross-project-standards/`.
- Active queue entries remain skim-sized.
- New overlays include a read trigger.
- Product-local methodology is promoted through upstream candidates, not copied into startup context.

# Cross-Project Standards Action Plan

Status: draft for review
Date: 2026-06-15
Audience: CTO / DOC / ARC / PLT / SEC / ENG
Owner: CTO

## Purpose

Turn the convergence review into an executable plan for aligning PickSix, Connections, and Take Me To Church around shared engineering, SDLC, and agent-workflow standards.

Reference docs:

- `docs/cross-project-standards/cross-project-standards-convergence-review.md`
- `docs/cross-project-standards/cross-project-standards-adoption-checklist.md`

## Guiding Decision

Use `project-standards/` as the canonical shared standards repo.

Product repos keep local overlays:

- PickSix: AWS CDK, Lambda, DynamoDB, split frontend/backend, deploy hazards, standings backtests.
- Connections: Supabase/Vite, MCP/content tooling, SET/PUZ/CON workflows, release/dogfood rituals.
- TMTC: Next.js/Supabase, launch-gate security work, RLS/service-role/capability docs.

Do not copy TMTC or Connections wholesale into PickSix. Promote reusable standards into `project-standards/`, then retrofit each product from that baseline.

## Phase 0: Governance Decision

Target: 0.5 day.

Owner: CTO.

Review: DOC + ARC.

Outputs:

- Decision recorded that `project-standards/` is the shared standards home.
- Decision recorded that each product repo owns local overlays and exceptions.
- Baseline versioning scheme chosen, starting with `standards-v0.1`.

Tasks:

- Create `project-standards/docs/adr/0001-shared-standards-home.md` or equivalent.
- Define baseline version marker format.
- Define adoption ledger template fields.

Exit criteria:

- A reviewer can tell where shared standards live and where product-specific rules live.

## Phase 1: Standards Baseline v0.1

Target: 1-2 days.

Owner: DOC.

Review: ARC + PLT + SEC.

Outputs in `project-standards/`:

- `standards/agent-contract.md`
- `standards/documentation-governance.md`
- `standards/review-routing.md`
- `standards/security-baseline.md`
- `standards/disclosure-response.md`
- `standards/task-queue.md`
- `standards/local-gates.md`
- `standards/dependency-risk.md`
- `standards/release-and-deploy.md`
- `templates/shared/standards-adoption.md`
- `CHANGELOG.md` entry for `standards-v0.1`

Tasks:

- Extract the common contract from TMTC's short `AGENTS.md`.
- Pull Connections' strongest operational rules into reusable form without its local memory paths or MCP-specific assumptions.
- Pull PickSix's deploy-hazard pattern into the release/deploy standard as an example of mandatory local overlay.
- Add an adoption ledger template with these fields:
  - adopted baseline version
  - local overlays
  - deferred standards
  - known exceptions
  - next convergence task
  - last reviewed date
- Add review routing guidance that maps touched surfaces to ARC, PLT, SEC, REV, DOC, UXD, QAT, and UAT.

Exit criteria:

- A new project can read the baseline and understand the minimum shared operating model.
- A mature product can adopt the baseline without deleting stack-specific rules.

## Phase 2: PickSix Retrofit

Target: 2-4 days.

Owner: PLT + DOC.

Review: SEC + ARC + ENG.

Why first:

- PickSix has the largest standards gap and proves the baseline works outside the Supabase projects.

Outputs:

- Shared standards adopted across `picksix/` and `picksix-frontend/`.
- Backend and frontend coordination model decided.
- Backend quality gate added before or alongside dev deploy.
- AWS deploy hazards preserved as local hard rules.

Tasks:

- Decide whether PickSix task state lives in:
  - one canonical repo, likely backend, with frontend references; or
  - both repos, with a parent coordination doc.
- Add `docs/ops/standards-adoption.md`.
- Add or update `AGENTS.md` to match the short shared-contract shape.
- Add `docs/review/routing.md`.
- Add `docs/security/security-baseline.md`.
- Add `docs/security/disclosure-response.md`.
- Add `docs/ops/task-queue.md`.
- Add backend CI quality workflow:
  - `npm test`
  - dependency audit or documented allowlist equivalent
  - CDK synth if feasible
  - optional `npm run backtest` gate for scoring logic changes
- Align frontend and backend dependency-risk policies.
- Preserve manual prod deploy and automated dev deploy distinction.
- Keep the raw `cdk deploy` warning prominent in `AGENTS.md`, `README.md`, and release/deploy docs.

Exit criteria:

- PickSix has a visible task queue, review routing, security baseline, and standards-adoption ledger.
- A backend deploy cannot happen through the normal workflow without an explicit quality gate or documented exception.
- The deploy-hazard rule is easier to find, not harder.

## Phase 3: Connections Alignment

Target: 2-3 days.

Owner: DOC + CTO.

Review: MCP/CON + SEC + ARC.

Why second:

- Connections has the most mature system, but much of it should become shared baseline material or move behind pointers.

Outputs:

- Connections declares adopted standards baseline.
- Generic rules are reduced in local `AGENTS.md`.
- MCP/content-specific rigor remains local and intact.
- README becomes a real project overview.

Tasks:

- Add `docs/ops/standards-adoption.md`.
- Replace default Vite `README.md` with a human project overview.
- Identify `AGENTS.md` sections that are:
  - shared baseline material
  - Connections-local rules
  - stale or superseded rules
- Move reusable language upstream to `project-standards`.
- Replace local generic text with links where doing so will not weaken agent behavior.
- Keep local rules for:
  - MCP package release
  - SET/PUZ/CON workflows
  - Supabase Edge Functions
  - external `mcp-content/README.md` SEC review
  - content-authoring and dogfood verification
- Tighten queue guidance so active tasks stay skim-sized.
- Move long closure or postmortem details out of active queue entries when appropriate.

Exit criteria:

- Connections remains the richest local operating system, but no longer acts as the implicit source of shared standards.
- A new agent can identify what is shared baseline versus Connections-specific.

## Phase 4: TMTC Alignment

Target: 1 day.

Owner: DOC + SEC.

Review: PLT + ARC.

Why third:

- TMTC is closest to the desired contract; the main work is upstreaming reusable parts and declaring local exceptions.

Outputs:

- TMTC declares adopted standards baseline.
- Reusable governance is upstreamed to `project-standards`.
- Active launch-gate security docs remain local.

Tasks:

- Add `docs/ops/standards-adoption.md`.
- Mark local overlays:
  - RLS hardening
  - service-role removal
  - AAL inventory
  - capability-driven role model
  - church-domain UX and UAT docs
- Link shared baseline docs where appropriate.
- Keep CI integration/e2e gap tracked as PLT work until a CI Supabase path exists.
- Review local `AGENTS.md` against the new shared baseline and remove duplicate language only if links are enough.

Exit criteria:

- TMTC is no longer the de facto shared standards source.
- TMTC's local launch-gate security work remains explicit and discoverable.

## Phase 5: Maintenance Loop

Target: recurring.

Owner: CTO + DOC.

Review: ARC + PLT + SEC when standards change their areas.

Outputs:

- Standards baseline changelog.
- Quarterly convergence review.
- Product adoption ledgers kept current.
- New project bootstrap uses latest baseline by default.

Tasks:

- Add a quarterly standards review task to each active project queue or a shared planning surface.
- When `project-standards` changes materially, open adoption tasks in each product repo.
- Keep `project-standards` templates current for:
  - Next.js + Supabase
  - Vite + Supabase
  - AWS CDK + Lambda + DynamoDB
  - split frontend/backend projects
- Review whether local overlays should graduate into shared standards after repeated use.

Exit criteria:

- Standards changes are versioned, reviewed, adopted deliberately, and not silently copied between product repos.

## Initial Task Set

Create these work items after Phase 0 is accepted:

- `STD-001`: Create shared standards baseline v0.1 in `project-standards`.
- `STD-002`: Add adoption ledger template and baseline changelog.
- `PK6-STD-001`: Retrofit PickSix backend and frontend to baseline v0.1.
- `CON-STD-001`: Add Connections adoption ledger and slim generic `AGENTS.md` rules.
- `CON-STD-002`: Replace Connections default Vite README with project overview.
- `TMTC-STD-001`: Add TMTC adoption ledger and upstream reusable governance.

## Recommended Order

1. Decide `project-standards` governance.
2. Build `standards-v0.1`.
3. Retrofit PickSix.
4. Slim and align Connections.
5. Align TMTC back to the shared baseline.
6. Start quarterly maintenance.

This order avoids three independent retrofits and gives the non-Supabase project a real vote in the baseline before the Supabase projects refine it.

## Open Decisions

- PickSix coordination model: one task queue across backend/frontend, or per-repo queues with a parent index?
- PickSix backend gate: should CDK synth be mandatory locally, in CI, or both?
- Shared baseline strictness: should production-support repos have a higher minimum baseline than bootstrap repos?
- Connections queue policy: how much completed-task detail should move out of the active queue?
- Baseline versioning: simple `standards-v0.1` labels, semver, or dated releases?

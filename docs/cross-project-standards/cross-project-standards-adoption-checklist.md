# Cross-Project Standards Adoption Checklist

Status: draft for review
Date: 2026-06-15
Audience: CTO / DOC / PLT / SEC / ARC
Owner: CTO

## Purpose

Checklist for bringing PickSix, Connections, and Take Me To Church onto a common standards baseline while preserving stack-specific differences.

Use with `docs/cross-project-standards/cross-project-standards-convergence-review.md`.

## Shared Baseline

Each project should have:

- [ ] Short `AGENTS.md` operating contract.
- [ ] Thin `CLAUDE.md` wrapper importing `AGENTS.md`.
- [ ] Project mode stated: bootstrap, active development, production support, or maintenance.
- [ ] Shared role model or documented local subset.
- [ ] Review routing by touched surface.
- [ ] `docs/ops/task-queue.md` for active work only.
- [ ] `docs/ops/standards-adoption.md` with baseline version, overlays, deferrals, exceptions, and next convergence task.
- [ ] `docs/security/security-baseline.md`.
- [ ] `docs/security/disclosure-response.md` or equivalent.
- [ ] Dependency-risk policy with documented allowlist process.
- [ ] Local-only raw planning / secrets / live findings policy.
- [ ] Local gate tiers by changed surface.
- [ ] Remote CI quality gate.
- [ ] Stack-specific deploy/release checklist.
- [ ] Human-facing `README.md` that is not just a framework template.

## PickSix Retrofit

Primary goal: bring PickSix into the shared SDLC/agent framework without weakening its AWS-specific operational warnings.

- [ ] Treat `picksix/` and `picksix-frontend/` as one product for standards decisions.
- [ ] Decide whether task state is shared in one repo or mirrored with a parent index.
- [ ] Replace or revise backend `AGENTS.md` into the common short-contract shape.
- [ ] Preserve the `deploy.sh` / raw `cdk deploy` warning as a local hard rule.
- [ ] Add `docs/ops/task-queue.md`.
- [ ] Add `docs/review/routing.md`.
- [ ] Add `docs/security/security-baseline.md`.
- [ ] Add `docs/security/disclosure-response.md`.
- [ ] Add `docs/ops/standards-adoption.md`.
- [ ] Split backend quality checks from dev deploy, or add test/audit/synth gates before deploy.
- [ ] Decide whether CDK synth is part of local and remote gates.
- [ ] Preserve standings backtests as a required gate for scoring logic changes.
- [ ] Align frontend pre-push and backend CI expectations.
- [ ] Document prod deploy as manual and dev deploy as automated.

## Connections Alignment

Primary goal: keep the mature operating system, but move reusable standards upstream and reduce local contract density.

- [ ] Replace default Vite `README.md` with a project overview.
- [ ] Add `docs/ops/standards-adoption.md`.
- [ ] Identify generic `AGENTS.md` rules to move to `project-standards`.
- [ ] Keep Connections-only MCP/content, SET/PUZ/CON, Supabase, and release rules local.
- [ ] Review whether active task queue entries can be shortened.
- [ ] Move long closure detail to postmortem, release, review, or queue-archive docs where needed.
- [ ] Keep tiered local gates and MCP package gates.
- [ ] Keep Edge Function type-checking and prod smoke practice.
- [ ] Confirm external docs such as `mcp-content/README.md` remain under SEC review.

## TMTC Alignment

Primary goal: upstream reusable governance while preserving launch-gate security work locally.

- [ ] Add `docs/ops/standards-adoption.md`.
- [ ] Identify TMTC docs that should become shared baseline material in `project-standards`.
- [ ] Keep active RLS, service-role, AAL, and capability-driven auth docs local.
- [ ] Keep integration/e2e CI gap visible until PLT provisions a CI Supabase path.
- [ ] Preserve concise `AGENTS.md` pattern as the preferred template shape.
- [ ] Keep disclosure response and documentation homes linked from local contract.

## Project Standards Work

Primary goal: make `project-standards/` the canonical home of shared standards.

- [ ] Add `standards/` directory.
- [ ] Add standards baseline changelog.
- [ ] Add adoption ledger template.
- [ ] Add AWS CDK / Lambda / DynamoDB template.
- [ ] Add split frontend/backend project template.
- [ ] Update Next.js + Supabase template with current TMTC learnings.
- [ ] Update Vite + Supabase template with current Connections learnings.
- [ ] Add local gate templates by stack.
- [ ] Add dependency-risk and audit-allowlist template.
- [ ] Add release/deploy checklist template.

## Review Routing

Use these review lanes for the convergence program:

- DOC: owns doc homes, template clarity, and contract size.
- ARC: owns shared-vs-local boundary and architecture standards.
- PLT: owns CI, hooks, deploy gates, environments, and operational runbooks.
- SEC: owns security baseline, disclosure, secrets, dependencies, and public/external surfaces.
- ENG: sanity-checks implementation burden and developer ergonomics.
- UXD: reviews docs-as-UX only when workflows affect onboarding or external contributors.

## Acceptance Criteria

Convergence is done when:

- `project-standards/` has a versioned shared baseline.
- Each product repo declares its adopted baseline version.
- Each product repo has documented local overlays and exceptions.
- PickSix has shared review/security/task standards without losing AWS deploy safeguards.
- Connections has preserved MCP/content rigor while reducing generic `AGENTS.md` bulk.
- TMTC has upstreamed reusable governance and kept launch-gate security local.
- New projects can bootstrap from `project-standards/` without copying product-local assumptions.

# Cross-Project Standards Convergence Review

Status: draft for review
Date: 2026-06-15
Audience: CTO / ARC / PLT / ENG / DOC
Owner: CTO

## Purpose

Review the active projects - PickSix, Connections, and Take Me To Church - and propose a common engineering, SDLC, and agent-workflow framework that preserves each project's technical differences while reducing standards drift.

## Scope Reviewed

Projects reviewed:

- `picksix/` backend plus `picksix-frontend/`
- `connections/`
- `take-me-to-church/`
- `project-standards/` as the likely shared standards home

Surfaces reviewed:

- Agent contracts: `AGENTS.md`, `CLAUDE.md`, `.claude/commands`, `.claude/agents`
- Project docs: `README.md`, `docs/**`, `FEATURES.md`
- Delivery gates: package scripts, Git hooks, GitHub Actions
- Stack signals: Supabase, AWS CDK, DynamoDB, Vite, Next.js, MCP/content tooling

This is not a full code audit. It is an operating-model and standards review, with stack-level implementation signals checked where they affect convergence.

## Executive Read

The projects should converge on a shared framework, not a shared stack.

PickSix, Connections, and TMTC differ in useful ways:

- PickSix is an operational fantasy-golf system with AWS CDK, Lambda, DynamoDB, API Gateway, and a separate Vite frontend.
- Connections is the first deeply agent-authored product: Vite, Supabase, Edge Functions, MCP content tooling, release rituals, and mature multi-agent operations.
- TMTC is a later seeded project: Next.js, Supabase, stronger governance scaffolding, explicit security launch gates, and a cleaner documentation-home model.

The right convergence target is:

- `project-standards/` owns the reusable baseline.
- Each product repo owns local exceptions, stack-specific runbooks, domain invariants, and live task state.
- Existing product repos adopt the baseline by versioned retrofit, not by wholesale copying one repo into another.

## Project Profiles

### PickSix

Stack:

- Backend: AWS CDK, Node.js Lambda, DynamoDB, API Gateway, CloudWatch alarms, RapidAPI.
- Frontend: Vite React SPA, React-Bootstrap, Amplify deployment.
- Repo shape: backend and frontend split across sibling repos.

Strengths:

- Strong production-specific operational warnings. The `deploy.sh` rule is crisp and load-bearing: do not run raw `cdk deploy` because secrets passed as CDK context can otherwise reset.
- `FEATURES.md` is a practical living system map with route, Lambda, table, tiebreaker, and admin workflow details.
- Backend has domain-specific regression strategy through historical standings backtests.
- Frontend has a useful pre-push gate: architecture check, build, and vulnerability audit against an explicit allowlist.
- The AWS stack split between dev and prod is clear: dev omits scoring pollers and RapidAPI dependency.

Weaknesses:

- Agent operating model is local and project-specific, not aligned to the newer shared role model.
- Backend has no general CI quality gate; the visible workflow deploys dev on `development`, but does not separately run test, audit, synthesis, or infrastructure checks before deploy.
- Frontend standards are stronger than backend standards, but the two repos do not appear to share a single project-level task queue, review routing model, or release checklist.
- `AGENTS.md` mixes project layout, deploy rules, memory expectations, and coding rules. That is useful today, but it is not a reusable contract shape.
- Security posture exists in targeted fixes and audit allowlists, but not in a canonical `docs/security/` baseline.

Best material to preserve:

- Hard operational hazard warnings in `AGENTS.md` and `README.md`.
- Backtesting as a first-class regression gate for domain logic.
- Deployment separation: automated dev deploy, manual prod deploy.
- Explicit audit allowlist workflow for accepted dependency risk.

### Connections

Stack:

- Vite React, Supabase, Edge Functions, Supabase migrations, Playwright, Vitest.
- First-class `mcp-content/` package with tools, tests, release notes, and prod smoke checks.
- Mature multi-agent role model and queue-driven work management.

Strengths:

- Most mature agent operating system of the three.
- Strong local and remote gates: lint, schema checks, architecture checks, e2e coverage checks, coverage tests, build, MCP package tests, Edge Function type checks.
- `.claude/commands` and `.claude/agents` convert recurring rituals into executable operating surfaces.
- The task queue is an effective active-state coordination surface with roles, priorities, blockers, next actions, and completion reconciliation.
- The MCP/content subsystem has unusually strong release hygiene: package tests, smoke tests, release notes, dogfood verification, and tool-usage learnings.
- Engineering practices explicitly defend against AI-induced drift: read diffs, investigate before fixing, explain trade-offs, practice operations without AI.

Weaknesses:

- `AGENTS.md` has become very long and includes highly local references. It is powerful but expensive for new agents to absorb.
- Queue entries can become mini-postmortems. That preserves judgment, but it weakens the queue's skim value and may hide active priorities.
- Some rules are tuned to Connections-specific memory paths, roles, and MCP workflows; copying them directly would overfit other projects.
- The README is still the default Vite README, so the human project overview is weaker than the agent-facing docs.
- The system has high ritual density. That is appropriate for Connections' MCP/content complexity, but not all projects need the same amount of machinery.

Best material to preserve:

- Role-prefixed work, reviewer independence, queue lifecycle, and review routing.
- Tiered local gates by changed surface.
- Architecture fitness checks as local scripts, not just prose.
- MCP/content release discipline: version, notes, package tests, prod smoke, install/verify.
- Engineering-practices document as a human ownership counterweight to AI speed.

### Take Me To Church

Stack:

- Next.js, Supabase, server routes, TypeScript, Vitest, Playwright, SQL migrations.
- Heavy security and role/capability work in active launch-gate mode.

Strengths:

- Cleanest agent contract shape: short `AGENTS.md`, linked docs, explicit documentation homes, clear local-only policy.
- Strong documentation governance: canonical homes, owners, audiences, and local-vs-repo boundary.
- Security is explicitly a launch gate, not an afterthought. Current work is centered on RLS, service-role removal, capability-driven auth, and reviewable security audits.
- CI has strong supply-chain posture: pinned GitHub Actions SHAs, Gitleaks install with checksum, `npm ci`, Node 24.
- Pre-push hook is well-scoped by surface and includes a security guard before baseline tests.
- Review routing and role model are clearer and more portable than the older Connections contract.

Weaknesses:

- Integration and e2e tests are local-only today because CI lacks a Supabase instance. That is reasonable for now, but should remain a tracked PLT gap.
- Governance docs are ahead of product maturity. That is acceptable in bootstrap mode, but future agents may mistake provisional docs for settled product constraints.
- The task queue is cleaner than Connections' queue, but still at risk of accumulating implementation-detail blocks.
- TMTC's model is a good standards source, but using a product repo as the canonical cross-project source would recreate the context-containment problem the repo explicitly warns against.

Best material to preserve:

- Short `AGENTS.md` as a contract wrapper around maintained docs.
- Documentation homes and doc-owner discipline.
- Security baseline, disclosure response, review routing, and local-only raw planning rule.
- Supply-chain CI posture.
- Active-state task queue rule with five-entry completion pruning.

### Project Standards

Current shape:

- Personal bootstrap repo with slash command templates.
- Templates exist for Next.js + Supabase and Vite + React + Supabase.
- Template `AGENTS.md` already resembles TMTC's concise contract.

Strengths:

- This is the right canonical home for cross-project standards.
- It already separates reusable templates from product repos.
- It gives a natural adoption mechanism: bootstrap new projects and retrofit existing ones through template updates.

Weaknesses:

- No PickSix-style AWS CDK/Lambda/DynamoDB template.
- Current templates are strongest for Supabase web apps, not split frontend/backend projects.
- The template baseline does not yet capture the full best-of set from all three projects: tiered gates, review routing detail, security disclosure, human engineering practice, and stack-specific hazard docs.
- There is no visible versioning/adoption ledger tying each product repo to a standards baseline version.

## Common Framework To Extract

The shared framework should cover standards, not implementation.

### Agent Contract

Every repo should have:

- `AGENTS.md` as the short operating contract.
- `CLAUDE.md` as a thin wrapper importing `AGENTS.md`.
- Explicit project mode: bootstrap, active development, production support, or maintenance.
- Role model with at least CTO, ARC, PLT, ENG, QAT, UAT, REV, SEC, DOC, UXD.
- Rule that reviewers stay independent by default.
- Rule that recurring rituals belong in commands, not memory.
- Rule that raw planning, credentials, live findings, and scratch coordination stay local-only.

### Documentation Homes

Every repo should use the same top-level documentation taxonomy:

- `README.md`: human project overview and setup.
- `docs/adr/`: durable decisions.
- `docs/architecture/`: system shape and boundaries.
- `docs/security/`: threat model, baseline, disclosure, security review.
- `docs/testing/`: QAT/UAT, coverage, runbooks.
- `docs/release/`: launch gates and release process.
- `docs/design/`: personas, IA, mobile UX, copy standards.
- `docs/ops/`: platform and operational runbooks.
- `docs/review/`: review routing and rubrics.
- `.claude/commands/`: project-specific rituals.
- `.claude/agents/`: project-specific reviewer or specialist wrappers.

Project-specific additions are allowed, but every maintained doc needs a canonical home, audience, status, and owner.

### SDLC Baseline

Every repo should define:

- Branch policy by project mode.
- PR-required surfaces once product code exists.
- Direct-to-main carve-outs, if any, limited to doc-only or emergency paths.
- Review routing by touched surface, not author preference.
- Local gate tiers by changed surface.
- Remote CI quality gate.
- Security baseline and disclosure response.
- Dependency risk workflow with allowlists only when reviewed and documented.
- Release/deploy checklist with stack-specific hazards.
- Task queue for active work only, not history.

### Engineering Standards

Every repo should carry or link to:

- Trade-offs before non-trivial implementation.
- Explicit uncertainty.
- Investigate before fixing.
- Read diffs before accepting.
- Address NFRs up front: security, cost, performance, scale, liability, maintainability.
- Stack-specific architecture boundaries enforced by scripts where feasible.
- Domain regression tests for critical algorithms, like PickSix standings backtests.
- Operational practice without AI before public launch.

### Stack-Specific Local Layer

Each repo should keep local standards for:

- Deployment hazards.
- Auth and authorization model.
- Data-access boundaries.
- Migration and rollback rules.
- External vendor quotas and failure modes.
- Domain-specific test fixtures and regression gates.
- Public/external documentation surfaces.

This prevents convergence from flattening useful differences.

## Proposed Convergence Model

Adopt a two-layer model:

1. Shared baseline in `project-standards/`.
2. Product-local overlay in each repo.

The shared baseline should be versioned. Each product repo should record which baseline version it last adopted and which local exceptions it carries.

Recommended files in `project-standards/`:

- `standards/agent-contract.md`
- `standards/documentation-governance.md`
- `standards/review-routing.md`
- `standards/security-baseline.md`
- `standards/task-queue.md`
- `standards/local-gates.md`
- `standards/dependency-risk.md`
- `standards/release-and-deploy.md`
- `templates/nextjs-supabase/`
- `templates/vite-react-supabase/`
- `templates/aws-cdk-lambda-dynamodb/`
- `templates/split-frontend-backend/`

Recommended file in each product repo:

- `docs/ops/standards-adoption.md`

That file should list:

- Adopted baseline version.
- Local overlays.
- Deferred standards.
- Known exceptions.
- Next convergence task.

## Best Practices To Promote

From Connections:

- Queue lifecycle and role ownership.
- Tiered local gates by changed surface.
- Architecture and schema checks as scripts.
- MCP package release discipline.
- Human engineering-practices doc.
- Reviewer independence and routed reviews.

From TMTC:

- Short `AGENTS.md` with links to maintained docs.
- Documentation homes and owner/audience/status metadata.
- Security as a launch gate.
- Disclosure response and local-only raw planning policy.
- Pinned-action CI and secret scanning.
- Compact task queue with completion pruning.

From PickSix:

- Stack-specific deploy hazard warnings in the first-read docs.
- Domain regression gates based on real historical fixtures.
- Clear dev/prod deployment split.
- Manual prod deploy policy where external quota and secrets risk are material.
- Dependency audit allowlist with documented acceptance.

## Main Risks

Over-standardization:

- Risk: applying Connections-level ritual to PickSix would slow work without adding proportional safety.
- Control: keep a small required baseline and allow project-local overlays.

Under-standardization:

- Risk: leaving PickSix outside the role/review/security framework preserves avoidable drift.
- Control: retrofit the baseline contract, review routing, task queue, and security docs first.

Wrong canonical home:

- Risk: using TMTC as the shared source violates context containment and makes a product repo carry cross-project authority.
- Control: promote shared material into `project-standards/`.

Template drift:

- Risk: templates improve but existing repos remain on stale standards.
- Control: add a standards-adoption ledger per repo and schedule periodic convergence sweeps.

Queue bloat:

- Risk: active task queues become history logs.
- Control: keep completed entries capped, route long postmortems to separate docs, and keep queue entries skim-sized.

## Proposed Roadmap

### Phase 0: Decide Governance

Output:

- CTO decision that `project-standards/` is canonical for shared standards.
- Product repos remain authoritative for local overlays.

Review:

- CTO + DOC + ARC.

### Phase 1: Build Standards Baseline v0.1

Output:

- Extract common docs into `project-standards/standards/`.
- Add a standards version marker.
- Add `docs/ops/standards-adoption.md` template.
- Add review routing, task queue, security baseline, local gates, and dependency-risk templates.

Review:

- DOC primary.
- SEC for security baseline and disclosure.
- ARC for architecture/review boundaries.
- PLT for CI/local gate templates.

### Phase 2: Retrofit PickSix First

Why:

- It has the largest gap against the common agent/SDLC framework and will prove the baseline works outside Supabase.

Output:

- Add concise `AGENTS.md` shape while preserving PickSix deploy hazards.
- Add `docs/ops/task-queue.md`.
- Add `docs/review/routing.md`.
- Add `docs/security/security-baseline.md` and dependency-risk policy.
- Add backend CI quality gate before deploy, or split deploy from quality gate.
- Add `docs/ops/standards-adoption.md`.
- Decide whether PickSix backend and frontend share one queue or each carries a local queue with a parent project index.

Review:

- PLT for AWS deploy/CI.
- SEC for admin auth, secrets, audit allowlists, and deploy context.
- ARC for split-repo boundaries.
- DOC for doc homes.

### Phase 3: Slim Connections

Why:

- Connections has the richest standards, but some are too local or too verbose to stay in `AGENTS.md`.

Output:

- Move reusable rules into `project-standards`.
- Keep Connections-specific MCP/content, SET/PUZ/CON, and Supabase rules local.
- Replace long generic sections in `AGENTS.md` with pointers where safe.
- Tighten task queue entries toward active-state summaries; move long closure detail into review, release, or postmortem docs.
- Replace default Vite README with a real human project overview.
- Add `docs/ops/standards-adoption.md`.

Review:

- DOC primary.
- CTO for queue semantics.
- MCP/CON for preserving content-tooling rules.
- SEC for external `mcp-content/README.md` boundaries.

### Phase 4: Align TMTC Back To Baseline

Why:

- TMTC is closest to the desired contract, but its reusable parts should move upstream.

Output:

- Add `docs/ops/standards-adoption.md`.
- Cross-link project-local docs to shared baseline where appropriate.
- Keep active launch-gate security docs local.
- Track local-only CI gaps for integration/e2e tests until PLT provisions CI Supabase.

Review:

- DOC + SEC + PLT.

### Phase 5: Versioned Maintenance

Output:

- Quarterly standards review.
- Baseline changelog in `project-standards`.
- Adoption sweep tasks in each product queue when baseline changes materially.
- New-project bootstrap uses the latest standards by default.

Review:

- CTO + DOC.

## Near-Term Decision Questions

1. Should `project-standards/` become the explicit canonical home for shared standards?
2. Should PickSix backend and frontend be treated as one project with two repos, or two projects with a parent coordination doc?
3. What is the minimum required baseline for production-support projects versus bootstrap projects?
4. Should the shared baseline require remote CI before deploy, or allow deploy workflows to contain their own checks for smaller projects?
5. How much Connections queue detail should remain in the active queue versus move to closure notes?

## Recommended First Move

Create a `project-standards` branch that adds Standards Baseline v0.1 and an adoption ledger template. Then open three product-retrofit tasks:

- PickSix baseline retrofit.
- Connections slimming and standards-adoption ledger.
- TMTC standards-adoption ledger and upstream sync.

Do not start by editing all three product repos independently. That would create three slightly different answers and make convergence harder.

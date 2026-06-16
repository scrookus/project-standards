# project-standards Standards Adoption

Status: active
Owner: DOC
Audience: CTO / DOC / ARC / PLT / SEC / ENG
Last reviewed: 2026-06-16

## Adopted Baseline

Baseline: standards-v0.2
Adopted on: 2026-06-16
Adoption owner: DOC

Shared standards source: `standards/`

## Local Overlays

| Area | Local Doc | Owner | Notes |
|---|---|---|---|
| Agent contract | `AGENTS.md` | DOC | First-read rules for changing shared standards and templates. |
| Review routing | `docs/review/routing.md` | DOC | Routes standards changes by affected lane. |
| Task queue | `docs/ops/task-queue.md` | CTO | Active work and product adoption tasks. |
| Branch/worktree | `docs/ops/branch-and-worktree.md` | PLT | Anti-hijack rules for standards/template work. |
| Context budget | `docs/ops/context-budget.md` | DOC | First-read, surface-read, and reference-only docs. |
| Cost/subscriptions | `docs/ops/cost-and-subscriptions.md` | CTO | Subscription posture for this repo and generated templates. |
| Local gates | `docs/testing/local-gates.md` | PLT | Markdown/review checks and template validation expectations. |
| Release/deploy | `docs/release/release-and-deploy.md` | PLT | Standards versioning, install updates, and product adoption handoff. |
| Dependency risk | `docs/security/dependency-risk.md` | SEC | Template and script dependency review. |

## Known Exceptions

| Exception | Rationale | Compensating Control | Owner | Review Date |
|---|---|---|---|---|
| No product runtime | This repo publishes standards/templates rather than running a production app. | Local gates focus on docs, templates, scripts, and downstream adoption impact. | PLT | 2026-07-15 |
| Product adoption happens outside this repo | Product repos own local overlays and task queues. | Standards changes must identify affected product adoption tasks. | CTO | 2026-07-15 |
| Standards version bump authority | Reviewers can recommend bump levels, but CTO decides whether a standards change changes the published baseline version. | Release/deploy overlay requires CTO confirmation before versioned release. | CTO | 2026-07-15 |

## Upstream Candidates

Use this section for methodology decisions discovered in product repos that may belong in `project-standards/`.

| Source Doc | Reusable Principle | Product-Specific Parts To Exclude | Owner | Status |
|---|---|---|---|---|
| PickSix `docs/testing/coverage-methodology.md` | Coverage thresholds are ratchets; tool-version coverage changes need recalibration notes. | PickSix paths, Vitest-only details, Node-version specifics unless broadly applicable. | QAT / PLT | promoted to `standards/local-gates.md` |
| PickSix first-session feedback | Promote staging to production only when code changes are in scope. | PickSix branch names and Amplify topology. | PLT / CTO | promoted to `standards/release-and-deploy.md` |
| PickSix first-session feedback | Always confirm before deploy; describe scope, target, and blast radius before waiting for explicit approval. | Product-specific deploy commands and environments. | PLT / SEC | promoted to `standards/release-and-deploy.md` |
| PickSix `.audit-allowlist.json` | Audit allowlist entries should include advisory ID plus a plain-English reason. | npm-only file names and exact JSON shape unless adopted by an npm project. | SEC / PLT | promoted to `standards/dependency-risk.md` |
| PickSix frontend test feedback | Boundary tests are insurance for mocked transport, not proof of production signal. | MSW-specific examples unless the adopting repo uses MSW. | QAT / REV | promoted to `standards/local-gates.md` |
| PickSix frontend cache-header work | SPA cache policy should separate shell, immutable hashed assets, and service-worker revalidation. | Amplify `customHttp.yml` syntax and PickSix domain details. | PLT / SEC | promoted as host-agnostic guidance in `standards/release-and-deploy.md` |

## Next Convergence Task

Task ID: PSTD-001
Owner: DOC
Next action: Run self-adoption review and commit/PR the baseline before opening adoption tasks for Connections and TMTC.

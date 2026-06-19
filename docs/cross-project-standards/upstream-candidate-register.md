# Upstream Candidate Register

Status: active
Owner: DOC
Audience: CTO / DOC / ARC / PLT / SEC / ENG / QAT / UXD
Last reviewed: 2026-06-18

## Purpose

This register tracks methodology discovered in product repos that may belong in `project-standards/`.

Do not copy product docs wholesale into the shared baseline. Promote reusable principles, exclude product-specific syntax and history, then open explicit adoption tasks in affected product queues.

## Promoted

| Source | Reusable Principle | Product-Specific Parts Excluded | Owner | Promoted To |
|---|---|---|---|---|
| PickSix `docs/testing/coverage-methodology.md` | Coverage thresholds are ratchets; tool-version coverage changes need recalibration notes. | PickSix paths, Vitest-only details, Node-version specifics unless broadly applicable. | QAT / PLT | `standards/local-gates.md` |
| PickSix first-session feedback | Promote staging to production only when code changes are in scope. | PickSix branch names and Amplify topology. | PLT / CTO | `standards/release-and-deploy.md` |
| PickSix first-session feedback | Always confirm before deploy; describe scope, target, and blast radius before waiting for explicit approval. | Product-specific deploy commands and environments. | PLT / SEC | `standards/release-and-deploy.md` |
| PickSix `.audit-allowlist.json` | Audit allowlist entries should include advisory ID plus a plain-English reason. | npm-only file names and exact JSON shape unless adopted by an npm project. | SEC / PLT | `standards/dependency-risk.md` |
| PickSix frontend test feedback | Boundary tests are insurance for mocked transport, not proof of production signal. | MSW-specific examples unless the adopting repo uses MSW. | QAT / REV | `standards/local-gates.md` |
| PickSix frontend cache-header work | SPA cache policy should separate shell, immutable hashed assets, and service-worker revalidation. | Amplify `customHttp.yml` syntax and PickSix domain details. | PLT / SEC | `standards/release-and-deploy.md` |
| PickSix frontend `docs/agent-handoff/ci-coverage-ratchet.md` | Coverage gates should be measured floors and ratchets, not aspirational targets or unblock-by-lowering switches. | Vitest/c8 examples, exact thresholds, file paths. | QAT / PLT | `standards/local-gates.md` |
| PickSix frontend `docs/agent-handoff/db-safety-reports.md` | Data/schema changes need a concise safety report naming change, real risk, false positives, rollback, and checks. | Supabase analyzer warnings, Postgres/RLS-specific examples. | PLT / SEC / ARC | `standards/local-gates.md` |
| PickSix frontend `docs/agent-handoff/data-access-boundary.md` | Data access boundaries must be named and enforceable rather than convention-only. | Supabase client paths, env var names, regex implementation. | ARC / SEC | `standards/security-baseline.md` |
| PickSix frontend `docs/agent-handoff/mfa.md` | Privileged actions need a session-assurance model, recovery path, and server-side enforcement. | Supabase AAL/RLS syntax, TOTP-specific flow. | SEC / UXD | `standards/security-baseline.md` |
| TMTC `docs/adr/0016-task-queue-authority-and-storage.md` | Active queue authority should be distinct from generated/read-only queue mirrors when multi-agent worktrees make tracked Markdown queues stale or unsafe. | TMTC incident dates, GitHub label taxonomy, script names, issue templates, and migration phases. | CTO / DOC / PLT | `standards/task-queue.md` |
| Connections standards-v0.3 adoption feedback | Inventory and enumeration tables should be written while reading current source files, not from memory of an earlier scan. | Connections workflow names, Deno runtime row, and local CI file paths. | DOC / PLT / ENG | `docs/cross-project-standards/standards-v0.3-adoption-prompt.md` |
| Connections standards-v0.3 adoption feedback | Shared review-routing instructions should allow product-local role mappings when a project absorbs DOC, PLT, or other shared lanes into another role. | Connections role taxonomy and mapping table. | DOC / CTO | `docs/cross-project-standards/standards-v0.3-adoption-prompt.md` |
| Connections standards-v0.3 adoption feedback | Dependabot/Renovate policy needs one canonical overlay owner to avoid duplicated repository-controls and dev-tooling text. | Connections local cross-links and product-specific automation details. | PLT / SEC / ENG | `standards/dev-tooling-and-package-versioning.md` and `standards/repository-controls.md` |

## Candidates

| Source | Reusable Principle | Product-Specific Parts To Exclude | Owner | Next Review |
|---|---|---|---|---|
| PickSix frontend `docs/agent-handoff/design-system-as-source-of-truth.md` | Product UI should have named tokens/primitives and explicit mobile scope. | Tailwind-specific guidance and exact component names. | UXD / ENG | Decide whether to create a UXD/design standard. |
| PickSix frontend `docs/agent-handoff/ux-exception-capture.md` | Observability can start with one capture wrapper, scrubbed local diagnostics, and a later backend swap. | Sentry/source-map implementation and frontend file paths. | PLT / SEC / UXD | Decide whether to create support/observability guidance. |
| Connections standards-v0.2 adoption assessment | Lane-partitioned memory and session-start routing can reduce context load while preserving role-specific operating knowledge. | Connections memory paths, hook implementation, role names, and auto-injection mechanics. | DOC / CTO | Session role identity principle promoted to `standards/agent-contract.md`; broader memory-routing shape remains candidate. |
| Connections standards-v0.2 adoption assessment | Inbox-to-queue separation keeps raw coordination distinct from CTO-owned task commitments. | Connections `/queue-task` skill mechanics, task ID formats, and local inbox paths. | CTO / DOC | Compare with PickSix/TMTC queue models. |
| Connections standards-v0.2 adoption assessment | Direct-to-main carve-out catalogs should list allowed categories, verification expectations, and when PRs remain mandatory. | Connections-specific carve-out categories and release rituals. | PLT / DOC | Compare with existing branch/worktree standard. |
| Connections standards-v0.2 adoption assessment | Task ID counters can make queue assignment auditable when multiple agents propose work. | Connections counter file names, role prefixes, and automation hooks. | CTO | Keep product-local unless another repo needs it. |
| Connections standards-v0.2 adoption assessment | Public-safe docs can point to private memory/runbooks when full security, release, or ops detail should not live in repo docs. | Private memory contents, unpublished security detail, and live incident notes. | SEC / DOC | Evaluate for security/release documentation guidance. |
| TMTC standards-v0.2 adoption assessment | Existing product-local standards can be kept and prefixed with shared-baseline pointers instead of rewritten when they are stricter and accurate. | TMTC launch-gate security, RLS, AAL, capability, and parish-domain specifics. | DOC / SEC / PLT | Evaluate as adoption guidance. |
| TMTC standards-v0.2 adoption assessment | Product-local role extensions should be recorded as explicit extensions or mappings, not forced into the shared role vocabulary. | TMTC MCP role, local reviewer names, and capability implementation. | DOC / CTO | Compare with Connections role divergence. |
| TMTC standards-v0.2 adoption assessment | Held-for-trigger queue states and recently-completed pruning can keep active queues small without losing deferred launch-gate context. | TMTC task names, launch-gate sequencing, and local queue section names. | CTO / DOC | Compare with Connections inbox/queue model; authority/mirror principle promoted from ADR 0016. |
| TMTC standards-v0.2 adoption assessment | Migration safety should include immutable migration rules, cascade maps, and emergency-unblock procedures where database launch gates are active. | Supabase-specific migration files, SEC-021 audit details, and local incident history. | PLT / SEC / ARC | Compare with promoted data/migration safety report guidance. |
| TMTC standards-v0.2 adoption assessment | Agent context containment can be made explicit by rejecting reliance on shared global agent instructions for product-critical rules. | TMTC ADR numbers, local comms framework, and project-specific memory policy. | DOC / SEC | Evaluate with context-budget standard. |
| CTO cross-project consistency concern | Repos need a consistent controls record for git config, merge rules, branch protection, required checks, CI workflow ownership, and bypass rules. | Exact GitHub settings, check names, merge methods, and branch names differ per repo. | PLT / SEC / CTO | Drafted as `standards/repository-controls.md`; decide in `PSTD-008`. |
| CTO cross-project consistency concern | Repos need a consistent tooling/version record for runtimes, package managers, lockfiles, dependency upgrade policy, GitHub Actions, automation, and package publication. | Exact tool versions, package managers, release workflows, and package names differ per repo. | PLT / ENG / SEC / CTO | Drafted as `standards/dev-tooling-and-package-versioning.md`; decide in `PSTD-009`. |
| Connections `.claude/commands/check-comms.md` | Agents should have a session coordination check that refreshes live queue state, role-relevant inbox/comms, blockers, and cleared dependencies from disk before acting. | Connections memory paths, role names, grep commands, SessionStart hook implementation, and queue section names. | DOC / CTO | Candidate for future agent-session-rituals guidance; compare with TMTC memory/context containment. |
| Connections `.claude/commands/wrap.md` | Agents should write short session wraps only when durable carry-forward state changed, with a strict line budget and no routine progress noise. | Connections lane directories, exact wrap file names, inbox remediation mechanics, and Claude-specific launcher details. | DOC / CTO | Candidate for future agent-session-rituals guidance; compare with TMTC memory/context containment. |
| Connections role launchers and SessionStart hook | Specialist sessions should expose an explicit, stable role identity signal early in the session so agents know their queue lane, review lane, memory lane, and mutation authority. | Connections launcher aliases, terminal-title convention, role list, hook code, and private memory paths. | DOC / CTO | Promoted to `standards/agent-contract.md`; implementation remains product-local. |
| Connections post-adoption feedback | Upstream candidates and deferred standards should have queue-backed triggers, not ledger-only aspirations. | Connections task IDs, local deferred-standard names, and project-specific triggers. | CTO / DOC | Candidate for documentation-governance/task-queue refinement. |
| Connections post-adoption feedback | When handing facts to a reviewing sub-agent, mark unverified claims as hypotheses and ask the lane to verify against current state. | Connections migration numbers, private memory references, and lane-specific prompt wording. | REV / DOC | Candidate for review-routing or agent-session-rituals guidance. |
| Connections standards-v0.3 adoption feedback | Fresh-context lane review can catch content-substance gaps in CTO-led docs work that touches another lane's surface. | Connections SEC sub-agent run, token/session details, and local Rule 18 implementation. | REV / DOC / SEC | Candidate for review-routing or agent-session-rituals guidance. |

## Deferred Or Rejected

None yet.

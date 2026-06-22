---
type: Template
title: Standards v0.5 Adoption Prompt
description: Prompt for product repos adopting the agent permission boundary v0.5 baseline.
resource: docs/cross-project-standards/standards-v0.5-adoption-prompt.md
tags: [standards, adoption, v0.5, permissions, security]
timestamp: 2026-06-21T00:00:00-07:00
status: active
owner: SEC
okf_version: "0.1"
---
# Standards v0.5 Adoption Prompt

Status: active
Owner: SEC
Audience: CTO / SEC / PLT / DOC
Last reviewed: 2026-06-21

## Purpose

Use this prompt for product repos adopting `standards-v0.5`.

`standards-v0.5` is an agent permission boundary baseline. It adds:

- `standards/agent-permission-user-baseline.md`
- `standards/agent-permission-boundaries.md`
- `templates/shared/agent-runtime-permission-report.md`

This is security-sensitive work. Do not change runtime permissions during the initial inventory pass.

## Prompt

Start in `<PRODUCT_REPO>`.

Before answering adoption status, record the current branch/ref, commit SHA, and date. Adoption state is not repo-wide when branches diverge.

Use `project-standards` at the published `standards-v0.5` tag. Do not read a local `project-standards` checkout's current branch as the baseline unless the user explicitly asks for unreleased standards work.

Read first:

1. `AGENTS.md`
2. `docs/ops/standards-adoption.md`
3. Product-local security, branch/worktree, repository-controls, dev-tooling/package-versioning, local-gates, and release/deploy overlays
4. `project-standards/standards/agent-permission-user-baseline.md`
5. `project-standards/standards/agent-permission-boundaries.md`
6. `project-standards/templates/shared/agent-runtime-permission-report.md`

Mission:

Adopt `standards-v0.5` in stages while preserving product-local overlays and without silently expanding or narrowing agent authority.

Stage A: inventory and classification only.

1. Fill out the runtime permission report or a product-local equivalent.
2. Classify user-level, managed, project-level, session-level, and worktree-local permission state.
3. Record the expected user-level baseline source and whether it is enforced, detected, reviewed, or absent.
4. Name local/session drift and any credential-bearing approval entries without printing secrets.
5. Record whether ordinary agent work is isolated by container, VM, sandbox, or host-only convention.
6. Record whether privileged mutations are directly available to the agent or brokered through a gateway, workflow, or operator path.
7. Record placement: which rules belong in user/managed baseline, project overlay, and role/subagent instructions.
8. If sandboxing is enabled or proposed, record whether Git, GitHub CLI, package install, local tests, and temporary-file writes are verified. If not verified, mark sandbox as deferred/pilot and do not claim sandbox-based hard prevention.
9. Record how worktree-local secret-bearing files such as `.env.local` are created without agents reading, printing, or hand-copying values.
10. Record whether reviewing/security subagents can answer ask prompts. If not, define their artifact handoff path and the parent/operator/gateway action that posts remote reviews or comments.
11. Recount live allow, ask, and deny arrays with `jq` or an equivalent structured parser before recording permission counts.
12. Update `docs/ops/standards-adoption.md` with permission authority layers, adoption status, and conformance debt.
13. Queue product-local follow-ups for empirical verification, drift detection, deny/ask policy, role handoff, local secret bootstrap, isolation/gateway hardening, local approval cleanup, and credential cleanup.

Stage B and later: permission-change sessions only.

Do not implement these during Stage A unless the user explicitly starts a permission-change session.

1. Empirically verify runtime precedence across user, managed, project, session, and local settings.
2. Verify cross-tool write protection only against sacrificial files, throwaway worktrees, temporary home directories, containers, or explicit backup/restore harnesses. Do not probe live permission-authority files with commands that can open them for write.
3. Verify cross-tool write protection for permission-authority files; do not treat one denied editor tool as sufficient if shell, interpreter, formatter, patch, copy, or package-script paths can still mutate the same files.
4. Add detection for local/session drift if hard prevention is unavailable.
5. Add or verify deny rules for the user-level baseline. Use `scripts/generate-agent-permission-denies.mjs` or a product-local equivalent to generate path/write-surface denies from protected permission-authority paths, then review the generated entries before applying them.
6. Add or verify ask rules for high-blast-radius operations. Use wrapper-aware substring patterns for risky Bash asks when prefix-only forms can be bypassed through `cd`, `env`, subshells, aliases, or command wrappers.
7. Add project-level allows for durable review artifacts if reviewers need a file path for findings.
8. Update role prompts so non-interactive subagents write artifacts and hand off ask-gated remote mutations to the parent session, operator, or gateway. Use body-file style posting for long PR reviews/comments rather than inline Markdown in shell commands.
9. Before enabling sandbox as an active control, verify routine workflows or document a brokered/operator substitute: `git fetch`, `git push`, PR view/create/review, package install, local tests, and temporary-file writes.
10. Add or verify a trusted local-secret bootstrap command if worktrees need `.env*` or credential files for routine tests. Use `scripts/bootstrap-worktree-secret-file.sh` or a product-local equivalent; the command must not print values and must verify ignored/untracked status before publish steps.
11. Promote safe routine allows only after reviewing local approval drift.
12. Move high-authority actions behind a gateway, workflow, or operator path where practical instead of exposing raw credentials or admin CLIs to ordinary agent sessions.
13. Clean up broad, stale, or credential-bearing local approvals.

Constraints:

- Do not edit user-level, project-level, session-level, or local permission settings during Stage A.
- Do not run write-capable probes against live permission-authority files; a probe that can truncate or overwrite the target is permission-changing work even if the payload is empty.
- Do not print secrets, tokens, credential values, or secret-bearing command contents.
- Do not read, print, or hand-copy `.env*` or credential files between worktrees. Use an operator-approved trusted bootstrap path.
- Do not treat prompt approval as permission to broaden future authority.
- Do not claim hard prevention unless managed policy or verified runtime semantics prove lower-scope settings cannot override the baseline.
- Do not claim sandbox-based hard prevention if sandboxing breaks or has not verified routine Git, GitHub, package, test, and temporary-file workflows.
- Do not rely on subagents to perform ask-gated actions if the runtime does not let them answer prompts; define a handoff artifact and parent/operator/gateway posting path.
- Do not accept permission count claims until the live arrays have been recounted against the active settings source.
- Do not inline long PR reviews or comments into shell commands; use body-file or a gateway/operator path.
- If only detection and review controls exist, say so plainly.
- Route SEC primary, PLT for enforcement/tooling, CTO for user-level authority and task priority, DOC for adoption ledger clarity.

Expected output:

1. Files changed.
2. Branch/ref checked, adopted version, upstream-current state, and conformance debt.
3. Permission authority layers and runtime report location.
4. Enforcement posture: hard prevention, detection/review only, or unknown.
5. Placement summary: user/managed baseline, project overlay, and role/subagent instructions.
6. Worktree-local secret bootstrap path, or explicit gap/debt.
7. Subagent handoff path for ask-gated remote actions, if applicable.
8. Live allow/ask/deny recount source and counts by active authority layer.
9. Empirical verification status and follow-up task IDs.
10. Credential or local-drift cleanup tasks, with no secrets printed.
11. Local gates or verification run, or reason not run.
12. Review lanes before merge.

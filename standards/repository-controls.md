---
type: Standard
title: Repository Controls Standard
description: Repository settings, branch protection, CI ownership, merge, and bypass rules.
resource: standards/repository-controls.md
tags: [standards, repository, controls]
timestamp: 2026-06-20T00:00:00-07:00
standards_version: standards-v0.4
status: baseline
owner: PLT
okf_version: "0.1"
---
# Repository Controls Standard

Version: standards-v0.4
Status: baseline
Owner: PLT
Review: DOC primary; PLT for repository settings and CI; SEC for protected branches, secrets, and bypass rules; CTO for cost/subscription fit

## Requirement

Each active or production-support repo must document the repository controls that make branch, merge, CI, and release rules enforceable.

This standard requires a consistent record of GitHub settings, merge methods, branch protection, required checks, CI ownership, and bypass rules.

## Minimum Controls Record

Each product overlay must state:

- Default branch and production branch, if different.
- Protected branches, protection intent, and any branch that can deploy or promote an environment.
- Allowed merge methods: merge commit, squash, rebase, or local exception.
- Whether linear history is required.
- Required PR review count and review lanes.
- Required status checks by branch.
- Who may bypass branch protection, and under what recorded emergency process.
- Direct-to-main carve-outs and their required commit or task notation.
- Branch deletion/retention policy after merge.
- Push policy: when branches should stay local, when origin publication is required, and which pushes may trigger CI, deploy, or review workflows.
- Local hook installation expectations.
- Dependency-update merge and branch-protection posture, with detailed automation policy owned by the dev-tooling/package-versioning overlay.
- CI workflow names, triggers, path filters, concurrency rules, and cost posture.
- Secrets and environment ownership for CI and deploy jobs.
- Agent permission policy files, local permission setup scripts, and tool config that can expand or bypass agent authority.

## Baseline Posture

For active and production-support repos:

- PRs are the normal merge path for code, CI, deploy, dependency, security, release, and maintained operating docs.
- `main` or `master` must be protected.
- Any branch that triggers deployment, environment promotion, release publication, or production-support automation must be protected. This includes branches named `development`, `develop`, `dev`, `staging`, `release`, or product-local equivalents when CI/CD treats them as deploy sources.
- Bootstrap or solo-maintainer exceptions are temporary gaps, not the default. They must be recorded in the adoption ledger or task queue with owner, rationale, compensating control, and review date.
- Required checks must match the local-gates overlay. If a local gate is required before merge, the repo must either enforce it remotely or record why it remains local-only.
- CI workflows must be path-filtered or otherwise cost-aware where the user's subscription, Actions minutes, vendor quotas, or paid services make that material.
- Agents must not change branch protection, repo settings, CI secrets, or merge methods without explicit CTO/PLT authority and a recorded review path.
- Agents must not change user-level permission baselines, tracked project permission policy, or permission setup scripts without an explicit permission-change session and SEC/PLT review.

## Git Config Guidance

Do not rely on a user's global Git config for project safety. Product overlays should document repo-local expectations when they matter, such as:

- Hook paths or hook installation commands.
- Pull/rebase/merge expectations for shared branches.
- Commit signing expectations, if any.
- Line-ending or filemode settings, if the stack is sensitive to them.

Prefer repo-local config, documented setup commands, or checked-in hooks/scripts where possible. If a setting cannot be enforced locally, make it visible in the overlay so reviewers know what assumption is being made.

## Branch Protection Review

Branch protection and merge rules should be reviewed when:

- A project moves from bootstrap to active development.
- A project approaches production support or launch.
- CI workflow names or required checks change.
- A deploy branch, production branch, or environment promotion rule changes.
- New agents begin working in parallel.
- A bypass or direct-to-main emergency path is used.

## Product Overlay Examples

- PickSix should record split frontend/backend branch protections, Amplify auto-deploy branches, CDK/deploy required checks, and any manual production-deploy bypass rules.
- Connections should record MCP/content package checks, release/dogfood gates, protected main behavior, and any queue-approved direct-to-main carve-outs.
- TMTC should record worktree-heavy launch-gate branch rules, Supabase/security gates, migration/deploy checks, and any emergency unblock path.

## Rule

Repository controls are part of the operating contract. If the documented merge or CI rule differs from actual repository settings, the adoption ledger or task queue must track the gap.

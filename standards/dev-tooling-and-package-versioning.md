---
type: Standard
title: Dev Tooling And Package Versioning Standard
description: Runtime, package manager, lockfile, automation, and package-versioning rules.
resource: standards/dev-tooling-and-package-versioning.md
tags: [standards, dev, tooling, and, package, versioning]
timestamp: 2026-06-20T00:00:00-07:00
standards_version: standards-v0.3
status: baseline
owner: PLT
okf_version: "0.1"
---
# Dev Tooling And Package Versioning Standard

Version: standards-v0.3
Status: baseline
Owner: PLT
Review: DOC primary; PLT for tooling and CI; ENG for runtime/build impact; SEC for supply-chain risk; CTO for subscription, cost, and vendor posture

## Requirement

Each active or production-support repo should document its development toolchain, package manager, runtime versions, dependency update rules, and package/version release posture.

This standard is proposed for the next baseline because the current v0.2 standards cover dependency risk and local gates, but do not define how projects keep Node, package managers, build tools, internal packages, GitHub Actions, and lockfiles consistent.

## Minimum Toolchain Record

Each product overlay should state:

- Runtime versions used locally and in CI, such as Node, Python, Docker, Supabase CLI, AWS CDK, Playwright browsers, or other stack tools.
- Package manager and install command, such as `npm ci`, `npm install`, `pnpm install`, or equivalent.
- Lockfile policy and who may update lockfiles.
- Where tool versions are pinned, such as `package.json`, `.nvmrc`, `.node-version`, Dockerfile, CI workflow, action config, or project-local setup docs.
- Required setup commands after clone or worktree creation.
- Which generated tooling artifacts should be committed and which should remain local.
- How to update local hooks or project-local agent/tool settings.

## Dependency Version Policy

Product overlays should state the expected version style for each dependency class:

- Runtime dependencies.
- Dev/build/test dependencies.
- GitHub Actions and CI installers.
- CLIs and external tools.
- Internal packages or MCP/tool packages.

Default posture:

- Prefer committed lockfiles for application repos.
- Use deterministic install commands in CI.
- Pin or tightly constrain tooling that affects deploy, tests, migrations, security scans, or generated output.
- Avoid broad upgrades bundled with unrelated feature work.
- Major upgrades should be their own PR or explicitly called out in the PR body.
- Floating versions are acceptable only when the product overlay records why drift is safe or desirable.

## Upgrade Rules

Package, runtime, or tooling upgrades should record:

- What changed.
- Why the upgrade is needed.
- Whether runtime behavior, build output, coverage measurement, generated files, deploy behavior, or security posture may change.
- Required local and remote gates.
- Review lanes: ENG for code/build impact, PLT for CI/deploy/tooling, SEC for supply-chain or public exposure, CTO for paid/vendor/subscription impact.

When an upgrade changes how tests, coverage, generated output, migrations, or packages are measured, update the relevant methodology doc or adoption ledger with the recalibration rationale.

## Automation And Dependabot

If the repo uses Dependabot, Renovate, or equivalent automation, the product overlay should document:

- Grouping rules.
- Auto-merge rules, if any.
- Required checks before auto-merge.
- Which updates require human review.
- How accepted audit findings are tracked.
- How noisy or recurring updates are throttled.

This standard owns the canonical dependency-update automation policy: grouping, version posture, auto-merge, human review, accepted audit finding flow, and noise throttling. Repository-controls overlays may reference required checks or branch-protection behavior for dependency-update PRs, but should link here rather than duplicate the policy.

Security updates may be expedited, but should still preserve review visibility and post-merge verification appropriate to the touched surface.

## Package Publication

Repos that publish packages, MCP tools, templates, content bundles, or installable artifacts should document:

- Versioning scheme.
- Release owner.
- Changelog or release-note requirement.
- Package tests and smoke checks.
- Publication command or workflow.
- Rollback or yanking process, if available.
- Consumer adoption path.

Do not infer package publication rules from application deploy rules. A package release changes downstream consumers even when no production environment is deployed.

## Cost And Subscription Fit

Tooling changes must stay aligned with the product's cost/subscription overlay. Before adding or upgrading tools that use paid plans, metered APIs, CI minutes, hosted scans, browser grids, AI/model calls, or external vendors, get CTO review and document the cost posture.

## Product Overlay Examples

- PickSix should record Node/npm posture, AWS CDK versioning, Amplify/GitHub Actions action versions, frontend/backend lockfile ownership, RapidAPI client/tooling changes, and coverage recalibration rules.
- Connections should record MCP/content package versioning, Supabase CLI, Vite/Vitest/Playwright, package publication checks, release/dogfood tooling, and Dependabot posture.
- TMTC should record Supabase CLI, Vercel/CI tooling, Playwright/e2e dependencies, security scanner/tool versions, launch-gate allowlists, and any AAL/capability test tooling.

## Rule

If a tool or dependency version affects correctness, security, CI, deploy, package publication, generated output, or cost, it is part of the operating contract and must be documented locally.

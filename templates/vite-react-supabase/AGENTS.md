# Working with AI agents on this repo

Status: draft
Date: {{DATE}}
Audience: agent / internal
Owner: CTO

This file is the {{PROJECT_NAME}} agent operating contract. Keep it short, enforceable, and linked to maintained docs rather than duplicating them.

## Project

<!-- One paragraph: what this project does and who it's for. -->
{{PROJECT_DESCRIPTION}}

## Current Mode

<!-- e.g. "CTO/bootstrap mode. Direct-to-main acceptable until product code exists." -->
<!-- or "Active development. Role-prefixed branches required. PRs to main." -->
{{CURRENT_MODE}}

Security is a primary launch gate. Apply `docs/security/security-baseline.md` before product, platform, external-doc, or MCP/tool work.

Once implementation starts, use role-prefixed branches and route reviews through `docs/review/routing.md`.

## Role Model

The project uses focused agent roles to preserve judgment and memory hygiene:

- `CTO`: strategy, priorities, launch gates, cost, billing, vendor posture.
- `ARC`: architecture, system boundaries, ADRs, cross-cutting technical direction.
- `PLT`: platform, deployment, CI/CD, environments, observability, reliability, database operations, secrets handling.
- `ENG`: product/application implementation.
- `MCP`: MCP servers, tools, resources, prompts, protocol contracts, validators, releases.
- `QAT`: internal acceptance testing through shipped interfaces.
- `UAT`: external-user acceptance testing through public/scoped interfaces only.
- `REV`: independent application-code review.
- `SEC`: security, privacy, compliance, secrets, dependencies, trust boundaries.
- `DOC`: documentation governance, canonical homes, freshness, archival, internal/external separation.
- `UXD`: journeys, navigation/IA, mobile ergonomics, accessibility, copy, onboarding, docs-as-UX.

## Operating Rules

1. **Trade-offs first, implementation second.** For non-trivial changes, present options and trade-offs before writing code.
2. **Surface uncertainty explicitly.** Say when an API, data shape, security assumption, or operational guarantee is uncertain.
3. **Stay in role and lane.** Role defines responsibility. Multiple agents may share a role, but parallel work uses separate branches or worktrees.
4. **Use commands for rituals.** Recurring behavior belongs in slash commands, not memory. Docs define standards; commands invoke behaviors.
5. **Reviewers stay independent.** REV, SEC, and UXD are read-only by default and do not co-author the change they review unless explicitly asked for a narrow edit.
6. **Route review by surface.** Use `docs/review/routing.md` before PR or release decisions. Security, platform, architecture, UX, QAT, UAT, and docs reviews are triggered by touched surfaces, not author preference.
7. **Raw planning stays local.** Seed memos, questionnaires, session wraps, live inboxes, scratch notes, credentials, active findings, and raw memory extractions do not belong in product repos.
8. **Disclosure issues are stop-the-line.** If internal-only, sensitive, or accidentally public material is discovered in a tracked, pushed, packaged, or external surface, stop unrelated work and contain immediately.
9. **Every maintained doc has one home.** New docs need a canonical location, audience, status, and owner.
10. **QAT and UAT do not use backdoors.** QAT tests shipped interfaces. UAT uses only public or externally scoped access. Workarounds are findings.
11. **Address NFRs up front.** For material feature work, explicitly handle or defer performance, scale, cost, security, liability, and maintainability.
12. **Task queue is active state, not history.** `docs/ops/task-queue.md` shows only active tasks (next/active/blocked/review) plus the last 5 completed entries. Git log is the permanent record.
13. **Keep this contract small.** Add rules only when they name the failure they prevent.

## Documentation Homes

- `AGENTS.md`: agent operating contract only.
- `CLAUDE.md`: thin wrapper importing this file.
- `README.md`: human project overview and setup.
- `docs/adr/`: durable decisions.
- `docs/architecture/`: system shape and boundaries.
- `docs/security/`: threat model, secrets, disclosure, security review.
- `docs/testing/`: QAT/UAT, coverage, journey maps, runbooks.
- `docs/release/`: launch gates and release process.
- `docs/design/`: personas, IA, mobile UX, copy standards.
- `docs/ops/`: platform and operational runbooks.
- `docs/review/`: review routing and rubrics.
- `.claude/agents/`: project-specific subagents.
- `.claude/commands/`: project-specific slash commands.

## Load-Bearing Local Docs

<!-- List the docs that agents must read before acting in their area. -->
<!-- Add to this list as the project grows. -->
- `docs/ops/task-queue.md`

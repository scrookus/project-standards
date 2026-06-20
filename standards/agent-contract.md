---
type: Standard
title: Agent Contract Standard
description: First-read operating contract requirements for agents and reviewers.
resource: standards/agent-contract.md
tags: [standards, agent, contract]
timestamp: 2026-06-20T00:00:00-07:00
standards_version: standards-v0.2
status: baseline
owner: DOC
okf_version: "0.1"
---
# Agent Contract Standard

Version: standards-v0.2
Status: baseline
Owner: DOC
Review: DOC primary; ARC, PLT, SEC as needed

## Requirement

Each product repo must expose a short first-read agent contract.

Minimum files:

- `AGENTS.md`: the operating contract for agents and humans reviewing agent work.
- `CLAUDE.md`: a thin wrapper that imports or points to `AGENTS.md`.

`AGENTS.md` should stay compact and link to maintained docs instead of becoming the whole operating system.

## Required Content

Each contract must state:

- What the project is and who it serves.
- Current mode: bootstrap, active development, production support, or maintenance.
- The agent's operating role for the session, especially when acting as CTO or another queue-owning role.
- Where shared standards are adopted from, which baseline version is current, and which Git tag anchors that baseline.
- Where local overlays live.
- Which docs are first-read versus surface-read or reference-only.
- The review model and reviewer-independence rule.
- The local-only rule for raw planning, credentials, live findings, and scratch coordination.
- The required local gates before merge or deploy.
- Branch/worktree and PR/direct-to-main rules.
- Current subscription/cost posture and quota-sensitive commands.
- Any stack-specific hard hazards that must be seen before work starts.

## Context Budget

The contract should fit in startup context without crowding out task-specific reasoning. If a rule is important only for a surface such as security, release, coverage, or architecture, link to that overlay and state when to read it.

## Shared Role Model

Projects may use a subset, but the shared vocabulary is:

- CTO: product and standards direction, subscription posture, and cost trade-offs.
- DOC: documentation homes, clarity, templates, and adoption records.
- ARC: architecture boundaries, system shape, and shared-vs-local decisions.
- PLT: CI, local gates, deployment, environments, and operational runbooks.
- SEC: secrets, auth, dependency risk, disclosure, and public security language.
- ENG: implementation, maintainability, and developer ergonomics.
- QAT: automated test strategy and quality gates.
- UAT: user acceptance, workflows, and release confidence.
- REV: independent review.
- UXD: user experience, information architecture, copy, and onboarding flow.

## Independence Rule

Reviewers stay independent by default. The person or agent that implemented a change should not be the only reviewer for the affected lane.

## Role Authority

Agents must not infer queue-writing or approval authority from a branch name, file path, or prior session. If acting as CTO, the session prompt, task queue, or user instruction should say so explicitly.

When role authority is ambiguous, agents may inspect and summarize, but should not mutate CTO-owned queue state, version decisions, deploy approvals, or cost/subscription posture.

## Session Role Identity

Products with specialist lanes should provide an explicit session role identity signal, such as a launcher, local wrapper, startup hook, prompt convention, or first-read instruction.

The signal should be visible early in the session and stable enough that the agent can answer:

- Which role am I operating as?
- Which queue lane, review lane, and memory/context lane apply?
- Am I allowed to mutate role-owned state, or only inspect and recommend?

If the role is unclear, the agent should stop before mutating role-owned state and ask for direction. Do not rely on branch names, stale memory, or inferred task topic as the only role identity source.

## Standards Source

Product adoption agents must use the published standards Git tag named in the product's adoption ledger or prompt, such as `standards-v0.4`.

Do not treat an arbitrary local `project-standards` checkout as the current baseline. Local `main`, feature branches, and worktrees may contain unreleased standards work. Agents may inspect unreleased standards only when the user explicitly asks for draft or next-version work.

When adopting a baseline, record the version and tag. When drafting standards changes, work in a separate visible worktree/branch so product agents reading published baselines are not confused by local in-progress changes.

## Local Overlay Examples

PickSix must keep AWS/CDK deploy hazards local and prominent, including any rule that prevents raw `cdk deploy` from resetting production context or secrets. Connections should keep MCP/content and Supabase Edge Function rituals local. TMTC should keep launch-gate security, RLS, and capability-model work local.

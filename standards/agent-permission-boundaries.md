---
type: Standard
title: Agent Permission Boundaries Standard
description: User-level, project-level, and local agent permission authority rules.
resource: standards/agent-permission-boundaries.md
tags: [standards, agent, permissions, security]
timestamp: 2026-06-20T00:00:00-07:00
standards_version: proposed-standards-v0.5
status: proposed
owner: SEC
okf_version: "0.1"
---
# Agent Permission Boundaries Standard

Version: proposed-standards-v0.5
Status: proposed
Owner: SEC
Review: DOC primary; SEC for permission policy; PLT for enforcement; CTO for user-level authority

## Requirement

Projects that use coding agents with tool permissions must document where permission authority lives and must prevent silent expansion of agent authority.

Permission policy is a security boundary. It is not a convenience setting.

## Authority Layers

Each product must classify agent permission settings into these layers:

- User-level baseline: permissions, denials, and approval posture that apply across all projects for the operator.
- Project-level policy: tracked repo policy that narrows, explains, or adds reviewed project-specific grants.
- Worktree-local drift: private local settings created by prompts, credentials, machine state, or temporary operator approval.

The user-level baseline is the highest authority for cross-project posture. Project-level policy may add project-specific rules only through the product's documented review path. Worktree-local drift is never canonical.

## User-Level Baseline

The user-level baseline should define permissions that apply to every project, such as:

- Broad shell execution posture.
- Network and web-fetch posture.
- Git mutation posture.
- Package manager and script execution posture.
- Secret, token, and credential handling posture.
- Whether local project settings may add permissions, only narrow permissions, or must ask every time.

The baseline may live in a user-managed config file, private shared repo, managed enterprise policy, or another operator-controlled authority. Product repos do not need to commit user-specific permissions, but they must record the expected source and whether the current project relies on it.

## Protected Permission-Change Sessions

Agents must not change user-level permissions, project-level permission policy, or permission setup scripts during ordinary product work.

Permission changes require a specific permission-change session with:

- Explicit user approval naming the permission surface to change.
- Clean working tree or clearly isolated worktree.
- SEC primary review and PLT enforcement review.
- Before/after summary of the permission diff.
- Rationale for each broad allow, deny, or ask rule.
- Verification of the tool's actual permission semantics before relying on them.
- A rollback path or documented way to restore the previous baseline.

If a session is not explicitly a permission-change session, the agent may inspect and report permission drift, but must not edit the permission authority.

## Local Settings And Drift

Local files such as `.local` settings, machine preferences, prompt-approval caches, and worktree-local permission files are private drift unless the project documents a safe canonical mechanism.

Products should prevent local drift from silently weakening the baseline where the tool supports it. Acceptable controls include:

- Managed settings that disallow local overrides.
- A tracked project policy that denies edits to local permission files by agents.
- A setup check that reports local permission drift at session start.
- A local gate or meta-test that compares canonical policy with generated or local mirrors.
- A documented manual check before permission-sensitive work.

Do not put cross-project permission rules only in a private local file. If every project must follow a rule, put it in the user-level baseline or shared standards and make product overlays point to it.

## Project-Level Policy

Project overlays must state:

- The canonical project permission policy path, if any.
- The user-level baseline or authority the project assumes.
- Which permission files are tracked, private, generated, or managed outside the repo.
- Who may change each authority layer.
- Which review lanes apply to permission, tool-config, hook, package-script, CI, and deploy-setting changes.
- How to verify that local settings cannot silently override the intended posture.

Tool-specific implementation stays local. For example, a product may use a tracked agent settings file, managed policy, local setup script, or explicit "ask every time" posture depending on the tool.

## Permission Shape

Where the tool supports separate rule buckets, prefer an explicit model:

- Deny: commands or capabilities the agent must not run, even when convenient.
- Ask: commands or capabilities that require operator attestation per use.
- Allow: narrow, reviewed hot-path commands.

Allow-only policies are rarely enough for high-trust agent workflows because they do not document hard refusal surfaces or human-attestation surfaces.

Broad execution surfaces such as shell wrappers, interpreters, package scripts, network tools, credential commands, Git history rewrites, deploy commands, database mutation, and repo-setting changes should be deny or ask by default unless a product records a narrower reviewed exception.

## Empirical Verification

Before relying on a permission policy, verify the tool's real semantics rather than assuming them from memory.

At minimum, products should verify:

- Rule precedence across deny, ask, allow, unmatched, and inherited settings.
- Pattern or glob semantics, including whether broad rules override narrow rules.
- Whether environment-variable prefixes, wrappers, shell compounds, scripts, aliases, or absolute paths change matching behavior.
- Whether local settings can expand, narrow, or override tracked or managed settings.
- Whether the documented schema keys are valid for the installed tool version.

Record results in the product overlay, ADR, runbook, or task closure notes before treating the policy as enforceable.

## Bootstrap Exceptions

Bootstrapping a new canonical permission policy may require a one-time local seed. That is allowed only when:

- The user explicitly approves the seed.
- The seeded content is the same content being proposed for tracked or managed policy.
- The session records the reason, scope, and retirement path.
- The next worktree starts from the tracked or managed policy rather than the seed.

Bootstrap exceptions are not a reusable pattern.

## Overlay Examples

- PickSix: document whether backend and frontend agents share the same user-level permission baseline and whether AWS/CDK, Amplify, and deploy commands are ask-only or denied by default.
- Connections: document how role launchers, local memory, MCP/content tooling, package publication, and Supabase commands interact with the user-level permission baseline.
- TMTC: document the tracked agent permission policy, local drift posture, SEC/PLT review route, and empirical permission tests as part of PLT-030 or its successor.

## Rule

No agent may silently expand its own authority. Cross-project user permissions are changed only in an explicit permission-change session, and project-local permission policy changes must be reviewable like other security-sensitive code.

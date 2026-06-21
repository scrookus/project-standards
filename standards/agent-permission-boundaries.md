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

Projects that use coding agents with tool permissions must document where runtime permission authority lives and must prevent silent expansion of agent authority.

Agent runtime permission policy is a security boundary. It is not a convenience setting.

This standard applies equally to every agent runtime. No agent gets a trust exemption because its permission mechanism is different.

## Authority Layers

Each product must classify agent runtime permission state into these layers:

- User-level baseline: permissions, denials, and approval posture that apply across all projects for the operator.
- Project-level policy: tracked repo policy that narrows, explains, or adds reviewed project-specific grants.
- Worktree-local drift: private local settings created by prompts, credentials, machine state, or temporary operator approval.

The user-level baseline is the highest authority for cross-project posture. Project-level policy may add project-specific rules only through the product's documented review path. Worktree-local drift is never canonical.

Tool precedence must be verified locally. Some tools treat local project settings as higher precedence than shared project settings, some merge permission arrays across scopes instead of replacing them, and some store approvals as app/session state rather than project files. In those shapes, a tracked project file provides reviewability but does not by itself prevent local, user, or session state from adding rules.

## User-Level Baseline

The user-level baseline should define permissions that apply to every project, such as:

- Broad shell execution posture.
- Network and web-fetch posture.
- Git mutation posture.
- Package manager and script execution posture.
- Secret, token, and credential handling posture.
- Whether local project settings, session approvals, or approved command prefixes may add permissions, only narrow permissions, or must ask every time.

The baseline may live in a user-managed config file, private shared repo, managed enterprise policy, or another operator-controlled authority. Product repos do not need to commit user-specific permissions, but they must record the expected source and whether the current project relies on it.

## Productive Default Permissions

The expected posture is not "ask before every edit." Productive agent work should allow routine repo edits when the task scope calls for them.

Normal allow surfaces may include:

- Product source files.
- Tests and fixtures.
- Documentation.
- Styles, components, and copy.
- Product-local examples or templates.
- Low-risk generated files when the project documents them as safe to update.

Higher-risk surfaces should remain ask, deny, or review-gated by product policy:

- User-level, project-level, session-level, or local agent permission settings.
- Secrets, `.env` files, credentials, and private keys.
- CI, deploy, release, hook, and branch-protection configuration.
- Package manager, dependency, lockfile, and runtime-version changes.
- Database migrations, schema changes, IAM, RLS, or policy files.
- Destructive Git operations, remote publication, force pushes, and repository settings.
- Production deploys or commands that mutate production-support services.

The goal is low-friction coding inside a clear task scope, not low-friction authority expansion.

## Global Permission Posture

The user-level baseline should start from three buckets: deny, ask, and allow. Products may be stricter locally, but should not silently weaken the global posture.

Global deny should cover actions that change authority, expose secrets, rewrite history, administer accounts, mutate production, or bypass the permission model:

- Editing user-level, project-level, managed, session-level, or local agent permission settings outside a permission-change session.
- Reading, printing, exporting, or exfiltrating secrets, tokens, private keys, credential files, or cloud/vendor auth tokens.
- Destructive Git operations such as hard reset, clean, force push, deleting branches/tags/remotes, changing remotes, rewriting refs, or rewriting history.
- Repository, GitHub, cloud, or vendor administration, including branch protection, repo settings, secrets, variables, account auth, or repo deletion.
- Production mutation, including production deploys, production database pushes/pulls, production secret updates, destructive SQL, or commands that mutate production-support services.
- Generic escape hatches that can bypass review, such as unrestricted shell wrappers, `sudo`, `eval`, `exec`, pipe-to-shell installers, remote shell tools, and raw network/socket tools.

Global ask should cover risky but legitimate work that may be needed in the right session:

- Package installs, uninstalls, dependency upgrades, lockfile updates, runtime-version changes, and package publication.
- Migrations, schema changes, IAM/RLS/policy changes, and database mutation against non-production shared environments.
- CI, deploy, release, hook, branch-protection, and repository-control file changes.
- GitHub CLI, cloud CLI, Supabase, AWS, Vercel, or hosting commands that write state.
- `npm run` or equivalent scripts that deploy, migrate, publish, change secrets, or mutate services.
- File deletion outside documented generated-output cleanup.
- Web or network fetches outside documented research or source-verification tasks.

Normal allow should cover task-scoped low-risk work:

- Editing product source, tests, fixtures, docs, styles, components, copy, examples, and approved templates.
- Running local read-only inspection commands.
- Running documented local tests, builds, typechecks, linters, and architecture checks.
- Running non-destructive Git status, diff, log, show, and branch inspection.

The line is authority and blast radius. Agents may freely edit task-scoped product files, but may not alter their own permission boundary, credentials, repo controls, or production-affecting surfaces outside an explicit permission-change or release/admin session.

## Protected Permission-Change Sessions

Agents must not change user-level permissions, project-level permission policy, session approval posture, approved command prefixes, or permission setup scripts during ordinary product work.

Permission changes require a specific permission-change session with:

- Explicit user approval naming the permission surface to change.
- Clean working tree or clearly isolated worktree.
- SEC primary review and PLT enforcement review.
- Before/after summary of the permission diff.
- Rationale for each broad allow, deny, or ask rule.
- Verification of the tool's actual permission semantics before relying on them.
- A rollback path or documented way to restore the previous baseline.

If a session is not explicitly a permission-change session, the agent may inspect and report permission drift, but must not edit the permission authority.

Do not bundle ordinary code-edit approval with permission self-modification. A prompt that offers "approve this edit and broaden this agent's future permissions" should be treated as permission-change work, not as routine code work.

## Local Settings And Drift

Local files and app state such as `.local` settings, machine preferences, prompt-approval caches, approved command prefixes, session permissions, and worktree-local permission files are private drift unless the project documents a safe canonical mechanism.

Products should prevent local drift from silently weakening the baseline where the tool supports it. Acceptable controls include:

- Managed settings that disallow local overrides.
- A tracked project policy that denies edits to local permission files by agents.
- A setup check that reports local or session permission drift at session start.
- A local gate or meta-test that compares canonical policy with generated or local mirrors.
- A documented manual check before permission-sensitive work.

Do not put cross-project permission rules only in a private local file. If every project must follow a rule, put it in the user-level baseline or shared standards and make product overlays point to it.

If the tool supports a managed or enterprise policy that blocks lower-scope permission rules, that is the strongest prevention mechanism. If not, the product must be honest that it has detection and review controls rather than hard prevention.

## Project-Level Policy

Project overlays must state:

- The canonical project permission policy path, if any.
- The user-level baseline or authority the project assumes.
- Which permission files, app settings, approved command prefixes, sandbox rules, and session approvals are tracked, private, generated, or managed outside the repo.
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

Routine file-edit permissions are different from broad execution permissions. A product may allow source, test, and doc edits while still denying permission-file edits, destructive commands, deploys, and tool wrappers.

## Empirical Verification

Before relying on a permission policy, verify the tool's real semantics rather than assuming them from memory.

At minimum, products should verify:

- The active settings sources and their order of precedence.
- Rule precedence across deny, ask, allow, unmatched, and inherited settings.
- Pattern or glob semantics, including whether broad rules override narrow rules.
- Whether environment-variable prefixes, wrappers, shell compounds, scripts, aliases, or absolute paths change matching behavior.
- Whether local settings, app state, or session approvals can expand, narrow, or override tracked or managed settings.
- Whether the documented schema keys are valid for the installed tool version.

Record results in the product overlay, ADR, runbook, or task closure notes before treating the policy as enforceable.

## Runtime Permission Report

Products should use `templates/shared/agent-runtime-permission-report.md` or a product-local equivalent before sensitive work, during standards adoption, after permission-related incidents, or when the user asks whether the current agent is compliant.

The report should be inspect-only by default and should state:

- Current writable roots, network posture, approved command prefixes, ask-gated operations, and denied operations.
- Where user-level, managed, project-level, session-level, and worktree-local permission state lives.
- Whether the agent can change any permission authority during the current session.
- Any permission changes made this session and who approved them.
- Unknown or unverifiable permission state.
- A proceed / caution / stop recommendation.

The report is not a substitute for enforcement. It is the audit surface that makes runtime authority visible enough to reason about.

## Bootstrap Exceptions

Bootstrapping a new canonical permission policy may require a one-time local seed. That is allowed only when:

- The user explicitly approves the seed.
- The seeded content is the same content being proposed for tracked or managed policy.
- The session records the reason, scope, and retirement path.
- The next worktree starts from the tracked or managed policy rather than the seed.

Bootstrap exceptions are not a reusable pattern.

## Overlay Examples

- PickSix: document whether backend and frontend agents share the same user-level permission baseline and whether AWS/CDK, Amplify, and deploy commands are ask-only or denied by default. Include Codex-style writable roots and approved command prefixes if Codex agents work there.
- Connections: document how role launchers, local memory, MCP/content tooling, package publication, and Supabase commands interact with the user-level permission baseline. Include app/session approvals and sandbox posture for every agent runtime in use.
- TMTC: document the tracked agent permission policy, local drift posture, SEC/PLT review route, and empirical permission tests as part of PLT-030 or its successor.

## Rule

No agent may silently expand its own authority. Cross-project user permissions, app-level approvals, approved command prefixes, and project-local permission policy are changed only in an explicit permission-change session, and those changes must be reviewable like other security-sensitive code.

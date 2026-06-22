---
type: Standard
title: Agent Permission User Baseline Standard
description: Cross-project user-level deny, ask, and allow posture for coding-agent runtime permissions.
resource: standards/agent-permission-user-baseline.md
tags: [standards, agent, permissions, baseline, security]
timestamp: 2026-06-21T00:00:00-07:00
standards_version: standards-v0.5.1
status: baseline
owner: SEC
okf_version: "0.1"
---
# Agent Permission User Baseline Standard

Version: standards-v0.5.1
Status: baseline
Owner: SEC
Review: DOC primary; SEC for permission policy; PLT for enforcement; CTO for user-level authority

## Requirement

Every product that uses coding agents with tool permissions must point to a user-level permission baseline or record an exception saying no enforceable user-level baseline exists.

This standard is the shared baseline posture. It defines what must be denied, asked, and allowed at the user/operator layer unless a stricter managed policy replaces it.

## Authority

The user-level baseline may be implemented through:

- Managed or enterprise policy.
- User-controlled runtime settings.
- A private cross-project policy document.
- A product overlay that records the expected user-level posture when no enforceable user-level mechanism exists.

Products must not claim hard enforcement unless runtime semantics, managed policy, execution isolation, or brokered authority prove it. If local settings, session approvals, app state, ambient credentials, shell access, or writable host paths can add permissions below the user-level baseline, the product must describe the posture as detection and review rather than prevention.

The stronger target posture is isolated ordinary work plus brokered privileged mutation: agents can edit and test product code in a constrained workspace, while repository administration, production deploys, package publication, linked database changes, cloud/IAM changes, and managed permission-baseline changes go through a reviewed gateway or operator path.

## Deny

The user-level baseline must deny, or record as non-overridable policy, actions that change authority, expose secrets, rewrite history, administer accounts, mutate production, or bypass review.

Default deny surfaces:

- Editing user-level, managed, project-level, session-level, or local agent permission settings outside an explicit permission-change session.
- Mutating permission-authority files through any write-capable tool surface, including shell redirection, file-copy tools, formatters, interpreters, patch tools, or package scripts.
- Reading, printing, exporting, hand-copying, or exfiltrating secrets, tokens, private keys, credential files, cloud/vendor auth tokens, `.env*` files, or secret-bearing local permission entries.
- Destructive Git operations: hard reset, clean, force push, deleting branches/tags/remotes, changing remotes, rewriting refs, or rewriting history.
- Repository, GitHub, cloud, hosting, or vendor administration: branch protection, repo settings, secrets, variables, account auth, billing, or repo deletion.
- Production mutation: production deploys, production database pushes/pulls, production secret updates, destructive SQL, or commands that mutate production-support services.
- Generic escape hatches that bypass review: unrestricted shell wrappers, `sudo`, `eval`, `exec`, pipe-to-shell installers, remote shell tools, raw network/socket tools, or broad interpreter wrappers that execute arbitrary fetched content.

## Ask

The user-level baseline must ask for explicit operator approval before risky but legitimate work.

Default ask surfaces:

- Package installs, uninstalls, dependency upgrades, lockfile updates, runtime-version changes, and package publication.
- Database migrations, schema changes, IAM/RLS/policy changes, and database mutation against non-production shared environments.
- CI, deploy, release, hook, branch-protection, repository-control, package-script, or permission-setup file changes.
- GitHub CLI, cloud CLI, Supabase, AWS, Vercel, Netlify, Cloudflare, or hosting commands that write state.
- `npm run` or equivalent scripts that deploy, migrate, publish, change secrets, write remote state, or mutate services.
- File deletion outside documented generated-output cleanup.
- Web or network fetches outside documented research, source-verification, dependency-install, or browser-test tasks.
- Long-running local services when they may conflict with another agent or consume metered resources.

Approval for one command is not approval to broaden future runtime permissions. Persistent permission changes require a permission-change session under `standards/agent-permission-boundaries.md`.

Risky Bash ask rules should be wrapper-aware. Prefer substring forms such as `Bash(*npm install*)` for high-blast-radius operations that may be invoked after `cd`, `env`, subshells, or command wrappers. Prefix-only forms are appropriate only when bypass through common shell composition is not material.

## Allow

The user-level baseline should allow normal task-scoped product work so agents can remain useful without self-modifying their authority.

Default allow surfaces:

- Editing task-scoped source, tests, fixtures, documentation, styles, components, copy, examples, and approved templates.
- Running local read-only inspection commands.
- Running documented local tests, builds, typechecks, linters, formatters, architecture checks, and non-mutating smoke checks.
- Running non-destructive Git inspection: status, diff, log, show, branch/list, and blame.
- Reading project files that are not secrets, credentials, private local state, or explicitly restricted by the product overlay.

Products may narrow these allows when their stack, data, or release posture requires it.

Routine allow rules should stay narrow. Prefer specific prefix or exact forms for read-only commands, local checks, and known-safe scripts; do not broaden allow patterns merely to reduce prompts for commands with authority or blast radius.

## Placement

The user-level baseline is the cross-project floor, not the product workflow catalog.

User-level or managed policy should carry controls that must apply everywhere: bypass prevention, user-settings self-protection, credential/private-key denials, destructive Git denials, repo-admin denials, production-mutation denials, escape-hatch denials, routine Git inspection allows, and cross-project ask gates for durable remote actions.

Product overlays should carry product-specific paths and workflows: `.env` variants, `secrets/**`, package manifests, migrations, hooks, CI/release files, review-output directories, product sandbox rules, package publication, deploy, database, hosting, and vendor commands.

Worktree-local secret bootstrap belongs in the product overlay, not in the user-level baseline. The user-level baseline should deny direct secret reads and prints; the project may define an ask-gated trusted setup command that creates required `.env*` or credential files without exposing values to the agent.

Role-specific expectations should live in role prompts or tracked agent definitions. Reviewing subagents that cannot answer prompts should write findings to an allowed project review-output path and hand off ask-gated remote actions to the parent session, operator, or gateway.

## Detection Minimum

If the runtime cannot enforce the baseline against lower-scope local settings or session approvals, the product must add detection and review controls before claiming v0.5 conformance.

Minimum detection controls:

- A runtime permission report during adoption.
- A product overlay that classifies user-level, managed, project-level, session-level, and local permission state.
- A placement summary naming which rules live in user/managed settings, project policy, and role prompts.
- A statement of whether ordinary agent work is isolated by container, VM, sandbox, or host-only convention.
- A statement of whether privileged mutations are exposed directly to the agent or brokered through a gateway, workflow, or operator path.
- Empirical verification of runtime precedence before relying on deny, ask, or allow rules.
- A startup check, local gate, manual checklist, or review rule that surfaces local/session drift before permission-sensitive work.
- Product-local follow-up tasks for broad local approvals, credential-bearing entries, or unverifiable permission state.

Detection is not equivalent to hard prevention. Products must say which one they have.

## Rule

The default user-level posture is: deny authority expansion, secret exposure, destructive history changes, administration, production mutation, and review bypass; ask for high-blast-radius but legitimate work; allow routine task-scoped source, test, doc, and local verification work.

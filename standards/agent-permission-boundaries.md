---
type: Standard
title: Agent Permission Boundaries Standard
description: User-level, project-level, and local agent permission authority rules.
resource: standards/agent-permission-boundaries.md
tags: [standards, agent, permissions, security]
timestamp: 2026-06-21T00:00:00-07:00
standards_version: standards-v0.5.1
status: baseline
owner: SEC
okf_version: "0.1"
---
# Agent Permission Boundaries Standard

Version: standards-v0.5.1
Status: baseline
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

The shared default posture is defined in `standards/agent-permission-user-baseline.md`. Products may be stricter, but must record any weaker or unenforceable posture as conformance debt or an exception.

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
- Mutating permission-authority files through any tool surface, including shell redirection, file-copy tools, formatters, interpreters, patch tools, or package scripts.
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

## Cross-Tool Write Protection

Permission authority must be protected by path and write capability, not only by one tool name.

Denying `Edit` or another editor surface for a settings file is insufficient if the agent can still rewrite that file through `Bash`, `jq`, `sed -i`, `perl -pi`, `node`, `python`, `tee`, `cp`, `mv`, `install`, `rsync`, patch tools, package scripts, or shell redirection. Products should treat those as equivalent write paths when the target is a permission-authority file.

Permission-authority files include user-level, managed, project-level, session-level, and local agent settings; approved command-prefix stores; permission setup scripts; hooks that modify permission state; and any generated mirror that is used as an enforcement source.

If the runtime cannot express path-based denial across every write-capable tool, the product must say that hard prevention is unavailable. In that posture, permission-authority changes require an explicit permission-change session plus detection or review controls that surface attempted cross-tool writes.

Use `scripts/generate-agent-permission-denies.mjs` or a product-local equivalent to generate broad deny entries from a short list of protected permission-authority paths. The generated list is a starting point for review, not proof of enforcement.

## Enforcement Boundary And Brokered Authority

Agent permission settings are policy expression. They are not the whole enforcement boundary when the agent also has shell access, ambient credentials, writable home directories, network access, or local CLI tools that can mutate shared services.

Products should distinguish three enforcement layers:

- Runtime permission policy: deny, ask, and allow rules in the agent tool.
- Execution isolation: container, VM, sandbox, or equivalent OS-level controls that limit filesystem, credential, process, and network access.
- Authority gateway: a reviewed service, workflow, or human-operated path that performs privileged mutations without giving the agent raw credentials or direct admin surfaces.

Ordinary coding sessions should run with isolated credentials and least filesystem access: project worktree writable as needed, permission-authority files read-only unless the session is a permission-change session, no ambient cloud/vendor credentials, and no unreviewed access to private keys, auth files, or production environment variables.

High-authority actions should be brokered rather than exposed directly where practical. Examples include repository administration, branch protection, GitHub secrets and variables, production deploys, package publication, cloud/IAM changes, linked database migrations, production data mutation, and managed permission-baseline changes. The agent may prepare the request, diff, migration, or release note, but the gateway or operator applies the mutation after policy checks and audit logging.

If a product has only runtime settings plus detection, it may still adopt this standard with conformance debt, but it must not describe that posture as hard containment. The mature posture is containerized or sandboxed ordinary work plus brokered authority for privileged actions.

Sandbox configuration is not automatically adoption-ready. Some runtimes route Git, GitHub CLI, package managers, SSH, TLS, and temporary-file access differently when sandboxing is enabled. Products must not enable sandboxing globally, or claim sandbox-based hard prevention, until routine workflows such as `git fetch`, `git push`, PR view/create/review, package install, local tests, and temporary-file writes are verified or a brokered/operator substitute is documented.

If sandboxing breaks routine Git or GitHub workflows, keep sandbox settings as a deferred pilot or product-local experiment. Continue to use managed/user deny rules, project overlays, drift detection, and review controls, and record cross-tool write protection as detection/review or conformance debt until an enforcement boundary works.

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

## Placement And Role Workflow

Adopters must separate cross-project authority, product-local workflow, and role-specific behavior.

Put the cross-project floor in the highest non-overridable layer available, such as managed policy or user-level baseline:

- Bypass-mode controls and any setting that prevents agents from weakening the baseline.
- User-level permission-authority self-protection.
- Global credential and private-key read denials.
- Destructive Git, repo-admin, secret/variable, production-mutation, and escape-hatch denials.
- Cross-project routine inspection allows, such as Git status/diff/log/show/fetch and PR view/diff, when the operator wants them everywhere.
- Cross-project ask gates for durable remote actions, such as Git commit/push and PR create/edit/merge/review/comment, when the operator wants the same checkpoint everywhere.

Put product-local policy in the tracked project overlay:

- Product secret paths, environment files, generated outputs, review-output directories, hooks, package manifests, migrations, CI, deploy, and release surfaces.
- Project permission-authority self-protection for tracked and local project settings.
- Product-specific ask gates, such as package installs, package publication, database migration, deploy, hosting, or vendor commands.
- Product sandbox filesystem/network rules when sandboxing is being piloted or tuned per repo.
- The durable path where reviewing roles write review artifacts, such as `docs/code-reviews/**`.
- Trusted local bootstrap commands for worktree-specific secret-bearing files, when the command copies or injects secrets without exposing their contents to the agent.

Put role-specific behavior in role prompts or agent frontmatter, not in private local policy unless the runtime requires it:

- Review subagents should produce review artifacts and findings; they should not rely on interactive ask prompts.
- Security or review subagents that cannot answer prompts must not run ask-gated remote mutations. They hand off to the parent session, operator, or gateway.
- The parent session or gateway posts PR reviews/comments using the recorded artifact. Long review/comment bodies must use a body-file or equivalent artifact path rather than inline heredocs, command substitutions, or shell-quoted Markdown bodies.
- Role-local policy, if used, is private drift unless the project records it and verifies it during adoption.

Do not solve subagent limitations by broadening the user-managed floor. If a role needs a product-local output path, allow that path in the project overlay. If a role needs a remote mutation, route it through an interactive parent, an operator, or a narrow gateway.

## Secret-Bearing Local Bootstrap

Agents must not read, print, copy by hand, or rewrite secret-bearing local files such as `.env`, `.env.local`, `.env.*`, private keys, token files, or credential config. That rule applies even when the values appear to be local-development defaults.

Products that need those files in every worktree should provide a trusted bootstrap path instead of asking the operator to type or paste values:

- A reviewed script, command, or gateway owned by the product.
- The agent may run it only through an ask-gated command or operator approval.
- The command must not print secret values, diffs, command substitutions, or file contents.
- The command should copy or inject from an operator-owned source to the current worktree, set restrictive file mode where possible, and verify the destination is ignored by Git before writing or before allowing subsequent publish steps.
- The command must refuse ambiguous destinations and avoid overwriting an existing file unless the operator explicitly requests replacement.
- The runtime report or product overlay should record the source class, destination path, owner, review lane, and whether the agent can inspect the values.

`scripts/bootstrap-worktree-secret-file.sh` is the shared reference implementation for file-copy bootstrap. Products may wrap it with product-local defaults such as the source checkout path and destination `.env.local`.

Agents may edit templates such as `.env.example`, `.env.local.example`, or setup docs because those contain configuration shape rather than secret values. Templates are not a substitute for a safe injection path when real local credentials are required for tests or development.

If a secret-bearing local file is read, printed, copied manually, or moved between worktrees by an agent, treat it as a permission incident. Stop secret handling, verify the file is ignored and unstaged before any push, and let the operator decide whether rotation or cleanup is needed.

## Permission Shape

Where the tool supports separate rule buckets, prefer an explicit model:

- Deny: commands or capabilities the agent must not run, even when convenient.
- Ask: commands or capabilities that require operator attestation per use.
- Allow: narrow, reviewed hot-path commands.

Allow-only policies are rarely enough for high-trust agent workflows because they do not document hard refusal surfaces or human-attestation surfaces.

Broad execution surfaces such as shell wrappers, interpreters, package scripts, network tools, credential commands, Git history rewrites, deploy commands, database mutation, and repo-setting changes should be deny or ask by default unless a product records a narrower reviewed exception.

Routine file-edit permissions are different from broad execution permissions. A product may allow source, test, and doc edits while still denying permission-file edits, destructive commands, deploys, and tool wrappers.

Pattern shape matters. For risky Bash ask or deny rules, prefer wrapper-aware substring patterns such as `Bash(*npm install*)` when shell prefixes, `cd ... &&`, subshells, `env`, package scripts, or aliases would bypass an exact-prefix form. False positives are acceptable at the ask layer when the alternative is silent bypass.

For low-risk allow rules, prefer narrow prefix or exact forms such as `Bash(git status*)` rather than broad substring forms. Allows should be harder to trigger accidentally than asks.

## Empirical Verification

Before relying on a permission policy, verify the tool's real semantics rather than assuming them from memory.

Verification must not damage live permission authority. A probe is not inspect-only if success would open, truncate, overwrite, chmod, move, delete, or otherwise mutate a canonical settings file, even when the intended payload is empty.

Test cross-tool write protection against sacrificial files, throwaway worktrees, temporary home directories, containers, or explicit backup/restore harnesses. Do not run `tee`, redirect, `sed -i`, `cp`, `mv`, `dd`, formatter, interpreter, or package-script write probes against the active user-level, managed, project-level, session-level, or local permission files.

If safe sacrificial verification is unavailable, record the route as unverified and treat the posture as detection/review rather than hard prevention.

Before accepting a permission report, recount live allow, ask, and deny arrays from the actual active settings files with `jq` or an equivalent structured parser. Reports that cite counts must name the source file/layer checked and whether the count came from managed, user, project, session, or local settings. Do not accept hand-counted or stale count claims as review evidence.

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
- Live allow, ask, and deny counts by authority layer, including the command or parser used to recount them.
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

# Branch And Worktree Standard

Version: standards-v0.2
Status: baseline
Owner: PLT
Review: DOC primary for format; PLT for workflow safety; SEC for emergency/security carve-outs

## Requirement

Every active or production-support repo must define when to use the current working tree, when to create a separate worktree, when a PR is required, and when direct-to-main is allowed.

The goal is to prevent branch hijacks: one agent switching branches or rewriting state while another agent is working in the same repo path.

## Core Rules

- One active agent task owns one working directory at a time.
- Parallel agents in the same repo use separate branches and separate worktrees.
- Branches isolate history; worktrees isolate files. A different branch in the same checkout is not enough isolation for parallel implementation work.
- Do not switch branches in a shared working directory while another agent may be using it.
- Do not run `git switch`, `git checkout`, `git pull`, `git rebase`, `git merge`, or stash operations in a dirty tree until you understand the changes and who owns them.
- If uncommitted changes are present and you did not make them, assume they belong to another human or agent.
- If the dirty file is a CTO-owned task queue, treat it as active coordination state. Do not edit, stage, or overwrite it unless explicitly acting as CTO or instructed by the user.
- Do not stack unrelated implementation work in one checkout.
- PRs are the normal closure event for implementation, infrastructure, security, CI, dependency, release, and maintained-doc changes.

## When Current Worktree Is Acceptable

Use the existing repo path only when all are true:

- You are the only active agent for that repo path.
- `git status` is clean or every dirty file is yours.
- The task is short-lived and does not require switching away from the current branch.
- No local server, database, generated output, or deploy workflow is being shared with another active task.

## When A Separate Worktree Is Required

Create or use a separate worktree when any are true:

- More than one agent may work in the repo at the same time.
- The task requires switching branches from a shared path.
- Review and fix work will happen concurrently.
- The task is long-running or has its own PR.
- The task touches CI, deploy, migrations, generated artifacts, package upgrades, or other high-blast-radius surfaces.
- The user asks agents to work in parallel.

Recommended layout, in order of preference:

```sh
git worktree add ../<repo>-<role>-<task> -b <role>/<task>
```

1. Sibling directories: keep worktrees next to the main checkout or bare repo, such as `<repo>-main/` and `<repo>-plt-017/`. This is the default because it avoids nesting confusion.
2. Dedicated worktrees parent next to a bare repo: use `<repo>.git/` as the bare repo and `<repo>/<worktree-name>/` as the worktree parent. This is acceptable when the product documents the parent path clearly.
3. In-repo `worktrees/` directory: use only when the product documents why nesting is worth the tradeoff and how agents avoid editing the wrong checkout.

Do not bury worktrees under tool-specific or hidden directories such as `.claude/worktrees/`. Hidden nested worktrees make cleanup, path references, editor search, and agent ownership harder to inspect.

If a product already has hidden/tool-specific worktrees, agents must treat that as migration work: finish or hand off the active task, remove stale worktrees, and move future work to a visible layout. Do not create new hidden/tool-specific worktrees.

Use project-local branch prefixes when defined.

After creating a worktree, run any project-local setup required for agent context, hooks, local settings, or environment files. Each product must document those steps if missing them would cause agents to miss local rules or shared-state locks.

## Worktree-Local And Shared-Local Artifacts

Worktrees duplicate tracked files, but they do not automatically share every piece of local coordination state. Each product must classify worktree-sensitive artifacts:

- Versioned shared artifacts: committed files that every branch/worktree should receive through Git, such as `AGENTS.md`, hooks, setup scripts, templates, and durable docs.
- Shared local authority: branch-independent local state that multiple worktrees must consult before acting, such as a CTO queue store, append-only coordination log, lock file, or generated state database.
- Generated mirrors: tracked or untracked views produced from the authority for startup context. Mirrors must say where the authority lives and how to refresh them.
- Private worktree-local files: credentials, `.env` files, `.claude/settings.local.json`, editor settings, runtime locks, and machine/user preferences.

Do not put canonical project policy only in a private worktree-local file. If a `.local` file contains a rule every agent must follow, move the rule to a committed overlay, setup script, checked-in template, hook, or documented shared local authority.

`.claude/settings.local.json` is local-only unless a product explicitly documents a different safe mechanism. Products may provide a committed example or setup step, but secrets, personal permissions, and machine-specific settings must not be committed.

## PR Requirement

PR required by default for:

- Product code.
- Infrastructure, deploy, CI, hooks, and local gates.
- Security, auth, secrets, dependency, disclosure, or public trust-boundary docs.
- Release/deploy docs.
- Maintained standards, agent contracts, review routing, and task queue format.
- Multi-file documentation changes that affect operating behavior.

Review routes by touched surface before merge.

## Local-First Git Communication

Use local commits, task queues, handoff notes, and product-local coordination files for in-progress agent communication. Do not use `git push` as the default way to tell other agents what changed.

Push to origin when one of these is true:

- A PR, review, or remote CI run is needed.
- The branch is ready for another agent or human to pick up from a different machine or checkout.
- The work is long-running and the product documents origin as the backup or handoff point.
- The user explicitly asks for a push.
- A product-local release, deploy, or automation flow requires the remote branch.

Avoid pushing every checkpoint commit. Frequent origin pushes create noisy remote state, trigger unnecessary CI or deploy workflows, and make branch ownership harder to reason about when multiple agents are active.

If an agent needs to share unfinished work without opening a PR, prefer the product's documented local handoff or queue mechanism. If a remote push is still needed for handoff, state the reason and whether CI/deploy side effects are expected.

## Direct-To-Main Carve-Outs

Direct-to-main is allowed only when explicitly documented by the product and one of these applies:

- Bootstrap mode before product code exists.
- Trivial doc-only typo or broken-link fix that changes no operating rule, release guidance, security language, or canonical metadata.
- Emergency production repair with explicit owner approval, recorded reason, post-change verification, and a follow-up task or PR within 24 hours.

Direct-to-main is not allowed for code, CI, dependencies, deploy, security, release, agent-contract, review-routing, or task-queue ownership changes in active or production-support repos.

When a product allows direct-to-main outside trivial doc-only work, the commit body must include a carve-out tag:

```text
[carve-out: <category>]
```

Each product must define its allowed carve-out categories and verification rules locally.

## PR Closure

When work corresponds to a queued task, the PR body must name the task ID with `Closes <ID>` or the product's local equivalent.

Before ending a worktree-based task, the responsible agent must complete a closure pass:

- Confirm the task outcome: merged, abandoned, handed off, blocked, or retained.
- Summarize what changed, what was verified, and what remains.
- Capture lessons learned that would improve future agent work, review routing, local gates, queue handling, or shared standards.
- Propose concrete follow-up tasks or upstream standards candidates when the lesson is reusable.
- Remove the stale worktree and local branch after merge or abandonment, unless the product documents a retention reason.
- State any retained worktree, branch, or remote branch and who owns the next action.

Durable closure documentation belongs in the product's branch/worktree overlay for policy, the task queue or coordination surface for follow-up work, and the adoption ledger for standards exceptions. Ephemeral session summaries are not enough for reusable lessons or retained-worktree ownership.

Worktree cleanup is part of task closure. Agents must not leave stale worktrees behind silently. If removal is unsafe because there are unmerged commits, dirty files, running services, or another agent may own the checkout, stop and report the blocker instead of deleting it.

After the PR merges, clean up remote branches and run or request the product's documented worktree prune/list check as part of the same closure pass unless the product has a stronger branch-retention rule.

## Queue And Ownership

Active branch/worktree coordination belongs in the CTO-owned task queue or the product's documented coordination surface. DOC may review format and clarity; CTO owns active priority and queue state. Products may make CTO the single writer to the active queue when concurrent writes have caused conflicts.

If the current checkout contains dirty coordination files owned by another role, create a separate worktree for unrelated work or stop for direction.

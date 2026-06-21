# Agent Runtime Permission Report

Status: draft
Owner: SEC / PLT
Audience: CTO / SEC / PLT / DOC
Last reviewed: {{DATE}}

Use this report before sensitive work, during standards adoption, or after a permission-related incident. The default mode is inspect-only: do not change runtime permissions while filling this out.

## Session

| Field | Value |
|---|---|
| Project | TODO |
| Repo path | TODO |
| Agent runtime | TODO: Codex, Claude Code, other |
| Session role | TODO |
| Task ID / branch | TODO |
| Report prepared by | TODO |
| Date | {{DATE}} |

## Runtime Permission State

| Surface | Current State | Source / Location | Can Agent Change It This Session? | Notes |
|---|---|---|---|---|
| Filesystem writable roots | TODO | TODO | TODO | Include whether writes are limited to the intended repo. |
| Network access | TODO | TODO | TODO | Note restricted, allowed, browser-only, or escalated. |
| Approved command prefixes / allowlist | TODO | TODO | TODO | Include Codex-style approved prefixes or Claude-style allow rules. |
| Ask-gated commands / capabilities | TODO | TODO | TODO | Include deploy, package, cloud, GitHub, DB, or network prompts. |
| Denied commands / capabilities | TODO | TODO | TODO | Include destructive Git, secrets, prod mutation, and escape hatches. |
| Agent settings files | TODO | TODO | TODO | Include user, project, managed, local, and session-level settings. |
| Secrets / credentials access | TODO | TODO | TODO | Do not print secrets. Report only access posture and storage class. |
| Production-affecting commands | TODO | TODO | TODO | Note deploy, DB, cloud, vendor, and release commands. |

## Authority Layers

| Layer | Location / Mechanism | Status | Owner | Notes |
|---|---|---|---|---|
| User-level baseline | TODO | TODO | CTO / user | Cross-project posture. |
| Managed / enterprise policy | TODO | TODO | CTO / platform owner | If absent, say absent. |
| Project-level policy | TODO | TODO | SEC / PLT | Tracked project policy or documented absence. |
| Session approvals | TODO | TODO | User / runtime | App/session state, prompts, approved prefixes. |
| Worktree-local drift | TODO | TODO | User / local | Local settings, prompt caches, `.local` files. |

## Changes This Session

| Permission Surface | Change | Approved By | Evidence | Follow-Up |
|---|---|---|---|---|
| TODO | TODO | TODO | TODO | TODO |

If no permissions changed, state: `No runtime permission changes made this session.`

## Compliance Check

| Check | Verdict | Notes |
|---|---|---|
| Routine code/doc edits are allowed without permission self-modification. | TODO | TODO |
| Permission changes require an explicit permission-change session. | TODO | TODO |
| Agent did not edit or broaden its own authority during ordinary work. | TODO | TODO |
| High-risk surfaces are ask/deny/review-gated. | TODO | TODO |
| Local or session drift is visible and not treated as canonical. | TODO | TODO |
| Unknown or unverifiable permission state is named. | TODO | TODO |

## Unverified / Unknown

List anything the agent could not inspect directly, such as app-managed approval state, managed enterprise policy, or hidden runtime configuration.

- TODO

## Recommendation

Choose one:

- `OK to proceed`: Permission state is scoped and no unexpected authority is visible.
- `Proceed with caution`: Some state is unknown or broader than needed; name compensating controls.
- `Stop for permission-change session`: Permission state is too broad, changed unexpectedly, or cannot be verified for sensitive work.

Rationale:

TODO

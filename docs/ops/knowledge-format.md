---
type: Overlay
title: project-standards Knowledge Format
description: Local OKF-compatible documentation profile for shared standards work.
resource: docs/ops/knowledge-format.md
tags: [ops, okf, documentation, standards]
timestamp: 2026-06-20T00:00:00-07:00
status: active
owner: DOC
okf_version: "0.1"
---
# project-standards Knowledge Format

Status: active
Owner: DOC
Audience: CTO / DOC / PLT / SEC / ENG
Last reviewed: 2026-06-20

Baseline: `standards/knowledge-format.md`
Decision: `docs/adr/0002-okf-compatible-knowledge-profile.md`

## Current Scope

`project-standards/` adopts the OKF-compatible profile first for:

- `standards/*.md`
- `standards/index.md`
- new durable standards, overlays, ADRs, and agent-readable runbooks

The initial adoption does not claim full OKF conformance for every historical Markdown file in the repo.

## Local Concept Types

- `Standard`: shared baseline or proposed standards under `standards/`
- `Overlay`: project-local adoption or operating docs under `docs/ops/`
- `ADR`: durable decisions under `docs/adr/`
- `TaskQueue`: active CTO-owned queue docs
- `Template`: reusable adoption or project-bootstrap templates
- `Review`: review records and convergence assessments
- `Exception`: documented standards or operating exceptions

## Rules

- New or materially changed durable docs must include OKF-compatible frontmatter.
- Directory indexes must stay short and support progressive disclosure.
- Do not add frontmatter to generated mirrors unless the generator owns it.
- Do not put secrets, raw planning, live findings, or private disclosure detail in OKF concept docs.
- Backfill old docs only through explicit cleanup tasks.

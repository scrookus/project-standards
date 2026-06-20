---
type: ADR
title: OKF-Compatible Knowledge Profile
description: Adopt an OKF-compatible Markdown/frontmatter profile for shared standards knowledge.
resource: docs/adr/0002-okf-compatible-knowledge-profile.md
tags: [adr, okf, documentation, context-budget, agents]
timestamp: 2026-06-20T00:00:00-07:00
status: accepted
owner: DOC
okf_version: "0.1"
---
# ADR 0002: OKF-Compatible Knowledge Profile

Status: accepted
Date: 2026-06-20
Owner: DOC
Review: DOC primary; CTO for standards governance; PLT for tooling implications

## Decision

`project-standards/` will adopt an Open Knowledge Format compatible profile for durable standards knowledge.

The first adoption pass converts the shared `standards/` documents to Markdown files with YAML frontmatter and adds `standards/index.md` for progressive disclosure. New or materially changed durable docs must follow the local profile in `standards/knowledge-format.md`.

This is not a full-repository backfill. Existing historical, template, and cross-project review files may be converted later through queued cleanup work.

## Rationale

The standards repo is increasingly used by agents as a knowledge base, not only as human documentation. Agents need stable metadata for routing, filtering, indexing, and context selection, but the repository should remain readable in plain editors and reviewable through normal Git diffs.

OKF v0.1 matches that shape: Markdown files, YAML frontmatter, normal links, optional indexes, optional logs, and no required service or SDK.

Adopting a local profile first lets `project-standards/` prove the pattern before asking PickSix, Connections, or TMTC to adopt it.

## Consequences

- Shared standards documents carry OKF-compatible frontmatter.
- `index.md` files become the preferred way to support progressive disclosure in dense doc directories.
- Product repos can adopt the profile gradually, beginning with first-read and surface-read overlays.
- Full conformance across older docs is deferred and must be queued rather than silently assumed.
- Sensitive knowledge rules still apply: OKF compatibility does not make private state safe to commit.

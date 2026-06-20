---
type: Standard
title: Knowledge Format Standard
description: OKF-compatible metadata, indexing, linking, and log rules for durable agent-readable knowledge.
resource: standards/knowledge-format.md
tags: [standards, knowledge, okf, documentation, agents]
timestamp: 2026-06-20T00:00:00-07:00
standards_version: proposed-standards-v0.5
status: proposed
owner: DOC
okf_version: "0.1"
---
# Knowledge Format Standard

Version: proposed-standards-v0.5
Status: proposed
Owner: DOC
Review: DOC primary; CTO for standards governance; PLT for tooling; SEC for sensitive knowledge placement

## Requirement

Durable standards, overlays, runbooks, decisions, and agent-readable knowledge must be stored in an OKF-compatible Markdown profile unless the product records a local exception.

This standard is proposed because agent context is becoming a shared operating surface. Markdown remains the human-readable source, but durable docs need enough structured metadata for agents to route, filter, index, and link knowledge without loading everything.

## Local OKF Profile

The project profile is based on Open Knowledge Format v0.1:

- One concept per Markdown file.
- YAML frontmatter at the top of concept documents.
- Required `type` field.
- Recommended `title`, `description`, `resource`, `tags`, and `timestamp`.
- Normal Markdown links express relationships between concepts.
- `index.md` files support progressive disclosure.
- `log.md` files may record scoped chronological history.

Products may add frontmatter fields such as `owner`, `status`, `audience`, `standards_version`, `baseline`, `task_id`, `review`, or `sensitivity`.

## Required Frontmatter

Durable concept documents must include at least:

```yaml
---
type: Standard | Overlay | ADR | Runbook | TaskQueue | AdoptionLedger | Template | Agent | Review | Exception
title: Human Readable Title
description: One sentence summary.
tags: [short, stable, tags]
timestamp: YYYY-MM-DDTHH:MM:SSZ
---
```

For project standards, also include:

```yaml
resource: standards/example.md
standards_version: standards-v0.2 | proposed-standards-v0.5
status: baseline | proposed | active | superseded
owner: ROLE
okf_version: "0.1"
```

## Indexes And Logs

Use `index.md` when a directory contains multiple durable concepts that agents may need to browse selectively. Index files should be short and should point to child concepts with one-line descriptions.

Use `log.md` only for scoped chronology that remains useful after a session ends. Do not use logs as a dumping ground for raw planning, live findings, or long closure narratives.

## Sensitive Knowledge

Do not put credentials, raw secrets, private disclosure details, or sensitive live findings into OKF concept docs. If a public-safe concept points to private memory or local-only state, it must say what is public-safe, what remains private, and who owns access.

## Product Adoption

Products adopting this standard must:

- Define their local concept types.
- Convert first-read and surface-read overlays before reference archives.
- Keep generated mirrors marked as generated.
- Preserve product-local role names and stack-specific vocabulary.
- Queue any full backfill separately from the initial adoption.

## Rule

Knowledge that agents are expected to reuse must be readable as Markdown, parseable through frontmatter, linkable by normal Markdown links, and small enough to navigate through indexes before loading full detail.

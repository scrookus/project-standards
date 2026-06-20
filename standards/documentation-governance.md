---
type: Standard
title: Documentation Governance Standard
description: Canonical document homes, metadata, promotion, and review rules.
resource: standards/documentation-governance.md
tags: [standards, documentation, governance]
timestamp: 2026-06-20T00:00:00-07:00
standards_version: standards-v0.2
status: baseline
owner: DOC
okf_version: "0.1"
---
# Documentation Governance Standard

Version: standards-v0.2
Status: baseline
Owner: DOC
Review: DOC primary; ARC, PLT, SEC for owned surfaces

## Requirement

Every maintained document needs a canonical home, status, owner, and intended audience. Product repos may add local doc trees, but shared doc categories should mean the same thing across projects.

## Canonical Homes

- `README.md`: human project overview, setup, and current adoption pointer.
- `AGENTS.md`: short agent operating contract.
- `CLAUDE.md`: wrapper that points to `AGENTS.md`.
- `docs/adr/`: durable decisions.
- `docs/architecture/`: system shape, boundaries, and integration contracts.
- `docs/security/`: threat model, baseline, disclosures, and security reviews.
- `docs/testing/`: automated, manual, QAT, UAT, coverage, and regression runbooks.
- `docs/release/`: release and deploy process.
- `docs/design/`: personas, IA, UX, copy, and product language.
- `docs/ops/`: operational runbooks, task queue, standards adoption, incidents.
- `docs/review/`: review routing, rubrics, and review records.
- `.claude/commands/`: recurring project rituals.
- `.claude/agents/`: project-specific specialist wrappers.

## Document Header

Use OKF-compatible YAML frontmatter for new or materially changed durable docs:

```md
---
type: Standard | Overlay | ADR | Runbook | TaskQueue | AdoptionLedger | Template | Agent | Review | Exception
title: Human Readable Title
description: One sentence summary.
tags: [short, stable, tags]
timestamp: YYYY-MM-DDTHH:MM:SSZ
status: draft | active | accepted | superseded
owner: ROLE
okf_version: "0.1"
---
```

Legacy durable docs may still contain the older body header until they are touched:

```md
Status: draft | active | accepted | superseded
Owner: ROLE
Audience: ROLE / ROLE
Last reviewed: YYYY-MM-DD
```

ADR files may use their own ADR format if they include status, date, and owner.

See `standards/knowledge-format.md` for the OKF-compatible profile used by shared standards docs.

## Rules

- Do not store credentials, raw planning, live findings, or scratch coordination in repo docs.
- Keep active task state in the task queue, not scattered through durable docs.
- Move long closure notes, retrospectives, and historical detail out of active queues when they stop guiding current work.
- Prefer links to product-local overlays over copying shared standards into product docs.
- Keep first-read agent context concise. Long methodology, examples, and history should live in surface-read or reference docs with clear read triggers.
- Use `index.md` files for progressive disclosure when a directory contains multiple durable concepts agents may need to browse selectively.
- Treat product-local handoff libraries as temporary source material unless they are explicitly maintained as local overlays. Cross-project handoff docs should either become shared standards/templates, remain accurate local docs, or be archived.
- When a product-local methodology decision may apply across projects, record it as an upstream candidate in the CTO-owned task queue or adoption ledger before copying it elsewhere.
- At task closure, record reusable lessons as follow-up tasks or upstream candidates instead of burying them in ephemeral session summaries.
- Reusable methodology becomes shared only after it is added to `project-standards/`, reviewed by the owning lanes, and adopted back into product overlays through explicit product tasks.

## Local-To-Shared Promotion

Use this path when a product discovers a methodology that may belong in the shared baseline:

1. Keep the first implementation product-local and accurate to that repo.
2. Add an upstream candidate note naming the source doc, reusable principle, product-specific parts to exclude, owner, and review lanes.
3. Classify the source material as promote, adapt, local-only, or archive/delete.
4. Update `project-standards/` with the reusable principle or template wording.
5. Open adoption tasks in affected product queues.
6. Each product either adopts, adapts, or records a deferral/exception in its adoption ledger.

## Review

DOC owns structure and readability. ARC reviews architecture-facing docs. PLT reviews gates, environments, and runbooks. SEC reviews security, dependency, disclosure, secrets, and external/public-facing risk language.

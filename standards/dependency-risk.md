---
type: Standard
title: Dependency Risk Standard
description: Dependency risk, audit finding, and upgrade-review rules.
resource: standards/dependency-risk.md
tags: [standards, dependency, risk]
timestamp: 2026-06-20T00:00:00-07:00
standards_version: standards-v0.2
status: baseline
owner: SEC
okf_version: "0.1"
---
# Dependency Risk Standard

Version: standards-v0.2
Status: baseline
Owner: SEC
Review: DOC primary; SEC for dependency risk; PLT for automation; ENG for upgrade impact

## Requirement

Each product repo must define how dependency risk is detected, reviewed, accepted, and revisited.

## Minimum Workflow

1. Detect through Dependabot alerts, package manager audit, lockfile review, pinned-action review, secret scanning, or equivalent stack tooling.
2. Classify severity and affected surface.
3. Prefer upgrade or removal.
4. If accepting risk, document the allowlist entry.
5. Set review date or expiration.
6. Check subscription, license, and recurring-cost impact before adding or upgrading vendor/tooling dependencies.
7. Re-run the relevant gate after changes.

## Allowlist Entry

Accepted findings must include an identifier and a plain-English rationale. The local format can be Markdown, JSON, or tool-specific config, but a future reviewer must be able to tell why the risk was accepted.

```md
| Package/Action | Finding ID | Severity | Affected Surface | Decision / Rationale | Owner | Review Date |
|---|---|---|---|---|---|---|
| TODO | GHSA-... | TODO | Dev-only build tool | Accept until patched upstream; not shipped to runtime. | SEC | YYYY-MM-DD |
```

Good rationale examples:

- Dev-only dependency; not shipped to runtime.
- Platform-specific finding does not affect deployed platform.
- Build-time tool with no untrusted input path.
- Fix requires tracked upgrade already queued.
- Accepted temporarily with owner and review date.

## Rules

- GitHub Dependabot alerts must be enabled for every active or production-support GitHub repo.
- If a repo cannot enable Dependabot alerts, the adoption ledger or task queue must record the reason, owner, compensating dependency-risk signal, and review date.
- Accepted dependency risk must be explicit and reviewable.
- Public-facing packages, auth surfaces, deploy tooling, and CI actions require SEC review.
- Pinned GitHub Actions or checksum-verified installers are preferred for production-support repos.
- Paid dependencies, hosted services, CI minutes, model/API usage, and vendor upgrades require CTO cost/subscription review before adoption.
- Product overlays may choose stricter tooling.

## PickSix Proof Case

PickSix already uses an audit allowlist pattern on the frontend. The shared baseline preserves that concept, but the accepted-risk record must remain product-local because package exposure, AWS deploy context, and frontend/backend blast radius are local facts.

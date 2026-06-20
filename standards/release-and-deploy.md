---
type: Standard
title: Release And Deploy Standard
description: Release, deploy, environment promotion, and rollback rules.
resource: standards/release-and-deploy.md
tags: [standards, release, and, deploy]
timestamp: 2026-06-20T00:00:00-07:00
standards_version: standards-v0.2
status: baseline
owner: PLT
okf_version: "0.1"
---
# Release And Deploy Standard

Version: standards-v0.2
Status: baseline
Owner: PLT
Review: DOC primary; PLT for deploy language; SEC and UAT as needed

## Requirement

Each product repo must document release and deploy responsibilities before production support. The shared baseline defines the shape; the product overlay defines exact commands, environments, rollback, and hazards.

## Minimum Checklist

- Release owner.
- Target environment.
- Required local gates.
- Required remote gates.
- Security review trigger.
- UAT or smoke path.
- Deployment command or workflow.
- Rollback or mitigation plan.
- Known deploy hazards.
- Cost, quota, or metered-service impact.
- Explicit human confirmation step for deploys or environment promotions.
- Post-deploy verification.

## Environment Rules

- Separate dev, staging, and production expectations when the stack supports it.
- Manual production deploys are acceptable when external quotas, secrets, or operational risk make automation unsafe.
- Automated deploys must include or depend on quality gates appropriate to the touched surface.
- Automated deploys, smoke tests, and scheduled jobs must stay aligned with documented subscription limits and external quotas.
- Emergency deploy exceptions need owner, reason, verification, and follow-up task.
- Agents must confirm before deploying or promoting environments. The confirmation request must name the target, source, expected scope, and blast radius.
- Environment promotion should be tied to code/config changes in scope. Do not promote staging/dev to production only to "make things current" unless the product overlay defines that as an approved release operation.

## Static Site And SPA Cache Policy

Static-site and SPA products should document their cache policy when cache behavior can affect release correctness.

At minimum, product overlays should distinguish:

- HTML/app shell behavior.
- Immutable hashed assets.
- Service worker or manifest revalidation, when present.
- Host-specific config files and verification mechanics.

Host-specific syntax, such as Amplify or CloudFront configuration, stays product-local.

## Stack Overlay Examples

- PickSix: preserve the manual production deploy policy and the hard warning against raw `cdk deploy` when CDK context or secrets could be reset. Keep dev deploy automation separate from production deploy authority.
- Connections: keep content package release, release notes, dogfood verification, and production smoke checks in the local overlay.
- TMTC: keep launch-gate security and Supabase environment readiness in the local overlay.

## Review

PLT owns deploy mechanics and environments. CTO reviews subscription fit and cost trade-offs. SEC reviews secrets, privileged operations, and public exposure. UAT reviews launch acceptance. DOC reviews release notes and user-facing language.

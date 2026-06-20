---
type: Standard
title: Security Baseline Standard
description: Baseline security, secrets, auth, and trust-boundary rules.
resource: standards/security-baseline.md
tags: [standards, security, baseline]
timestamp: 2026-06-20T00:00:00-07:00
standards_version: standards-v0.2
status: baseline
owner: SEC
okf_version: "0.1"
---
# Security Baseline Standard

Version: standards-v0.2
Status: baseline
Owner: SEC
Review: DOC primary; SEC for security language; PLT for enforcement hooks

## Requirement

Every product repo must document a security baseline before production support and keep security review visible during bootstrap or active development.

## Minimum Baseline

Each repo must define:

- Auth and authorization model.
- Secret storage and local-only handling rules.
- Data access boundaries, including where direct client/API access is allowed and how bypasses are detected.
- Admin or privileged workflow boundaries.
- Privileged session assurance, step-up, or equivalent controls where the product has destructive, admin, payment, or cross-user actions.
- Recovery paths for any elevated-auth or lockout-prone feature.
- External service and vendor risk.
- Dependency-risk workflow.
- Security gate expectations before release or deploy.
- Disclosure response path.

## Required Rules

- Credentials, raw findings, private reports, and live incident notes stay out of the repo unless explicitly approved for publication.
- Public docs must not reveal secrets, exploitable implementation detail, or unreviewed security claims.
- Security exceptions must include owner, rationale, expiration or review date, and compensating control.
- Launch and production-support modes require SEC review for auth, permissions, secrets, dependency policy, and disclosure language.
- Security enforcement must name where the real gate lives: UI-only controls are user experience, not security enforcement. Sensitive operations need API, database, IAM, or platform-side enforcement where the stack supports it.
- Data access boundaries must be enforceable by tests, architecture checks, code review rules, or documented manual review. Convention alone is not enough for production-support repos.

## Overlay Examples

- PickSix: document IAM, AWS account boundaries, CDK context hazards, DynamoDB access, RapidAPI handling, admin flows, and deploy separation.
- Connections: document Supabase RLS, Edge Functions, MCP/content package publication, and external tool surfaces.
- TMTC: document RLS hardening, service-role removal, AAL, capability-based roles, and church-domain privacy concerns.

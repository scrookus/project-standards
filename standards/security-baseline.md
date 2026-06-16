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
- Data access boundaries.
- Admin or privileged workflow boundaries.
- External service and vendor risk.
- Dependency-risk workflow.
- Security gate expectations before release or deploy.
- Disclosure response path.

## Required Rules

- Credentials, raw findings, private reports, and live incident notes stay out of the repo unless explicitly approved for publication.
- Public docs must not reveal secrets, exploitable implementation detail, or unreviewed security claims.
- Security exceptions must include owner, rationale, expiration or review date, and compensating control.
- Launch and production-support modes require SEC review for auth, permissions, secrets, dependency policy, and disclosure language.

## Overlay Examples

- PickSix: document IAM, AWS account boundaries, CDK context hazards, DynamoDB access, RapidAPI handling, admin flows, and deploy separation.
- Connections: document Supabase RLS, Edge Functions, MCP/content package publication, and external tool surfaces.
- TMTC: document RLS hardening, service-role removal, AAL, capability-based roles, and church-domain privacy concerns.

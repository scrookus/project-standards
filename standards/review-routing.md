# Review Routing Standard

Version: standards-v0.2
Status: baseline
Owner: DOC
Review: DOC primary; ARC, PLT, SEC for lane language

## Requirement

Reviews route by touched surface, not by author preference. A change may require more than one lane.

## Routing Table

| Touched Surface | Required Review |
|---|---|
| Agent contracts, doc homes, context budget, standards adoption records, templates | DOC |
| Architecture boundaries, service boundaries, data model shape, cross-repo contracts | ARC |
| Cost posture, subscriptions, paid tier decisions, budget trade-offs | CTO |
| CI, local gates, hooks, environments, deploy workflows, operational runbooks, quota controls | PLT |
| Auth, secrets, permissions, RLS/IAM, dependency risk, disclosure, public security language | SEC |
| Product code, maintainability, developer ergonomics | ENG |
| Automated tests, coverage gates, fixtures, regression strategy | QAT |
| User workflows, launch acceptance, domain validation | UAT |
| UX, IA, copy, onboarding, external contributor flows | UXD |
| Independent final review or risk-focused pass | REV |

## Rules

- DOC is the primary reviewer for shared standards text and adoption templates.
- ARC, CTO, PLT, and SEC must review language that changes architecture, cost/subscription posture, gates, or security obligations.
- Reviewer independence is the default. Implementation and review may be combined only for low-risk local edits, and the exception should be visible in the adoption or task record.
- Product-local overlays can add stricter routing.

## PickSix Proof Case

PickSix retrofit work should route AWS CDK, Lambda, DynamoDB, API Gateway, split-repo coordination, and deploy-hazard language through PLT and ARC. Secrets, RapidAPI keys, IAM, audit allowlists, and admin surfaces require SEC.

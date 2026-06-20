---
type: Overlay
title: project-standards Cost And Subscriptions
description: Local cost and subscription posture for standards and templates.
resource: docs/ops/cost-and-subscriptions.md
tags: [ops, cost, subscriptions]
timestamp: 2026-06-20T00:00:00-07:00
status: active
owner: CTO
okf_version: "0.1"
---
# project-standards Cost And Subscriptions

Status: active
Owner: CTO
Audience: CTO / PLT / SEC / DOC
Last reviewed: 2026-06-16

Baseline: `standards/cost-and-subscriptions.md`

## Current Posture

This repo should not assume paid capacity for GitHub, Supabase, AWS, OpenAI, vendor APIs, hosting, CI minutes, or generated template usage unless a product-local overlay records that subscription.

| Service | Plan/Tier | Used For | Cost/Quota Risk | Owner | Review Date |
|---|---|---|---|---|---|
| GitHub Actions | Product-local / account-local | Template CI examples and product CI guidance | CI minutes vary by account and repo visibility. | CTO / PLT | 2026-07-15 |
| Supabase | Product-local | Supabase templates only | Free/pro posture differs by product. | CTO / PLT | 2026-07-15 |
| AWS / Amplify / RapidAPI | Product-local | PickSix overlays and examples | Usage and quotas belong in PickSix docs, not shared assumptions. | CTO / PLT | 2026-07-15 |
| AI coding/model usage | User subscription unless a product overlay says otherwise | Standards work, product coding, and agent review | API-equivalent token estimates are useful for waste/context review but are not actual spend unless usage is directly metered. Verify current pricing before decisions. | CTO | 2026-07-15 |

## Rules

- Templates must default to conservative CI and local-dev behavior.
- Paid-tier recommendations require CTO review and product-local adoption notes.
- Cost-sensitive smoke tests, external API calls, and hosted-service checks must be documented as examples or overlays, not universal requirements.
- AI usage reviews should distinguish actual billed cost, subscription-covered usage, and API-equivalent estimates.
- For API-equivalent AI cost reviews, consider output volume separately. Prefer concise, high-signal responses and minimal sufficient code. Avoid generated prose, broad diffs, and speculative implementation that do not move the task forward.

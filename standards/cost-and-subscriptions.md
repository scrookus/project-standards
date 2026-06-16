# Cost And Subscription Standard

Version: standards-v0.2
Status: baseline
Owner: CTO
Review: DOC primary; CTO for subscription posture; PLT for usage/cost controls; SEC for vendor and data exposure

## Requirement

Each product repo must document the current paid subscriptions, free-tier limits, external quotas, and cost-sensitive workflows that affect design, testing, release, and operations.

Do not assume paid capacity, upgraded plans, or higher quotas exist unless the product-local overlay records them.

## Minimum Checklist

- Current subscriptions and plan tiers.
- Free-tier or quota limits that can affect development, CI, testing, deploy, or production behavior.
- Cost-sensitive commands, jobs, APIs, queues, storage, egress, AI/model calls, or smoke tests.
- Whether AI/tool usage is subscription-covered, directly metered, or only API-equivalent for planning purposes.
- Owner approval required before adding a recurring cost or moving to a paid tier.
- Cost review trigger before launch, scale-up, production deploy, or vendor/tooling change.
- Fallback or throttle behavior when a quota is near limit.

## Rules

- CTO owns subscription decisions and cost trade-offs.
- PLT owns operational cost controls, quota monitoring, and environment-specific usage guidance.
- SEC reviews vendor changes that alter data exposure, secrets, auth, or compliance posture.
- Product overlays must distinguish "available because subscribed" from "possible if upgraded."
- Product overlays must distinguish actual billed cost from API-equivalent or estimated cost.
- Automated jobs should be path-filtered, scheduled carefully, or manually triggered when cost or quota burn matters.
- Test and smoke commands must say when they hit paid, production, rate-limited, or externally metered services.
- Pricing changes over time. Agents must verify current vendor pricing before making cost decisions or quoting estimates.

## AI And Token Usage

For AI coding tools and model APIs, document:

- Subscription or plan that covers normal usage.
- Directly metered API usage, if any.
- Token-heavy workflows that may have API-equivalent cost even when subscription-covered.
- Whether usage reports separate input, output, cache read, and cache write tokens.
- Current pricing source and date when estimates are used for a decision.

Do not treat API-equivalent estimates as actual spend unless the account is billed that way. Use estimates to identify waste, context bloat, or automation risk, not to override the user's subscription posture.

When reviewing AI API-equivalent cost, evaluate output volume separately from input/cache volume. Prefer concise, high-signal responses and minimal sufficient code. Avoid generated prose, broad diffs, and speculative implementation that do not move the task forward.

## Adoption Template

Each product should maintain a local cost/subscription note with at least:

```md
| Service | Plan/Tier | Billing Model | Used For | Cost/Quota Risk | Owner | Review Date |
|---|---|---|---|---|---|---|
| TODO | TODO | Subscription / metered / free tier | TODO | TODO | CTO | YYYY-MM-DD |
```

## Stack Overlay Examples

- PickSix: document AWS, Amplify, DynamoDB, Lambda/API Gateway, RapidAPI, GitHub Actions, and any quota-sensitive scoring/backtest behavior locally.
- Connections: document Supabase free/pro posture, Edge Function cold-start/usage limits, MCP release smoke cadence, GitHub Actions, and any external setter/tooling cost locally.
- TMTC: document Supabase plan posture, launch-gate/security tooling, auth/MFA costs, GitHub Actions, and any media/storage/egress exposure locally.

## Review

Cost and subscription language routes through CTO primary. PLT reviews gates, quotas, automation, environments, and monitoring. SEC reviews vendor/data exposure. DOC reviews clarity and whether local overlays are complete.

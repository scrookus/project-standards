# project-standards Dependency Risk

Status: active
Owner: SEC
Audience: SEC / PLT / ENG / DOC
Last reviewed: 2026-06-16

Baseline: `standards/dependency-risk.md`

## Policy

This repo has lightweight direct tooling, but it publishes templates that can introduce dependencies into product repos.

Review dependency risk when changes touch:

- `package.json` or lockfiles in templates.
- GitHub Actions versions in templates.
- Install/bootstrap scripts.
- Supabase, Playwright, Vitest, or other tool versions.
- External vendor examples that imply paid, hosted, or security-sensitive services.

## Rules

- Prefer pinned or explicit tool versions in templates.
- Do not add paid or hosted-service dependencies without CTO cost/subscription review.
- SEC reviews template changes that alter auth, secrets, dependency policy, disclosure, or public security guidance.

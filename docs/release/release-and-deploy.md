# project-standards Release And Deploy

Status: active
Owner: PLT
Audience: CTO / DOC / PLT / SEC
Last reviewed: 2026-06-16

Baseline: `standards/release-and-deploy.md`

## Release Model

This repo releases standards and templates by versioned git changes, README/changelog updates, and product adoption handoffs. It does not deploy a production runtime.

## Checklist

- Confirm with CTO whether the change stays in the current baseline or requires a standards version bump.
- Update `CHANGELOG.md` for material standards changes.
- Update `README.md` when the baseline surface or adoption process changes.
- Keep product-specific examples labeled as examples or local overlays.
- Identify affected product repos and create or update adoption tasks.
- Run local gates from `docs/testing/local-gates.md`.
- Run `./install.sh` only when validating command/template symlinks locally.

## Product Handoff

Material changes to shared standards should tell PickSix, Connections, and TMTC whether they need to adopt, adapt, defer, or ignore the change.

## Version Authority

CTO owns standards versioning decisions. DOC, ARC, PLT, SEC, QAT, UAT, REV, and UXD may recommend a bump level based on impact, but they do not decide the published baseline version.

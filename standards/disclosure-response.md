# Disclosure Response Standard

Version: standards-v0.2
Status: baseline
Owner: SEC
Review: DOC primary; SEC for disclosure and security language

## Requirement

Each product repo must have a disclosure response path appropriate to its maturity and exposure.

## Minimum Content

The local disclosure response must state:

- Where reports should be sent.
- Who triages reports.
- How private findings are stored.
- Expected initial response target.
- How severity is assigned.
- How fixes are verified.
- How public communication is approved.

## Handling Rules

- Keep raw reports, proofs of concept, affected account details, and exploit steps local-only unless SEC approves a sanitized repo record.
- Create a repo task or issue only after removing private or exploitable detail.
- Route public disclosure, release notes, and user-facing security language through SEC and DOC.
- Record closure with affected surface, fix summary, verification, and follow-up owner.

## Template

```md
# Disclosure Response

Status: active
Owner: SEC
Audience: SEC / PLT / DOC
Last reviewed: YYYY-MM-DD

## Report Channel

Send reports to: TODO

## Triage

Owner: TODO
Initial response target: TODO
Private storage: local-only TODO

## Response Flow

1. Acknowledge report.
2. Preserve private details outside the repo.
3. Assign severity and owner.
4. Fix and verify.
5. Prepare sanitized release or disclosure notes if needed.
6. Record closure and follow-up.
```

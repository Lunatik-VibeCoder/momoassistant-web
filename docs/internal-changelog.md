# Internal Changelog

Tracks alignment between the marketing site and the product's actual state
(ADRs, RFCs, audited capabilities). Not the public-facing changelog — see
`content/changelog.ts` for that.

## 2026-07-23 — MARKETING-UPDATE-01

Site brought into alignment with the frozen commercial model and the
current product-capability audit.

**Sources of truth for this update:**
- `docs/marketing-audit-2026-07-23.md` — 5-phase audit (documentary +
  site + licensing) that this sprint was built to close.
- `docs/adr-commercial-model-foundation.md` — Accepted ADR: Organization →
  Subscription → Technical License → Entitlements → Stations → Agents →
  Trusted Devices. Canonical reference architecture diagram.
- `docs/com-001-saas-packaging-entitlements.md` — Proposed RFC: Packaging
  (Starter/Professional/Business/Enterprise), Entitlements, Limits,
  Modules, Upgrade Path, Decision Log.
- `docs/marketing-alignment-plan-mkt-001.md` — implementation roadmap
  (rev. 3).

**What changed:**
- Homepage, Features, Security rebuilt around real, audited capabilities
  (Runtime V2, Device/SIM/Station Trust, Financial Runtime, SMS
  Intelligence, Encrypted Backup, Privacy Mode). Fleet Management,
  external API, Analytics, Autonomous Gateway excluded — COM-001
  classifies these as Future modules, not shipped.
- New pages: Why MoMo Assistant, Who It's For, Enterprise, Workspace
  Access (renders the ADR's canonical chain), public Roadmap.
- Pricing rebuilt on the 4-tier Packaging from COM-001. Values COM-001
  left open (SIM Seats for Business/Enterprise, storage/retention) show
  "Coming soon" rather than invented numbers.
- Vocabulary corrected site-wide: "Device Trust Engine" → "Device Trust";
  "Licence" → "Workspace Access"; SIM-pooling description corrected to
  match the real pooled architecture (HustlerPay ADR-011).
- Editorial pass: added missing CTA links from Home's teaser sections to
  their deep-dive pages; removed a verbatim content duplication between
  Home and Enterprise.

**Deliberately left open** (not a gap — COM-001's own scope boundary):
Subscription lifecycle (trial/suspension/cancellation), downgrade
mechanics, exact SIM Seat/storage/retention numbers for paid tiers, and
the "Station" vocabulary question (real in TGAMomoAssistant, absent from
HustlerPay backend's current model). These stay "Coming soon" on the live
site until resolved in a future sprint — do not fill them in without a
COM-001 revision or a new ADR.

**Verification:** `tsc --noEmit` clean, `next build` clean (56/56 static
pages, both locales).

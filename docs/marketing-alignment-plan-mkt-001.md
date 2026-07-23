# Sprint MKT-001 — Marketing Alignment Implementation Plan (rev. 3)

**Status**: Plan only. No code changed, nothing committed, no page touched. Builds on `docs/marketing-audit-2026-07-23.md` and is now governed by `docs/adr-commercial-model-foundation.md` (Accepted) — the commercial model's *shape* is decided; what's still open is *packaging* within that shape.

---

## 0. What changed in this revision

1. **The commercial model is now a frozen decision, not an open question.** `docs/adr-commercial-model-foundation.md`: MoMo Assistant is an Enterprise SaaS platform, the customer is an Organization, access is granted via a Subscription, materialized by a Technical License, unlocking Entitlements (SIM Seats, Capabilities, Policies, Modules). This precedes and constrains everything below.
2. **COM-001 is renamed and rescoped**: "Commercial Architecture" → **"SaaS Packaging & Entitlements."** It no longer asks whether this is a SaaS or who the customer is — the ADR answered both. It now designs Packaging, Entitlements, Limits, Modules, and Upgrade Path within the fixed model.
3. **"Workspace" as a separate entity is resolved: it isn't one.** The ADR closes the open question raised in rev. 2 — the customer is the Organization, full stop. "Workspace Access" survives only as a friendly, customer-facing *page name*, not a data entity.
4. **Strict terminology now governs the whole plan**: Subscription / Technical License / Entitlements / Packaging, each with one fixed meaning, per the ADR.

Everything else from rev. 2 (MKT-000, the three new pages, the reordered roadmap) still holds and is carried forward below.

---

## 1. Blocking-change classification

(Unchanged — still the accurate starting inventory from the original audit.)

### A — Obsolete
"SIM Trust... independently trusted rather than pooled" (`content/security.ts`, `content/how-it-works.ts`) · inconsistent "Device Trust Engine" vs. "Device Trust" naming · vague "no country hardcoded" phrasing, superseded by a real 7-country/operator list · Business/Enterprise presented as generally available via "Contact Sales," contradicting the site's own Status/Changelog/Legal pages.

### B — Missing
Financial Runtime · Trust Platform as a named triad (Device Trust + SIM Trust + **Station Trust**, currently absent entirely) + Unified Runtime Policy · Privacy Mode · Encrypted Backup & Restore · Station Management UI · Multi-Agent-per-device model · SMS Intelligence Platform · concrete Country Expansion list · Beta RC1 milestone · HustlerPay Operations Center (Treasury reconciliation, Investigation Centers, Incident/Alert SLA management, Audit trail, RBAC, Fleet management) · double-entry Ledger · Execution Timeline API · Disaster Recovery targets.

### C — To retire
Specific feature-to-tier assignments in the current Pricing comparison table (no real gating logic backs any of them) · FAQ copy implying a live Business/Enterprise sales conversation with a real offer behind it · the implicit "just an Android app" framing Sprint 0 exists to retire.

### D — To create
Enterprise page · rebuilt Security page · **Workspace Access page** (renamed from Licensing) · **"How Workspace Access Works"** page (renamed, with diagram) · **Why MoMo Assistant** page · **Who It's For** page · public **Roadmap** page.

---

## 2. Governing decision (precedes everything below)

**`docs/adr-commercial-model-foundation.md` — Accepted.** MoMo Assistant is an Enterprise SaaS platform; the contractual customer is an Organization; access flows Subscription → Technical License → Entitlements → Resources (SIM Seats, Capabilities, Policies, Modules). Full principles and terminology definitions live in that document — not restated in full here to avoid two sources of truth drifting apart. Read it before starting COM-001.

---

## 3. Foundational sprints (precede all marketing-site work)

### Sprint COM-001 — SaaS Packaging & Entitlements *(renamed and rescoped)*

**Objective**: design how the already-decided SaaS model is packaged and sold, without revisiting whether it's a SaaS, who the customer is, or what the product is — those are fixed by the ADR. **Produces RFCs only — no code, no site copy.**

**Deliverables**, per your list:

1. **Packaging** — the offers themselves: Starter, Professional, Business, Enterprise.
2. **Entitlements** — precisely what each Subscription unlocks: SIM Seat count, Cloud Backup, Analytics, API access, Customer Hub, Priority Support, Multi-Agent, Runtime Management, Advanced Security, future Modules.
3. **Limits** — the quantitative caps per Packaging tier: SIM Seats, users, stations, secondary organizations (if that's ever real), devices, storage, history retention, API calls.
4. **Modules** — classify each capability as included / optional / future / Enterprise-only.
5. **Upgrade Path** — Starter → Professional → Business → Enterprise transitions, without data loss.

**What COM-001 explicitly does NOT own anymore** (closed by the ADR): whether this is a SaaS, who the customer is, whether "Workspace" is a real entity (it isn't — see below), what a Subscription/Technical License/Entitlement *means* (defined, fixed).

**Exit criteria**: RFCs for the 5 deliverables above, using the ADR's fixed terminology throughout, that Sprint 6 (Pricing) and Sprint 7 (Workspace Access) can be written from without inventing anything.

### Sprint MKT-000 — Customer Value Proposition

**Objective**: translate every real technical capability into an outcome statement. Every later marketing sprint (Homepage, Features, Security, Enterprise) pulls from this sprint's output instead of describing architecture directly.

Starting draft table (extends your three examples to everything else the audit found):

| Capability (technical) | Customer-facing benefit (draft) |
|---|---|
| Financial Runtime | Avoids impossible transactions before they cost you money. |
| Device Trust | Automatically flags a compromised device before it puts your operations at risk. |
| SIM Trust | Stops an unauthorized SIM swap from silently taking over one of your lines. |
| Station Trust | Gives a station manager one score for whether their whole operating point is trustworthy — not just one device. |
| SMS Intelligence | Turns Mobile Money SMS receipts into structured, searchable transaction history automatically — no manual reconciliation. |
| Runtime V2 | The same automated sequence behaves identically every time, on every device — no more "it worked yesterday." |
| Encrypted Backup | Losing a phone doesn't mean losing your station's setup or its transaction record. |
| Privacy Mode | Hide balances and amounts on screen instantly when someone's looking over your shoulder. |
| Multi-Agent-per-device | Multiple agents can share a device without sharing each other's access or PIN. |
| Country Expansion | Run the same operation across Ghana, Bénin, Togo, and more, without changing how your team works. |
| Ledger / append-only history | Every correction is a new, approved entry — nothing is ever silently edited or deleted, so your books hold up to scrutiny. |
| Audit trail / RBAC | Know exactly who did what, when, and limit who's allowed to do it, without building that yourself. |

**Exit criteria**: this table, reviewed and signed off, becomes the copy source for Sprints 2–5 below. No capability gets marketing copy written about it before it has a row here.

---

## 4. Pricing — rework (Sprint 6)

Now grounded in the ADR's fixed model, not an open question:

- **Packaging** (Starter / Professional / Business / Enterprise) comes directly from COM-001's output — Sprint 6 doesn't design tiers, it publishes what COM-001 decided.
- **"How does access work?"** — a Subscription grants access; a Technical License materializes it; Entitlements (SIM Seats, modules, capabilities) are what's actually unlocked. This chain can be *explained* correctly now, even before every mechanical detail (real activation/renewal flows) is built — the ADR fixes the model, COM-001 fixes the packaging; only the underlying technical implementation of License issuance/renewal may still lag.
- **Feature-by-plan matrix** — now has a real basis to be built from: COM-001's Entitlements + Limits + Modules deliverables. Still don't publish it before COM-001 delivers those.

---

## 5. New page — Workspace Access (Sprint 7)

**Naming reconciliation**: "Workspace Access" stays the public-facing page name — it tested as approachable, and the ADR confirms it never implied a real "Workspace" entity. The page's *content* now uses the ADR's precise chain: an Organization holds a Subscription; the Subscription is materialized as a Technical License; the License unlocks Entitlements (SIM Seats, Capabilities, Policies, Modules) that apply down through Stations, Agents, Devices, and SIMs.

Covers: user/device/organization/station scoping, device-change mechanics, renewal, support policy — using Subscription/License/Entitlement precisely, not loosely.

## 6. New page — "How Workspace Access Works" (diagram, folds into Sprint 7)

**Source of truth**: the canonical Reference Architecture Diagram in `docs/adr-commercial-model-foundation.md` — this page illustrates that diagram for a public audience, it doesn't maintain its own version. Full chain: Organization → Subscription → Technical License → Entitlements (SIM Seats/Modules/Capabilities/Policies) → Stations → Agents → Trusted Devices (Device Token for identity + Runtime). Also note the Device Token / Technical License distinction from the ADR — identity vs. authorization — is worth surfacing on this page since it's the kind of precision detail a technical evaluator would check.

Every step is now either fixed by the ADR (Organization/Subscription/License/Entitlements) or already real and sourced (Station/Agent/Device/SIM/Runtime, per the audit). Nothing left unexplained — this is the strongest single improvement this revision makes to the plan.

## 7. New page — Enterprise (Sprint 5)

Unchanged: Organizations, Stations, Agents, Device Trust, Runtime, Sync, Security, Backups are all real and ready. Governance section still must not be sourced from HEOS's draft Enterprise Blueprint — use the real substance (append-only ledger, RBAC, audit trail, DR targets) instead, phrased through MKT-000's benefit language.

## 8. Security page (full rebuild, Sprint 4)

Unchanged: Device Trust, SIM Trust, Station Trust, Unified Runtime Policy, Financial Runtime, PIN Security, Encrypted Backup, Runtime Integrity, Append-only Execution History, SMS Intelligence, Privacy Mode — all sourced, no blockers, written through MKT-000's benefit framing.

## 9. New page — Why MoMo Assistant (folds into Sprint 2)

Unchanged: why MoMo Assistant over manual USSD dialing, a generic notes app, or another automation tool — pulls from MKT-000's table and the existing About-page "why it exists" material.

## 10. New page — Who It's For (folds into Sprint 2)

Unchanged: Mobile Money Agent, Mobile Money Agency, Kiosk Network, Field Operations, Team Managers — each surfacing the relevant subset of MKT-000's table. Placement note carried over: still folded into Sprint 2 pending your confirmation.

## 11. New page — public Roadmap (Sprint 9)

Unchanged: Beta → Release Candidate → General Availability, replacing scattered "Coming Soon" tags. Source: TGA `docs/roadmap.md`/`CLAUDE.md` for what's true today; COM-001's Packaging output for what GA includes commercially.

---

## 12. Vocabulary — official dictionary

**Strict commercial terms (from the ADR — do not use loosely or interchangeably)**:
- **Subscription** — the commercial relationship between MoMo Assistant and an Organization.
- **Technical License** — the mechanism that activates a Subscription's rights.
- **Entitlements** — the capabilities actually granted (modules, limits, SIM Seats, features).
- **Packaging** — the composition of specific offers (Starter/Professional/Business/Enterprise) as bundles of Entitlements.

**Always use**: MoMo Assistant · Organization · Agent · Runtime (V2) · Device Trust · SIM Trust · Station Trust · Financial Runtime · SMS Intelligence · Privacy Mode · Encrypted Backup · Workspace Access (public-facing page label only — see §5).

**Never use**: TGA MoMo Assistant · "Phone"/"Merchant Phone" (use Device) · "Device Security" (use Device Trust) · "SMS Parser" (use SMS Intelligence) · "Licence" (use Technical License internally, Workspace Access publicly) · "Workspace" as an entity name (resolved by the ADR — it isn't one; use Organization).

**Still open, not locked by this revision**: "Station" — real on the Android/TGA side, absent from the HustlerPay backend's own model (`Organization → Merchant`, not `Organization → Station`) — still needs a direct conversation with engineering, per the original audit's R5. This is the only vocabulary item left unresolved.

---

## 13. Roadmap

```
ADR         Commercial Model Foundation  (Accepted — governs everything below)
     ↓
Sprint 0    Product Messaging Refresh
     ↓
COM-001     SaaS Packaging & Entitlements (RFCs only, no code, no copy)
     ↓
MKT-000     Customer Value Proposition (benefit table for every capability)
     ↓
Sprint 2    Homepage · Why MoMo Assistant · Who It's For
     ↓
Sprint 3    Features
     ↓
Sprint 4    Security
     ↓
Sprint 5    Enterprise
     ↓
Sprint 6    Pricing
     ↓
Sprint 7    Workspace Access · How Workspace Access Works
     ↓
Sprint 8    FAQ
     ↓
Sprint 9    Roadmap (public page)
```

Navigation/footer updates ride along with whichever sprint introduces the page they link to. Screenshots/illustrations/animations still come last, after every page above is final.

---

## Open items this plan still does not resolve

1. Whether "Station" is the term to standardize on, or needs to change to match the backend's "Merchant" model — still needs engineering. **Only remaining open vocabulary item.**
2. Whether to build a dedicated Operations/Platform page for the HustlerPay admin dashboard (original audit's R7) — still unresolved, still folded into Enterprise's Governance section for now rather than given its own page.
3. Whether Why MoMo Assistant / Who It's For should be their own sprint instead of folded into Sprint 2 — flagged, awaiting your call.

**Closed this revision**: whether "Workspace" is a real entity (it isn't — ADR §2) · what actually differs between buyer types and what's billed at what unit (now COM-001's Packaging/Entitlements/Limits deliverables, no longer an open question about *whether* to answer it, just *what* the answer is).

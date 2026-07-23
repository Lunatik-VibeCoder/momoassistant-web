# ADR — Commercial Model Foundation

**Status**: Accepted (2026-07-23). Product/architecture decision, not a marketing decision — precedes and constrains COM-001 (SaaS Packaging & Entitlements) and every marketing sprint that touches pricing, licensing, or entitlements. Not implemented — this fixes the model; COM-001 designs how it's packaged; later sprints build the site and any real backend mechanism.

## Context

The marketing audit and subsequent planning work (`docs/marketing-audit-2026-07-23.md`, `docs/marketing-alignment-plan-mkt-001.md`) found no commercial model documented anywhere in engineering — no tiers, no billing unit, no licensing mechanism. The first response was to treat this as entirely open and defer every commercial question to a design sprint (COM-001, originally scoped as "Commercial Architecture"). This ADR narrows that: the *shape* of the model is now decided. What remains open is *packaging* — how offers are composed within this shape — not whether the shape itself is right.

## Decision

The following chain is fixed and should not be revisited by COM-001 or any later sprint:

```
MoMo Assistant
      ↓
Enterprise SaaS Platform
      ↓
Customer = Organization
      ↓
SaaS Subscription
      ↓
Technical License
      ↓
Entitlements
      ↓
Resources — SIM Seats, Capabilities, Policies, Modules
```

Stated as principles:

1. **MoMo Assistant is an Enterprise SaaS platform** — not a standalone app sold per-device, and not a generic API infrastructure product (see the audit's caution against HEOS's Enterprise Blueprint framing, which this decision deliberately does not adopt either — it stays grounded in the actual Mobile Money/USSD product).
2. **The contractual customer is an Organization** — not an individual agent, not a "Workspace" as a separate entity. This resolves the open question raised in the prior plan revision about whether Workspace is a distinct entity: it is not. "Workspace Access" may still be used as a friendly, customer-facing page/label name — it is not a data entity, and does not imply one.
3. **Access is granted through a SaaS Subscription** — the commercial relationship between MoMo Assistant and an Organization.
4. **Rights are materialized by a Technical License** — the mechanism that activates what a Subscription entitles the Organization to. The Subscription is the business relationship; the License is what makes it real technically.
5. **Features are granted as Entitlements** — the actual capabilities, modules, and limits a given Subscription+License unlock.
6. **Consumable resources — SIM Seats, modules, capabilities — are managed independently of billing.** Resource management (how many SIM Seats are provisioned, which modules are active) is a separate concern from the billing relationship itself, even though billing determines the resource limits.
7. **Commercial packaging can evolve without changing this technical architecture.** Starter/Professional/Business/Enterprise (or any future packaging) are arrangements of Entitlements within this fixed model — changing what's in the Business tier next year doesn't require changing what a Subscription, License, or Entitlement *is*.

## Terminology (strict, from this point forward)

- **Subscription** — the commercial relationship: the contract between MoMo Assistant and an Organization.
- **Technical License** — the technical mechanism that activates the rights a Subscription grants. **Defined below — not left conceptual.**
- **Entitlements** — the capabilities actually granted: modules, limits, SIM Seats, features.
- **Packaging** — the composition of specific offers (Starter, Professional, Business, Enterprise) as bundles of Entitlements.

These four terms are now precise and load-bearing. Marketing copy, product specs, and any future implementation should all use them the same way — that consistency is the entire point of separating them.

### Technical License — exact role, checked against the real codebase

No object or service named "License" exists anywhere in the HustlerPay backend today (checked: zero matches for `class.*License`, `LicenseService`, `LicenseToken` across `src/`). Per your own rule — keep the term only if a real object backs it, otherwise define its role now rather than let it drift — here is that definition:

A **Technical License is a signed, verifiable credential issued to a Runtime (a registered device) under an Organization's active Subscription.** It is the device-facing analogue of something that already *does* exist and is real, per the audit: HustlerPay's **Device Token** (ADR-004) — a long-lived, asymmetric-key credential bound to hardware identity (IMEI), instantly and remotely revocable on theft or replacement.

The relationship, stated precisely so the two don't get conflated:
- **Device Token** (existing, real) — proves *this specific device* is who it claims to be. Identity/authentication layer.
- **Technical License** (new concept, not yet built) — proves *this device, under this Organization's Subscription, is entitled to operate*. Authorization layer, one level up. A device can hold a valid Device Token and still have no valid Technical License (e.g., Subscription lapsed, Organization suspended) — the two are checked separately.

Concretely, once built: issued when a Runtime is enrolled under an Organization with an active Subscription; carries or references the Entitlements it activates for that Runtime; revocable independently of the Device Token (Subscription lapses → License revoked, device itself isn't necessarily untrusted) and independently of the Subscription's billing state changing (License can be reissued without a new billing event, e.g. on Entitlement upgrade).

This gives COM-001 and later implementation something concrete to build against, rather than a name with no shape. It is explicitly **not implemented** — same status as everything else in this ADR — but it is no longer just a word.

## Reference Architecture Diagram

**Canonical — every future document (product, backend, Android, dashboard, marketing) should reference this diagram rather than redraw or restate it.**

```
Organization
        │
        ▼
Subscription
        │
        ▼
Technical License
        │
        ▼
Entitlements
   ├── SIM Seats
   ├── Modules
   ├── Capabilities
   └── Policies
        │
        ▼
Stations
        │
        ▼
Agents
        │
        ▼
Trusted Devices
        │
        ├── Device Token (Identity)
        └── Runtime
```

Reads top to bottom as: an Organization holds a Subscription; the Subscription is materialized as a Technical License; the License unlocks a set of Entitlements (SIM Seats, Modules, Capabilities, Policies); those Entitlements apply down through the Organization's Stations and Agents to its Trusted Devices, each of which carries its own Device Token (identity, separate from and beneath the License's authorization) and runs the Runtime.

`docs/marketing-alignment-plan-mkt-001.md` §6 ("How Workspace Access Works") should point to this diagram as its source rather than maintaining its own version.

## Governance

This ADR is the source of truth for the commercial model and its terminology. **COM-001 (SaaS Packaging & Entitlements) may complete this model — Packaging, Entitlements, Limits, Modules, Upgrade Path — but may not alter the principles fixed by this ADR.** Any challenge to those principles (the SaaS framing, Organization as customer, the Subscription → Technical License → Entitlements chain, or the identity/authorization/commercial-rights separation) requires a new ADR or a formal revision of this one — not a decision made inside a marketing sprint, COM-001, or any later implementation sprint.

This holds developers to a stable architecture, lets product design offers without re-litigating the foundation, keeps marketing communicating from one coherent model, and routes any future change through explicit governance rather than an ad hoc call downstream.

## Consequence

- **COM-001 is rescoped and renamed**: "Commercial Architecture" → **"SaaS Packaging & Entitlements."** It no longer answers "is this a SaaS / who is the customer / what is the product" — those are answered here. It designs Packaging (which tiers exist), Entitlements (what each unlocks), Limits (quantitative caps per tier), Modules (included/optional/future/Enterprise-only), and Upgrade Path (Starter → Professional → Business → Enterprise, without data loss).
- **"Workspace Access"** (the marketing site's public-facing renaming of "Licence," adopted in the prior plan revision) survives as a page name/customer-facing label only. Its content should now be written using the real chain above — Subscription grants access, materialized as a Technical License, unlocking Entitlements — rather than staying a placeholder.
- The "How Workspace Access Works" diagram (`docs/marketing-alignment-plan-mkt-001.md` §5) should be updated to reflect this chain explicitly, rather than a single unexplained "Workspace Access" node.
- No code changes follow from this ADR directly. It constrains COM-001's scope and gives later marketing sprints a stable vocabulary to write against.

# Marketing Site Audit — momoassistant-web vs. Engineering Reality

**Status**: Audit only. No site files modified, nothing committed, no implementation started. This document is read-only research, meant to be the factual basis for future marketing-update sprints.

**Scope**: three engineering repos (HustlerPay backend, TGAMomoAssistant Android app, HustlerPay Dashboard admin console) audited for decisions with marketing relevance, compared against the current momoassistant-web site (14 pages, bilingual EN/FR, content in `content/*.ts`).

**Method**: full reads of the primary docs in each repo (ADR logs, security/financial decision logs, roadmaps, changelogs, entity/design-language docs), plus repo-wide searches for the specific terms in the request ("Device Trust Platform," "Financial Runtime Platform," licensing/subscription language, governance). Every claim below is sourced to a specific file. Where something is inferred rather than explicitly stated, it's marked as an assessment, not a fact.

---

# PHASE 1 — Documentary Audit

## 1.1 Product Positioning & Named Platforms

| Decision | Source | What it actually says | Marketing relevance |
|---|---|---|---|
| "Device Trust Platform" / "Financial Runtime Platform" as literal names | Searched all 3 repos | **Neither phrase exists anywhere**, in any repo, as an adopted engineering name. | If the brief's premise was that these are established internal platform names, that premise doesn't hold. See closest real matches below. |
| **Trust Platform** (real name) | TGAMomoAssistant `docs/architecture/TRUST_PLATFORM.md`, frozen v1.1 | Three independent "trust engines" — Device Trust, SIM Trust, Station Trust — feeding a `RuntimeExecutionDecision` (ALLOW/DELAY/BLOCK) via a Unified Runtime Policy. All three engines are **implemented and tag-frozen** (`device-trust-freeze-v1.0`, `sim-trust-freeze-v1.0`, `station-trust-freeze-v1.0`). | This is the real, shippable capability behind what the brief called "Device Trust Platform." Use "Trust Platform" or describe the outcome (continuous device/SIM/station integrity scoring), not an invented name. |
| **Financial Runtime** (real name, internally "Programme 5") | TGAMomoAssistant `docs/architecture/FINANCIAL_RUNTIME.md`, `FINANCIAL_DECISIONS.md` (FD-001–011) | Balance Engine, Execution Record Engine, and Reservation Engine are **implemented and field-validated on a real device** — the app now refuses to dial a transaction without first reserving funds against a verified balance. Reconciliation Engine, Runtime Recovery Engine, and Treasury Dashboard are **not started**. | Real, shipped, verifiable claim: "won't execute with insufficient or unknown funds." Not currently mentioned anywhere on the site. |
| HustlerPay `financial-domain` module | HustlerPay ADR-013/014, `docs/execution/runtime-event-bus.md` | Backend-side pipeline: Android Runtime → Runtime Events → Financial Domain → Ledger → Treasury → Reporting. | Backend half of the Financial Runtime story — distinct from the Android-side Financial Runtime above; both exist, don't conflate them in copy. |
| **HEOS Enterprise Blueprint** positioning | HustlerPay `docs/HEOS/01-Enterprise/A01-Enterprise-Blueprint.md.txt` (Status: **Draft**) | Frames HustlerPay as a generic "financial infrastructure company... rather than a traditional payment gateway," serving "software companies, marketplaces, fintechs, enterprises and developers." Across ~19 HEOS documents, Mobile Money is mentioned twice, always as one example provider among "Bank," "Card Processor." Android, USSD, SIM cards, MoMo Assistant, "station," and "agent" are **never mentioned**. | **Direct conflict** with the concrete, USSD/device/agent-centric positioning on momoassistant-web and in every other engineering doc. HEOS is Draft-status and largely a skeleton (see §1.8). Do not build positioning off this document without confirming with the team whether it reflects current intent. |
| HEOS "Official Product Portfolio" | HustlerPay `docs/HEOS/01-Enterprise/A05-Product-Portfolio.md.txt` | Lists 6 "official" products (API Platform, Merchant Dashboard, Financial Ledger Engine, Treasury Engine, Developer Platform, HEOS). **MoMo Assistant is not on the list**, despite executing every real transaction today. | Same caution as above — if this list were treated as authoritative, the product momoassistant-web markets has no formal place in it. |
| Product rename: "TGA MoMo Assistant" → "MoMo Assistant" | TGAMomoAssistant `CLAUDE.md` §1, 2026-06-20 | Explicit decision to drop "TGA" from the agent-facing name. Company/legal entity remains "TRANS GHANA ACCESS." | The site already uses "MoMo Assistant" consistently — no fix needed, just confirms current usage is correct. |
| HustlerPay "ecosystem" framing | HustlerPay `README.md` | MoMo Assistant is one of several planned client apps (alongside "TGA Exchange," "Xomanxo") of a shared HustlerPay backend. Note: README also calls the Android runtime "HustlerPay Agent... not yet connected," which is **stale** — ADR-010+ shows it's long since built and live. | Confirms the three-repo architecture, but don't source current-state claims from this specific README passage. |
| HustlerPay Operations Center (NOC) | HustlerPay Dashboard `architecture_blueprint.md`, `ui_guidelines.md`, `coding_standards.md` | Consistent internal name for the admin/ops dashboard — a distinct, real product surface with its own capabilities (see §1.2). | The marketing site currently doesn't mention this product surface exists at all. |

## 1.2 Features & Capabilities (real, shipped, and not yet on the site)

- **Financial Runtime pre-execution funds check** (TGA, field-validated) — see above.
- **Trust Platform / Device Trust Detail screen** — agents can see their device's integrity score, per-detector breakdown, and active threats. TGA, Sprint DEVICE-TRUST-DASHBOARD-1 (2026-07-15).
- **Privacy Mode** — app-wide toggle masking balances/amounts/names/numbers across screens. TGA, same sprint.
- **Encrypted local backup & restore** — AES-256-GCM + PBKDF2, 9-step atomic restore, financial data excluded from export. TGA, "Sprint 2 — Enterprise Operations," shipped 2026-07-23 (today).
- **Multi-agent-per-device model** — one physical device can have multiple registered agents with a 3-level auth hierarchy (Agent PIN / Transaction PIN / granular permissions). TGA, AGENT-SECURITY-1.
- **Silent Mode** — branded progress UI (optionally a system overlay) replacing raw USSD menu screens during a dial. TGA, Sprint BETA-UX-1/2.
- **Multi-country expansion, shipped today (2026-07-23)** — real, non-placeholder USSD flow catalogs now exist in code for MTN Togo, MTN Côte d'Ivoire, Moov Bénin/Burkina Faso/Côte d'Ivoire, Orange Burkina Faso, Celtis Bénin (previously Ghana/Bénin only). **Caveat**: no doc confirms field-validation on real devices for these new flows the way Ghana/Bénin were validated over many sprints — don't claim "field-proven in 7 countries," "supports 7 countries" is closer to accurate, pending confirmation.
- **Diagnostic Trace Store** — persistent, queryable execution-checkpoint log, 30-day retention. TGA, shipped 2026-07-22.
- **Beta RC1 milestone reached, today (2026-07-23)** — TGA `CLAUDE.md` §3, "Jalon Beta RC1 atteint." The most current product-maturity fact in any repo — confirm with the team before publishing anything about current maturity, since this postdates every other status reference found.
- **HustlerPay Operations Center capabilities** (Dashboard repo, real and shipped): Treasury/wallet reconciliation with a Treasury Health Score and an approve/reject review workflow; device/fleet management (FleetMap, telemetry, remote reboot); Alerts/Incident Center with SLA tracking, MTTR, and structured playbooks; Audit Investigation Center with correlation/search; Beneficiaries (KYC/OTP) workflow; RBAC with 5 roles / 25 permissions, backend-enforced. **None of this is mentioned anywhere on momoassistant-web.**
- **Double-entry Ledger** (`Σdebit = Σcredit` enforced at the API boundary) and **Execution Timeline API** (reconstructs a causal, human-readable transaction history from ~30 event types) — HustlerPay backend, real, shipped. Neither is mentioned on the site.
- **Disaster Recovery targets** — RPO 5 min (ledger), RTO 15 min automated / 60 min manual. HustlerPay ADR-009. A reliability claim not currently used.

### Named but explicitly NOT yet built — do not market as available
- **Autonomous Gateway Mode / "SIM Bank"** (Levels 2–3: session-based or fully unattended execution) — TGA ADR-017. Only Level 1 (biometric on every transaction, the current default) is shipped.
- **Command Center** (Ctrl+K global search across the dashboard) — Dashboard, planned Sprint 12.
- **"Live Operations" dashboard routes** — Dashboard repo confirms these pages exist in code but have **zero navigation links anywhere in the running app** — built but currently unreachable by a real user. Verify current status before claiming "live operations monitoring."
- **Bidirectional real-time control (WebSocket)** — Dashboard: only one-way Server-Sent Events are wired; a `WebSocketClient.ts` exists with zero real importers.
- **Remote device commands** — flag exists (`ENABLE_REMOTE_COMMANDS=true`) but nothing in code checks it; flagged by the Dashboard's own audit as unverified/possibly unguarded.
- **Multi-organization / multi-tenant context in the Dashboard app** — `OrganizationProvider` is a literal no-op; nothing populates real organization data yet, even though the backend's `Organization` model itself is fully implemented (see §1.3 — this is a real, load-bearing contradiction for the Pricing page).
- **Runtime Trust Engine** (backend) and **Secure Beneficiaries** (TGA, email-OTP + 24h freeze window) — both named, both roadmap-only.
- **Outbound webhooks** — do not exist; only WebSocket/SSE. **External API-key authentication** — no guard exists in code yet; a key can be created but not used to authenticate a request today.

## 1.3 Licensing / Subscription / Commercial Model

**No pricing tier, subscription mechanism, or licensing model exists as an implemented feature in any of the three repos.** This was independently confirmed by all three research passes:

- HustlerPay's own quote-engine decision log (`hustlerpay-marketing/docs/quote_engine_decisions.md`, ADR-2) **explicitly considered and rejected** building tiered pricing for v1: *"no real differentiated pricing rule exists today... Building [tiers] now would mean inventing tiers, violating the never-fabricate rule."* Decision: single public price, with a `pricingContext` field reserved in the API for a possible future tiered model — nothing implemented.
- The same source (ADR-3): *"No real numbers displayed publicly until the ADR-3 rate table has real, business-committed values."*
- TGAMomoAssistant: "Enterprise" is used **only** as an internal sprint codename ("Sprint 1/2 — Enterprise Completion/Operations") — not a commercial tier.
- HustlerPay Dashboard: "Enterprise"/"Premium"/"tier"/"license"/"subscription" return zero commercial-tier hits anywhere in docs or code.
- HustlerPay backend: `"license"` only appears as `package.json`'s `"UNLICENSED"` field; `"subscription"` has zero hits repo-wide.
- The only place "subscription" (French: "Abonnements") appears anywhere in engineering docs is a single placeholder cell in TGAMomoAssistant's own `roadmap.md` version table, under the **future** `v2.0.0 "SaaS Platform"** milestone — no elaboration, no pricing, no billing model.
- **A separate, explicit HustlerPay engineering principle directly addresses this**: `docs/engineering_standards.md` §3/3a/3b — *"never fabricate data... the Marketing homepage's Stats/Testimonials sections deliberately left uncomposed because no real numbers or customer quotes exist yet."* This is a written standard that names marketing content specifically.

**A discovery worth a direct question to you**: `hustlerpay-marketing/` is a **separate Next.js sub-project inside the HustlerPay monorepo**, with its own detailed architecture for a public Quote/Fee Calculator (corridor-based pricing, demo banners, `noindex`, "Available at launch" gating). It's unclear whether this is the same site as momoassistant-web, a sibling site, or a superseded parallel effort — worth clarifying before Phase 3/5 work touches pricing, since real calculator/pricing engineering may already exist in a different repo than the one being updated here.

## 1.4 Terminology

| Term | Where it's real | Where it doesn't exist / means something else | Note |
|---|---|---|---|
| **Station** | TGAMomoAssistant only (Station Trust engine, Station Management UI) | **Not found anywhere** in the HustlerPay backend or HustlerPay Dashboard repos — confirmed by both independently | The backend's actual tenant/business model is `Organization → Merchant`, not `Organization → Station`. The site's "Organization/Station" architecture claim doesn't match the backend's real domain model. Worth reconciling directly with the team — is "Station" purely an Android/UI-layer concept, or should the backend model be described differently in copy? |
| **Agent** | Used informally everywhere, in prose | **Never a formally defined entity** in any glossary across any repo (closest backend concept: `Merchant`/`MerchantSim`) | Fine to keep as plain business language, but don't imply it's a first-class modeled entity with its own API/permissions concept — it isn't one at the backend level. |
| **Organization** | Real, implemented, required FK on core models (`prisma/schema.prisma`) | Defined **three different, inconsistent ways** across HustlerPay's own HEOS governance docs (legal entity operating merchants / legal company operating merchant accounts / legal entity using HustlerPay) | The backend implementation is solid; the governance-doc definitions contradict each other and HEOS's own "one concept, one name" rule. Use the schema-level definition, not any single HEOS glossary entry. |
| **MerchantSim** | HustlerPay ADR-011: *"the true unit of execution is the Merchant SIM, not the Android phone."* A logical, UUID-identified account; SIM pools per runtime are now "potentially unlimited," replacing an earlier 1-phone-1-SIM assumption. | — | **Directly contradicts** the site's current How It Works copy: *"keeping multi-SIM stations' lines independently trusted rather than pooled."* The real architecture has moved to a pooled-SIM model; the site describes the pre-pivot model. |
| **Runtime** | Used in at least 3 senses across repos: (1) `ExecutionRuntime`, a specific backend entity; (2) informal shorthand for "the Android app as executor"; (3) README's superseded "HustlerPay Agent" | — | Disambiguate before using in technical copy; the site's "Runtime V2" usage matches sense (2) correctly. |
| **Ledger** | HustlerPay: double-entry, `Σdebit = Σcredit`. TGA: deliberately narrow — refers *only* to the existing Transaction/History record; the team explicitly avoided calling the Financial Runtime concept "Ledger Engine" to prevent cross-team terminology collision, naming it "Execution Record" instead. | — | Two real, related, but distinct "ledger" concepts (backend accounting ledger vs. on-device execution record) — don't conflate them if ever describing both. |
| **Device Trust** | TGA: full "Trust Platform" engine, frozen, real, agent-visible. HustlerPay backend: a heartbeat payload field, validated and accepted but **not yet persisted or acted upon** — a real historical bug is documented where this field was silently dropped in production until ADR-012 fixed it (2026-07-18). | — | The Android-side capability is real and mature; the backend-side "enforcement" of device trust is not yet live. Don't imply the backend actively enforces device trust today. |
| **Device Trust Engine** vs. **Device Trust** | — | — | The site itself is inconsistent: homepage says "Device Trust Engine," the security page says just "Device Trust," other pages alternate. Internal naming inconsistency, independent of the engineering-docs comparison. |

## 1.5 Limitations & Prerequisites

- SMS-based reconciliation is field-verified **only for MTN Bénin and MTN Ghana** — don't imply broader confirmed operator coverage.
- No automatic retry/reassignment on a failed job — scaffolding exists, nothing consumes it.
- Biometric/PIN confirmation is required on every transaction by default; there is no persistent "trust session" beyond a 15-minute hardware Keystore window — directly limits any "fully unattended/hands-free" framing.
- RBAC in the HustlerPay backend only actually enforces `/users` today — the rest of the API is JWT-gated but not permission-gated (flagged internally as "the single biggest remaining risk").
- Liquidity pools are intra-network only — an MTN float can't directly top up a Moov float; don't imply cross-network fund movement.
- KI-02 (duplicate terminal-status publication, 3× per completed job) is a known, unresolved backend defect — unclear if downstream side effects are idempotent. KI-01 (the job-claim race causing up to ~10-minute delays) is confirmed fixed and validated over a 6-run production campaign — safe to treat as resolved.
- `.ai/skills/*.md` in TGAMomoAssistant is confirmed **stale** relative to `CLAUDE.md` and the dated architecture docs — don't source current-state facts from that directory.
- HustlerPay's own `README.md` and `docs/backend_readiness.md` are confirmed stale in multiple places (Organizations listed as "Planned" when they're fully implemented; Android runtime called "not yet connected" when it's long since live).

## 1.6 User Workflows

Documented, real workflows not currently reflected on the site in this level of detail: the Treasury anomaly review workflow (Review Queue → drawer → Approve-with-comment or Reject-with-reason, every step audited); wallet investigation (6-tab drawer with cross-links to the physical device); device/fleet supervision (FleetMap → device drawer with telemetry and remote reboot); beneficiary onboarding with OTP verification; cross-entity "drill-down" investigation, with an internal design target that *"an operator must be able to trace a transaction's full origin in under 30 seconds"* (an aspiration, not yet a measured/proven result — do not quote as an achieved benchmark).

## 1.7 Security

Real, shippable, currently unused-on-site claims: immutable append-only ledger (all corrections are new approved regularization transactions, never edits/deletes); Device Token authentication bound to hardware identity (IMEI) with instant remote revocation on theft; Keystore invalidation triggers a full PIN-vault purge on any biometric/tamper change; restored/replaced devices start at a capped, intermediate trust level rather than inheriting full trust; backend-driven RBAC ("the frontend never defines what a role can do — only the backend decides," quoted directly from `permissions.ts`); trust engines never block a transaction directly, only a separate policy layer does (a genuine separation-of-concerns security principle).

Caveats to avoid overstating: current dashboard auth (V1) stores the JWT in `localStorage`, not HttpOnly cookies — the more XSS-resistant architecture is explicitly "V2 — Future," not live; API keys can be created but nothing in code authenticates a request with one yet.

## 1.8 Documentation Governance

**HEOS (HustlerPay Enterprise Operating System)** — this is the new governance framework the brief was asking about. Added to the HustlerPay repo 2026-07-01, last touched 2026-07-11.

- Self-described as *"the official governance, architecture and knowledge framework of HustlerPay... single source of truth for every strategic, business, technical, security, compliance and operational decision."* Owner: CEO. Motto: *"Code explains HOW. HEOS explains WHY."*
- 12 planned top-level sections; only 4 have real content (`00-Governance`, `01-Enterprise`, `03-Architecture`, one ADR). `02-Business`'s 12 files exist but are **literally empty (0 bytes each)**. Six other sections have no files at all. Most populated documents are marked **Status: Draft**, not Approved.
- Internally inconsistent even by its own rules: its own naming convention says Architecture docs should be prefixed "Cxx," but the real files on disk are "Dxx." "Organization" is defined three different ways across its own documents (§1.4), directly violating its own stated "one concept, one name, one meaning" rule.
- **The most significant single finding of this whole audit**: HEOS's populated Enterprise-layer documents position HustlerPay in generic, Stripe-style "financial infrastructure platform for developers/fintechs" language, essentially never mentioning Mobile Money, USSD, Android, or any of the concrete product vocabulary that appears everywhere else (including on momoassistant-web itself). This has not been reconciled with the rest of the documented reality anywhere.
- Separately, `docs/engineering_standards.md` (pre-existing, not part of HEOS) is a more concretely-grounded governance artifact — every principle cites a real shipped precedent, including the direct marketing-content rule quoted in §1.3.

**Recommendation carried into Phase 4**: treat HEOS's Enterprise Blueprint / Product Portfolio as **not currently authoritative** for marketing positioning until you've confirmed with the team whether it reflects live strategic intent or is early, unreviewed draft material that predates the actual shipped product.

---

# PHASE 2 — Marketing Site Audit

Site inventory: Home, Features, Pricing, Security, How It Works, About, Docs, Demo (covers Download + Request Demo + FAQ — there is deliberately no standalone `/faq` route, per a comment in `content/navigation.ts` matching "the brand kit's target sitemap, which has neither"), Contact, Changelog, Blog, Careers, Legal (Privacy/Terms/Cookies/Security Statement), Status. Nav and footer both live in `content/navigation.ts`.

## Home (`content/homepage.ts`)
- Accurate: core positioning (professional Mobile Money operators, not consumer wallets), Runtime V2, PIN-never-leaves-device rule, Organization/Station architecture as a concept.
- **Missing**: Financial Runtime (pre-execution funds check) — the single most marketing-ready *new* capability found in this audit, and it's nowhere on the homepage.
- **Inconsistent naming**: "Device Trust Engine" here vs. plain "Device Trust" on the Security page.
- **Overclaim risk**: pricing preview tiles present "Business" (multi-station) and "Enterprise" as if generally available via "Contact Sales" — see Phase 3, this is the single biggest finding in this audit.
- Testimonials and social-proof logos are explicitly marked in the source as placeholder (`"Témoignage provisoire"` / `"Placeholder testimonial"`, fictional company names) — confirm the *rendered UI* makes this equally obvious to a visitor, not just the source code, given the backend's own written rule against presenting invented content as genuine.

## Features (`content/features.ts`)
- Accurate on Automation/Operations/Organization groupings.
- **Missing**: Financial Runtime, Privacy Mode, encrypted backup/restore, Silent Mode, multi-agent-per-device model — all real, shipped, none mentioned.
- No mention of the admin dashboard / Operations Center capabilities at all (Treasury, Investigation Centers, Alerts, Audit trail) — an entire product surface is invisible here.

## Pricing (`content/pricing.ts`)
- See Phase 3 in full — this page carries the highest-priority findings in the whole audit.
- Tier feature lists ("Organization/Station architecture," "unlimited stations and devices") describe capabilities that are either not yet wired end-to-end (multi-org context) or not actually gated by any tier logic anywhere in the code.

## Security (`content/security.ts`)
- Strong, accurate core claims (KeyStore, PIN-never-leaves-device).
- **Missing**: the specific, shippable claims found in this audit — immutable append-only ledger, Device Token with instant remote revocation, backend-enforced RBAC, trust-engines-never-block-directly-only-policy-does.
- Uses "Device Trust" (not "Device Trust Engine") — the terminology-inconsistency point again.
- "SIM Trust... independently trusted rather than pooled" contradicts the real, current MerchantSim pooled architecture (§1.4) — this is a factual accuracy issue, not just a wording one.

## How It Works (`content/how-it-works.ts`)
- Same SIM-pooling inaccuracy as Security, stated even more explicitly here ("keeping multi-SIM stations' lines independently trusted rather than pooled").
- Clean five-step lifecycle, otherwise accurate to the architecture as documented.

## About (`content/about.ts`)
- Consistent, accurate positioning and values. No factual issues found. Mission/vision language doesn't reference any of the newer platform names — fine as-is unless you want to fold in the new capabilities.

## Docs (`content/docs.ts`)
- Correctly hedged ("still being built out," API "published alongside the SaaS platform release") — no inconsistency found. Good model for how the rest of the site should hedge pre-GA claims.

## Demo (`content/demo.ts`)
- Consistent with Pricing's Starter tier claims (free, 1 station/2 devices, self-serve). No new issues beyond what's already flagged in Pricing.

## Contact (`content/contact.ts`)
- Not read in detail during this pass (grep found nothing platform-relevant) — low risk, worth a quick pass in implementation but not flagged as a finding here.

## Changelog (`content/changelog.ts`)
- **This page is actually the most internally honest page on the site** — it correctly states the SaaS/multi-tenant platform (v2.0.0) and subscriptions ("Abonnements") are still planned, not shipped. It directly contradicts Pricing's framing (see Phase 3).
- Stale relative to what the agents found: doesn't reflect Financial Runtime, Trust Platform detail screen, Privacy Mode, encrypted backup, multi-country expansion, or the Beta RC1 milestone reached today. The last blog post is dated 2026-07-08 — before nearly everything found in §1.2.

## Blog (`content/blog.ts`)
- Only 2 posts (2026-07-01, 2026-07-08), both pre-dating the bulk of what this audit found. A natural place to publish real, sourced posts about the newer shipped work.

## Careers (`content/careers.ts`)
- Not implicated by this audit — general culture/hiring copy, no product claims requiring reconciliation.

## Status (`content/status.ts`)
- **Also internally honest and consistent with Changelog**: explicitly lists "SaaS platform (multi-tenant backend): planned — not yet launched, planned for v2.0.0." This directly contradicts the Pricing page's Business/Enterprise framing — the site disagrees with itself, not just with engineering docs.

## Legal (`content/legal.ts`)
- Internally consistent with Changelog/Status: explicitly says the app is "currently in private beta" and that the privacy policy "will evolve... notably when the multi-tenant SaaS platform launches." Same contradiction with Pricing applies here too, by extension.

## Navigation / Footer (`content/navigation.ts`)
- No FAQ route by design (folded into Demo) — confirmed intentional via source comment, not a gap.
- No issues found in link structure itself.

---

# PHASE 3 — Subscriptions & Licensing Deep Audit

This is the single most load-bearing section of the audit — the finding here is corroborated independently by four separate sources.

## What the site currently claims

Three tiers: **Starter** (free, 1 station / up to 2 devices, self-serve download), **Business** ("Contact Sales," unlimited stations/devices, Organization/Station architecture, cloud sync, device restoration, audit logs across every station), **Enterprise** ("Contact Sales," custom runtime policies, dedicated onboarding, priority support). A comparison table gates specific features (cloud sync, device restoration, Organization/Station architecture, custom policies, dedicated integration, priority support) behind Business/Enterprise.

## What's actually true, per engineering docs and code

1. **HustlerPay's own quote-engine ADR explicitly rejected building tiered pricing for v1**, on the grounds that inventing tiers without a real differentiated pricing rule would violate the team's own written "never fabricate data" standard. There is no engineering artifact anywhere that defines what "Business" or "Enterprise" pricing actually costs, or what specifically gates a feature to one tier vs. another.
2. **"Enterprise" is not a recognized commercial tier in any of the three repos** — confirmed independently by both the TGAMomoAssistant audit (used only as an internal sprint codename) and the HustlerPay audit (only the generic adjective, or an HEOS governance-layer label).
3. **The specific feature the Business/Enterprise tiers are sold on — multi-organization/multi-station operation — is not actually functional in the running Dashboard app today.** `OrganizationProvider` is a literal no-op; nothing populates real organization data from the backend yet, even though the backend's own `Organization` Prisma model is fully implemented. This is flagged internally as a P0 item the team is actively working to close, not a shipped capability.
4. **The site contradicts itself on this exact point.** Status page: "SaaS platform (multi-tenant backend): planned — not yet launched, planned for v2.0.0." Changelog: v2.0.0 "SaaS Platform" (multi-tenant backend, auth, subscription management) is listed as **planned**, not shipped, and is explicitly called "the foundation for Business and Enterprise plans at scale" — meaning even the site's own roadmap frames Business/Enterprise as *not yet buildable* until v2.0.0 ships. Legal/Privacy: "will evolve... when the multi-tenant SaaS platform launches" (future tense). Pricing/Features/Homepage: present Business/Enterprise as available today via "Contact Sales."

## What's ambiguous or could create bad expectations

- A prospective Business/Enterprise customer who reads Pricing, then Status or Changelog, will encounter a direct contradiction about whether the thing they'd be buying exists yet.
- "Unlimited stations and devices" and "Organization/Station architecture" as Business-tier line items imply a working multi-tenant capability that the Dashboard's own code doesn't yet deliver.
- "Custom runtime policies" (Enterprise) has a real, documented backend concept behind it (organization-defined runtime policies enforced by Runtime V2) — this specific line item is more defensible than the tier structure it's attached to.
- No document anywhere defines what distinguishes "priority support" or "dedicated onboarding" operationally — these read as standard SaaS-tier boilerplate rather than anything sourced from the product.

## What's missing

- Any actual mechanism for someone to become a paying Business/Enterprise customer today — "Contact Sales" leads to a sales conversation with no productized offer behind it yet.
- Any connection between the pricing page and the separate `hustlerpay-marketing/` sub-project's Quote/Fee Calculator work (see §1.3) — worth clarifying whether these are meant to be the same site.

---

# PHASE 4 — Recommendations

Each entry: priority, justification, source documents, marketing impact, product impact, pages concerned.

### R1 — Reconcile or explicitly gate the Business/Enterprise pricing claims
- **Priority**: P0
- **Justification**: The site contradicts itself (Pricing vs. Status/Changelog/Legal) on whether multi-tenant/SaaS capability exists. The underlying capability isn't functional yet (Dashboard `OrganizationProvider` no-op). HustlerPay's own written engineering standard specifically prohibits fabricating commercial content without a real, committed basis.
- **Sources**: `content/pricing.ts`, `content/status.ts`, `content/changelog.ts`, `content/legal.ts`; HustlerPay Dashboard `dashboard_current_state_audit.md` §7, `rfc_admin_0002`; HustlerPay `hustlerpay-marketing/docs/quote_engine_decisions.md` ADR-2/3, `docs/engineering_standards.md` §3.
- **Marketing impact**: high — this is the page most likely to set a real prospect's expectations, and it's the page most out of step with engineering reality.
- **Product impact**: none required to fix the marketing copy; fixing the underlying gap (Dashboard org-context) is separately tracked and already a P0 in that repo's own backlog.
- **Pages**: Pricing, Homepage (pricing preview), Features (comparison implications), Status, Changelog, Legal.

### R2 — Add Financial Runtime as a headline capability
- **Priority**: P0
- **Justification**: A real, field-validated, differentiated capability ("won't execute without verified funds") that no competitor claim on the current site captures, and it's completely absent from the site today.
- **Sources**: TGAMomoAssistant `docs/architecture/FINANCIAL_RUNTIME.md`, `FINANCIAL_DECISIONS.md`.
- **Marketing impact**: high — genuinely differentiated, safety-oriented feature story.
- **Product impact**: none — describing a shipped feature.
- **Pages**: Homepage, Features, Security.

### R3 — Fix the SIM-pooling inaccuracy
- **Priority**: P1
- **Justification**: The site states SIM lines are kept "independently trusted rather than pooled" — the real architecture (HustlerPay ADR-011) has moved to a pooled MerchantSim model where "the true unit of execution is the Merchant SIM, not the Android phone," with pools "potentially unlimited" per runtime. This is a factual inaccuracy about how the product actually works, not a style issue.
- **Sources**: `content/security.ts`, `content/how-it-works.ts`; HustlerPay `docs/architecture_decisions.md` ADR-011.
- **Marketing impact**: medium — likely unnoticed by most visitors, but wrong if a technical evaluator checks it against the API/architecture.
- **Product impact**: none.
- **Pages**: Security, How It Works.

### R4 — Standardize "Device Trust" naming across the site
- **Priority**: P2
- **Justification**: Homepage says "Device Trust Engine," Security page says "Device Trust" — internal inconsistency independent of any engineering-doc comparison.
- **Sources**: `content/homepage.ts`, `content/security.ts`, `content/how-it-works.ts`, `content/features.ts`, `content/about.ts`.
- **Marketing impact**: low — polish issue.
- **Product impact**: none.
- **Pages**: Homepage, Security, How It Works, Features, About.

### R5 — Decide "Station" vocabulary deliberately, with the team
- **Priority**: P1
- **Justification**: "Station" doesn't exist anywhere in the HustlerPay backend or Dashboard repos — the backend's real model is `Organization → Merchant`. The site's entire architecture narrative is built on "Organization/Station." This isn't necessarily wrong (Station may be a legitimate Android/UI-layer concept), but it needs an explicit decision, not an assumption, before more copy is built on it.
- **Sources**: repo-wide search, all three repos; HustlerPay `prisma/schema.prisma`, HEOS `D02-Ubiquitous-Language.md.txt`.
- **Marketing impact**: high if it turns out to be wrong — the whole site's information architecture depends on this term.
- **Product impact**: none directly, but may surface a real product/backend terminology gap worth raising with engineering regardless of the marketing outcome.
- **Pages**: Homepage, Features, Pricing, Security, How It Works, About, Demo, Docs.

### R6 — Add real, shipped multi-country coverage as a concrete claim
- **Priority**: P1
- **Justification**: The site currently says only "no country or network is hardcoded... configured per Network Profile" — vague. Real, shipped flow catalogs now exist for 7 countries/operator combinations as of today. A concrete country list is a stronger, more specific claim than the current generic one.
- **Sources**: TGAMomoAssistant `multi_country_architecture.md` (superseded by today's code state), `CLAUDE.md` §3 Sprint 3.
- **Marketing impact**: high — concrete, verifiable, differentiated.
- **Product impact**: none for the claim itself; confirm field-validation status with engineering before publishing, per the caveat in §1.2.
- **Pages**: Homepage, Features, About, Security.

### R7 — Decide whether to introduce the admin/ops product (HustlerPay Operations Center) to the marketing site
- **Priority**: P1
- **Justification**: An entire, substantial, real product surface (Treasury reconciliation, Investigation Centers, Incident/Alert management with SLAs, audit trail, RBAC, fleet management) exists and is not mentioned anywhere on momoassistant-web, which currently reads as an Android-app-only product.
- **Sources**: HustlerPay Dashboard `dashboard_current_state_audit.md`, `implementation_plan.md`, `entity_design_language.md`, `walkthrough.md`.
- **Marketing impact**: high — this could materially change how "Business"/"Enterprise" tiers are actually justified (a real ops console is a much stronger enterprise pitch than "custom policies + priority support").
- **Product impact**: none for a marketing decision, but this recommendation directly informs how R1 should be resolved — the ops console may be the real substance behind the Business/Enterprise tiers that's currently missing from their descriptions.
- **Pages**: Homepage, Features, Pricing, new page (if the team wants a dedicated "Operations" or "Dashboard" page).

### R8 — Do not adopt HEOS Enterprise Blueprint positioning language without explicit confirmation
- **Priority**: P0 (as a caution, not an action)
- **Justification**: HEOS's populated Enterprise documents describe a generic fintech-infrastructure company that barely mentions Mobile Money/USSD/Android — a substantially different framing from the rest of the documented product and from momoassistant-web's own current positioning. HEOS is Draft-status, largely a skeleton (most sections empty), and internally self-contradictory.
- **Sources**: HustlerPay `docs/HEOS/01-Enterprise/A01-Enterprise-Blueprint.md.txt`, `A05-Product-Portfolio.md.txt`.
- **Marketing impact**: high risk if adopted uncritically — would pull the site's positioning away from its current, concrete, well-supported "Mobile Money agent operating system" narrative toward vague generic-fintech language.
- **Product impact**: none directly — this is a positioning caution, not a build item.
- **Pages**: All — this is a positioning-strategy question, not a page-level fix.

### R9 — Publish real updates for the work already shipped since the last blog post
- **Priority**: P2
- **Justification**: The last blog post is dated 2026-07-08; nearly everything in §1.2 (Financial Runtime, Trust Platform detail, Privacy Mode, encrypted backup, multi-country expansion, Beta RC1) shipped after that.
- **Sources**: `content/blog.ts`; TGAMomoAssistant `CLAUDE.md`, `docs/roadmap.md`.
- **Marketing impact**: medium — freshness and credibility.
- **Product impact**: none.
- **Pages**: Blog, Changelog.

### R10 — Confirm the relationship between momoassistant-web and `hustlerpay-marketing/`
- **Priority**: P0 (as a clarifying question, not a build item)
- **Justification**: A separate Next.js sub-project with its own detailed pricing-calculator architecture exists inside the HustlerPay monorepo. Any Phase 5 pricing/calculator work should not proceed without knowing whether this is the same site, a sibling, or superseded.
- **Sources**: `hustlerpay-marketing/docs/quote_engine_decisions.md`, `smart_calculator_architecture.md`.
- **Marketing impact**: could invalidate or duplicate planned pricing work depending on the answer.
- **Product impact**: none.
- **Pages**: Pricing (if a calculator is ever added).

---

# PHASE 5 — Roadmap

Independent, testable sprints. Each should ship and be verifiable on its own — none blocks another except where noted.

**Marketing Sprint A — Pricing & Commercial-Model Reconciliation**
Resolve R1 and R10 first (they're clarifying/decision items, not build items — get answers before writing new copy). Then bring Pricing, Homepage's pricing preview, Status, Changelog, and Legal into agreement on what's actually available today vs. planned for v2.0.0. Testable outcome: no page on the site contradicts another about SaaS/multi-tenant availability.

**Marketing Sprint B — Factual Accuracy Pass**
R3 (SIM pooling) and R4 (Device Trust naming). Small, mechanical, no new content needed — corrections to existing copy. Testable outcome: Security and How It Works pages match the current MerchantSim architecture; "Device Trust" terminology is identical across every page that uses it.

**Marketing Sprint C — Terminology Decision: Station**
R5. Requires a direct conversation with engineering before any copy changes — not purely a marketing-team decision, since it may reveal a real backend/product terminology gap. Testable outcome: a documented decision (keep "Station" as an Android/UI-layer term with an explicit note on how it maps to the backend's "Merchant," or change the term) that all future copy follows consistently.

**Marketing Sprint D — New Capability Additions**
R2 (Financial Runtime) and R6 (concrete multi-country list), pending the field-validation confirmation flagged in §1.2. Independent of Sprints A–C. Testable outcome: Homepage/Features/Security reflect Financial Runtime and a specific, confirmed country list.

**Marketing Sprint E — Ops Console Positioning Decision**
R7 and, depending on its outcome, a revision of R1's Business/Enterprise tier descriptions to reflect the real Operations Center capabilities as their actual substance. Depends on Sprint A's reconciliation being done first, since it changes what those tiers should say. Testable outcome: either a new page/section describing the Operations Center, or an explicit decision not to surface it yet, documented either way.

**Marketing Sprint F — Positioning Safeguard**
R8, ongoing rather than a one-time sprint: before any future marketing copy is written from a HustlerPay-side document, confirm it isn't sourced from HEOS's still-draft, still-inconsistent Enterprise layer without independent confirmation.

**Marketing Sprint G — Content Freshness**
R9. Independent of everything else, lowest priority, can run any time. Testable outcome: at least one new blog post covering real, shipped, sourced work from the last two weeks.

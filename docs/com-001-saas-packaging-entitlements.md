# COM-001 — SaaS Packaging & Entitlements

**Status**: Proposed. RFC and decision tables only — no code, no marketing page touched, `docs/adr-commercial-model-foundation.md` unmodified, terminology unchanged. Everything below is a **draft for your review**, not a committed business decision — per the governance rule the ADR now carries, only a formal ADR revision can change the *model*; this document works strictly within it, proposing *packaging*.

**Mission**: design MoMo Assistant's commercial packaging within the fixed model (Organization → Subscription → Technical License → Entitlements). **Explicit constraint carried from HustlerPay's own written engineering standard** (`docs/engineering_standards.md` §3, cited in the original audit): never present a fabricated number as if real and committed. Where this document proposes a number without a real anchor, it's marked **[PROPOSED — needs business sign-off]**, not stated as decided.

**Exit criteria**: MKT-000 and Marketing Sprints 2–9 can be executed without inventing any commercial rule or packaging decision of their own. Everything they need is either decided here or explicitly flagged here as still open — never silently improvised downstream.

---

## 1. Packaging

Four tiers, per the ADR's own naming:

| Tier | Status today | Positioning |
|---|---|---|
| **Starter** | **Real, live** — already free and self-serve on the site | Single station, evaluate the product with no sales conversation |
| **Professional** | New — proposed | A single agency running more than one station, not yet needing organization-wide governance tooling |
| **Business** | Exists on the site today as "Business," repositioned here | Multi-station organizations needing centralized Station/Agent management and audit visibility |
| **Enterprise** | Exists on the site today, repositioned here | Organizations needing custom Runtime policies, dedicated onboarding, and the full Operations Center |

**Reasoning**: Starter's shape is untouched because it's real and already shipping — changing it now would be a product regression, not a packaging decision. Professional is new because the current two-tier jump (1 station free → "Contact Sales" for anything more) has no self-serve middle step; the audit didn't find evidence this gap has been deliberately chosen, so it's treated as an open gap worth filling, not a decision reversed.

---

## 2. Entitlements

Only real, audited capabilities are used as entitlement building blocks — nothing here names a capability the audit couldn't confirm exists.

| Entitlement | Starter | Professional | Business | Enterprise |
|---|---|---|---|---|
| USSD Automation (Runtime V2) | ✓ | ✓ | ✓ | ✓ |
| Multi-SIM Management | ✓ | ✓ | ✓ | ✓ |
| Transaction History | ✓ | ✓ | ✓ | ✓ |
| PIN Vault (KeyStore) | ✓ | ✓ | ✓ | ✓ |
| SMS Intelligence | ✓ | ✓ | ✓ | ✓ |
| Device Trust / SIM Trust | ✓ | ✓ | ✓ | ✓ |
| Financial Runtime (funds-check before dial) | ✓ | ✓ | ✓ | ✓ |
| Encrypted Backup & Restore | — | ✓ | ✓ | ✓ |
| Privacy Mode | — | ✓ | ✓ | ✓ |
| Cloud Sync (station config, cross-device) | — | ✓ | ✓ | ✓ |
| Device Restoration | — | ✓ | ✓ | ✓ |
| Multi-Agent-per-device | — | ✓ | ✓ | ✓ |
| Station Trust / Station Management | — | — | ✓ | ✓ |
| Unified Runtime Policy (org-defined automation rules) | — | — | ✓ | ✓ |
| Audit Trail (multi-station) | — | — | ✓ | ✓ |
| RBAC (roles/permissions) | — | — | — | ✓ |
| Custom Runtime Policies | — | — | — | ✓ |
| Dedicated Onboarding | — | — | — | ✓ |
| Priority Support | — | — | — | ✓ |

**Deliberately excluded from every tier, this pass**: Fleet Management / "Live Operations" dashboard, external API access, Analytics/KPI dashboards. The audit found these either unreachable in the real running app today (Live Ops routes exist in code with zero navigation links), unauthenticated (no API key guard exists yet), or not explored deeply enough to characterize confidently. Selling these now, even under Enterprise, would repeat the exact overclaim pattern the original audit flagged — see §4, Modules, where they're placed as Future.

**Reasoning for the Starter→Professional cut line**: everything gated behind Professional (Backup, Privacy Mode, Cloud Sync, Restoration, Multi-Agent) is real, already-shipped device/data-safety tooling that matters the moment an operation grows past a single device — a defensible, non-arbitrary line. The Professional→Business cut line (Station Trust, Unified Runtime Policy, Audit Trail) is where the product's own architecture already draws a line — these are explicitly multi-station concepts in the real domain model, not an invented boundary.

---

## 3. Limits

| Limit | Starter | Professional | Business | Enterprise |
|---|---|---|---|---|
| Stations | 1 (real, live) | 3 **[PROPOSED]** | Unlimited (already implied by current site copy) | Unlimited |
| Devices | 2 (real, live) | 6 **[PROPOSED]** | Unlimited | Unlimited |
| SIM Seats | 2 (mirrors device limit today — no separate SIM Seat concept exists yet in the real product) | 8 **[PROPOSED]** | **[PROPOSED — needs COM-001 follow-up or business input; no natural anchor found]** | **[PROPOSED]** |
| Agents per device | Real product limit not found in the audit — likely unbounded today | Same | Same | Same |
| Transaction history retention | Not found as a bounded limit anywhere in the audit — likely unbounded today | Same | Same | Same |
| API calls | N/A — no external API auth exists yet (§2) | N/A | N/A | N/A, until the underlying capability ships |
| Storage | No real limit found in the audit | **[PROPOSED — flag for COM-001 follow-up]** | **[PROPOSED]** | **[PROPOSED]** |

**Honest gap, not a placeholder problem**: several "current" limits above (agents-per-device, history retention, storage) aren't actually bounded anywhere in the real product today — the audit found no cap. Rather than inventing one to fill the table, this is flagged as a real open question: does Starter need an *enforced* cap on these to be a meaningfully different tier from Professional, or do Professional/Business/Enterprise differentiate purely on Stations/Devices/SIM Seats and the Entitlements table? Recommend resolving this explicitly, not by default.

---

## 4. Modules

| Module | Classification |
|---|---|
| USSD Automation, Multi-SIM, Transaction History, PIN Vault, SMS Intelligence, Device/SIM Trust, Financial Runtime | **Included** in every tier (see §2) |
| Encrypted Backup, Privacy Mode, Cloud Sync, Device Restoration, Multi-Agent | **Included from Professional up** |
| Station Trust, Unified Runtime Policy, Audit Trail | **Included from Business up** |
| RBAC, Custom Runtime Policies, Dedicated Onboarding, Priority Support | **Enterprise-only** |
| Fleet Management / Live Operations dashboard | **Future** — real in code, not reachable in the running app today (audit finding) |
| External API access | **Future** — no request-authentication mechanism exists yet (audit finding) |
| Analytics / KPI dashboards | **Future** — exists but not characterized deeply enough by the audit to package confidently |
| Autonomous Gateway / unattended execution ("SIM Bank") | **Future** — explicitly not built beyond its Level 1 default (audit finding); do not attach to any tier, including Enterprise, until it ships |

---

## 5. Upgrade Path

**Upgrade** (Starter → Professional → Business → Enterprise): Entitlements and Limits expand; nothing already configured is removed or reset. Station/Agent/Device/SIM data carries forward unchanged — this is a Packaging change, not a re-provisioning event, consistent with the ADR's own principle that Entitlements and the underlying Organization/Station/Device data are managed independently.

**Downgrade**: the harder case, and the one place this RFC can't respond with a clean answer — what happens when an Organization on Business (say, 5 stations) downgrades to Professional (3-station limit)? Two candidate approaches, **neither decided here**:
- **Soft limit**: existing stations stay active, but no new station can be added until the count is back under the new tier's limit.
- **Hard limit**: downgrade is blocked until the Organization manually reduces to within the new limit.

Recommend Soft limit as the less disruptive default (matches the "no data loss" principle more literally), but this is a real product decision, not something to default silently.

**Trial / Suspension / Cancellation**: your original COM-001 scope (before the ADR narrowed it) listed Trial, Suspension, and Cancellation as concepts to define. Strictly, these are Subscription-lifecycle states, not Packaging — they belong with the Technical License mechanism the ADR already scoped as "not yet implemented." Flagging here rather than silently deciding: recommend a short follow-up note (not a full RFC) once COM-001's Packaging output is confirmed, so Sprint 7 (Workspace Access) has something concrete to describe for these states too.

---

## 6. Decision Log

| Decision | Reasoning | Trade-off | Assumption | Open |
|---|---|---|---|---|
| Add a "Professional" tier between Starter and Business | Closes a real self-serve gap (1 station free → immediate "Contact Sales") the audit didn't find was deliberate | Adds a fourth tier to maintain and market | The gap is a genuine adoption blocker, not intentional friction | Confirm with whoever owns sales motion whether removing the "talk to sales" step this early is actually wanted |
| Starter's Entitlements/Limits stay exactly as they are today | It's real, live, and already tested in production copy | None — this is the one tier with zero invention risk | — | — |
| Fleet Management, external API, Analytics, Autonomous Gateway excluded from every tier including Enterprise | Matches the audit's own findings that these aren't functionally ready (orphaned routes, no API auth, unbuilt beyond Level 1) | Enterprise looks less differentiated without them, short-term | These will eventually be real and should be added to Enterprise first when they ship | When each module actually ships, revisit whether it's Enterprise-exclusive or broader |
| Station Trust / Audit Trail / Unified Runtime Policy gated at Business, not Professional | The product's own domain model already treats these as multi-station concepts | A single-station Professional customer with compliance needs gets no audit trail | Single-station operations don't need cross-station audit — untested assumption | Worth checking with a real Professional-tier prospect profile before finalizing |
| SIM Seats, Storage, and history-retention limits left partially unproposed | No real anchor exists anywhere in the audited product for several of these | Table looks incomplete | — | **Explicitly open** — needs either a follow-up COM-001 pass or direct business input; not guessed here |
| Downgrade behavior (soft vs. hard limit) not decided | Genuinely a product-risk decision (data/access implications), not a packaging default | Sprint 7 (Workspace Access) can't fully describe downgrade yet | Soft limit is proposed as the safer default | **Explicitly open** |
| Trial/Suspension/Cancellation deferred to a Technical License follow-up, not decided here | These are Subscription-lifecycle states, outside Packaging's scope per the ADR | Sprint 7 will have a gap on these specific flows until resolved | — | **Explicitly open** |

---

## Summary — what's actually ready for MKT-000 and Marketing Sprints 2–9

**Ready now**: Packaging (4 tiers named and positioned), the full Entitlements matrix, the Modules classification (including what's explicitly deferred to Future), and the Upgrade principle (expand without data loss).

**Not ready — do not let downstream sprints invent these**: exact SIM Seat / storage / history-retention numbers for Professional/Business/Enterprise; downgrade mechanics; Trial/Suspension/Cancellation flows. These three items are this RFC's own open list, not silently resolved — carry them forward as blockers on Sprint 6 (Pricing)'s comparison-table numbers and Sprint 7 (Workspace Access)'s renewal/downgrade copy specifically, everything else in this document is safe to build from.

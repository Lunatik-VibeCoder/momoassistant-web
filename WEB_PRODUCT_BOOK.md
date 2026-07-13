# Product book

> Brand facts in this doc are sourced from `/brand` (the official brand kit) — treat `/brand` as authoritative if this doc ever drifts from it. Technical/architecture facts not covered by `/brand` are carried over from earlier product documentation and kept here as supporting detail for accurate Security/Architecture section copy.

## Identity

- **Official name**: MoMo Assistant (never "Momo Assistant" or "TGA MoMo Assistant" — the latter is the internal Android codename only)
- **Short name**: MoMo
- **Created by**: DEUS FEREA
- **Category**: Fintech Productivity Platform (`product.md`) / Mobile Money Productivity Platform (`README.md`) — both appear in the brand kit; use "Fintech Productivity Platform" as canonical (the more specific doc).
- **Tagline**: "Built for Agents. Powered by Automation."
- **Platform**: Android

## Positioning

MoMo Assistant is the operating system for professional Mobile Money agents. It automates repetitive USSD operations while helping agents manage treasury, contacts, transaction history and business operations.

- **Mission**: Empower Mobile Money agents with intelligent automation.
- **Vision**: Become Africa's most trusted productivity platform for Mobile Money professionals.
- **Core principles**: Professional, Reliable, Fast, Secure, Multi-country, Offline First, Automation First.
- **Target users**: Individual Agents, Agencies, Organizations, Enterprises.
- **Supported countries**: Country agnostic — enabled through configurable Network Profiles. No country is hardcoded, in copy or in code.

## Elevator pitch / meta description

"MoMo Assistant empowers Mobile Money agents by automating USSD operations while providing professional tools for treasury management, reporting, contacts and productivity." (`playstore.md`, also used verbatim as `DESCRIPTION` in `lib/constants.ts`)

## Capabilities (technical detail, not brand-kit content — use for accuracy, not verbatim copy)

- Multi-SIM management
- USSD automation
- Transaction history
- Secure PIN Vault
- Device Trust Engine
- Runtime V2 execution engine
- Organization / Station architecture
- Security auditing
- Cloud synchronization
- Device restoration
- SIM Trust
- Enterprise onboarding

## Security model

- Android KeyStore — sensitive material sealed on-device, hardware-backed
- Device Trust — devices verified before they can transact
- SIM Trust — SIMs bound and verified per device
- Runtime policies — org-defined rules for what can be automated
- Audit logs — every security-relevant action recorded

**Hard rule: MoMo Assistant never stores Mobile Money transaction PINs in the cloud.** Don't write copy that contradicts this, and don't invent compliance certifications or encryption claims that aren't listed here.

## Voice & tone (`voice.md` — authoritative)

- **Tone**: Professional, Simple, Friendly, Reliable, Modern
- **Never**: Overly technical, corporate jargon, aggressive sales language, slang
- **Personality**: Confident, Helpful, Calm, Efficient, Trustworthy

The "Capabilities"/"Security model" lists above are accurate technical facts for engineering reference — when turning them into on-page copy, write them in the plain, non-jargon voice above, not as a spec sheet.

## Visual quality bar

Stripe, Vercel, Linear, Notion, Raycast — dark-first, minimal, premium SaaS. Never childish, never cryptocurrency aesthetics, never generic banking clichés, no generic stock illustrations. Full palette/typography/logo rules: see `WEB_DESIGN_SYSTEM.md` and `/brand`.

## Messaging (`messaging.md`)

- **Primary tagline**: "Built for Agents. Powered by Automation."
- **Hero title**: "The Professional Mobile Money Operating System."
- **Hero subtitle**: "Automate USSD operations. Manage treasury. Increase productivity. Grow your agency."
- **Elevator pitch**: see above.

`messaging.md` also lists "Start Free Trial" / "Book a Demo" as a CTA pair — **not used**. The site's actual CTAs are "Download Beta" / "Request Demo" (`website.md`), since MoMo Assistant ships as a direct Android APK today, not a hosted app with trial signup. `messaging.md`'s pair reads as aspirational SaaS copy for a future funnel; confirm with brand owner before ever using it.

**Not yet applied to the live homepage** (Prompt 1 scope was tokens/logo/metadata only, not copy): `app/(marketing)/page.tsx`'s Hero still shows the placeholder headline "Automate Mobile Money. Stay in Control." and subheadline written before the brand kit existed. `lib/constants.ts`'s `TAGLINE`/`DESCRIPTION` (used in `<title>`/meta description) already use the real brand copy above — only the on-page Hero text is still pending a copy pass.

## Sitemap

**Brand kit (`website.md`)**: Home, Features, Pricing, FAQ, About, Contact, Download, Roadmap.

**Currently implemented** (real pages, in `lib/routes.ts`'s `IMPLEMENTED_ROUTES`): `/`, `/features`, `/security`, `/how-it-works`, `/pricing`, `/about`, `/contact`, `/demo`, `/docs`, `/changelog`, `/blog` (+ `/blog/[slug]`), `/careers`.

**Nav/footer links only, still 404** until built: Privacy, Terms (`/legal/*`). `/docs/guides`, `/docs/architecture`, `/docs/tutorials`, `/docs/api` also 404 — `/docs` today is a landing page only; the real documentation center is Prompt 3's scope. Not a bug — see `WEB_ARCHITECTURE.md`'s route-group convention and `CONTENT_GUIDE.md` for how each gets built out.

**IA decision**: the original nav had separate `Download` (→`/download`) and `FAQ` (→`/faq`) links from before this page rollout existed. Both were retired — `/demo` now covers Download Beta + Request Demo + FAQ together, matching the brand kit's target sitemap (which has neither `/download` nor `/faq` as its own route). FAQ content lives contextually instead: on `/pricing`, on `/demo#faq`, and as a preview on the homepage.

Discrepancy still open: brand kit has no "Security" or "How It Works" page (site has both — reasonable additions given the product's depth) and no "Roadmap" (tracked as Changelog instead, close enough in intent). Brand kit also doesn't mention Docs, Blog, or Careers — added per the site's own expanded spec beyond the brand kit's marketing-page list.

**Editorial note on `/changelog`**: the roadmap content there is deliberately high-level (version milestones only — `v0.9.0` Core Complete through `v2.0.0` SaaS Platform). Internal engineering detail (sprint names, bug fixes, device-testing notes) from the Android project's own docs was reviewed and intentionally excluded from this public page.

Future (beyond brand kit, from the original site spec): Docs, Blog, Developers, API, Status, Portal (customer/org dashboard), Demo, Careers, Legal (Privacy/Terms/Cookies/Security Statement).

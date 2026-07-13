# Architecture

Clean Frontend Architecture, App Router, TypeScript, Tailwind v4. Path alias `@/*` resolves to the repo root (no `src/` dir).

## Route groups

Pages live inside route groups under `app/`. Parentheses are excluded from the URL, so `app/(marketing)/page.tsx` still serves `/`.

- `(marketing)` — public marketing pages: home, features, security, pricing, download, faq, contact, changelog, privacy, terms. **Exists today.**
- `(docs)`, `(download)`, `(legal)`, `(auth)`, `(dashboard)` — create these the moment their first real page is built, following the same pattern. Don't pre-create empty route group folders; Git won't track them anyway and they add nothing until there's a page inside.

Files that must stay at the true `app/` root (Next's special file conventions, not normal pages): `layout.tsx`, `globals.css`, `icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`, `robots.ts`, `sitemap.ts`.

## Directory conventions

```
app/                    routes only — thin composition, no business logic
components/ui/          shadcn/ui primitives, generic, no content imports
components/layout/      site chrome shared by every page (Header, Footer, Container, Section)
components/shared/      reusable widgets that aren't shadcn primitives, aren't page-specific
                         (skip link, logo, CTAButton, motion wrappers)
features/<page>/        page-specific sections, one file per section, barrel-exported via index.ts
content/                typed copy/config objects — pages import data, never hardcode strings
lib/                    framework-agnostic utilities and cross-cutting config
hooks/                  generic reusable hooks
types/                  shared TypeScript contracts for content/ data
public/images,logos,icons,illustrations/  static assets by kind
```

When a new page ships (e.g. Pricing), it gets its own `features/pricing-page/` directory sibling to `features/homepage/`, following the identical one-file-per-section + barrel-export pattern.

## Component layering

`ui` → `layout` → `shared` → `features`. Each layer may depend on layers to its left, never the reverse. `ui/*` never imports from `content/`; only `features/*` and `layout/*` do.

## Data flow

`types/content.ts` defines the shape → `content/*.ts` provides typed data → `features/*` components render it. Changing copy never touches component logic; changing a component's structure never touches copy.

## `lib/` modules

- `constants.ts` — every site-wide string/URL (name, tagline, email, APK URL, socials). Never hardcode these in a component.
- `seo.ts` — `defaultSeo` (root layout metadata) + `createMetadata()` (every page's `export const metadata`).
- `analytics.ts` — tracking facade (`track`, `trackCTA`, `trackDownload`, `trackScroll`, `trackOutboundLink`). No provider wired in yet; swap the implementation in this one file when one is chosen.
- `features.ts` — boolean feature flags (`DOWNLOAD_ENABLED`, `DOCS_ENABLED`, `BLOG_ENABLED`, `BETA_ENABLED`) gating nav/section visibility.
- `motion.ts` — shared Framer Motion variants (`fadeInUp`, `fadeIn`, `fadeLeft`, `fadeRight`, `staggerContainer`).
- `utils.ts` — `cn()` classname merge helper (shadcn-generated).

## CTAs

Every conversion action (download, pricing, contact, etc.) renders through `components/shared/cta-button.tsx`, never `Button` or `ButtonLink` directly — it's the only thing that fires `lib/analytics.ts` tracking. `ButtonLink` (link styled as a shadcn Button) is `CTAButton`'s internal primitive; only non-conversion in-page UI controls (e.g. the mobile menu trigger) use `Button` directly.

## A shadcn/ui caveat worth knowing

This project's `shadcn` CLI version scaffolds the **Base UI**–backed variant (`@base-ui/react`), not the Radix-based one most examples online assume. Differences that matter: polymorphism uses a `render={<Element />}` prop instead of `asChild`, and `Button`/`SheetClose`/similar interactive primitives default `nativeButton={true}` — set `nativeButton={false}` (or use `CTAButton`/`ButtonLink`, which already do) whenever rendering one as a link instead of a real `<button>`, or Base UI logs an accessibility warning in dev.

## Deferred on purpose

Not building yet: blog, auth, dashboard, CMS, backend, real analytics provider, database. Feature flags and the route-group convention exist so adding these later doesn't require restructuring what's already here.

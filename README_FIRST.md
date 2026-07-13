# Start here

This is the official marketing website for **MoMo Assistant** — not the Android app, not an admin dashboard, not the docs portal (those come later). See [WEB_PRODUCT_BOOK.md](./WEB_PRODUCT_BOOK.md) for what the product actually does, and `/brand` for the official brand kit (colors, typography, logo, voice) that governs everything visual and written on this site.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

This is Next.js 16 on React 19 — APIs and conventions differ from older Next.js knowledge in places (see `AGENTS.md` at the repo root, and read `node_modules/next/dist/docs/` before assuming behavior). Notably: `middleware.ts` is deprecated in favor of `proxy.ts`, and `params`/`searchParams` are Promises.

## Where things live

| Path | Purpose |
|---|---|
| `app/` | Routes. Pages live inside route groups — `(marketing)` today, more as they're built. |
| `components/ui/` | Generic shadcn/ui primitives. No business logic, no content imports. |
| `components/layout/` | Site chrome shared by every page: Header, Footer, Container, Section. |
| `components/shared/` | Small reusable widgets that aren't shadcn primitives but aren't page-specific: `Logo`, `CTAButton`, motion wrappers. |
| `features/<page>/` | Page-specific section components, one file per section. |
| `content/` | Typed copy and nav structure. Pages import data from here, never hardcode strings. |
| `lib/` | Cross-cutting config and utilities: `constants.ts`, `seo.ts`, `analytics.ts`, `features.ts`, `motion.ts`, `utils.ts`. |
| `hooks/` | Generic reusable React hooks. |
| `types/` | Shared TypeScript contracts for `content/` data. |
| `public/images,logos,icons,illustrations/` | Static assets, organized by kind. |

Full breakdown: [WEB_ARCHITECTURE.md](./WEB_ARCHITECTURE.md).

## Other docs

- [WEB_PRODUCT_BOOK.md](./WEB_PRODUCT_BOOK.md) — what MoMo Assistant is, who it's for, brand rules
- [WEB_ARCHITECTURE.md](./WEB_ARCHITECTURE.md) — directory conventions, route groups, component layering
- [WEB_DESIGN_SYSTEM.md](./WEB_DESIGN_SYSTEM.md) — tokens, dark mode, motion, accessibility
- [SEO_GUIDE.md](./SEO_GUIDE.md) — how page metadata is generated
- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) — how to add copy or a new section/page

## Current status

Foundation + homepage (`/`) plus Features, Security, How It Works, Pricing, About, Contact, Demo, Docs (landing only), Changelog, Blog, and Careers are built and production-ready. Privacy and Terms still exist only as nav links today and 404 — that's expected, not a bug, until each is built on its own commit (see `lib/routes.ts` for the authoritative list of what's actually live). The full documentation center beyond the `/docs` landing page is separate, larger scope (MDX-based docs with search/TOC/code blocks).

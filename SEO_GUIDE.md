# SEO guide

## How metadata works

`lib/seo.ts` exports two things:

- `defaultSeo` — the base `Metadata` object, set once as `export const metadata` in `app/layout.tsx`. Defines the title template (`"%s | MoMo Assistant"`), default description, keywords, OpenGraph/Twitter defaults, and `robots: { index: true, follow: true }`.
- `createMetadata({ title?, description?, path? })` — what every page's own `export const metadata` should be built with.

Example for a new page:

```ts
// app/(marketing)/pricing/page.tsx
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pricing",
  description: "Simple plans that scale with your stations.",
  path: "/pricing",
});
```

`title` flows through the root layout's template automatically — pass just `"Pricing"`, not `"Pricing | MoMo Assistant"`. `path` sets the canonical URL and the OpenGraph `url`. If you omit `description`, it falls back to `siteConfig.description` from `lib/constants.ts`.

## Icons and OG image

- `app/icon.png` / `app/apple-icon.png` — static files, derived from the official `brand/logos/favicon.png` (alpha-channel-cropped to a clean square, resized to 32×32 and 180×180). Regenerate from the brand source if the logo ever changes; don't hand-edit these PNGs directly.
- `app/opengraph-image.tsx` — 1200×630 social card, code-generated via `next/og`'s `ImageResponse` (reused for Twitter via the `twitter.images` field in `defaultSeo`) rather than a static file, so it can composite the real icon mark with live brand colors and the current tagline without shipping another multi-hundred-KB PNG.

If a page needs a different OG image, add its own `opengraph-image.tsx` inside that route segment — Next resolves the closest one.

## Sitemap and robots

`app/sitemap.ts` and `app/robots.ts` both read from `siteConfig` in `lib/constants.ts`. When a new page ships, add its URL to the array in `sitemap.ts`.

## Per-page checklist

- [ ] `export const metadata = createMetadata({ title, description, path })`
- [ ] Title is the bare page name, not repeating "MoMo Assistant"
- [ ] Description is specific to that page, not the homepage default
- [ ] URL added to `app/sitemap.ts`
- [ ] Nav/footer link in `content/navigation.ts` points at the real path (remove any feature-flag gate once the page is live)

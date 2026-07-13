# Content guide

## Editing existing copy

Homepage copy lives in `content/homepage.ts` as typed exports (`hero`, `features`, `security`, `howItWorks`, `testimonials`, `pricingPreview`, `faqPreview`, etc.), typed against `types/content.ts`. Edit the data there — never edit strings inside `features/homepage/*.tsx` directly; those components are presentational only.

Site-wide strings (name, tagline, email, URLs) live in `lib/constants.ts`. Nav/footer links live in `content/navigation.ts`.

## Adding a new homepage section

1. Add the shape to `types/content.ts` if it's a new kind of data.
2. Add the data as a new export in `content/homepage.ts`.
3. Create `features/homepage/<section-name>.tsx` — a `Section` wrapping the content, following the pattern already used by every other section (heading with an `id`, `aria-labelledby` on the `Section`, `MotionSection`/`MotionItem` for reveal animation).
4. Export it from `features/homepage/index.ts`.
5. Add `<YourSection />` to `app/(marketing)/page.tsx` in the right position.

## Adding a whole new page

1. Create `app/(marketing)/<route>/page.tsx` (or the right route group — see `WEB_ARCHITECTURE.md`).
2. Set `export const metadata = createMetadata({ title, description, path })` — see `SEO_GUIDE.md`.
3. Create `features/<route>-page/` for its sections, same one-file-per-section + barrel pattern as `features/homepage/`.
4. Add its copy to a new `content/<route>.ts` file, typed via `types/content.ts`.
5. Point the existing nav/footer link at the real path in `content/navigation.ts` (it's already there pointing at the route, just 404ing until now).

## Feature-gating a section or nav link

Add a flag to `lib/features.ts` if one doesn't already fit, then gate in `content/navigation.ts` the same way `DOWNLOAD_ENABLED` gates the Download link — spread a conditional array entry rather than an `if` inside JSX.

## Rules

- No invented product claims. Cross-check security/architecture copy against `WEB_PRODUCT_BOOK.md` — don't add certifications, encryption claims, or capabilities that aren't listed there.
- Testimonials and social-proof logos are currently placeholders — keep them clearly structured (so swapping in real ones later is a data change, not a component rewrite) and don't present them as real customers.
- No hardcoded URLs, emails, or brand strings in components — import from `lib/constants.ts`.

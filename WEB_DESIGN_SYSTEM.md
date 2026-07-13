# Design system

## Tokens

Sourced from `/brand` (`colors.md.txt`, `typography.md.txt`, `design-tokens.json.txt`) — the official brand kit, not invented. Tailwind v4, CSS-first config — no `tailwind.config.js`. Everything is defined as CSS custom properties in `app/globals.css` and mapped into Tailwind utilities via `@theme inline`. **No hardcoded colors in components** — always a `bg-*`/`text-*`/`border-*` utility backed by a token, never a raw hex value.

- **Color** (dark-only, see below): `--primary` MoMo Lime `#D6FF5C`, `--background` MoMo Black `#0B0F0B`, `--card`/`--secondary`/`--muted` Surface `#161B16`, `--popover`/`--accent` Elevated Surface `#1D221C`, `--border`/`--input` `#2A3128`, `--foreground` `#FFFFFF`, `--muted-foreground` `#8F968B`, `--success` `#82FF73`, `--warning` `#FFC83D`, `--destructive` `#E76A5C`.
- **Spacing**: Tailwind's default scale, 8px grid per `typography.md.txt` ("Grid: 8dp") — Tailwind's default scale is already 4px-based/8px-aligned, so no override needed. No arbitrary values like `p-[13px]`.
- **Radius**: button radius 18px, card radius 20px (`typography.md.txt` / `design-tokens.json.txt`) — `--radius: 18px` (maps to `--radius-lg`, what `Button` uses), `--radius-card: 20px` (maps to `--radius-xl`, what `Card` uses). `sm`/`md`/`2xl`/`3xl`/`4xl` are proportional derivatives; only button/card have brand-specified values.
- **Shadow**: `--shadow-soft`, `--shadow-lifted` (black-based, since the background is already near-black), `--shadow-glow` (lime-tinted, for elevated/highlighted surfaces like the CTA band or a highlighted pricing card). Used sparingly.
- **Typography**: Inter (primary, self-hosted via `next/font/google`) with Roboto as a declared-but-not-self-hosted fallback — Android (this product's platform) ships Roboto natively, so it costs nothing to declare and never needs to be downloaded since Inter always loads first. `--font-sans`/`--font-heading` both map to Inter; Geist Mono remains available as `--font-mono` for technical/numeric accents (not brand-specified, kept as a reasonable engineering addition since the brand kit doesn't cover monospace use).

## Dark mode

**Dark-only.** The brand kit defines exactly one palette and `website.md.txt` states "Theme: Dark First" with no light-mode values anywhere — so there's no light variant to maintain. `<html class="dark">` is hardcoded in `app/layout.tsx`; there is no theme toggle, no `next-themes`, no `prefers-color-scheme` branch.

## Logo

Official assets live in `brand/logos/` (`logo.png` full lockup, `favicon.png` icon mark) — both large (1536×1024), transparent-padded, with a soft glow baked into the pixels; neither is pre-cropped icon-ready art. `public/logos/icon-mark.png` is a processed derivative (alpha-bbox-cropped to a clean square, resized) used for `components/shared/logo.tsx` and as the source for `app/icon.png`/`app/apple-icon.png`. Per `brand/logo-usage.md.txt`: never stretch, rotate, **recolor**, crop into the mark itself, add shadows, or change proportions; minimum display size 32px; preferred background dark (matches dark-only theme). `components/shared/logo.tsx` therefore renders the icon image untouched and sets the adjacent "MoMo Assistant" wordmark in real HTML type (`text-primary`/`text-foreground`) rather than recoloring or rebuilding the logo graphic — a full raster lockup doesn't stay crisp at header scale, so icon-image + HTML-text is the standard adaptation for a responsive header, not a brand modification.

## Motion

Framer Motion, driven entirely through `lib/motion.ts` variants (`fadeInUp`, `fadeIn`, `fadeLeft`, `fadeRight`, `staggerContainer`) — never hand-write a transition object in a feature component.

- `components/shared/motion-section.tsx` — the trigger. Wraps `whileInView` + `viewport={{ once: true, margin: "-80px" }}`, checks `useReducedMotion()` and renders a static `<div>` instead when the user has reduced motion enabled.
- `components/shared/motion-item.tsx` — a staggered child. No viewport trigger of its own; inherits animation state from a parent `MotionSection` carrying `staggerContainer`. Use `MotionSection` for a single reveal, `MotionSection` + nested `MotionItem`s for a staggered group.

Keep motion subtle — fades and small translates, no bouncy springs, nothing that fights the user's scroll.

## Accessibility

- Landmarks: `<header>`, `<main id="main-content">`, `<footer>`, each homepage section as `<section aria-labelledby="...">`.
- Skip link (`components/shared/skip-link.tsx`) is the first focusable element in `<body>`.
- Focus rings: `focus-visible:ring-*` on every interactive element, token-driven via `--ring`. Don't suppress the default outline without a token-based replacement.
- Decorative icons get `aria-hidden="true"`; icon-only controls get an explicit `aria-label`.
- No fixed `px` font sizes — use Tailwind's `rem`-based text utilities so browser zoom keeps working.

## Component library

shadcn/ui, Base UI-backed (see the caveat in `WEB_ARCHITECTURE.md`). Primitives live untouched in `components/ui/`; app-specific composition happens in `components/layout/`, `components/shared/`, and `features/`.

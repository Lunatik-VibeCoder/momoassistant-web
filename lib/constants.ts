import type { AppLocale } from "@/i18n/routing";

// Every URL, email, and brand string used across the site should be
// imported from here — never written inline in a component.
//
// Sourced from the official brand kit at /brand — do not edit these values
// without updating the source there first. Fields that vary by language
// live in SITE_TEXT below (getSiteText(locale)), not here — this file is
// for values that are identical regardless of locale.

export const SITE_NAME = "MoMo Assistant";
// Distinct from SITE_NAME today only in intent: SITE_NAME is the marketing
// site's brand string, APP_NAME is the Android app's product name. They'll
// diverge if the site ever covers more than one product.
export const APP_NAME = "MoMo Assistant";
export const SHORT_NAME = "MoMo";
export const CREATOR = "DEUS FEREA";

export const SITE_URL = "https://www.momoassistant.com";

// The Customer Hub (WS-006) lives on its own subdomain in production,
// sharing the session cookie with SITE_URL above (see
// SESSION_COOKIE_OPTIONS' `domain`) -- not to be confused with APP_NAME
// (the Android app's product name). Empty string in dev, since there's no
// real app.* host locally -- every helper below falls back to a relative,
// same-origin path in that case, keeping local dev unchanged.
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

// `locale` is a plain `string`, not `AppLocale`, on all three helpers below
// -- several call sites (layouts shared across a route-type-validator
// pattern, e.g. app/[locale]/(app)/layout.tsx) only have a plain string at
// that point (Next's generated route types constraint, not a real
// narrowing loss -- it's always one of the two real locales by the time it
// gets here). A plain string is all these need anyway; every real
// `AppLocale` value is still assignable.

// Every Hub page other than the dashboard already sits at its real path in
// both dev and prod (never nested under /app) -- this just prefixes the
// host when there's one to cross to.
export function appPath(locale: string, path: string): string {
  return `${APP_URL}/${locale}${path}`;
}

// The dashboard is the one path that differs: bare root in prod
// (Middleware rewrites app.momoassistant.com's bare locale root to /app
// internally), but still /app itself in dev (no such rewrite fires without
// the real app.* host, and the route folder is unmoved).
export function appDashboardPath(locale: string): string {
  return APP_URL ? `${APP_URL}/${locale}` : `/${locale}/app`;
}

// No public env var needed here -- every caller is server-only (a Server
// Action/Component redirecting to /login), so this just reuses SITE_URL,
// gated the same way SESSION_COOKIE_OPTIONS' `secure`/`domain` already are.
export function marketingPath(locale: string, path: string): string {
  const base = process.env.NODE_ENV === "production" ? SITE_URL : "";
  return `${base}/${locale}${path}`;
}

// Standardized on the real momoassistant.com domain — noreply@ for
// transactional email (Sprint E1/Brevo) already used it; support@ is the
// one other customer-facing address needed at this stage. Everything else
// (security@, sales@, partners@, billing@, beta@) can be added once there's
// a real need — not before.
export const EMAIL = "support@momoassistant.com";
export const SUPPORT_EMAIL = EMAIL;

// No verified public profiles yet — populate once they exist rather than
// linking placeholder/fake accounts.
export const SOCIALS: { label: string; href: string }[] = [];

// Not specified in the brand kit — no live Play Store listing yet. See
// brand/playstore.md.txt for the store copy prepared ahead of launch.
export const PLAYSTORE_URL: string | null = null;

// TECHNICAL DEBT (WS-006N follow-up) -- signed release APK (RELEASE-001,
// 2026-07-24), served as a static file from public/downloads/. No longer
// the primary path: every download now goes through /api/download, which
// redirects to whatever the backend's Release Management system currently
// has published (see lib/mcp-client.ts getPublicLatestAppRelease /
// app/api/download/route.ts). This constant is only a fallback for that
// route's own failure path (backend unreachable, nothing published yet).
// Remove once Beta Distribution has run in production for 2-4 weeks with
// no fallback triggers observed -- temporary fallbacks left undocumented
// have a habit of living forever.
export const FALLBACK_APK_URL = "/downloads/momoassistant-1.0.0-beta.1.apk";

export const siteConfig = {
  name: SITE_NAME,
  appName: APP_NAME,
  shortName: SHORT_NAME,
  creator: CREATOR,
  url: SITE_URL,
  email: EMAIL,
  supportEmail: SUPPORT_EMAIL,
  socials: SOCIALS,
  playstoreUrl: PLAYSTORE_URL,
  fallbackApkUrl: FALLBACK_APK_URL,
} as const;

// --- Localized site-wide text -----------------------------------------
// Tagline, description, and the site's CTA pair are the only site-wide
// (as opposed to page-specific) strings that need translation — page copy
// itself lives in content/*.ts, translated the same way (see
// CONTENT_GUIDE.md).

interface SiteText {
  tagline: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  keywords: string[];
}

const SITE_TEXT: Record<AppLocale, SiteText> = {
  en: {
    tagline: "Built for Agents. Powered by Automation.",
    description:
      "MoMo Assistant empowers Mobile Money agents by automating USSD operations while providing professional tools for treasury management, reporting, contacts and productivity.",
    // Site-wide CTA pair per brand/website.md ("Website Structure").
    primaryCtaLabel: "Download Beta",
    secondaryCtaLabel: "Request Demo",
    keywords: ["Mobile Money", "USSD", "Automation", "Fintech", "Africa", "Payments", "Agent"],
  },
  fr: {
    tagline: "Conçu pour les agents. Propulsé par l'automatisation.",
    description:
      "MoMo Assistant permet aux agents Mobile Money d'automatiser les opérations USSD tout en offrant des outils professionnels de gestion de trésorerie, de suivi, de contacts et de productivité.",
    primaryCtaLabel: "Télécharger la bêta",
    secondaryCtaLabel: "Demander une démo",
    keywords: ["Mobile Money", "USSD", "Automatisation", "Fintech", "Afrique", "Paiements", "Agent"],
  },
};

export function getSiteText(locale: AppLocale): SiteText {
  return SITE_TEXT[locale];
}

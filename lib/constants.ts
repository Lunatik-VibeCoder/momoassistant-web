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

// Signed release APK (RELEASE-001, 2026-07-24) — version 1.0.0-beta.1,
// versionCode 10001, served as a static file from public/downloads/. Every
// download button on the site reads this one value (all routed through
// /download as of MARKETING-UPDATE-02), so publishing the next build is a
// one-line change here.
export const APK_URL = "/downloads/momoassistant-1.0.0-beta.1.apk";

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
  downloadApkUrl: APK_URL,
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

// Every URL, email, and brand string used across the site should be
// imported from here — never written inline in a component.
//
// Sourced from the official brand kit at /brand — do not edit these values
// without updating the source there first.

export const SITE_NAME = "MoMo Assistant";
// Distinct from SITE_NAME today only in intent: SITE_NAME is the marketing
// site's brand string, APP_NAME is the Android app's product name. They'll
// diverge if the site ever covers more than one product.
export const APP_NAME = "MoMo Assistant";
export const SHORT_NAME = "MoMo";
export const CREATOR = "DEUS FEREA";

export const TAGLINE = "Built for Agents. Powered by Automation.";
export const DESCRIPTION =
  "MoMo Assistant empowers Mobile Money agents by automating USSD operations while providing professional tools for treasury management, reporting, contacts and productivity.";

// TODO: replace with the production domain before launch — not specified
// in the brand kit.
export const SITE_URL = "https://momoassistant.app";

// TODO: not specified in the brand kit — replace with the real inbox.
export const EMAIL = "hello@momoassistant.app";
export const SUPPORT_EMAIL = EMAIL;

// No verified public profiles yet — populate once they exist rather than
// linking placeholder/fake accounts.
export const SOCIALS: { label: string; href: string }[] = [];

// Not specified in the brand kit — no live Play Store listing yet. See
// brand/playstore.md.txt for the store copy prepared ahead of launch.
export const PLAYSTORE_URL: string | null = null;

// TODO: wire up to the real APK release asset once one is published.
export const APK_URL = "#download";

// Site-wide CTA pair per brand/website.md ("Website Structure").
export const PRIMARY_CTA_LABEL = "Download Beta";
export const SECONDARY_CTA_LABEL = "Request Demo";

export const siteConfig = {
  name: SITE_NAME,
  appName: APP_NAME,
  shortName: SHORT_NAME,
  creator: CREATOR,
  tagline: TAGLINE,
  description: DESCRIPTION,
  url: SITE_URL,
  email: EMAIL,
  supportEmail: SUPPORT_EMAIL,
  socials: SOCIALS,
  playstoreUrl: PLAYSTORE_URL,
  downloadApkUrl: APK_URL,
  primaryCtaLabel: PRIMARY_CTA_LABEL,
  secondaryCtaLabel: SECONDARY_CTA_LABEL,
} as const;

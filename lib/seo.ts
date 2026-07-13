import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/lib/constants";

// From brand/playstore.md.txt.
const DEFAULT_KEYWORDS = [
  "Mobile Money",
  "USSD",
  "Automation",
  "Fintech",
  "Africa",
  "Payments",
  "Agent",
];

/** Base metadata every page inherits from, set once on the root layout. */
export const defaultSeo: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

// Dark-only per brand/website.md ("Theme: Dark First") — the brand kit
// defines no light palette, so there's no light branch to declare here.
export const rootViewport: Viewport = {
  themeColor: "#0B0F0B",
};

interface CreateMetadataOptions {
  /** Page title. Flows through the root layout's "%s | MoMo Assistant" template. */
  title?: string;
  description?: string;
  /** Path this page is canonically served at, e.g. "/pricing". Defaults to "/". */
  path?: string;
}

/**
 * Every route's `export const metadata` should be built with this instead of
 * hand-writing a Metadata object, so title templating, canonical URLs, and
 * OpenGraph/Twitter fields stay consistent across the site.
 *
 * Next.js does NOT deep-merge nested `openGraph`/`twitter` objects between
 * a layout and a page — a page that sets its own `openGraph` key replaces
 * the root's entire object, dropping `images`/`siteName`/`type` unless they
 * are repeated. This spreads the root's values back in so callers only ever
 * need to think about title/description/path. Likewise, `title` is omitted
 * entirely (not set to `undefined`) when not overridden, so the root
 * layout's `title.default` renders instead of an empty `<title>`.
 */
export function createMetadata({
  title,
  description,
  path = "/",
}: CreateMetadataOptions = {}): Metadata {
  const resolvedDescription = description ?? siteConfig.description;

  return {
    ...(title ? { title } : {}),
    description: resolvedDescription,
    alternates: { canonical: path },
    openGraph: {
      ...defaultSeo.openGraph,
      ...(title ? { title } : {}),
      description: resolvedDescription,
      url: path,
    },
    twitter: {
      ...defaultSeo.twitter,
      ...(title ? { title } : {}),
      description: resolvedDescription,
    },
  };
}

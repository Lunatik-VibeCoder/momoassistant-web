import type { Metadata, Viewport } from "next";

import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getSiteText, siteConfig } from "@/lib/constants";

const OG_LOCALE: Record<AppLocale, string> = {
  en: "en_US",
  fr: "fr_FR",
};

function localizedPath(locale: AppLocale, path: string): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Base metadata every page inherits from, set on the locale root layout. */
export function createRootMetadata(locale: AppLocale): Metadata {
  const text = getSiteText(locale);
  const title = `${siteConfig.name} — ${text.tagline}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description: text.description,
    keywords: text.keywords,
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    openGraph: {
      type: "website",
      url: localizedPath(locale, "/"),
      siteName: siteConfig.name,
      title,
      description: text.description,
      locale: OG_LOCALE[locale],
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: text.description,
      images: ["/opengraph-image"],
    },
    robots: { index: true, follow: true },
  };
}

// Dark-only per brand/website.md ("Theme: Dark First") — the brand kit
// defines no light palette, so there's no light branch to declare here.
export const rootViewport: Viewport = {
  themeColor: "#0B0F0B",
};

interface CreateMetadataOptions {
  locale: AppLocale;
  /** Page title. Flows through the root layout's "%s | MoMo Assistant" template. */
  title?: string;
  description?: string;
  /** Locale-agnostic path this page is served at, e.g. "/pricing". Defaults to "/". */
  path?: string;
}

/**
 * Every route's `export const metadata` should be built with this instead of
 * hand-writing a Metadata object, so title templating, canonical URLs,
 * hreflang alternates, and OpenGraph/Twitter fields stay consistent across
 * the site.
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
  locale,
  title,
  description,
  path = "/",
}: CreateMetadataOptions): Metadata {
  const text = getSiteText(locale);
  const resolvedDescription = description ?? text.description;
  const root = createRootMetadata(locale);

  const languages = Object.fromEntries([
    ...routing.locales.map((loc) => [loc, localizedPath(loc, path)]),
    ["x-default", localizedPath(routing.defaultLocale, path)],
  ]);

  return {
    ...(title ? { title } : {}),
    description: resolvedDescription,
    alternates: {
      canonical: localizedPath(locale, path),
      languages,
    },
    openGraph: {
      ...root.openGraph,
      ...(title ? { title } : {}),
      description: resolvedDescription,
      url: localizedPath(locale, path),
    },
    twitter: {
      ...root.twitter,
      ...(title ? { title } : {}),
      description: resolvedDescription,
    },
  };
}

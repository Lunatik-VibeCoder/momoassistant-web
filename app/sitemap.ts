import type { MetadataRoute } from "next";

import { getBlogContent } from "@/content/blog";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/constants";

const STATIC_PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/features", priority: 0.8 },
  { path: "/security", priority: 0.8 },
  { path: "/how-it-works", priority: 0.8 },
  { path: "/pricing", priority: 0.8 },
  { path: "/demo", priority: 0.8 },
  { path: "/docs", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/changelog", priority: 0.5 },
  { path: "/blog", priority: 0.5 },
  { path: "/careers", priority: 0.4 },
];

function localizedUrl(locale: string, path: string): string {
  return `${siteConfig.url}/${locale}${path === "/" ? "" : path}`;
}

function languageAlternates(path: string): Record<string, string> {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, localizedUrl(locale, path)])
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = STATIC_PAGES.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority,
      alternates: { languages: languageAlternates(path) },
    }))
  );

  const blogEntries = routing.locales.flatMap((locale) =>
    getBlogContent(locale).posts.map((post) => ({
      url: localizedUrl(locale, `/blog/${post.slug}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.4,
      alternates: { languages: languageAlternates(`/blog/${post.slug}`) },
    }))
  );

  return [...staticEntries, ...blogEntries];
}

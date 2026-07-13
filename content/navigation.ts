import { BLOG_ENABLED, DOCS_ENABLED, DOWNLOAD_ENABLED } from "@/lib/features";
import type { FooterLinkGroup, NavLink } from "@/types";

// "Download" intentionally routes to /demo, not a standalone /download —
// /demo covers Download Beta + Request Demo + FAQ together, matching the
// site's target sitemap, which has no separate /download or /faq route.
export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "/features" },
  { label: "Security", href: "/security" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  ...(DOCS_ENABLED ? [{ label: "Docs", href: "/docs" }] : []),
  ...(DOWNLOAD_ENABLED ? [{ label: "Demo", href: "/demo" }] : []),
];

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Security", href: "/security" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      ...(DOCS_ENABLED ? [{ label: "Docs", href: "/docs" }] : []),
      ...(DOWNLOAD_ENABLED ? [{ label: "Demo", href: "/demo" }] : []),
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Changelog", href: "/changelog" },
      ...(BLOG_ENABLED ? [{ label: "Blog", href: "/blog" }] : []),
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

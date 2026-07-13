import { DOWNLOAD_ENABLED } from "@/lib/features";
import type { FooterLinkGroup, NavLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "/features" },
  { label: "Security", href: "/security" },
  { label: "Pricing", href: "/pricing" },
  ...(DOWNLOAD_ENABLED ? [{ label: "Download", href: "/download" }] : []),
  { label: "FAQ", href: "/faq" },
];

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Security", href: "/security" },
      { label: "Pricing", href: "/pricing" },
      ...(DOWNLOAD_ENABLED ? [{ label: "Download", href: "/download" }] : []),
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Changelog", href: "/changelog" },
      { label: "FAQ", href: "/faq" },
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

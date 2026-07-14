import type { AppLocale } from "@/i18n/routing";
import { BLOG_ENABLED, DOCS_ENABLED, DOWNLOAD_ENABLED } from "@/lib/features";
import type { FooterLinkGroup, NavLink } from "@/types";

interface NavigationText {
  navLinks: NavLink[];
  footerLinkGroups: FooterLinkGroup[];
}

// "Demo" intentionally covers Download Beta + Request Demo + FAQ together
// (see content/demo.ts) rather than separate /download or /faq routes —
// matches the brand kit's target sitemap, which has neither.
const NAVIGATION: Record<AppLocale, NavigationText> = {
  en: {
    navLinks: [
      { label: "Features", href: "/features" },
      { label: "Security", href: "/security" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      ...(DOCS_ENABLED ? [{ label: "Docs", href: "/docs" }] : []),
      ...(DOWNLOAD_ENABLED ? [{ label: "Demo", href: "/demo" }] : []),
    ],
    footerLinkGroups: [
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
          { label: "Privacy Policy", href: "/legal/privacy" },
          { label: "Terms of Service", href: "/legal/terms" },
          { label: "Cookie Policy", href: "/legal/cookies" },
          { label: "Security Statement", href: "/legal/security" },
          { label: "Status", href: "/status" },
        ],
      },
    ],
  },
  fr: {
    navLinks: [
      { label: "Fonctionnalités", href: "/features" },
      { label: "Sécurité", href: "/security" },
      { label: "Fonctionnement", href: "/how-it-works" },
      { label: "Tarifs", href: "/pricing" },
      ...(DOCS_ENABLED ? [{ label: "Docs", href: "/docs" }] : []),
      ...(DOWNLOAD_ENABLED ? [{ label: "Démo", href: "/demo" }] : []),
    ],
    footerLinkGroups: [
      {
        title: "Produit",
        links: [
          { label: "Fonctionnalités", href: "/features" },
          { label: "Sécurité", href: "/security" },
          { label: "Fonctionnement", href: "/how-it-works" },
          { label: "Tarifs", href: "/pricing" },
          ...(DOCS_ENABLED ? [{ label: "Docs", href: "/docs" }] : []),
          ...(DOWNLOAD_ENABLED ? [{ label: "Démo", href: "/demo" }] : []),
        ],
      },
      {
        title: "Entreprise",
        links: [
          { label: "À propos", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Journal des mises à jour", href: "/changelog" },
          ...(BLOG_ENABLED ? [{ label: "Blog", href: "/blog" }] : []),
          { label: "Carrières", href: "/careers" },
        ],
      },
      {
        title: "Légal",
        links: [
          { label: "Politique de confidentialité", href: "/legal/privacy" },
          { label: "Conditions d'utilisation", href: "/legal/terms" },
          { label: "Politique de cookies", href: "/legal/cookies" },
          { label: "Déclaration de sécurité", href: "/legal/security" },
          { label: "Statut", href: "/status" },
        ],
      },
    ],
  },
};

export function getNavLinks(locale: AppLocale): NavLink[] {
  return NAVIGATION[locale].navLinks;
}

export function getFooterLinkGroups(locale: AppLocale): FooterLinkGroup[] {
  return NAVIGATION[locale].footerLinkGroups;
}

import type { AppLocale } from "@/i18n/routing";
import { BLOG_ENABLED, DOCS_ENABLED, DOWNLOAD_ENABLED } from "@/lib/features";
import type { FooterLinkGroup, NavLink } from "@/types";

interface NavigationText {
  navLinks: NavLink[];
  // WS-005M.1 -- Documentation/Blog/Changelog grouped under one "Resources"
  // menu instead of living as separate flat top-level entries (Blog/
  // Changelog previously only existed in the footer's "Company" group, not
  // the header nav at all). Organizes existing content, adds no new pages.
  resourcesLabel: string;
  resourcesLinks: NavLink[];
  loginLabel: string;
  getStartedLabel: string;
  dashboardLabel: string;
  footerLinkGroups: FooterLinkGroup[];
}

// MARKETING-UPDATE-02: /download is now the single official entry point
// for the APK (see content/download.ts); "Demo" (content/demo.ts) still
// separately covers Request Demo + FAQ. This supersedes the brand kit's
// original target sitemap, which had neither a separate /download nor
// /faq route.
const NAVIGATION: Record<AppLocale, NavigationText> = {
  en: {
    navLinks: [
      { label: "Features", href: "/features" },
      { label: "Security", href: "/security" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      ...(DOWNLOAD_ENABLED ? [{ label: "Demo", href: "/demo" }] : []),
      ...(DOWNLOAD_ENABLED ? [{ label: "Download", href: "/download" }] : []),
    ],
    resourcesLabel: "Resources",
    resourcesLinks: [
      ...(DOCS_ENABLED ? [{ label: "Documentation", href: "/docs" }] : []),
      ...(BLOG_ENABLED ? [{ label: "Blog", href: "/blog" }] : []),
      { label: "Changelog", href: "/changelog" },
    ],
    loginLabel: "Login",
    getStartedLabel: "Get Started",
    dashboardLabel: "Dashboard",
    footerLinkGroups: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "/features" },
          { label: "Why MoMo Assistant", href: "/why" },
          { label: "Who It's For", href: "/who-its-for" },
          { label: "Security", href: "/security" },
          { label: "Enterprise", href: "/enterprise" },
          { label: "How It Works", href: "/how-it-works" },
          { label: "Pricing", href: "/pricing" },
          { label: "Workspace Access", href: "/workspace-access" },
          ...(DOCS_ENABLED ? [{ label: "Docs", href: "/docs" }] : []),
          ...(DOWNLOAD_ENABLED ? [{ label: "Demo", href: "/demo" }] : []),
          ...(DOWNLOAD_ENABLED ? [{ label: "Download", href: "/download" }] : []),
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Changelog", href: "/changelog" },
          { label: "Roadmap", href: "/roadmap" },
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
      { label: "Enterprise", href: "/enterprise" },
      { label: "Fonctionnement", href: "/how-it-works" },
      { label: "Tarifs", href: "/pricing" },
      ...(DOWNLOAD_ENABLED ? [{ label: "Démo", href: "/demo" }] : []),
      ...(DOWNLOAD_ENABLED ? [{ label: "Télécharger", href: "/download" }] : []),
    ],
    resourcesLabel: "Ressources",
    resourcesLinks: [
      ...(DOCS_ENABLED ? [{ label: "Documentation", href: "/docs" }] : []),
      ...(BLOG_ENABLED ? [{ label: "Blog", href: "/blog" }] : []),
      { label: "Journal des mises à jour", href: "/changelog" },
    ],
    loginLabel: "Connexion",
    getStartedLabel: "Commencer",
    dashboardLabel: "Tableau de bord",
    footerLinkGroups: [
      {
        title: "Produit",
        links: [
          { label: "Fonctionnalités", href: "/features" },
          { label: "Pourquoi MoMo Assistant", href: "/why" },
          { label: "Pour qui", href: "/who-its-for" },
          { label: "Sécurité", href: "/security" },
          { label: "Enterprise", href: "/enterprise" },
          { label: "Fonctionnement", href: "/how-it-works" },
          { label: "Tarifs", href: "/pricing" },
          { label: "Workspace Access", href: "/workspace-access" },
          ...(DOCS_ENABLED ? [{ label: "Docs", href: "/docs" }] : []),
          ...(DOWNLOAD_ENABLED ? [{ label: "Démo", href: "/demo" }] : []),
          ...(DOWNLOAD_ENABLED ? [{ label: "Télécharger", href: "/download" }] : []),
        ],
      },
      {
        title: "Entreprise",
        links: [
          { label: "À propos", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Journal des mises à jour", href: "/changelog" },
          { label: "Roadmap", href: "/roadmap" },
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

export function getResourcesMenu(locale: AppLocale): { label: string; links: NavLink[] } {
  return { label: NAVIGATION[locale].resourcesLabel, links: NAVIGATION[locale].resourcesLinks };
}

export function getAuthNavText(
  locale: AppLocale,
): { loginLabel: string; getStartedLabel: string; dashboardLabel: string } {
  const { loginLabel, getStartedLabel, dashboardLabel } = NAVIGATION[locale];
  return { loginLabel, getStartedLabel, dashboardLabel };
}

export function getFooterLinkGroups(locale: AppLocale): FooterLinkGroup[] {
  return NAVIGATION[locale].footerLinkGroups;
}

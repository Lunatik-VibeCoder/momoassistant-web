import type { AppLocale } from "@/i18n/routing";
import { BLOG_ENABLED, DOCS_ENABLED } from "@/lib/features";
import type { FooterLinkGroup, NavLink } from "@/types";

interface NavigationText {
  // WS-006N -- header nav collapsed from 8 flat top-level links to two
  // grouped dropdowns (Product, Resources) plus Pricing folded into
  // Product; matches the density review that flagged the old flat list as
  // reading like a "catalogue site" rather than a premium SaaS nav
  // (Stripe/Vercel/Linear-style: few top-level items, clear grouping).
  productLabel: string;
  productLinks: NavLink[];
  resourcesLabel: string;
  resourcesLinks: NavLink[];
  loginLabel: string;
  getStartedLabel: string;
  dashboardLabel: string;
  footerLinkGroups: FooterLinkGroup[];
}

// WS-006N -- How It Works, Demo, and Download are deliberately no longer
// header/footer nav items. Pages stay live, reachable from within their
// natural context instead of the header: How It Works folds into the
// Features page, Demo folds into the Get Started journey, and Download is
// reached from the Hero CTA, the authenticated Customer Hub, Pricing, and
// the footer's Product group -- never a standalone primary nav item.
const NAVIGATION: Record<AppLocale, NavigationText> = {
  en: {
    productLabel: "Product",
    productLinks: [
      { label: "Features", href: "/features" },
      { label: "Security", href: "/security" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Pricing", href: "/pricing" },
    ],
    resourcesLabel: "Resources",
    resourcesLinks: [
      ...(DOCS_ENABLED ? [{ label: "Documentation", href: "/docs" }] : []),
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
      ...(BLOG_ENABLED ? [{ label: "Blog", href: "/blog" }] : []),
    ],
    loginLabel: "Login",
    getStartedLabel: "Get Started",
    dashboardLabel: "Dashboard",
    footerLinkGroups: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "/features" },
          { label: "Pricing", href: "/pricing" },
          { label: "Security", href: "/security" },
          { label: "Enterprise", href: "/enterprise" },
        ],
      },
      {
        title: "Resources",
        links: [
          ...(DOCS_ENABLED ? [{ label: "Documentation", href: "/docs" }] : []),
          { label: "Changelog", href: "/changelog" },
          { label: "Roadmap", href: "/roadmap" },
          { label: "Status", href: "/status" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Careers", href: "/careers" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/legal/privacy" },
          { label: "Terms of Service", href: "/legal/terms" },
          { label: "Cookie Policy", href: "/legal/cookies" },
        ],
      },
    ],
  },
  fr: {
    productLabel: "Produit",
    productLinks: [
      { label: "Fonctionnalités", href: "/features" },
      { label: "Sécurité", href: "/security" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Tarifs", href: "/pricing" },
    ],
    resourcesLabel: "Ressources",
    resourcesLinks: [
      ...(DOCS_ENABLED ? [{ label: "Documentation", href: "/docs" }] : []),
      { label: "Journal des mises à jour", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
      ...(BLOG_ENABLED ? [{ label: "Blog", href: "/blog" }] : []),
    ],
    loginLabel: "Connexion",
    getStartedLabel: "Commencer",
    dashboardLabel: "Tableau de bord",
    footerLinkGroups: [
      {
        title: "Produit",
        links: [
          { label: "Fonctionnalités", href: "/features" },
          { label: "Tarifs", href: "/pricing" },
          { label: "Sécurité", href: "/security" },
          { label: "Enterprise", href: "/enterprise" },
        ],
      },
      {
        title: "Ressources",
        links: [
          ...(DOCS_ENABLED ? [{ label: "Documentation", href: "/docs" }] : []),
          { label: "Journal des mises à jour", href: "/changelog" },
          { label: "Roadmap", href: "/roadmap" },
          { label: "Statut", href: "/status" },
        ],
      },
      {
        title: "Entreprise",
        links: [
          { label: "À propos", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Carrières", href: "/careers" },
        ],
      },
      {
        title: "Légal",
        links: [
          { label: "Politique de confidentialité", href: "/legal/privacy" },
          { label: "Conditions d'utilisation", href: "/legal/terms" },
          { label: "Politique de cookies", href: "/legal/cookies" },
        ],
      },
    ],
  },
};

export function getProductMenu(locale: AppLocale): { label: string; links: NavLink[] } {
  return { label: NAVIGATION[locale].productLabel, links: NAVIGATION[locale].productLinks };
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

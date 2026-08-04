import type { AppLocale } from "@/i18n/routing";

export interface HubNavItem {
  href: string;
  label: string;
}

export interface HubNavContent {
  items: HubNavItem[];
}

// WS-006 -- sidebar order is operational before commercial/account
// (Dashboard/Organization/Members/Health, then License/Subscription/
// Billing, then Settings). Downloads (WS-008) and Support (WS-007) are
// deliberately not here -- both are separate Projects' own scope.
export function getHubNavContent(locale: AppLocale): HubNavContent {
  if (locale === "fr") {
    return {
      items: [
        { href: "/app", label: "Tableau de bord" },
        { href: "/organization", label: "Organisation" },
        { href: "/members", label: "Membres" },
        { href: "/health", label: "État de santé" },
        { href: "/license", label: "Licence" },
        { href: "/subscription", label: "Abonnement" },
        { href: "/billing", label: "Facturation" },
        { href: "/settings", label: "Paramètres" },
      ],
    };
  }
  return {
    items: [
      { href: "/app", label: "Dashboard" },
      { href: "/organization", label: "Organization" },
      { href: "/members", label: "Members" },
      { href: "/health", label: "Health" },
      { href: "/license", label: "License" },
      { href: "/subscription", label: "Subscription" },
      { href: "/billing", label: "Billing" },
      { href: "/settings", label: "Settings" },
    ],
  };
}

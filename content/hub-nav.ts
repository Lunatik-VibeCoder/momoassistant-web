import type { AppLocale } from "@/i18n/routing";

export interface HubNavItem {
  href: string;
  label: string;
}

export interface HubNavContent {
  items: HubNavItem[];
}

// SETTINGS-NAV-1 (2026-09-04) -- Health/License/Subscription/Billing used
// to be flat top-level items here, at the same visual level as the
// operational destinations (Dashboard/Organization/Members) -- explicit
// user decision to separate "operational" from "configuration/status":
// those 4 pages still exist unchanged, just reached via Settings' own
// grouped hub (see settings/page.tsx) instead of the primary nav. Nothing
// deleted, no route removed -- isRouteImplemented (lib/routes.ts) still
// lists all 4. Organization/Members stay here at root, deliberately --
// explicit decision that they're operational, not configuration.
export function getHubNavContent(locale: AppLocale): HubNavContent {
  if (locale === "fr") {
    return {
      items: [
        { href: "/", label: "Tableau de bord" },
        { href: "/reports", label: "Rapports" },
        { href: "/organization", label: "Organisation" },
        { href: "/members", label: "Membres" },
        { href: "/settings", label: "Paramètres" },
      ],
    };
  }
  return {
    items: [
      { href: "/", label: "Dashboard" },
      { href: "/reports", label: "Reports" },
      { href: "/organization", label: "Organization" },
      { href: "/members", label: "Members" },
      { href: "/settings", label: "Settings" },
    ],
  };
}

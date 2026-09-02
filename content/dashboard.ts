import type { AppLocale } from "@/i18n/routing";

export interface DashboardContent {
  welcomeTitle: (displayName: string) => string;
  organizationLabel: string;
  downloadCtaLabel: string;
  logoutLabel: string;
  // WS-009 (Dashboard / Live Operations, CONTRACT-V1) -- "how is my
  // operation now", never historical/trend copy.
  recentTransactions: {
    title: string;
    empty: string;
    stationUnknown: string;
    // transactions:read is explicitly not granted to AGENT
    // (WS-009-RBAC-DECISION) -- this is expected for that role, not an
    // error, and must read differently than "no transactions yet".
    restricted: string;
  };
  devices: {
    title: string;
    empty: string;
    stale: string;
    online: string;
    stationUnknown: string;
    lastHeartbeat: (value: string) => string;
    neverSeen: string;
  };
}

export function getDashboardContent(locale: AppLocale): DashboardContent {
  if (locale === "fr") {
    return {
      welcomeTitle: (displayName) => `Bienvenue, ${displayName}`,
      organizationLabel: "Organization",
      downloadCtaLabel: "Télécharger la bêta",
      logoutLabel: "Se déconnecter",
      recentTransactions: {
        title: "Transactions récentes",
        empty: "Aucune transaction pour le moment.",
        stationUnknown: "Station inconnue",
        restricted: "Votre rôle ne permet pas de consulter les transactions.",
      },
      devices: {
        title: "Appareils",
        empty: "Aucun appareil enregistré.",
        stale: "Inactif",
        online: "Actif",
        stationUnknown: "Non assigné",
        lastHeartbeat: (value) => `Dernier signal : ${value}`,
        neverSeen: "Jamais connecté",
      },
    };
  }
  return {
    welcomeTitle: (displayName) => `Welcome, ${displayName}`,
    organizationLabel: "Organization",
    downloadCtaLabel: "Download the beta",
    logoutLabel: "Log out",
    recentTransactions: {
      title: "Recent Transactions",
      empty: "No transactions yet.",
      stationUnknown: "Unknown station",
      restricted: "Your role doesn't have access to transactions.",
    },
    devices: {
      title: "Devices",
      empty: "No devices registered yet.",
      stale: "Stale",
      online: "Active",
      stationUnknown: "Unassigned",
      lastHeartbeat: (value) => `Last seen: ${value}`,
      neverSeen: "Never seen",
    },
  };
}

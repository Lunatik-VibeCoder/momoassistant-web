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
    // POST-WS009-REMEDIATION-01C-G-WEB -- per-SIM balance display, one entry
    // per communicationProfiles[] item.
    sim: {
      label: (logicalSlot: number) => string;
      noProfiles: string;
      noBalance: string;
      verifiedAt: (value: string) => string;
      verifiedAtStale: (value: string) => string;
      estimated: string;
      unknownConfidence: string;
    };
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
        sim: {
          label: (logicalSlot) => `SIM ${logicalSlot + 1}`,
          noProfiles: "Aucune SIM configurée",
          noBalance: "Solde non disponible",
          verifiedAt: (value) => `Vérifié à ${value}`,
          verifiedAtStale: (value) => `Vérifié à ${value} (ancien)`,
          estimated: "Solde estimé",
          unknownConfidence: "Solde non vérifié",
        },
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
      sim: {
        label: (logicalSlot) => `SIM ${logicalSlot + 1}`,
        noProfiles: "No SIM configured",
        noBalance: "Balance unavailable",
        verifiedAt: (value) => `Verified at ${value}`,
        verifiedAtStale: (value) => `Verified at ${value} (stale)`,
        estimated: "Estimated balance",
        unknownConfidence: "Unverified balance",
      },
    },
  };
}

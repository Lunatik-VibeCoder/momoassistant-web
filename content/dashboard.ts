import type { AppLocale } from "@/i18n/routing";

export interface DashboardContent {
  // WS-010-DASHBOARD-V2-IMPL-01 -- was `welcomeTitle`, a static "Welcome, X"
  // Card at the top of the page (WS-005's original scope). The V2 Discovery
  // audit identified this as the page's core information-hierarchy problem:
  // an account-utility card outranking operational data. Replaced by a
  // minimal header row -- `greeting` is now time-of-day aware, computed from
  // the server's local hour (no new dependency, same `Date` already used by
  // `formatDateTime` elsewhere in this repo).
  greeting: (hour: number, displayName: string) => string;
  organizationLabel: string;
  downloadCtaLabel: string;
  logoutLabel: string;
  // WS-010-DASHBOARD-V2-IMPL-01 -- the merged Device + SIM + Balance section,
  // now the page's primary section (was 3 stacked cards under a Welcome
  // Card; is now "Operational Health" first, sized and positioned as the
  // page's anchor). The Discovery audit explicitly rejected a device-count
  // "KPI" as the headline -- `summary` is a short explanatory line above the
  // real device list, not a standalone metric card.
  operationalHealth: {
    title: string;
    empty: string;
    // e.g. "3 Devices · 2 Active"
    summary: (total: number, active: number) => string;
    // e.g. "1 Attention" -- reuses /health's healthy/needsAttention/warning
    // vocabulary (content/health.ts), never a new severity word. Omitted
    // entirely when attentionCount is 0 (rendered conditionally by the
    // component, not encoded here).
    attention: (count: number) => string;
    stale: string;
    online: string;
    stationUnknown: string;
    lastHeartbeat: (value: string) => string;
    neverSeen: string;
    // POST-WS009-REMEDIATION-01C-G-WEB -- per-SIM balance display, one entry
    // per communicationProfiles[] item. Unchanged by WS-010 (layout/UX only).
    sim: {
      label: (logicalSlot: number) => string;
      noProfiles: string;
      noBalance: string;
      verifiedAt: (value: string) => string;
      verifiedAtStale: (value: string) => string;
      estimated: string;
      unknownConfidence: string;
      // WEB-TX-PRESENTATION-004-A -- sibling of the balance keys above, same
      // shape, rendered as a second line under the balance line (never
      // merged into one string -- two distinct wallets on the same SIM).
      noCommission: string;
      commissionVerifiedAt: (value: string) => string;
      commissionVerifiedAtStale: (value: string) => string;
      commissionEstimated: string;
      commissionUnknownConfidence: string;
    };
  };
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
}

// WS-010-DASHBOARD-V2-IMPL-01 -- pure, no new dependency (a date library
// would be overkill for 3 buckets). `hour` is the server's local hour
// (0-23), passed in by the page rather than computed here so this function
// stays trivially testable/pure.
function greetingWord(locale: AppLocale, hour: number): string {
  if (locale === "fr") {
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  }
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function getDashboardContent(locale: AppLocale): DashboardContent {
  if (locale === "fr") {
    return {
      greeting: (hour, displayName) => `${greetingWord(locale, hour)}, ${displayName}`,
      organizationLabel: "Organization",
      downloadCtaLabel: "Télécharger la bêta",
      logoutLabel: "Se déconnecter",
      operationalHealth: {
        title: "État opérationnel",
        empty: "Aucun appareil enregistré.",
        summary: (total, active) => `${total} appareil${total > 1 ? "s" : ""} · ${active} actif${active > 1 ? "s" : ""}`,
        attention: (count) => `${count} à surveiller`,
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
          noCommission: "Commission non disponible",
          commissionVerifiedAt: (value) => `Commission vérifiée à ${value}`,
          commissionVerifiedAtStale: (value) => `Commission vérifiée à ${value} (ancienne)`,
          commissionEstimated: "Commission estimée",
          commissionUnknownConfidence: "Commission non vérifiée",
        },
      },
      recentTransactions: {
        title: "Activité récente",
        empty: "Aucune transaction pour le moment.",
        stationUnknown: "Station inconnue",
        restricted: "Votre rôle ne permet pas de consulter les transactions.",
      },
    };
  }
  return {
    greeting: (hour, displayName) => `${greetingWord(locale, hour)}, ${displayName}`,
    organizationLabel: "Organization",
    downloadCtaLabel: "Download the beta",
    logoutLabel: "Log out",
    operationalHealth: {
      title: "Operational Health",
      empty: "No devices registered yet.",
      summary: (total, active) => `${total} device${total === 1 ? "" : "s"} · ${active} active`,
      attention: (count) => `${count} attention`,
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
        noCommission: "Commission unavailable",
        commissionVerifiedAt: (value) => `Commission verified at ${value}`,
        commissionVerifiedAtStale: (value) => `Commission verified at ${value} (stale)`,
        commissionEstimated: "Estimated commission",
        commissionUnknownConfidence: "Unverified commission",
      },
    },
    recentTransactions: {
      title: "Recent Activity",
      empty: "No transactions yet.",
      stationUnknown: "Unknown station",
      restricted: "Your role doesn't have access to transactions.",
    },
  };
}

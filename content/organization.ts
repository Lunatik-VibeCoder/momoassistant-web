import type { AppLocale } from "@/i18n/routing";

export interface OrganizationContent {
  title: string;
  fields: {
    name: string;
    slug: string;
    code: string;
    status: string;
    created: string;
    plan: string;
    members: string;
    stations: string;
  };
  ownerBadge: string;
  noLicense: string;
  // STATION-TREE-PHASE-A -- real Organization -> Workspace -> Station ->
  // Device tree below the profile card (which keeps its existing aggregate
  // stationCount above, unchanged). device.* strings intentionally mirror
  // DashboardContent["operationalHealth"] word-for-word (same concept,
  // same backend fields: isStale/lastHeartbeatAt) rather than inventing
  // slightly different phrasing for the same states.
  stationTree: {
    title: string;
    emptyWorkspaces: string;
    emptyStations: (workspaceName: string) => string;
    emptyDevices: string;
    unassignedTitle: string;
    device: {
      stale: string;
      online: string;
      lastHeartbeat: (value: string) => string;
      neverSeen: string;
    };
  };
}

export function getOrganizationContent(locale: AppLocale): OrganizationContent {
  if (locale === "fr") {
    return {
      title: "Organisation",
      fields: {
        name: "Nom",
        slug: "Identifiant",
        code: "Code",
        status: "Statut",
        created: "Créée le",
        plan: "Forfait",
        members: "Membres",
        stations: "Stations",
      },
      ownerBadge: "Propriétaire",
      noLicense: "Aucune licence pour le moment",
      stationTree: {
        title: "Stations",
        emptyWorkspaces: "Aucun espace de travail pour le moment.",
        emptyStations: (workspaceName) => `Aucune station dans ${workspaceName}.`,
        emptyDevices: "Aucun appareil rattaché à cette station.",
        unassignedTitle: "Appareils sans station",
        device: {
          stale: "Inactif",
          online: "Actif",
          lastHeartbeat: (value) => `Dernier signal : ${value}`,
          neverSeen: "Jamais connecté",
        },
      },
    };
  }
  return {
    title: "Organization",
    fields: {
      name: "Name",
      slug: "Slug",
      code: "Code",
      status: "Status",
      created: "Created",
      plan: "Plan",
      members: "Members",
      stations: "Stations",
    },
    ownerBadge: "Owner",
    noLicense: "No license yet",
    stationTree: {
      title: "Stations",
      emptyWorkspaces: "No workspaces yet.",
      emptyStations: (workspaceName) => `No stations in ${workspaceName}.`,
      emptyDevices: "No devices attached to this station.",
      unassignedTitle: "Devices without a station",
      device: {
        stale: "Stale",
        online: "Active",
        lastHeartbeat: (value) => `Last seen: ${value}`,
        neverSeen: "Never seen",
      },
    },
  };
}

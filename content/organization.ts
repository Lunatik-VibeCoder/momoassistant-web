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
    // Phase B (Station Management) -- mirrors content/members.ts's
    // invite*/remove* field shape exactly (same Sheet+useActionState /
    // confirm+useTransition patterns reused for these).
    createWorkspaceButton: string;
    createWorkspaceSheetTitle: string;
    createStationButton: string;
    createStationSheetTitle: string;
    nameLabel: string;
    createSubmitLabel: string;
    createSuccess: string;
    createError: string;
    movePlaceholder: string;
    moveSuccess: string;
    moveError: string;
    unassignButton: string;
    unassignConfirm: string;
    unassignSuccess: string;
    unassignError: string;
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
        createWorkspaceButton: "+ Workspace",
        createWorkspaceSheetTitle: "Créer un espace de travail",
        createStationButton: "+ Station",
        createStationSheetTitle: "Créer une station",
        nameLabel: "Nom",
        createSubmitLabel: "Créer",
        createSuccess: "Créé avec succès",
        createError: "Impossible de créer",
        movePlaceholder: "Déplacer vers…",
        moveSuccess: "Appareil déplacé",
        moveError: "Impossible de déplacer l'appareil",
        unassignButton: "Désassigner",
        unassignConfirm: "Retirer cet appareil de sa station ? Il restera rattaché à l'organisation.",
        unassignSuccess: "Appareil désassigné",
        unassignError: "Impossible de désassigner l'appareil",
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
      createWorkspaceButton: "+ Workspace",
      createWorkspaceSheetTitle: "Create a workspace",
      createStationButton: "+ Station",
      createStationSheetTitle: "Create a station",
      nameLabel: "Name",
      createSubmitLabel: "Create",
      createSuccess: "Created successfully",
      createError: "Could not create",
      movePlaceholder: "Move to…",
      moveSuccess: "Device moved",
      moveError: "Could not move the device",
      unassignButton: "Unassign",
      unassignConfirm: "Remove this device from its station? It will stay part of the organization.",
      unassignSuccess: "Device unassigned",
      unassignError: "Could not unassign the device",
    },
  };
}

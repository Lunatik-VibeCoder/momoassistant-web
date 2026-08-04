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
  };
}

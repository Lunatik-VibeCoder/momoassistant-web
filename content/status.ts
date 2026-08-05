import type { AppLocale } from "@/i18n/routing";
import type { StatusService } from "@/types";

export interface StatusContent {
  hero: { eyebrow: string; title: string; description: string };
  overallStatusLabel: string;
  statusLabels: Record<StatusService["status"], string>;
  services: StatusService[];
  note: string;
}

function build(locale: AppLocale): StatusContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Statut",
        title: "Statut du service",
        description:
          "L'état actuel du site web MoMo Assistant et de la distribution de la bêta.",
      },
      overallStatusLabel: "Tous les systèmes sont opérationnels",
      statusLabels: {
        operational: "Opérationnel",
        beta: "Bêta",
        planned: "Prévu",
      },
      services: [
        {
          name: "Site web (momoassistant.com)",
          status: "operational",
          description: "Le site web marketing et la documentation.",
        },
        {
          name: "Distribution de la bêta",
          status: "operational",
          description: "Téléchargement de l'application MoMo Assistant en bêta publique.",
        },
        {
          name: "Support par e-mail",
          status: "operational",
          description: "Ventes, support et demandes générales via support@momoassistant.com.",
        },
        {
          name: "Plateforme SaaS (backend multi-tenant)",
          status: "planned",
          description:
            "Pas encore lancée — prévue avec la version v2.0.0 de la feuille de route.",
        },
      ],
      note: "Cette page est tenue à jour manuellement — nous n'avons pas encore de surveillance automatisée en place. Elle sera remplacée par un tableau de bord en temps réel à mesure que la plateforme SaaS se déploie.",
    };
  }

  return {
    hero: {
      eyebrow: "Status",
      title: "Service status",
      description:
        "The current status of the MoMo Assistant website and beta distribution.",
    },
    overallStatusLabel: "All systems operational",
    statusLabels: {
      operational: "Operational",
      beta: "Beta",
      planned: "Planned",
    },
    services: [
      {
        name: "Website (momoassistant.com)",
        status: "operational",
        description: "The marketing website and documentation.",
      },
      {
        name: "Beta distribution",
        status: "operational",
        description: "Downloading the MoMo Assistant app in public beta.",
      },
      {
        name: "Email support",
        status: "operational",
        description: "Sales, support, and general inquiries via support@momoassistant.com.",
      },
      {
        name: "SaaS platform (multi-tenant backend)",
        status: "planned",
        description: "Not yet launched — planned for the v2.0.0 roadmap milestone.",
      },
    ],
    note: "This page is maintained manually — we don't have automated monitoring in place yet. It'll be replaced with a real-time dashboard as the SaaS platform rolls out.",
  };
}

const CONTENT: Record<AppLocale, StatusContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getStatusContent(locale: AppLocale): StatusContent {
  return CONTENT[locale];
}

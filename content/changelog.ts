import type { AppLocale } from "@/i18n/routing";
import type { RoadmapMilestone } from "@/types";

export interface ChangelogContent {
  hero: { eyebrow: string; title: string; description: string };
  roadmapSrHeading: string;
  roadmap: RoadmapMilestone[];
}

// High-level milestones only — internal sprint/build detail stays in
// engineering docs, not on the public site.
function build(locale: AppLocale): ChangelogContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Changelog",
        title: "Mises à jour produit et prochaines étapes",
        description:
          "Où en est MoMo Assistant aujourd'hui, et la feuille de route vers la disponibilité générale.",
      },
      roadmapSrHeading: "Feuille de route",
      roadmap: [
        {
          version: "v0.9.0",
          label: "Cœur fonctionnel",
          status: "shipped",
          description:
            "Le moteur d'automatisation USSD (Runtime V2), la réconciliation des transactions et le modèle de sécurité — confiance des appareils, SIM Trust et coffre-fort PIN — ont atteint leur stabilité.",
        },
        {
          version: "v0.9.5",
          label: "Bêta privée",
          status: "in-progress",
          description:
            "Déploiement d'une bêta fermée auprès d'un groupe restreint de stations avant la disponibilité générale.",
        },
        {
          version: "v1.0.0",
          label: "Version publique stable",
          status: "planned",
          description:
            "Disponibilité générale — la période d'inscription à la bêta ouverte se termine, MoMo Assistant devient accessible à toutes les stations.",
        },
        {
          version: "v1.1.0",
          label: "Outils agent & UX",
          status: "planned",
          description:
            "Calculatrice professionnelle, compteur de liquidités et autres outils du quotidien conçus pour le flux de travail de l'agent, ainsi qu'un travail plus large sur l'expérience utilisateur.",
        },
        {
          version: "v2.0.0",
          label: "Plateforme SaaS",
          status: "planned",
          description:
            "Backend multi-tenant, authentification et gestion des abonnements — la fondation des offres Business et Enterprise à grande échelle.",
        },
      ],
    };
  }

  return {
    hero: {
      eyebrow: "Changelog",
      title: "Product updates and what's next",
      description:
        "Where MoMo Assistant is today, and the roadmap toward general availability.",
    },
    roadmapSrHeading: "Roadmap",
    roadmap: [
      {
        version: "v0.9.0",
        label: "Core Complete",
        status: "shipped",
        description:
          "The USSD automation engine (Runtime V2), transaction reconciliation, and the security model — Device Trust, SIM Trust, and the PIN Vault — reached stability.",
      },
      {
        version: "v0.9.5",
        label: "Private Beta",
        status: "in-progress",
        description:
          "Closed beta rolling out to a limited group of stations ahead of general availability.",
      },
      {
        version: "v1.0.0",
        label: "Public Stable",
        status: "planned",
        description:
          "General availability — open beta enrollment closes, MoMo Assistant becomes available to every station.",
      },
      {
        version: "v1.1.0",
        label: "Agent Tools & UX",
        status: "planned",
        description:
          "Professional calculator, cash counter, and other day-to-day tools built for the agent workflow, alongside broader UX polish.",
      },
      {
        version: "v2.0.0",
        label: "SaaS Platform",
        status: "planned",
        description:
          "Multi-tenant backend, authentication, and subscription management — the foundation for Business and Enterprise plans at scale.",
      },
    ],
  };
}

const CONTENT: Record<AppLocale, ChangelogContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getChangelogContent(locale: AppLocale): ChangelogContent {
  return CONTENT[locale];
}

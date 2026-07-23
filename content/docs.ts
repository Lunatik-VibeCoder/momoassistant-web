import { BookOpen, Compass, Layers, Rocket } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import type { IconListItem, NavLink } from "@/types";

export interface DocsContent {
  hero: { eyebrow: string; title: string; description: string };
  categoriesSrHeading: string;
  categories: (IconListItem & NavLink)[];
}

function build(locale: AppLocale): DocsContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Docs",
        title: "Documentation",
        description:
          "Documentation de référence pour configurer votre organisation, comprendre l'architecture et intégrer MoMo Assistant. Le centre de documentation complet est encore en construction.",
      },
      categoriesSrHeading: "Catégories de documentation",
      categories: [
        {
          icon: Rocket,
          title: "Guides",
          description:
            "Intégrer votre organisation, enregistrer des appareils et des SIM, et exécuter votre première transaction automatisée.",
          label: "Guides",
          href: "/docs/guides",
        },
        {
          icon: Layers,
          title: "Architecture",
          description:
            "Comment Organisations, Stations, Device Trust et Runtime V2 s'assemblent — le même modèle que sur la page Comment ça marche, avec plus de profondeur technique.",
          label: "Architecture",
          href: "/docs/architecture",
        },
        {
          icon: Compass,
          title: "Tutoriels",
          description:
            "Guides pas à pas pour les configurations courantes : stations multi-SIM, restauration d'appareil et configuration des politiques du moteur d'exécution.",
          label: "Tutoriels",
          href: "/docs/tutorials",
        },
        {
          icon: BookOpen,
          title: "API",
          description:
            "Référence pour intégrer MoMo Assistant de façon programmatique. Publiée en même temps que le lancement de la plateforme SaaS.",
          label: "API",
          href: "/docs/api",
        },
      ],
    };
  }

  return {
    hero: {
      eyebrow: "Docs",
      title: "Documentation",
      description:
        "Reference material for setting up your organization, understanding the architecture, and integrating with MoMo Assistant. The full documentation center is still being built out.",
    },
    categoriesSrHeading: "Documentation categories",
    categories: [
      {
        icon: Rocket,
        title: "Guides",
        description:
          "Onboarding your organization, registering devices and SIMs, and running your first automated transaction.",
        label: "Guides",
        href: "/docs/guides",
      },
      {
        icon: Layers,
        title: "Architecture",
        description:
          "How Organizations, Stations, Device Trust, and Runtime V2 fit together — the same model covered on the How It Works page, in more technical depth.",
        label: "Architecture",
        href: "/docs/architecture",
      },
      {
        icon: Compass,
        title: "Tutorials",
        description:
          "Step-by-step walkthroughs for common setups: multi-SIM stations, device restoration, and configuring runtime policies.",
        label: "Tutorials",
        href: "/docs/tutorials",
      },
      {
        icon: BookOpen,
        title: "API",
        description:
          "Reference for integrating with MoMo Assistant programmatically. Published alongside the SaaS platform release.",
        label: "API",
        href: "/docs/api",
      },
    ],
  };
}

const CONTENT: Record<AppLocale, DocsContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getDocsContent(locale: AppLocale): DocsContent {
  return CONTENT[locale];
}

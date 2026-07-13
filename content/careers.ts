import { Globe2, MessageSquareHeart, Rocket, Timer } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import type { WhyPoint } from "@/types";

export interface CareersContent {
  hero: { eyebrow: string; title: string; description: string };
  cultureHeading: string;
  culture: WhyPoint[];
  benefitsHeading: string;
  benefits: WhyPoint[];
  openPositions: {
    heading: string;
    emptyTitle: string;
    emptyDescription: string;
    ctaLabel: string;
    mailSubject: string;
  };
}

function build(locale: AppLocale): CareersContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Carrières",
        title: "Aidez à construire le système d'exploitation des agents Mobile Money",
        description:
          "MoMo Assistant en est à ses débuts — petite équipe, vrais utilisateurs, encore beaucoup à construire. Voici à quoi ressemble le travail ici.",
      },
      cultureHeading: "Comment nous travaillons",
      culture: [
        {
          icon: Rocket,
          title: "Petite équipe, impact réel",
          description:
            "Ce que vous livrez atteint de vraies stations traitant de vraies transactions — pas un backlog qui attend qu'une équipe plus grande le priorise.",
        },
        {
          icon: Globe2,
          title: "Conçu pour la réalité africaine",
          description:
            "Aucun pays ni réseau codé en dur, pensé pour le hors-ligne par défaut — le produit est conçu autour des conditions réelles d'exploitation, pas d'hypothèses.",
        },
        {
          icon: MessageSquareHeart,
          title: "Confiant, posé, sans jargon",
          description:
            "La même voix avec laquelle nous écrivons le produit est celle avec laquelle nous travaillons en interne — directe, en langage clair, sans remplissage corporate.",
        },
      ],
      benefitsHeading: "À quoi ressemble le travail ici",
      benefits: [
        {
          icon: Timer,
          title: "Flexible, à distance en priorité",
          description:
            "Travaillez d'où vous êtes le plus efficace. Ce qui compte pour nous, c'est le travail, pas les heures comptées.",
        },
        {
          icon: Rocket,
          title: "Responsabilité sur votre périmètre",
          description:
            "Petite équipe signifie un périmètre réel — vous serez responsable de résultats, pas seulement de tickets.",
        },
      ],
      openPositions: {
        heading: "Postes ouverts",
        emptyTitle: "Aucun poste ouvert pour le moment",
        emptyDescription:
          "Nous ne recrutons pas activement, mais si vous pensez correspondre à la direction que prend MoMo Assistant, contactez-nous quand même.",
        ctaLabel: "Nous contacter",
        mailSubject: "Intéressé(e) par MoMo Assistant",
      },
    };
  }

  return {
    hero: {
      eyebrow: "Careers",
      title: "Help build the operating system for Mobile Money agents",
      description:
        "MoMo Assistant is early — small team, real users, a lot still to build. Here's what working on it looks like.",
    },
    cultureHeading: "How we work",
    culture: [
      {
        icon: Rocket,
        title: "Small team, real impact",
        description:
          "What you ship reaches actual stations processing real transactions — not a backlog waiting for a bigger team to prioritize it.",
      },
      {
        icon: Globe2,
        title: "Built for how Africa actually works",
        description:
          "No country or network hardcoded, offline-first by default — the product is designed around real operating conditions, not assumptions.",
      },
      {
        icon: MessageSquareHeart,
        title: "Confident, calm, no jargon",
        description:
          "The same voice we write the product in is how we work internally — direct, plain language, no corporate filler.",
      },
    ],
    benefitsHeading: "What working here looks like",
    benefits: [
      {
        icon: Timer,
        title: "Flexible, remote-first",
        description: "Work from where you're effective. We care about the work, not hours logged.",
      },
      {
        icon: Rocket,
        title: "Ownership over your area",
        description: "Small team means real scope — you'll own outcomes, not just tickets.",
      },
    ],
    openPositions: {
      heading: "Open positions",
      emptyTitle: "No open positions right now",
      emptyDescription:
        "We're not actively hiring, but if you think you'd be a strong fit for where MoMo Assistant is headed, reach out anyway.",
      ctaLabel: "Get in touch",
      mailSubject: "Interested in working on MoMo Assistant",
    },
  };
}

const CONTENT: Record<AppLocale, CareersContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getCareersContent(locale: AppLocale): CareersContent {
  return CONTENT[locale];
}

import { Layers, ListChecks, Zap } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import type { DetailSection } from "@/types";

export interface WhyContent {
  hero: { eyebrow: string; title: string; description: string };
  comparisonsHeading: string;
  comparisons: DetailSection[];
}

// Sourced from docs/marketing-alignment-plan-mkt-001.md §9 (MKT-000's
// benefit table) and the existing About-page "why it exists" material —
// no new claims introduced here.
function build(locale: AppLocale): WhyContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Pourquoi MoMo Assistant",
        title: "Pourquoi une plateforme, plutôt qu'une habitude",
        description:
          "Composer un USSD à la main, une application de notes, ou un outil d'automatisation générique résolvent chacun un petit bout du problème. Aucun ne couvre ce qu'une organisation Mobile Money a réellement besoin de gérer.",
      },
      comparisonsHeading: "Comparaisons",
      comparisons: [
        {
          icon: Zap,
          title: "Plutôt que composer les USSD à la main",
          description:
            "Composer, naviguer dans les menus, ressaisir les montants — des dizaines ou des centaines de fois par jour, sur autant de SIM et d'appareils qu'une station en fait fonctionner.",
          points: [
            "Runtime V2 exécute la séquence avec un minutage constant, à chaque fois",
            "L'agent reste le décisionnaire final sur chaque transaction — l'automatisation supprime la ressaisie, pas la confirmation",
            "Un mauvais timing manuel devient une erreur ; Runtime V2 est conçu pour ne pas en avoir",
          ],
        },
        {
          icon: ListChecks,
          title: "Plutôt qu'une application de notes",
          description:
            "Noter les transactions à la main tient jusqu'à ce qu'il faille les retrouver, les réconcilier en fin de journée, ou prouver ce qui s'est passé sur une station précise.",
          points: [
            "Chaque transaction est enregistrée et consultable automatiquement — jamais retranscrite",
            "SMS Intelligence transforme les confirmations opérateur en historique structuré, sans ressaisie",
            "L'historique d'exécution est append-only : rien n'est jamais modifié ou supprimé après coup",
          ],
        },
        {
          icon: Layers,
          title: "Plutôt qu'un outil d'automatisation générique",
          description:
            "Un outil d'automatisation générique ne connaît ni les codes USSD Mobile Money, ni la nécessité de garder l'agent dans la boucle, ni ce que signifie faire confiance à un appareil ou une SIM.",
          points: [
            "Device Trust, SIM Trust et Station Trust sont conçus spécifiquement pour ce risque — pas adaptés après coup",
            "Financial Runtime vérifie le solde avant de dialer, pour ne jamais tenter une transaction impossible",
            "Conçu pour une activité réglementée et à haute confiance, pas pour de l'automatisation générique de tâches",
          ],
        },
      ],
    };
  }

  return {
    hero: {
      eyebrow: "Why MoMo Assistant",
      title: "Why a platform, not a habit",
      description:
        "Dialing USSD by hand, a notes app, or a generic automation tool each solve a small piece of the problem. None of them cover what a Mobile Money organization actually needs to manage.",
    },
    comparisonsHeading: "Comparisons",
    comparisons: [
      {
        icon: Zap,
        title: "Instead of dialing USSD by hand",
        description:
          "Dialing, navigating menus, re-entering amounts — dozens or hundreds of times a day, across however many SIMs and devices a station is running.",
        points: [
          "Runtime V2 executes the sequence at consistent timing, every time",
          "The agent stays the final decision-maker on every transaction — automation removes the retyping, not the confirmation",
          "A mistimed manual entry becomes an error; Runtime V2 is built not to have one",
        ],
      },
      {
        icon: ListChecks,
        title: "Instead of a notes app",
        description:
          "Writing transactions down by hand holds up until you need to find one, reconcile at end of day, or prove what happened on a specific station.",
        points: [
          "Every transaction is logged and searchable automatically — never re-transcribed",
          "SMS Intelligence turns operator confirmations into structured history, with no manual entry",
          "Execution history is append-only: nothing is ever edited or deleted after the fact",
        ],
      },
      {
        icon: Layers,
        title: "Instead of a generic automation tool",
        description:
          "A generic automation tool doesn't know Mobile Money USSD codes, doesn't know the agent needs to stay in the loop, and doesn't know what it means to trust a device or a SIM.",
        points: [
          "Device Trust, SIM Trust, and Station Trust are purpose-built for this risk — not bolted on afterward",
          "Financial Runtime checks the balance before dialing, so it never attempts an impossible transaction",
          "Built for regulated, high-trust work — not generic task automation",
        ],
      },
    ],
  };
}

const CONTENT: Record<AppLocale, WhyContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getWhyContent(locale: AppLocale): WhyContent {
  return CONTENT[locale];
}

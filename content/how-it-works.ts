import { Building2, Cloud, CreditCard, ServerCog, Smartphone, Zap } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import type { DetailSection, HowItWorksStep } from "@/types";

export interface HowItWorksContent {
  hero: { eyebrow: string; title: string; description: string };
  lifecycle: { heading: string; description: string; steps: HowItWorksStep[] };
  architectureConcepts: {
    heading: string;
    description: string;
    items: DetailSection[];
  };
  runtimeAndSync: { heading: string; items: DetailSection[] };
}

function build(locale: AppLocale): HowItWorksContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Comment ça marche",
        title: "De l'organisation à la transaction automatisée",
        description:
          "Comment MoMo Assistant est structuré, comment une transaction le traverse réellement, et de quoi chaque élément — Organisations, Stations, SIM, Runtime V2 — est responsable.",
      },
      lifecycle: {
        heading: "Le cycle de l'automatisation",
        description:
          "Ce qui se passe, dans l'ordre, depuis l'intégration d'une station jusqu'à une transaction synchronisée et auditée.",
        steps: [
          {
            step: 1,
            title: "Configurez votre organisation",
            description:
              "Créez votre organisation et définissez vos stations, agents et les politiques de fonctionnement que Runtime V2 appliquera.",
          },
          {
            step: 2,
            title: "Enregistrez appareils et SIM",
            description:
              "Enregistrez des appareils de confiance et liez-y des SIM via le moteur de confiance des appareils et SIM Trust avant que l'un ou l'autre puisse transiger.",
          },
          {
            step: 3,
            title: "Automatisez les flux USSD",
            description:
              "Runtime V2 exécute la séquence USSD — composer, naviguer dans les menus, saisir les montants — avec un minutage constant et prévisible.",
          },
          {
            step: 4,
            title: "L'agent confirme",
            description:
              "Avant toute validation, l'agent voit et confirme la transaction. L'automatisation supprime la ressaisie, pas la décision.",
          },
          {
            step: 5,
            title: "Synchronisation et audit",
            description:
              "Les métadonnées de transaction et la configuration de la station se synchronisent avec le cloud ; l'événement lié à la sécurité est inscrit au journal d'audit. Le PIN ne fait jamais ce trajet.",
          },
        ],
      },
      architectureConcepts: {
        heading: "Architecture",
        description:
          "Quatre concepts, une seule hiérarchie : les Organisations possèdent des Stations, les Stations possèdent des SIM et des appareils, et chaque action automatisée passe par Runtime V2.",
        items: [
          {
            icon: Building2,
            title: "Organisations",
            description:
              "L'entité commerciale de premier niveau. Elle possède chaque station en dessous d'elle, définit les politiques que Runtime V2 applique, et est le seul endroit où remonte l'historique d'audit.",
          },
          {
            icon: Smartphone,
            title: "Stations",
            description:
              "Un point d'opération physique — ses propres agents, ses propres appareils, ses propres SIM — rattaché à l'organisation à laquelle il appartient.",
          },
          {
            icon: CreditCard,
            title: "SIM",
            description:
              "Chaque SIM est liée à l'appareil sur lequel elle a été enregistrée via SIM Trust, gardant les lignes des stations multi-SIM approuvées indépendamment plutôt que mutualisées.",
          },
          {
            icon: ServerCog,
            title: "Runtime V2",
            description:
              "Le moteur d'exécution que traverse chaque séquence USSD automatisée — le même moteur quelle que soit la station ou la SIM, pour un comportement toujours constant.",
          },
        ],
      },
      runtimeAndSync: {
        heading: "Moteur d'exécution et synchronisation",
        items: [
          {
            icon: Zap,
            title: "Moteur d'exécution USSD",
            description:
              "Runtime V2 compose et navigue dans les menus USSD avec un minutage constant, pour que la même séquence se comporte de la même façon à chaque exécution — ni plus ni moins que ce que la politique de l'organisation l'autorise à automatiser.",
          },
          {
            icon: Cloud,
            title: "Synchronisation cloud",
            description:
              "La configuration de la station et les métadonnées de transaction se synchronisent entre appareils pour que la configuration d'une station ne dépende pas d'un seul téléphone. Les PIN Mobile Money sont entièrement exclus de la synchronisation — ils restent sur l'appareil qui les détient.",
          },
        ],
      },
    };
  }

  return {
    hero: {
      eyebrow: "How it works",
      title: "From organization to automated transaction",
      description:
        "How MoMo Assistant is structured, how a transaction actually moves through it, and what each piece — Organizations, Stations, SIMs, Runtime V2 — is responsible for.",
    },
    lifecycle: {
      heading: "The automation lifecycle",
      description:
        "What happens, in order, from onboarding a station to a synced, audited transaction.",
      steps: [
        {
          step: 1,
          title: "Onboard your organization",
          description:
            "Create your organization and define your stations, agents, and the operating policies Runtime V2 will enforce.",
        },
        {
          step: 2,
          title: "Register devices and SIMs",
          description:
            "Enroll trusted devices and bind SIMs to them through the Device Trust Engine and SIM Trust before either can transact.",
        },
        {
          step: 3,
          title: "Automate USSD workflows",
          description:
            "Runtime V2 executes the USSD sequence — dialing, navigating menus, entering amounts — at consistent, predictable timing.",
        },
        {
          step: 4,
          title: "Agent confirms",
          description:
            "Before anything commits, the agent sees and confirms the transaction. Automation removes the retyping, not the decision.",
        },
        {
          step: 5,
          title: "Sync and audit",
          description:
            "Transaction metadata and station configuration sync to the cloud; the security-relevant event is written to the audit log. The PIN never makes either trip.",
        },
      ],
    },
    architectureConcepts: {
      heading: "Architecture",
      description:
        "Four concepts, one hierarchy: Organizations own Stations, Stations own SIMs and devices, and every automated action runs through Runtime V2.",
      items: [
        {
          icon: Building2,
          title: "Organizations",
          description:
            "The top-level business entity. Owns every station beneath it, sets the policies Runtime V2 enforces, and is the single place audit history rolls up to.",
        },
        {
          icon: Smartphone,
          title: "Stations",
          description:
            "A physical point of operation — its own agents, its own devices, its own SIMs — reporting up to the organization it belongs to.",
        },
        {
          icon: CreditCard,
          title: "SIMs",
          description:
            "Each SIM is bound to the device it's enrolled on through SIM Trust, keeping multi-SIM stations' lines independently trusted rather than pooled.",
        },
        {
          icon: ServerCog,
          title: "Runtime V2",
          description:
            "The execution engine every automated USSD sequence runs through — the same engine regardless of station or SIM, so behavior stays consistent.",
        },
      ],
    },
    runtimeAndSync: {
      heading: "Runtime and sync",
      items: [
        {
          icon: Zap,
          title: "USSD Runtime",
          description:
            "Runtime V2 dials and navigates USSD menus with consistent timing, so the same sequence behaves the same way on every run — no more, no less than what the organization's policy allows it to automate.",
        },
        {
          icon: Cloud,
          title: "Cloud Sync",
          description:
            "Station configuration and transaction metadata sync across devices so a station's setup isn't tied to a single phone. Mobile Money PINs are excluded from sync entirely — they stay on the device that holds them.",
        },
      ],
    },
  };
}

const CONTENT: Record<AppLocale, HowItWorksContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getHowItWorksContent(locale: AppLocale): HowItWorksContent {
  return CONTENT[locale];
}

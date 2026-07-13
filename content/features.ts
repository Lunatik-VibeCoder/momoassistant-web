import {
  Building2,
  Cloud,
  History,
  KeyRound,
  Layers,
  RefreshCw,
  ServerCog,
  Users,
  Zap,
} from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import type { FeatureGroup } from "@/types";

export interface FeaturesContent {
  hero: { eyebrow: string; title: string; description: string };
  featureGroups: FeatureGroup[];
}

function build(locale: AppLocale): FeaturesContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Fonctionnalités",
        title: "Tout ce sur quoi tourne une station Mobile Money",
        description:
          "Opérations multi-SIM, flux USSD automatisés, historique des transactions et synchronisation cloud — conçus autour de la façon dont les agents et stations professionnels travaillent réellement au quotidien.",
      },
      featureGroups: [
        {
          title: "Automatisation",
          description:
            "Runtime V2 exécute les séquences USSD courantes avec un minutage précis, tandis que l'agent reste le décisionnaire final sur chaque transaction.",
          items: [
            {
              icon: Zap,
              title: "Automatisation USSD",
              description:
                "Automatise les séquences USSD répétitives avec un minutage précis, supprimant la ressaisie manuelle sans retirer l'agent de la boucle — chaque transaction requiert toujours une confirmation.",
            },
            {
              icon: ServerCog,
              title: "Moteur d'exécution Runtime V2",
              description:
                "Le moteur derrière chaque séquence automatisée : un minutage constant, un comportement prévisible sur tous les appareils, et des politiques que l'organisation peut définir pour ce qui est autorisé à tourner sans supervision.",
            },
          ],
        },
        {
          title: "Opérations",
          description:
            "Les outils du quotidien dont une station a besoin pour gérer plusieurs lignes, garder des registres exacts et récupérer rapidement lorsqu'un appareil change de main.",
          items: [
            {
              icon: Layers,
              title: "Gestion multi-SIM",
              description:
                "Gérez plusieurs SIM et lignes Mobile Money depuis un seul appareil, en basculant entre elles sans interrompre une transaction en cours.",
            },
            {
              icon: History,
              title: "Historique des transactions",
              description:
                "Chaque transaction est enregistrée et consultable, donnant aux agents et responsables de station un registre complet et fiable, sans avoir à réconcilier des registres papier.",
            },
            {
              icon: Cloud,
              title: "Synchronisation cloud",
              description:
                "La configuration de la station et les métadonnées de transaction se synchronisent en toute sécurité entre appareils — les PIN Mobile Money ne font jamais partie de cette synchronisation.",
            },
            {
              icon: RefreshCw,
              title: "Restauration d'appareil",
              description:
                "Remplacez ou réinitialisez un appareil et restaurez rapidement la configuration de station d'un agent, en minimisant l'interruption qu'un appareil perdu ou cassé aurait sinon causée.",
            },
          ],
        },
        {
          title: "Organisation",
          description:
            "Conçu pour les entreprises gérant plus d'un agent, appareil ou site — pas pour un portefeuille grand public mono-utilisateur.",
          items: [
            {
              icon: Building2,
              title: "Architecture Organisation / Station",
              description:
                "Modélisez votre entreprise telle qu'elle fonctionne réellement : une organisation composée de stations, chacune avec ses propres agents, appareils et SIM, rattachées à un seul endroit.",
            },
            {
              icon: Users,
              title: "Intégration entreprise",
              description:
                "Les stations et appareils sont provisionnés et approuvés de façon délibérée, pour qu'ajouter des agents ne fasse pas perdre la trace de qui a accès à quoi.",
            },
            {
              icon: KeyRound,
              title: "Coffre-fort PIN sécurisé",
              description:
                "Les PIN Mobile Money sont scellés dans l'Android KeyStore de l'appareil et ne sont jamais transmis ni stockés dans le cloud. Détails complets sur la page sécurité.",
            },
          ],
        },
      ],
    };
  }

  return {
    hero: {
      eyebrow: "Features",
      title: "Everything a Mobile Money station runs on",
      description:
        "Multi-SIM operations, automated USSD workflows, transaction records, and cloud sync — built around how professional agents and stations actually work day to day.",
    },
    featureGroups: [
      {
        title: "Automation",
        description:
          "Runtime V2 executes routine USSD sequences with precision timing, while the agent stays the final decision-maker on every transaction.",
        items: [
          {
            icon: Zap,
            title: "USSD Automation",
            description:
              "Automates repetitive USSD sequences with precision timing, removing manual re-entry without removing the agent from the loop — every transaction still requires confirmation.",
          },
          {
            icon: ServerCog,
            title: "Runtime V2 execution engine",
            description:
              "The engine behind every automated sequence: consistent timing, predictable behavior across devices, and policies an organization can define for what's allowed to run unattended.",
          },
        ],
      },
      {
        title: "Operations",
        description:
          "The day-to-day tools a station needs to run multiple lines, keep records straight, and recover quickly when a device changes hands.",
        items: [
          {
            icon: Layers,
            title: "Multi-SIM Management",
            description:
              "Run multiple SIMs and Mobile Money lines from a single device, switching between them without breaking a workflow mid-transaction.",
          },
          {
            icon: History,
            title: "Transaction History",
            description:
              "Every transaction is logged and searchable, giving agents and station managers a complete, reliable record without reconciling paper logs.",
          },
          {
            icon: Cloud,
            title: "Cloud Synchronization",
            description:
              "Station configuration and transaction metadata sync securely across devices — Mobile Money PINs are never included in that sync.",
          },
          {
            icon: RefreshCw,
            title: "Device Restoration",
            description:
              "Replace or reset a device and restore an agent's station configuration quickly, minimizing the downtime a lost or broken device would otherwise cause.",
          },
        ],
      },
      {
        title: "Organization",
        description:
          "Built for businesses running more than one agent, device, or location — not a single-user consumer wallet.",
        items: [
          {
            icon: Building2,
            title: "Organization / Station architecture",
            description:
              "Model your business the way it actually operates: an organization made up of stations, each with its own agents, devices, and SIMs, reporting up to one place.",
          },
          {
            icon: Users,
            title: "Enterprise onboarding",
            description:
              "Stations and devices are provisioned and trusted deliberately, so adding more agents doesn't mean losing track of who has access to what.",
          },
          {
            icon: KeyRound,
            title: "Secure PIN Vault",
            description:
              "Mobile Money PINs are sealed in the Android KeyStore on-device and never transmitted or stored in the cloud. Full detail on the security page.",
          },
        ],
      },
    ],
  };
}

const CONTENT: Record<AppLocale, FeaturesContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getFeaturesContent(locale: AppLocale): FeaturesContent {
  return CONTENT[locale];
}

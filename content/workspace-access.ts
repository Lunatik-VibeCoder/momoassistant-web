import { KeyRound, RefreshCw, ShieldOff, Smartphone } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import type { ArchitectureLayer, DetailSection } from "@/types";

export interface WorkspaceAccessContent {
  hero: { eyebrow: string; title: string; description: string };
  chainHeading: string;
  chainDescription: string;
  chain: ArchitectureLayer[];
  detailsHeading: string;
  details: DetailSection[];
  comingSoonLabel: string;
}

// Chain and terminology sourced directly from
// docs/adr-commercial-model-foundation.md (Accepted) — the canonical
// Reference Architecture Diagram there is this page's source of truth,
// not redrawn independently. Renewal/activation mechanics are marked
// "Coming soon" per COM-001's own open items — not invented here.
function build(locale: AppLocale): WorkspaceAccessContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Workspace Access",
        title: "Comment l'accès à MoMo Assistant fonctionne",
        description:
          "De votre organisation jusqu'au Runtime qui exécute vos transactions — la chaîne complète qui détermine ce que votre équipe peut faire, et sur quels appareils.",
      },
      chainHeading: "La chaîne d'accès",
      chainDescription:
        "Chaque maillon a une seule responsabilité : l'Organisation contracte, l'abonnement définit les droits commerciaux, la licence technique les active, les entitlements déterminent ce qui est débloqué.",
      chain: [
        {
          title: "Organization",
          description: "Le client contractuel — l'entité qui détient l'abonnement.",
        },
        {
          title: "Subscription",
          description: "La relation commerciale entre votre organisation et MoMo Assistant.",
        },
        {
          title: "Technical License",
          description: "Le mécanisme qui active les droits accordés par l'abonnement.",
        },
        {
          title: "Entitlements",
          description: "SIM Seats, modules, capacités et politiques réellement débloqués.",
        },
        {
          title: "Stations → Agents → Devices → SIMs → Runtime",
          description: "Là où les entitlements s'appliquent concrètement, au quotidien.",
        },
      ],
      detailsHeading: "Ce qui est déjà réel",
      details: [
        {
          icon: Smartphone,
          title: "Portée par organisation et station",
          description:
            "Les entitlements de votre abonnement s'appliquent à l'ensemble de votre organisation ; chaque station garde ses propres agents, appareils et SIM sous cette même couverture.",
        },
        {
          icon: RefreshCw,
          title: "Changement d'appareil",
          description:
            "La restauration d'appareil (Device Restoration) reconfigure une station sur un nouvel appareil de confiance — la configuration et l'historique récent sont restaurés, les PIN sont ressaisis, jamais migrés.",
        },
        {
          icon: ShieldOff,
          title: "Révocation",
          description:
            "Chaque appareil détient un Device Token lié à son identité matérielle, révocable instantanément à distance en cas de vol ou de remplacement — indépendamment du reste de votre abonnement.",
        },
        {
          icon: KeyRound,
          title: "Activation & renouvellement",
          description:
            "Le mécanisme précis d'activation et de renouvellement de la licence technique fait partie des points encore ouverts de COM-001 — voir ci-dessous plutôt qu'une réponse inventée.",
        },
      ],
      comingSoonLabel: "À venir",
    };
  }

  return {
    hero: {
      eyebrow: "Workspace Access",
      title: "How access to MoMo Assistant works",
      description:
        "From your organization down to the Runtime that executes your transactions — the full chain that determines what your team can do, and on which devices.",
    },
    chainHeading: "The access chain",
    chainDescription:
      "Each link has exactly one responsibility: the Organization contracts, the Subscription defines commercial rights, the Technical License activates them, Entitlements determine what's unlocked.",
    chain: [
      {
        title: "Organization",
        description: "The contractual customer — the entity that holds the Subscription.",
      },
      {
        title: "Subscription",
        description: "The commercial relationship between your organization and MoMo Assistant.",
      },
      {
        title: "Technical License",
        description: "The mechanism that activates the rights a Subscription grants.",
      },
      {
        title: "Entitlements",
        description: "SIM Seats, modules, capabilities, and policies actually unlocked.",
      },
      {
        title: "Stations → Agents → Devices → SIMs → Runtime",
        description: "Where Entitlements apply, day to day.",
      },
    ],
    detailsHeading: "What's already real",
    details: [
      {
        icon: Smartphone,
        title: "Scoped by organization and station",
        description:
          "Your Subscription's Entitlements apply across your whole Organization; each Station keeps its own agents, devices, and SIMs under that same coverage.",
      },
      {
        icon: RefreshCw,
        title: "Device change",
        description:
          "Device Restoration re-provisions a station onto a new trusted device — configuration and recent history are restored, PINs are re-entered, never migrated.",
      },
      {
        icon: ShieldOff,
        title: "Revocation",
        description:
          "Every device holds a Device Token bound to its hardware identity, instantly and remotely revocable on theft or replacement — independent of the rest of your Subscription.",
      },
      {
        icon: KeyRound,
        title: "Activation & renewal",
        description:
          "The exact activation and renewal mechanics for the Technical License are still one of COM-001's open items — flagged here rather than answered with an invented policy.",
      },
    ],
    comingSoonLabel: "Coming soon",
  };
}

const CONTENT: Record<AppLocale, WorkspaceAccessContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getWorkspaceAccessContent(locale: AppLocale): WorkspaceAccessContent {
  return CONTENT[locale];
}

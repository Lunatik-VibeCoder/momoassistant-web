import {
  Building2,
  Globe,
  Lock,
  MessageSquare,
  Network,
  ServerCog,
  Smartphone,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import type { FeatureGroup } from "@/types";

export interface FeaturesContent {
  hero: { eyebrow: string; title: string; description: string };
  featureGroups: FeatureGroup[];
}

// Grouped around the real capabilities documented in
// docs/marketing-audit-2026-07-23.md and docs/com-001-saas-packaging-entitlements.md
// — deliberately excludes Fleet Management, external API access, Analytics,
// and Autonomous Gateway (COM-001 classifies all four as Future modules,
// not implemented today).
function build(locale: AppLocale): FeaturesContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Fonctionnalités",
        title: "Tout ce sur quoi tourne votre plateforme d'opérations Mobile Money",
        description:
          "Automatisation, confiance des appareils et des SIM, Financial Runtime, SMS Intelligence — les capacités réelles qui font tourner MoMo Assistant, organisées comme votre organisation les utilise réellement.",
      },
      featureGroups: [
        {
          title: "Automatisation",
          description:
            "Runtime V2 exécute les séquences USSD courantes avec un minutage précis, tandis que l'agent reste le décisionnaire final sur chaque transaction — désormais disponible sur 7 pays et opérateurs.",
          items: [
            {
              icon: Zap,
              title: "Runtime V2",
              description:
                "Le moteur d'exécution derrière chaque séquence USSD automatisée : un minutage constant, un comportement prévisible sur tous les appareils, et des politiques que l'organisation peut définir pour ce qui est autorisé à tourner sans supervision.",
            },
            {
              icon: Globe,
              title: "Country Expansion",
              description:
                "MTN Ghana et Bénin, MTN Togo et Côte d'Ivoire, Moov Bénin, Burkina Faso et Côte d'Ivoire, Orange Burkina Faso, Celtis Bénin — la même automatisation, configurée par profil réseau plutôt que codée pour un seul marché.",
            },
          ],
        },
        {
          title: "Trust Platform",
          description:
            "Trois moteurs de confiance indépendants — appareil, SIM, station — qui alimentent une politique d'exécution unifiée décidant ce qui peut s'exécuter automatiquement.",
          items: [
            {
              icon: Smartphone,
              title: "Device Trust",
              description:
                "Chaque appareil est vérifié et approuvé avant de pouvoir exécuter des transactions automatisées pour une station — jamais automatiquement, toujours de façon délibérée.",
            },
            {
              icon: Network,
              title: "SIM Trust",
              description:
                "Les SIM sont liées et vérifiées par appareil, empêchant qu'un échange de SIM non autorisé ne prenne le contrôle d'une ligne en silence.",
            },
            {
              icon: Building2,
              title: "Station Trust",
              description:
                "Un score unique agrège la confiance des appareils et des SIM d'une station entière, pas seulement d'un appareil isolé — pour que le responsable de station voie un seul indicateur fiable.",
            },
          ],
        },
        {
          title: "Financial Runtime",
          description:
            "La couche qui répond à une question avant chaque transaction : cette SIM peut-elle réellement se le permettre ?",
          items: [
            {
              icon: Wallet,
              title: "Financial Runtime",
              description:
                "Vérifie le solde disponible avant chaque dial — l'application refuse d'exécuter une transaction impossible avant qu'elle ne coûte de l'argent, plutôt que de le découvrir après coup.",
            },
            {
              icon: MessageSquare,
              title: "SMS Intelligence",
              description:
                "Transforme automatiquement les SMS de confirmation Mobile Money en historique de transaction structuré et consultable — vérifié pour MTN Ghana et Bénin.",
            },
          ],
        },
        {
          title: "Opérations",
          description:
            "Les outils du quotidien dont une organisation multi-appareils et multi-agents a besoin.",
          items: [
            {
              icon: Lock,
              title: "Encrypted Backup",
              description:
                "Sauvegarde chiffrée (AES-256-GCM) et restauration : perdre un téléphone ne signifie plus perdre la configuration d'une station ni son historique de transactions.",
            },
            {
              icon: Users,
              title: "Multi-Agent",
              description:
                "Plusieurs agents peuvent partager un même appareil, chacun avec son propre code d'accès et ses propres permissions, sans jamais partager le code PIN de transaction d'un autre.",
            },
            {
              icon: ServerCog,
              title: "Privacy Mode",
              description:
                "Masque instantanément soldes, montants et noms à l'écran — utile dès que quelqu'un regarde par-dessus l'épaule d'un agent.",
            },
          ],
        },
      ],
    };
  }

  return {
    hero: {
      eyebrow: "Features",
      title: "Everything your Mobile Money operations platform runs on",
      description:
        "Automation, device and SIM trust, Financial Runtime, SMS Intelligence — the real capabilities behind MoMo Assistant, organized the way your organization actually uses them.",
    },
    featureGroups: [
      {
        title: "Automation",
        description:
          "Runtime V2 executes routine USSD sequences with precision timing, while the agent stays the final decision-maker on every transaction — now live across 7 countries and operators.",
        items: [
          {
            icon: Zap,
            title: "Runtime V2",
            description:
              "The execution engine behind every automated USSD sequence: consistent timing, predictable behavior across devices, and policies an organization can define for what's allowed to run unattended.",
          },
          {
            icon: Globe,
            title: "Country Expansion",
            description:
              "MTN Ghana and Bénin, MTN Togo and Côte d'Ivoire, Moov Bénin, Burkina Faso, and Côte d'Ivoire, Orange Burkina Faso, Celtis Bénin — the same automation, configured per Network Profile rather than built for a single market.",
          },
        ],
      },
      {
        title: "Trust Platform",
        description:
          "Three independent trust engines — device, SIM, station — feeding one Unified Runtime Policy that decides what's allowed to run automatically.",
        items: [
          {
            icon: Smartphone,
            title: "Device Trust",
            description:
              "Every device is verified and trusted before it can run automated transactions for a station — never automatically, always deliberately.",
          },
          {
            icon: Network,
            title: "SIM Trust",
            description:
              "SIMs are bound and verified per device, preventing an unauthorized SIM swap from silently taking over a line.",
          },
          {
            icon: Building2,
            title: "Station Trust",
            description:
              "One score rolls up device and SIM trust across an entire station, not just a single device — so a station manager sees one reliable signal, not a dozen.",
          },
        ],
      },
      {
        title: "Financial Runtime",
        description:
          "The layer that answers one question before every transaction: can this SIM actually afford it?",
        items: [
          {
            icon: Wallet,
            title: "Financial Runtime",
            description:
              "Checks available balance before every dial — the app refuses to attempt an impossible transaction before it costs money, instead of finding out after the fact.",
          },
          {
            icon: MessageSquare,
            title: "SMS Intelligence",
            description:
              "Automatically turns Mobile Money confirmation SMS into structured, searchable transaction history — field-verified for MTN Ghana and Bénin.",
          },
        ],
      },
      {
        title: "Operations",
        description:
          "The day-to-day tools a multi-device, multi-agent organization needs.",
        items: [
          {
            icon: Lock,
            title: "Encrypted Backup",
            description:
              "AES-256-GCM encrypted backup and restore — losing a phone no longer means losing a station's setup or its transaction history.",
          },
          {
            icon: Users,
            title: "Multi-Agent",
            description:
              "Multiple agents can share one device, each with their own access code and permissions, without ever sharing another agent's transaction PIN.",
          },
          {
            icon: ServerCog,
            title: "Privacy Mode",
            description:
              "Instantly hides balances, amounts, and names on screen — useful the moment someone's looking over an agent's shoulder.",
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

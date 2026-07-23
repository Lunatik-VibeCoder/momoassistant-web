import {
  Building2,
  Cloud,
  Lock,
  ScrollText,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import type { DetailSection } from "@/types";

export interface EnterpriseContent {
  hero: { eyebrow: string; title: string; description: string };
  conceptsHeading: string;
  concepts: DetailSection[];
}

// Every concept traces to a real, audited capability
// (docs/marketing-audit-2026-07-23.md). Governance draws on the real
// substance found in the audit (append-only ledger, RBAC, audit trail) —
// deliberately not on HustlerPay's draft HEOS Enterprise Blueprint, which
// the audit flagged as unreconciled with the actual product (see R8).
function build(locale: AppLocale): EnterpriseContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Enterprise",
        title: "MoMo Assistant est une plateforme, pas seulement une application",
        description:
          "Organisations, Stations, Agents, Device Trust, Runtime, synchronisation, sécurité, sauvegardes — les mêmes fondations qui font tourner un agent unique s'étendent pour gouverner une organisation entière.",
      },
      conceptsHeading: "Ce qui compose la plateforme",
      concepts: [
        {
          icon: Building2,
          title: "Organisations",
          description:
            "Le compte sous lequel toute votre entreprise vit — chaque station, chaque politique et chaque piste d'audit y remontent, quel que soit le nombre de sites que vous exploitez.",
        },
        {
          icon: Smartphone,
          title: "Stations",
          description:
            "Chaque site dispose de ses propres agents, appareils et SIM tout en remontant vers une seule organisation — ajoutez un nouveau site sans tout réarchitecturer.",
        },
        {
          icon: Users,
          title: "Agents",
          description:
            "Plusieurs agents peuvent partager un appareil, chacun avec son propre code d'accès et ses propres permissions — ajouter des agents n'augmente pas le risque.",
        },
        {
          icon: ShieldCheck,
          title: "Device Trust",
          description:
            "Chaque appareil est vérifié et approuvé avant de pouvoir exécuter des transactions pour une station — jamais automatiquement.",
        },
        {
          icon: ServerCog,
          title: "Runtime",
          description:
            "Runtime V2 exécute chaque séquence USSD automatisée avec un comportement constant, quelle que soit la station ou la SIM utilisée.",
        },
        {
          icon: Cloud,
          title: "Synchronisation",
          description:
            "La configuration de la station et les métadonnées de transaction se synchronisent en toute sécurité entre appareils — les PIN ne font jamais partie de cette synchronisation.",
        },
        {
          icon: Lock,
          title: "Sécurité & Sauvegardes",
          description:
            "Encrypted Backup protège la configuration d'une station ; les PIN restent scellés dans le KeyStore de l'appareil qui les détient, jamais migrés.",
        },
        {
          icon: ScrollText,
          title: "Gouvernance",
          description:
            "Un historique d'exécution append-only, des rôles et permissions appliqués côté serveur, et une piste d'audit complète — la gouvernance repose sur des faits enregistrés, jamais sur la confiance seule.",
        },
      ],
    };
  }

  return {
    hero: {
      eyebrow: "Enterprise",
      title: "MoMo Assistant is a platform, not just an app",
      description:
        "Organizations, Stations, Agents, Device Trust, Runtime, sync, security, backups — the same foundation that runs a single agent scales up to govern an entire organization.",
    },
    conceptsHeading: "What makes up the platform",
    concepts: [
      {
        icon: Building2,
        title: "Organizations",
        description:
          "The account your whole business lives under — every station, every policy, and every audit trail rolls up here, no matter how many locations you run.",
      },
      {
        icon: Smartphone,
        title: "Stations",
        description:
          "Each location gets its own agents, devices, and SIMs while still reporting up to one Organization — add a new site without re-architecting anything.",
      },
      {
        icon: Users,
        title: "Agents",
        description:
          "Multiple agents can share a device, each with their own access code and permissions — adding agents doesn't add risk.",
      },
      {
        icon: ShieldCheck,
        title: "Device Trust",
        description:
          "Every device is verified and trusted before it can run transactions for a station — never automatically.",
      },
      {
        icon: ServerCog,
        title: "Runtime",
        description:
          "Runtime V2 executes every automated USSD sequence with consistent behavior, regardless of station or SIM.",
      },
      {
        icon: Cloud,
        title: "Sync",
        description:
          "Station configuration and transaction metadata sync securely across devices — PINs are never part of that sync.",
      },
      {
        icon: Lock,
        title: "Security & Backups",
        description:
          "Encrypted Backup protects a station's configuration; PINs stay sealed in the KeyStore of the device that holds them, never migrated.",
      },
      {
        icon: ScrollText,
        title: "Governance",
        description:
          "An append-only execution history, backend-enforced roles and permissions, and a complete audit trail — governance built on recorded fact, not just trust.",
      },
    ],
  };
}

const CONTENT: Record<AppLocale, EnterpriseContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getEnterpriseContent(locale: AppLocale): EnterpriseContent {
  return CONTENT[locale];
}

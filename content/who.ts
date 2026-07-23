import { Building2, MapPin, ShieldCheck, Store, User } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import type { DetailSection } from "@/types";

export interface WhoContent {
  hero: { eyebrow: string; title: string; description: string };
  profilesHeading: string;
  profiles: DetailSection[];
}

// Profiles per docs/marketing-alignment-plan-mkt-001.md §9 — each surfaces
// the subset of MKT-000's benefit table actually relevant to that
// audience, not new claims.
function build(locale: AppLocale): WhoContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Pour qui",
        title: "Qui utilise MoMo Assistant",
        description:
          "D'un agent unique à une organisation multi-stations — les mêmes fondations, avec ce qui compte le plus mis en avant selon votre rôle.",
      },
      profilesHeading: "Profils",
      profiles: [
        {
          icon: User,
          title: "Agent Mobile Money",
          description:
            "Vous exécutez des dizaines ou des centaines de transactions par jour, sur une ou plusieurs SIM, et chaque seconde de saisie manuelle compte.",
          points: [
            "Runtime V2 supprime la ressaisie répétitive, pas votre décision finale",
            "Privacy Mode masque soldes et montants en un geste",
            "Financial Runtime évite de tenter une transaction que le solde ne couvre pas",
          ],
        },
        {
          icon: Store,
          title: "Agence Mobile Money",
          description:
            "Vous gérez plusieurs agents et appareils sous un même toit, et devez garder une trace fiable de qui a fait quoi.",
          points: [
            "Multi-Agent permet à plusieurs agents de partager un appareil sans partager leur PIN",
            "Historique des transactions consultable, sans registre papier",
            "Encrypted Backup protège la configuration si un appareil est perdu ou cassé",
          ],
        },
        {
          icon: MapPin,
          title: "Réseau de kiosques",
          description:
            "Plusieurs points de vente physiques, chacun avec ses propres appareils et SIM, tous rattachés à la même organisation.",
          points: [
            "Architecture Organisation / Station : chaque kiosque est une station distincte, rattachée à un seul endroit",
            "Station Trust donne un score de confiance par site, pas seulement par appareil",
            "SMS Intelligence structure automatiquement l'historique de chaque ligne",
          ],
        },
        {
          icon: Building2,
          title: "Opérations terrain",
          description:
            "Des appareils qui changent de main, une connectivité instable, et le besoin de restaurer rapidement une station sur un nouvel appareil.",
          points: [
            "Encrypted Backup & Restore reconfigure une station sur un nouvel appareil de confiance",
            "Pensé pour le hors-ligne — l'application est conçue pour une connectivité instable",
            "Device Trust exige de rétablir la confiance à chaque remplacement, jamais de l'hériter",
          ],
        },
        {
          icon: ShieldCheck,
          title: "Managers",
          description:
            "Vous devez répondre de ce qui se passe sur chaque station, sans surveiller chaque transaction individuellement.",
          points: [
            "Unified Runtime Policy : vous définissez la politique, le moteur l'applique",
            "Append-only Execution History : une piste d'audit complète, jamais modifiable après coup",
            "Rôles & permissions (RBAC) pour limiter qui peut faire quoi, disponible dès Enterprise",
          ],
        },
      ],
    };
  }

  return {
    hero: {
      eyebrow: "Who it's for",
      title: "Who uses MoMo Assistant",
      description:
        "From a single agent to a multi-station organization — the same foundation, with what matters most surfaced for your role.",
    },
    profilesHeading: "Profiles",
    profiles: [
      {
        icon: User,
        title: "Mobile Money Agent",
        description:
          "You run dozens or hundreds of transactions a day, across one or more SIMs, and every second of manual entry adds up.",
        points: [
          "Runtime V2 removes the repetitive retyping, not your final call",
          "Privacy Mode hides balances and amounts in one tap",
          "Financial Runtime stops you from attempting a transaction the balance can't cover",
        ],
      },
      {
        icon: Store,
        title: "Mobile Money Agency",
        description:
          "You manage several agents and devices under one roof, and need a reliable record of who did what.",
        points: [
          "Multi-Agent lets several agents share a device without sharing a PIN",
          "Searchable transaction history, no paper log",
          "Encrypted Backup protects configuration if a device is lost or broken",
        ],
      },
      {
        icon: MapPin,
        title: "Kiosk Network",
        description:
          "Multiple physical points of sale, each with its own devices and SIMs, all reporting to the same organization.",
        points: [
          "Organization / Station architecture: each kiosk is its own station, reporting to one place",
          "Station Trust gives a per-site trust score, not just per device",
          "SMS Intelligence automatically structures each line's history",
        ],
      },
      {
        icon: Building2,
        title: "Field Operations",
        description:
          "Devices that change hands, inconsistent connectivity, and the need to restore a station onto a new device quickly.",
        points: [
          "Encrypted Backup & Restore re-provisions a station onto a new trusted device",
          "Built offline-first — the app is designed around inconsistent connectivity",
          "Device Trust requires re-establishing trust on every replacement, never inheriting it",
        ],
      },
      {
        icon: ShieldCheck,
        title: "Team Managers",
        description:
          "You're accountable for what happens across every station, without watching each transaction individually.",
        points: [
          "Unified Runtime Policy: you set the policy, the engine enforces it",
          "Append-only Execution History: a complete audit trail, never editable after the fact",
          "Roles & permissions (RBAC) to limit who can do what, available from Enterprise",
        ],
      },
    ],
  };
}

const CONTENT: Record<AppLocale, WhoContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getWhoContent(locale: AppLocale): WhoContent {
  return CONTENT[locale];
}

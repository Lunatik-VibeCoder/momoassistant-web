import {
  Building2,
  Cpu,
  EyeOff,
  KeyRound,
  Lock,
  MessageSquare,
  Network,
  ScrollText,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import type { DetailSection } from "@/types";

export interface SecurityContent {
  hero: { eyebrow: string; title: string; description: string };
  securityDomainsHeading: string;
  securityDomains: DetailSection[];
}

// Full rebuild against the real, audited capability list — see
// docs/marketing-audit-2026-07-23.md and
// docs/com-001-saas-packaging-entitlements.md. Every domain below traces
// to a real, shipped capability; none of COM-001's Future modules
// (Fleet Management, external API, Analytics, Autonomous Gateway) appear
// here.
function build(locale: AppLocale): SecurityContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Sécurité",
        title: "Une sécurité construite autour d'une seule règle",
        description:
          "Les PIN de transaction Mobile Money ne quittent jamais l'appareil. Chaque autre couche — Trust Platform, Financial Runtime, journaux d'audit — existe pour protéger cette frontière.",
      },
      securityDomainsHeading: "Domaines de sécurité",
      securityDomains: [
        {
          icon: Smartphone,
          title: "Device Trust",
          description:
            "Un appareil doit être vérifié et approuvé avant de pouvoir exécuter des transactions automatisées pour une station.",
          points: [
            "Les nouveaux appareils sont enregistrés de façon délibérée, jamais automatiquement",
            "La confiance est limitée à une station — un appareil approuvé pour une station ne l'est pas pour une autre",
            "Remplacer un appareil signifie rétablir la confiance, pas en hériter",
          ],
        },
        {
          icon: Network,
          title: "SIM Trust",
          description:
            "Les SIM sont liées et vérifiées par appareil, de sorte qu'un échange de SIM non autorisé ne peut pas prendre le contrôle d'une ligne en silence.",
          points: [
            "Chaque SIM est liée à l'appareil sur lequel elle a été enregistrée",
            "Insérer une SIM dans un appareil non approuvé rompt le lien au lieu de transiger en silence",
            "La confiance de chaque ligne d'une station multi-SIM reste indépendante des autres",
          ],
        },
        {
          icon: Building2,
          title: "Station Trust",
          description:
            "Un score unique agrège la confiance des appareils et des SIM d'une station entière, pour donner au responsable de station un seul signal fiable plutôt qu'une liste d'appareils à surveiller un par un.",
          points: [
            "Combine Device Trust et SIM Trust au niveau de la station, pas seulement de l'appareil",
            "Alimente la Unified Runtime Policy qui décide ce qui peut s'exécuter automatiquement",
            "Un appareil restauré ou remplacé démarre à un niveau de confiance intermédiaire, jamais à la confiance maximale par défaut",
          ],
        },
        {
          icon: ShieldCheck,
          title: "Unified Runtime Policy",
          description:
            "La politique unifiée du moteur d'exécution décide ce que Runtime V2 est autorisé à automatiser — et où un humain doit confirmer — à partir des signaux de confiance ci-dessus.",
          points: [
            "Les organisations définissent la politique ; le moteur l'applique, pas l'agent individuel",
            "Chaque étape automatisée est toujours présentée à l'agent pour confirmation avant validation",
            "Les moteurs de confiance ne bloquent jamais une transaction directement — seule la politique décide",
          ],
        },
        {
          icon: Wallet,
          title: "Financial Runtime",
          description:
            "Vérifie le solde disponible avant chaque transaction, pour qu'une transaction impossible soit refusée avant de coûter de l'argent plutôt qu'après.",
          points: [
            "Le solde vérifié est comparé aux montants déjà réservés avant d'autoriser un nouveau dial",
            "Un solde inconnu bloque la transaction, au même titre qu'un solde insuffisant",
            "Validé sur appareil réel — pas seulement conçu en théorie",
          ],
        },
        {
          icon: KeyRound,
          title: "PIN Security",
          description:
            "Les PIN Mobile Money sont scellés dans l'Android KeyStore de l'appareil — adossés au matériel lorsque l'appareil le prend en charge.",
          points: [
            "Les PIN ne sont jamais transmis hors de l'appareil",
            "Les PIN ne sont jamais inclus dans la synchronisation cloud, les sauvegardes ou les métadonnées de transaction",
            "Toute modification biométrique ou tentative d'altération purge intégralement le coffre-fort de PIN",
          ],
        },
        {
          icon: Lock,
          title: "Encrypted Backup",
          description:
            "Sauvegarde et restauration chiffrées (AES-256-GCM) de la configuration d'une station — sans jamais inclure les PIN de transaction, qui restent liés à l'appareil qui les détient.",
          points: [
            "Les données financières sont explicitement exclues de l'export et de l'import",
            "Restauration en pipeline atomique, avec confirmation explicite à l'écran",
            "Restaurer une station sur un nouvel appareil signifie ressaisir les PIN, jamais les migrer",
          ],
        },
        {
          icon: Cpu,
          title: "Runtime Integrity",
          description:
            "Runtime V2 se comporte de façon identique à chaque exécution, sur chaque appareil — la constance est ce qui rend l'automatisation digne de confiance.",
          points: [
            "Runtime V2 reste le seul chemin d'exécution pour les séquences USSD automatisées",
            "Aucune session de confiance persistante par défaut : chaque transaction requiert une confirmation active",
            "Le comportement ne varie jamais selon l'appareil, la station ou la SIM utilisée",
          ],
        },
        {
          icon: ScrollText,
          title: "Append-only Execution History",
          description:
            "Chaque transaction et chaque action liée à la sécurité est enregistrée — jamais modifiée ni supprimée après coup.",
          points: [
            "Toute correction devient une nouvelle entrée approuvée, jamais une modification silencieuse d'une entrée existante",
            "Donne aux organisations une piste d'audit complète et infalsifiable",
            "La même discipline que celle qui protège vos données de transaction protège l'historique lui-même",
          ],
        },
        {
          icon: MessageSquare,
          title: "SMS Intelligence",
          description:
            "Transforme les SMS de confirmation Mobile Money en historique de transaction structuré, par un pipeline unique et fermé — jamais interprété au hasard par chaque fonctionnalité.",
          points: [
            "Un seul point d'entrée pour l'interprétation des SMS, jamais consommé directement par une fonctionnalité",
            "Vérifié sur le terrain pour MTN Ghana et MTN Bénin",
            "Sert de filet de sécurité indépendant pour résoudre une transaction restée en attente",
          ],
        },
        {
          icon: EyeOff,
          title: "Privacy Mode",
          description:
            "Masque instantanément soldes, montants et noms à l'écran, sur toutes les vues de l'application — utile dès que quelqu'un regarde par-dessus l'épaule d'un agent.",
          points: [
            "Activable en un geste depuis le tableau de bord ou les paramètres",
            "Ne masque jamais les champs en cours de saisie active, pour ne pas transformer une protection en risque",
            "La synchronisation cloud existe pour la configuration et les métadonnées — jamais pour quoi que ce soit permettant de reconstituer un PIN",
          ],
        },
      ],
    };
  }

  return {
    hero: {
      eyebrow: "Security",
      title: "Security built around one rule",
      description:
        "Mobile Money transaction PINs never leave the device. Every other layer — Trust Platform, Financial Runtime, audit logs — exists to protect that boundary.",
    },
    securityDomainsHeading: "Security domains",
    securityDomains: [
      {
        icon: Smartphone,
        title: "Device Trust",
        description:
          "A device has to be verified and trusted before it can run automated transactions for a station.",
        points: [
          "New devices are enrolled deliberately, not automatically",
          "Trust is scoped to a station — a device trusted for one station isn't trusted for another",
          "Replacing a device means re-establishing trust, not inheriting it",
        ],
      },
      {
        icon: Network,
        title: "SIM Trust",
        description:
          "SIMs are bound and verified per device, so an unauthorized SIM swap can't silently take over a line.",
        points: [
          "Each SIM is tied to the device it was enrolled on",
          "Swapping a SIM into an untrusted device breaks the binding rather than transacting silently",
          "Multi-SIM stations keep each line's trust independent of the others",
        ],
      },
      {
        icon: Building2,
        title: "Station Trust",
        description:
          "One score rolls up device and SIM trust across an entire station, giving a station manager one reliable signal instead of a device-by-device checklist.",
        points: [
          "Combines Device Trust and SIM Trust at the station level, not just per device",
          "Feeds the Unified Runtime Policy that decides what's allowed to run automatically",
          "A restored or replaced device starts at an intermediate trust level, never full trust by default",
        ],
      },
      {
        icon: ShieldCheck,
        title: "Unified Runtime Policy",
        description:
          "The policy layer decides what Runtime V2 is allowed to automate — and where a human has to confirm — from the trust signals above.",
        points: [
          "Organizations set the policy; the runtime enforces it, not the individual agent",
          "Every automated step still surfaces to the agent for confirmation before it commits",
          "Trust engines never block a transaction directly — only the policy layer decides",
        ],
      },
      {
        icon: Wallet,
        title: "Financial Runtime",
        description:
          "Checks available balance before every transaction, so an impossible transaction is refused before it costs money, not after.",
        points: [
          "Verified balance is checked against amounts already reserved before authorizing a new dial",
          "An unknown balance blocks the transaction the same way an insufficient one does",
          "Field-validated on real hardware — not just designed in theory",
        ],
      },
      {
        icon: KeyRound,
        title: "PIN Security",
        description:
          "Mobile Money PINs are sealed in the Android KeyStore on-device — hardware-backed where the device supports it.",
        points: [
          "PINs are never transmitted off the device",
          "PINs are never included in cloud sync, backups, or transaction metadata",
          "Any biometric change or tamper attempt purges the PIN vault entirely",
        ],
      },
      {
        icon: Lock,
        title: "Encrypted Backup",
        description:
          "AES-256-GCM encrypted backup and restore of a station's configuration — never including transaction PINs, which stay bound to the device that holds them.",
        points: [
          "Financial data is explicitly excluded from export and import",
          "Restore runs as an atomic pipeline, with an explicit on-screen confirmation step",
          "Restoring a station onto a new device means re-entering PINs there, never migrating them",
        ],
      },
      {
        icon: Cpu,
        title: "Runtime Integrity",
        description:
          "Runtime V2 behaves identically on every run, on every device — consistency is what makes automation trustworthy.",
        points: [
          "Runtime V2 remains the sole execution path for automated USSD sequences",
          "No persistent trust session by default — every transaction requires active confirmation",
          "Behavior never varies by device, station, or SIM in use",
        ],
      },
      {
        icon: ScrollText,
        title: "Append-only Execution History",
        description:
          "Every transaction and every security-relevant action is recorded — never edited or deleted after the fact.",
        points: [
          "Every correction becomes a new, approved entry, never a silent edit to an existing one",
          "Gives organizations a complete, tamper-evident audit trail",
          "The same discipline that protects your transaction data protects the history itself",
        ],
      },
      {
        icon: MessageSquare,
        title: "SMS Intelligence",
        description:
          "Turns Mobile Money confirmation SMS into structured transaction history through one closed pipeline — never interpreted ad hoc by whichever feature happens to need it.",
        points: [
          "A single entry point for SMS interpretation, never consumed directly by a feature",
          "Field-verified for MTN Ghana and MTN Bénin",
          "Acts as an independent safety net for resolving a transaction that's still pending",
        ],
      },
      {
        icon: EyeOff,
        title: "Privacy Mode",
        description:
          "Instantly hides balances, amounts, and names on screen, across every view in the app — useful the moment someone's looking over an agent's shoulder.",
        points: [
          "Toggle it in one tap from the dashboard or settings",
          "Never masks fields being actively entered, so a privacy feature never becomes a safety regression",
          "Cloud sync exists for configuration and metadata — never for anything that could reconstruct a PIN",
        ],
      },
    ],
  };
}

const CONTENT: Record<AppLocale, SecurityContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getSecurityContent(locale: AppLocale): SecurityContent {
  return CONTENT[locale];
}

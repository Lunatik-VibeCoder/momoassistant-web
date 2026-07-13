import {
  Cpu,
  EyeOff,
  KeyRound,
  Network,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import type { DetailSection } from "@/types";

export interface SecurityContent {
  hero: { eyebrow: string; title: string; description: string };
  securityDomainsHeading: string;
  securityDomains: DetailSection[];
}

function build(locale: AppLocale): SecurityContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Sécurité",
        title: "Une sécurité construite autour d'une seule règle",
        description:
          "Les PIN de transaction Mobile Money ne quittent jamais l'appareil. Chaque autre couche — confiance des appareils, confiance des SIM, politique du moteur d'exécution, journaux d'audit — existe pour protéger cette frontière.",
      },
      securityDomainsHeading: "Domaines de sécurité",
      securityDomains: [
        {
          icon: Smartphone,
          title: "Confiance des appareils",
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
            "Les stations multi-SIM gardent la confiance de chaque ligne indépendante des autres",
          ],
        },
        {
          icon: ShieldCheck,
          title: "Sécurité du moteur d'exécution",
          description:
            "Les politiques du moteur d'exécution définissent ce que Runtime V2 est autorisé à automatiser — et où un humain doit confirmer.",
          points: [
            "Les organisations définissent la politique ; le moteur l'applique, pas l'agent individuel",
            "Chaque étape automatisée est toujours présentée à l'agent pour confirmation avant validation",
            "Les événements de sécurité du moteur d'exécution sont enregistrés dans le journal d'audit au fur et à mesure",
          ],
        },
        {
          icon: KeyRound,
          title: "Sécurité des PIN",
          description:
            "Les PIN Mobile Money sont scellés dans l'Android KeyStore de l'appareil — adossés au matériel lorsque l'appareil le prend en charge.",
          points: [
            "Les PIN ne sont jamais transmis hors de l'appareil",
            "Les PIN ne sont jamais inclus dans la synchronisation cloud, les sauvegardes ou les métadonnées de transaction",
            "Le coffre-fort est limité à chaque appareil ; restaurer une station sur un nouvel appareil signifie ressaisir les PIN, pas les migrer",
          ],
        },
        {
          icon: EyeOff,
          title: "Confidentialité",
          description:
            "La synchronisation cloud existe pour la configuration de la station et les métadonnées de transaction — jamais pour quoi que ce soit qui permettrait de reconstituer un PIN.",
          points: [
            "L'historique des transactions et les journaux d'audit sont limités à votre organisation, régis par les rôles que vous configurez",
            "Aucun pays ni réseau n'est codé en dur — MoMo Assistant est configuré par profil réseau, pas construit autour des hypothèses d'un seul marché",
            "Nous ne vendons ni ne partageons les données de transaction — elles existent au service de votre station, pas d'un tiers",
          ],
        },
        {
          icon: Cpu,
          title: "Technologie",
          description:
            "L'architecture Organisation / Station, Runtime V2 et le modèle de sécurité ci-dessus sont la façon dont les pièces s'assemblent.",
          points: [
            "Android KeyStore pour le matériel de clés sur l'appareil",
            "Runtime V2 comme seul chemin d'exécution pour les séquences USSD automatisées",
            "Organisation → Station → Confiance des appareils → Runtime V2 comme chaîne que traverse chaque transaction automatisée",
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
        "Mobile Money transaction PINs never leave the device. Every other layer — device trust, SIM trust, runtime policy, audit logs — exists to protect that boundary.",
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
        icon: ShieldCheck,
        title: "Runtime Security",
        description:
          "Runtime policies define what Runtime V2 is allowed to automate — and where a human has to confirm.",
        points: [
          "Organizations set the policy; the runtime enforces it, not the individual agent",
          "Every automated step still surfaces to the agent for confirmation before it commits",
          "Security-relevant runtime events are recorded to the audit log as they happen",
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
          "The vault is scoped per device; restoring a station onto a new device means re-entering PINs there, not migrating them",
        ],
      },
      {
        icon: EyeOff,
        title: "Privacy",
        description:
          "Cloud sync exists for station configuration and transaction metadata — not for anything that could reconstruct a PIN.",
        points: [
          "Transaction history and audit logs are scoped to your organization, governed by the roles you configure",
          "No country or network is hardcoded — Mobile Money Assistant is configured per Network Profile, not built around one market's assumptions",
          "We don't sell or share transaction data — it exists to serve your station, not a third party",
        ],
      },
      {
        icon: Cpu,
        title: "Technology",
        description:
          "The Organization / Station architecture, Runtime V2, and the security model above are how the pieces fit together.",
        points: [
          "Android KeyStore for on-device key material",
          "Runtime V2 as the sole execution path for automated USSD sequences",
          "Organization → Station → Device Trust → Runtime V2 as the chain every automated transaction passes through",
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

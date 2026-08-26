import { DatabaseBackup, FlaskConical, ShieldAlert, Wrench } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import type { DetailSection, SpecItem } from "@/types";

export interface DownloadContent {
  hero: { eyebrow: string; title: string; description: string };
  downloadCta: { label: string; note: string };
  betaInfoHeading: string;
  // Live labels for the three per-release facts BetaInfo prepends from the
  // backend (WS-006N follow-up) -- unavailableLabel covers the case where
  // the live fetch fails and there's nothing to show for them.
  currentVersionLabel: string;
  releaseChannelLabel: string;
  lastUpdatedLabel: string;
  // AND-PR-001 follow-up (2026-08-26) -- versionCode moved from a static
  // betaInfo entry (frozen at 10001, stale the moment Beta 2 shipped) to a
  // live one, same treatment version/channel/lastUpdated already got
  // (WS-006N). Sourced from lib/mcp-client.ts's getPublicLatestVersionCode,
  // not PublicAppRelease -- see that function's own comment for why.
  versionCodeLabel: string;
  unavailableLabel: string;
  channelNames: { STABLE: string; BETA: string; RC: string };
  betaInfo: SpecItem[];
  // Not published anywhere yet -- AppRelease has no fileSizeBytes column
  // (out of scope for AND-PR-001 too; would need a schema migration).
  // Kept as its own field, separate from the static betaInfo array, so
  // BetaInfo (features/download-page/beta-info.tsx) can append it to the
  // grid the moment a real size is known, with no
  // structural change to this content shape or that component.
  fileSizeLabel: string;
  fileSize: string | null;
  releaseNotesHeading: string;
  releaseNotesDescription: string;
  beforeYouInstallHeading: string;
  beforeYouInstall: DetailSection[];
  integrity: { heading: string; label: string; value: string | null };
  feedback: { heading: string; description: string; ctaLabel: string; ctaHref: string };
}

// Beta info is sourced from the real, signed release build (RELEASE-001,
// 2026-07-24): TGAMomoAssistant app/build.gradle.kts for version/SDK
// values, and the actual app-release.apk artifact for file size and
// SHA-256 (computed via sha256sum, not estimated). Permission descriptions
// are grounded in the manifest's own inline comments explaining why each
// one is requested.
function build(locale: AppLocale): DownloadContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Bêta publique",
        title: "MoMo Assistant Bêta",
        description:
          "Aidez à façonner l'avenir des opérations Mobile Money. Téléchargez la dernière bêta publique de MoMo Assistant pour Android.",
      },
      downloadCta: {
        label: "Télécharger l'APK de la bêta",
        note: "Gratuit, sans inscription. Nécessite Android 8.0 ou version ultérieure.",
      },
      betaInfoHeading: "Informations sur cette version",
      currentVersionLabel: "Version actuelle",
      releaseChannelLabel: "Canal de diffusion",
      lastUpdatedLabel: "Dernière mise à jour",
      versionCodeLabel: "Code de version",
      unavailableLabel: "Indisponible",
      channelNames: { STABLE: "Stable", BETA: "Bêta publique", RC: "Release Candidate" },
      // "Version actuelle" / "Canal de diffusion" / "Dernière mise à jour" /
      // "Code de version" are no longer static entries here (WS-006N +
      // AND-PR-001 follow-up) -- BetaInfo prepends them live.
      betaInfo: [
        { label: "Android minimum", value: "Android 8.0 (Oreo) ou ultérieur" },
        { label: "Architecture", value: "APK universel (tous les appareils)" },
      ],
      fileSizeLabel: "Taille du fichier",
      fileSize: "22,5 Mo",
      releaseNotesHeading: "Nouveautés de cette bêta",
      releaseNotesDescription:
        "Les jalons déjà livrés, tirés du même changelog que la page Changelog — rien n'est réécrit ici.",
      beforeYouInstallHeading: "Avant d'installer",
      beforeYouInstall: [
        {
          icon: FlaskConical,
          title: "Logiciel bêta",
          description:
            "Il s'agit d'une Release Candidate, pas d'une version finale. Elle expire 90 jours après sa date de compilation et vous invitera à mettre à jour avant cette échéance.",
        },
        {
          icon: Wrench,
          title: "Fonctionnalités encore en développement",
          description:
            "Certaines capacités ne sont pas encore disponibles dans cette bêta :",
          points: [
            "Tableau de bord Fleet Management / opérations en direct",
            "Accès API externe",
            "Tableaux de bord analytiques et KPI",
            "Autonomous Gateway (exécution non supervisée façon « SIM bank »)",
          ],
        },
        {
          icon: ShieldAlert,
          title: "Autorisations Android requises",
          description:
            "Chaque autorisation demandée sert une fonction précise de l'application :",
          points: [
            "Accessibilité — lit et interagit avec l'écran USSD pour que Runtime V2 automatise la séquence de transaction",
            "SMS (lecture et réception) — alimente SMS Intelligence en lisant les SMS de confirmation Mobile Money",
            "Affichage par-dessus les autres applications — pour l'overlay du Mode Silencieux",
            "Biométrie — déverrouille le coffre-fort PIN par empreinte ou visage",
            "État du téléphone — détecte sur quelle SIM une transaction s'exécute pour la gestion multi-SIM",
            "Internet — utilisé uniquement pour la synchronisation locale entre vos appareils, aucune exposition réseau publique",
          ],
        },
        {
          icon: DatabaseBackup,
          title: "Recommandation de sauvegarde",
          description:
            "Si vous installez cette version par-dessus une version existante, lancez d'abord Encrypted Backup depuis l'application pour protéger la configuration de votre station et votre historique de transactions.",
        },
      ],
      integrity: {
        heading: "Vérifier l'intégrité",
        label: "Somme de contrôle SHA-256",
        // Fallback only -- Integrity component prefers release.sha256 live
        // (features/download-page/integrity.tsx). Frozen at whatever build
        // last updated this file by hand (was Beta 1's checksum until this
        // AND-PR-001 follow-up refreshed it to Beta 2's real published sha256).
        value: "64c0e47296deb44f76b2adbe7e630b8b8949ff0543a8996bce51a9f3f3937506",
      },
      feedback: {
        heading: "Vous avez trouvé un bug ?",
        description:
          "C'est un logiciel bêta — si quelque chose casse, dites-le-nous. Les signalements remontent directement à l'équipe qui construit l'application.",
        ctaLabel: "Signaler un bug",
        ctaHref: "/contact",
      },
    };
  }

  return {
    hero: {
      eyebrow: "Public Beta",
      title: "MoMo Assistant Beta",
      description:
        "Help shape the future of Mobile Money operations. Download the latest public Beta of MoMo Assistant for Android.",
    },
    downloadCta: {
      label: "Download Beta APK",
      note: "Free, no signup required. Requires Android 8.0 or later.",
    },
    betaInfoHeading: "About this release",
    currentVersionLabel: "Current version",
    releaseChannelLabel: "Release channel",
    lastUpdatedLabel: "Last updated",
    versionCodeLabel: "Version code",
    unavailableLabel: "Unavailable",
    channelNames: { STABLE: "Stable", BETA: "Public Beta", RC: "Release Candidate" },
    // "Current version" / "Release channel" / "Last updated" / "Version
    // code" are no longer static entries here (WS-006N + AND-PR-001
    // follow-up) -- BetaInfo prepends them live.
    betaInfo: [
      { label: "Android minimum", value: "Android 8.0 (Oreo) or later" },
      { label: "Architecture", value: "Universal APK (all devices)" },
    ],
    fileSizeLabel: "File size",
    fileSize: "22.5 MB",
    releaseNotesHeading: "What's new in this Beta",
    releaseNotesDescription:
      "Milestones already shipped, pulled from the same changelog data as the Changelog page — nothing rewritten here.",
    beforeYouInstallHeading: "Before you install",
    beforeYouInstall: [
      {
        icon: FlaskConical,
        title: "Beta software",
        description:
          "This is a Release Candidate build, not a final release. It expires 90 days after its build date and will prompt you to update before then.",
      },
      {
        icon: Wrench,
        title: "Features still under development",
        description: "A few capabilities aren't in this beta yet:",
        points: [
          "Fleet Management / live operations dashboard",
          "External API access",
          "Analytics and KPI dashboards",
          "Autonomous Gateway (unattended, SIM-bank-style execution)",
        ],
      },
      {
        icon: ShieldAlert,
        title: "Android permissions required",
        description: "Every permission requested maps to a specific feature:",
        points: [
          "Accessibility — reads and interacts with the USSD screen so Runtime V2 can automate the transaction sequence",
          "SMS (read + receive) — powers SMS Intelligence by reading Mobile Money confirmation messages",
          "Display over other apps — powers the Privacy Mode overlay",
          "Biometric — unlocks the PIN vault with your fingerprint or face",
          "Phone state — detects which SIM a transaction is running on for Multi-SIM management",
          "Internet — used only for local sync between your own devices, no public network exposure",
        ],
      },
      {
        icon: DatabaseBackup,
        title: "Backup recommendation",
        description:
          "Installing over an existing version? Run Encrypted Backup from within the app first to protect your station configuration and transaction history.",
      },
    ],
    integrity: {
      heading: "Verify integrity",
      label: "SHA-256 checksum",
      value: "4406baffded6641d89df7d37b35ec0483bc47fd882c036f9546fa495a9f7218a",
    },
    feedback: {
      heading: "Found a bug?",
      description:
        "This is beta software — if something breaks, tell us. Reports go straight to the team building it.",
      ctaLabel: "Report a bug",
      ctaHref: "/contact",
    },
  };
}

const CONTENT: Record<AppLocale, DownloadContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getDownloadContent(locale: AppLocale): DownloadContent {
  return CONTENT[locale];
}

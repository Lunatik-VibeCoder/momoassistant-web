import {
  Award,
  Bot,
  Globe,
  Lock,
  ShieldCheck,
  WifiOff,
  Zap,
} from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import type { WhyPoint } from "@/types";

export interface AboutContent {
  hero: { eyebrow: string; title: string; description: string };
  story: { heading: string; paragraphs: string[] };
  mission: string;
  vision: string;
  missionLabel: string;
  visionLabel: string;
  valuesHeading: string;
  values: WhyPoint[];
}

function build(locale: AppLocale): AboutContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "À propos",
        title: "Pourquoi MoMo Assistant existe",
        description:
          "Conçu par DEUS FEREA pour les agents Mobile Money professionnels qui font tourner leur activité à travers un menu USSD, une séquence manuelle à la fois.",
      },
      story: {
        heading: "Le problème que nous avons voulu résoudre",
        paragraphs: [
          "Les agents Mobile Money professionnels ne gèrent pas un portefeuille grand public — ils font tourner une activité à travers un menu USSD. Chaque transaction signifie composer un code, naviguer dans des menus et ressaisir des numéros à la main, des dizaines ou des centaines de fois par jour, sur autant de SIM et d'appareils qu'une station en fait fonctionner.",
          "C'est lent, et facile à mal faire quand le volume augmente. Mais la réponse ne pouvait pas être de « supprimer l'agent » — Mobile Money est une activité réglementée et de haute confiance, et c'est justement l'agent qui confirme chaque transaction qui la rend fiable. La réponse devait être d'automatiser la partie répétitive tout en laissant l'agent décider.",
          "MoMo Assistant est cette réponse : Runtime V2 exécute la séquence USSD, l'architecture Organisation/Station modélise la structure réelle d'une entreprise, et le moteur de confiance des appareils, SIM Trust et le coffre-fort PIN existent pour qu'aucune de ces automatisations ne se fasse au prix de la sécurité ou de la traçabilité.",
        ],
      },
      mission: "Donner aux agents Mobile Money les moyens d'une automatisation intelligente.",
      vision:
        "Devenir la plateforme de productivité la plus fiable d'Afrique pour les professionnels du Mobile Money.",
      missionLabel: "Mission",
      visionLabel: "Vision",
      valuesHeading: "Ce à quoi nous tenons",
      values: [
        {
          icon: Award,
          title: "Professionnel",
          description:
            "Conçu pour des agents qui font tourner une entreprise, pas pour une application grand public habillée en outil professionnel.",
        },
        {
          icon: ShieldCheck,
          title: "Fiable",
          description:
            "Runtime V2 se comporte de la même façon à chaque exécution — la constance est ce qui rend l'automatisation digne de confiance.",
        },
        {
          icon: Zap,
          title: "Rapide",
          description:
            "L'automatisation existe pour supprimer la saisie manuelle répétitive, pas pour ajouter une couche supplémentaire à contourner.",
        },
        {
          icon: Lock,
          title: "Sécurisé",
          description:
            "Le moteur de confiance des appareils, SIM Trust et le coffre-fort PIN existent pour que la rapidité ne se fasse jamais au prix du contrôle.",
        },
        {
          icon: Bot,
          title: "Automatisation d'abord",
          description:
            "Chaque flux de travail part de la même question : qu'est-ce que Runtime V2 peut automatiser ici en toute sécurité ?",
        },
        {
          icon: Globe,
          title: "Multi-pays",
          description:
            "Aucun pays ni réseau n'est codé en dur — MoMo Assistant est configuré par profil réseau dès le premier jour.",
        },
        {
          icon: WifiOff,
          title: "Pensé pour le hors-ligne",
          description:
            "Les agents travaillent là où la connectivité est instable — l'application est conçue autour de cette réalité, pas d'une hypothèse de connexion permanente.",
        },
      ],
    };
  }

  return {
    hero: {
      eyebrow: "About",
      title: "Why MoMo Assistant exists",
      description:
        "Built by DEUS FEREA for the professional Mobile Money agents who run their business through a USSD menu, one manual sequence at a time.",
    },
    story: {
      heading: "The problem we set out to fix",
      paragraphs: [
        "Professional Mobile Money agents don't run consumer wallets — they run a business through a USSD menu. Every transaction means dialing a code, navigating menus, and re-entering numbers by hand, dozens or hundreds of times a day, across however many SIMs and devices a station is running.",
        "That's slow, and it's easy to get wrong under volume. But the answer couldn't be \"remove the agent\" — Mobile Money is regulated, high-trust work, and the agent confirming each transaction is exactly what makes it trustworthy. The answer had to be automating the repetitive part while keeping the agent as the one who decides.",
        "MoMo Assistant is that answer: Runtime V2 executes the USSD sequence, Organization/Station architecture models how a real business is structured, and Device Trust, SIM Trust, and the PIN Vault exist so none of that automation comes at the cost of security or auditability.",
      ],
    },
    mission: "Empower Mobile Money agents with intelligent automation.",
    vision:
      "Become Africa's most trusted productivity platform for Mobile Money professionals.",
    missionLabel: "Mission",
    visionLabel: "Vision",
    valuesHeading: "What we hold to",
    values: [
      {
        icon: Award,
        title: "Professional",
        description:
          "Built for agents running a business, not a consumer app with a business skin.",
      },
      {
        icon: ShieldCheck,
        title: "Reliable",
        description:
          "Runtime V2 behaves the same way on every run — consistency is what makes automation trustworthy.",
      },
      {
        icon: Zap,
        title: "Fast",
        description:
          "Automation exists to remove repetitive manual entry, not to add another layer to work around.",
      },
      {
        icon: Lock,
        title: "Secure",
        description:
          "Device Trust, SIM Trust, and the PIN Vault exist so speed never comes at the cost of control.",
      },
      {
        icon: Bot,
        title: "Automation first",
        description:
          "Every workflow starts from the question: what can Runtime V2 safely automate here?",
      },
      {
        icon: Globe,
        title: "Multi-country",
        description:
          "No country or network is hardcoded — MoMo Assistant is configured per Network Profile from day one.",
      },
      {
        icon: WifiOff,
        title: "Offline first",
        description:
          "Agents work where connectivity is inconsistent — the app is built around that reality, not around always-on assumptions.",
      },
    ],
  };
}

const CONTENT: Record<AppLocale, AboutContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getAboutContent(locale: AppLocale): AboutContent {
  return CONTENT[locale];
}

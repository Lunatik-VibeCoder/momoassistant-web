import type { AppLocale } from "@/i18n/routing";
import type { FaqItem } from "@/types";

export interface DemoContent {
  hero: { eyebrow: string; title: string; description: string };
  downloadInfo: { heading: string; description: string; points: string[] };
  requestDemoInfo: { heading: string; description: string };
  faq: { heading: string; items: FaqItem[] };
}

function build(locale: AppLocale): DemoContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Démo",
        title: "Essayez par vous-même, ou voyez-la avec nous",
        description:
          "Téléchargez la bêta et testez-la sur vos propres appareils, ou demandez une démonstration avec votre équipe avant de vous engager.",
      },
      downloadInfo: {
        heading: "Télécharger la bêta",
        description:
          "La façon la plus rapide d'évaluer MoMo Assistant — installez-la, configurez une station et automatisez votre première séquence USSD.",
        points: [
          "Gratuit pour une station unique, jusqu'à deux appareils",
          "Le même Runtime V2, moteur de confiance des appareils et coffre-fort PIN que chaque offre payante",
          "Aucune inscription requise pour l'installation — vos données restent les vôtres dès la première transaction",
        ],
      },
      requestDemoInfo: {
        heading: "Demander une démo",
        description:
          "Si vous évaluez MoMo Assistant pour plusieurs stations ou souhaitez voir l'architecture Organisation/Station configurée spécifiquement pour votre entreprise, nous vous guiderons directement.",
      },
      faq: {
        heading: "Questions avant de télécharger ou de nous contacter",
        items: [
          {
            question: "Dois-je parler aux ventes avant de pouvoir utiliser MoMo Assistant ?",
            answer:
              "Non. Débutant est gratuit et en libre-service — téléchargez la bêta et configurez une station sans parler à personne. Les ventes sont là si vous le souhaitez, pas comme un passage obligé.",
          },
          {
            question: "Que se passe-t-il après avoir téléchargé la bêta ?",
            answer:
              "Vous configurerez votre organisation, enregistrerez votre première station et appareil, et pourrez commencer à automatiser des séquences USSD immédiatement avec une station sur l'offre gratuite.",
          },
          {
            question: "La bêta est-elle assez stable pour de vraies transactions ?",
            answer:
              "Le moteur d'automatisation USSD principal (Runtime V2) est stable. Comme pour toute bêta, nous préférons que vous commenciez sur un seul appareil avant de déployer sur toutes vos stations.",
          },
          {
            question: "À quoi dois-je m'attendre lors d'un appel de démo ?",
            answer:
              "Une présentation de l'architecture Organisation/Station et du modèle de sécurité appliqués à votre configuration réelle — combien de stations, appareils et SIM vous gérez aujourd'hui.",
          },
        ],
      },
    };
  }

  return {
    hero: {
      eyebrow: "Demo",
      title: "Try it yourself, or see it with us",
      description:
        "Download the beta and run it on your own devices, or request a walkthrough with your team before you commit to anything.",
    },
    downloadInfo: {
      heading: "Download Beta",
      description:
        "The fastest way to evaluate MoMo Assistant — install it, set up one station, and automate your first USSD sequence.",
      points: [
        "Free for a single station, up to two devices",
        "Same Runtime V2, Device Trust, and PIN Vault as every paid plan",
        "No signup required to install — your data stays yours from the first transaction",
      ],
    },
    requestDemoInfo: {
      heading: "Request a Demo",
      description:
        "If you're evaluating MoMo Assistant for multiple stations or want to see the Organization/Station architecture set up for your business specifically, we'll walk you through it directly.",
    },
    faq: {
      heading: "Questions before you download or talk to us",
      items: [
        {
          question: "Do I need to talk to sales before I can use MoMo Assistant?",
          answer:
            "No. Starter is free and self-serve — download the beta and set up a station without talking to anyone. Sales is there if you want it, not a gate.",
        },
        {
          question: "What happens after I download the beta?",
          answer:
            "You'll set up your organization, register your first station and device, and can start automating USSD sequences immediately with a single station on the free plan.",
        },
        {
          question: "Is the beta stable enough for real transactions?",
          answer:
            "The core USSD automation engine (Runtime V2) is stable. As with any beta, we'd rather you start on a single device before rolling it out across every station.",
        },
        {
          question: "What should I expect from a demo call?",
          answer:
            "A walkthrough of the Organization/Station architecture and security model against your actual setup — how many stations, devices, and SIMs you're running today.",
        },
      ],
    },
  };
}

const CONTENT: Record<AppLocale, DemoContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getDemoContent(locale: AppLocale): DemoContent {
  return CONTENT[locale];
}

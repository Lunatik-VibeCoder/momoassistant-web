import type { AppLocale } from "@/i18n/routing";
import { siteConfig } from "@/lib/constants";
import type { LegalDocument } from "@/types";

export interface LegalContent {
  privacy: LegalDocument;
  terms: LegalDocument;
  cookies: LegalDocument;
  security: LegalDocument;
}

const LAST_UPDATED = "2026-07-13";

function build(locale: AppLocale): LegalContent {
  if (locale === "fr") {
    return {
      privacy: {
        eyebrow: "Légal",
        title: "Politique de confidentialité",
        description:
          "Comment MoMo Assistant traite les données lorsque vous utilisez le site web ou l'application.",
        lastUpdatedLabel: "Dernière mise à jour :",
        lastUpdated: LAST_UPDATED,
        sections: [
          {
            heading: "Qui nous sommes",
            paragraphs: [
              `MoMo Assistant est conçu et édité par DEUS FEREA. Cette politique décrit comment nous traitons les données lorsque vous visitez ${siteConfig.url} ou utilisez l'application MoMo Assistant, actuellement en bêta privée.`,
            ],
          },
          {
            heading: "Données que nous collectons",
            paragraphs: [
              "Le site web ne collecte aujourd'hui aucune donnée d'analyse ou de suivi — aucun fournisseur d'analytique n'est connecté. Lorsque vous nous contactez par e-mail ou via un formulaire, nous recevons les informations que vous nous fournissez volontairement (nom, adresse e-mail, contenu du message).",
              "Dans l'application, la configuration de votre station et les métadonnées de transaction (montants, horodatages, statut) se synchronisent avec le cloud pour les organisations utilisant plusieurs appareils. Les codes PIN Mobile Money ne font jamais partie de cette synchronisation : ils sont scellés dans l'Android KeyStore de l'appareil et ne quittent jamais celui-ci.",
            ],
          },
          {
            heading: "Comment nous utilisons les données",
            paragraphs: [
              "Les données que vous nous fournissez servent uniquement à répondre à vos demandes, faire fonctionner votre compte et vos stations, et améliorer le produit. Nous ne vendons pas vos données et ne les partageons pas avec des tiers à des fins publicitaires.",
            ],
          },
          {
            heading: "Conservation des données",
            paragraphs: [
              "Les métadonnées de transaction et l'historique d'audit sont conservés aussi longtemps que votre organisation utilise MoMo Assistant, afin de préserver un registre fiable pour vos stations. Vous pouvez nous contacter pour toute question sur la conservation ou la suppression de vos données.",
            ],
          },
          {
            heading: "Vos droits",
            paragraphs: [
              "Vous pouvez nous demander à tout moment d'accéder aux données que nous détenons vous concernant, de les corriger ou de les supprimer, dans la limite de ce qui est nécessaire au bon fonctionnement du service. Écrivez-nous à l'adresse ci-dessous.",
            ],
          },
          {
            heading: "Évolution de cette politique",
            paragraphs: [
              "MoMo Assistant est en bêta et ce document évoluera à mesure que le produit passe à la disponibilité générale — notamment lors du lancement de la plateforme SaaS multi-tenant. Nous mettrons à jour la date en haut de cette page à chaque changement significatif.",
            ],
          },
          {
            heading: "Nous contacter",
            paragraphs: [`Pour toute question sur cette politique, écrivez-nous à ${siteConfig.email}.`],
          },
        ],
      },
      terms: {
        eyebrow: "Légal",
        title: "Conditions d'utilisation",
        description:
          "Les conditions qui régissent l'utilisation du site web et de l'application MoMo Assistant.",
        lastUpdatedLabel: "Dernière mise à jour :",
        lastUpdated: LAST_UPDATED,
        sections: [
          {
            heading: "Acceptation des conditions",
            paragraphs: [
              `En utilisant ${siteConfig.url} ou l'application MoMo Assistant, vous acceptez ces conditions. Si vous n'êtes pas d'accord, veuillez ne pas utiliser le service.`,
            ],
          },
          {
            heading: "Statut bêta",
            paragraphs: [
              "MoMo Assistant est actuellement en bêta privée. Cela signifie que des fonctionnalités peuvent changer, que des interruptions de service peuvent survenir, et que nous recommandons de commencer sur un seul appareil avant de déployer l'application sur toutes vos stations.",
            ],
          },
          {
            heading: "Utilisation acceptable",
            paragraphs: [
              "MoMo Assistant est conçu pour des opérateurs Mobile Money professionnels automatisant leurs propres transactions. Vous acceptez de ne pas utiliser le service pour contourner les conditions d'un opérateur de réseau mobile, ni pour toute activité illégale.",
            ],
          },
          {
            heading: "Comptes et organisations",
            paragraphs: [
              "Vous êtes responsable de la sécurité de vos identifiants et des appareils enregistrés dans votre organisation. Device Trust et SIM Trust existent pour vous aider à limiter les accès non autorisés, mais la responsabilité finale de la gestion des accès vous revient.",
            ],
          },
          {
            heading: "Propriété intellectuelle",
            paragraphs: [
              "MoMo Assistant, sa marque et son contenu appartiennent à DEUS FEREA. Vous conservez la propriété des données de transaction générées par votre organisation.",
            ],
          },
          {
            heading: "Limitation de responsabilité",
            paragraphs: [
              "MoMo Assistant automatise des séquences USSD mais ne remplace pas la confirmation de l'agent à chaque transaction. Dans la mesure permise par la loi, DEUS FEREA ne peut être tenu responsable des pertes résultant d'une utilisation du service en dehors de son usage prévu.",
            ],
          },
          {
            heading: "Modifications",
            paragraphs: [
              "Nous pouvons mettre à jour ces conditions à mesure que le produit évolue vers la disponibilité générale. Les changements significatifs seront reflétés par la date en haut de cette page.",
            ],
          },
          {
            heading: "Nous contacter",
            paragraphs: [`Des questions sur ces conditions ? Écrivez-nous à ${siteConfig.email}.`],
          },
        ],
      },
      cookies: {
        eyebrow: "Légal",
        title: "Politique de cookies",
        description:
          "Ce que le site web momoassistant.app stocke dans votre navigateur, et pourquoi.",
        lastUpdatedLabel: "Dernière mise à jour :",
        lastUpdated: LAST_UPDATED,
        sections: [
          {
            heading: "Notre approche",
            paragraphs: [
              "Ce site web n'utilise aucun cookie publicitaire ou de suivi. Aucun fournisseur d'analytique tiers n'est connecté aujourd'hui — le suivi des interactions dans le code du site est actuellement un module vide, prêt à être branché sur un fournisseur si nous en ajoutons un plus tard.",
            ],
          },
          {
            heading: "Cookie strictement nécessaire",
            paragraphs: [
              "Le site utilise un seul cookie technique, NEXT_LOCALE, pour mémoriser votre préférence de langue (anglais ou français) entre vos visites. Il ne contient aucune information personnelle et n'est pas utilisé à des fins de suivi.",
            ],
          },
          {
            heading: "Si nous ajoutons un fournisseur d'analytique",
            paragraphs: [
              "Si nous connectons un fournisseur d'analytique à l'avenir, cette page sera mise à jour avant tout déploiement, avec le nom du fournisseur et la finalité des cookies concernés.",
            ],
          },
          {
            heading: "Gérer les cookies",
            paragraphs: [
              "Vous pouvez supprimer ou bloquer les cookies via les paramètres de votre navigateur à tout moment. Bloquer le cookie NEXT_LOCALE signifie simplement que le site redemandera votre préférence de langue à chaque visite.",
            ],
          },
          {
            heading: "Nous contacter",
            paragraphs: [`Des questions sur cette politique ? Écrivez-nous à ${siteConfig.email}.`],
          },
        ],
      },
      security: {
        eyebrow: "Légal",
        title: "Déclaration de sécurité",
        description:
          "Une déclaration formelle de notre modèle de sécurité — voir aussi la page Sécurité pour une présentation produit.",
        lastUpdatedLabel: "Dernière mise à jour :",
        lastUpdated: LAST_UPDATED,
        sections: [
          {
            heading: "Principe directeur",
            paragraphs: [
              "MoMo Assistant est construit autour d'une règle : les codes PIN de transaction Mobile Money ne quittent jamais l'appareil. Chaque décision de sécurité découle de cette règle.",
            ],
          },
          {
            heading: "Sécurité des identifiants",
            paragraphs: [
              "Les PIN Mobile Money sont scellés dans l'Android KeyStore de l'appareil, adossé au matériel lorsque l'appareil le prend en charge. Ils ne sont jamais transmis hors de l'appareil, jamais inclus dans la synchronisation cloud, les sauvegardes ou les métadonnées de transaction.",
            ],
          },
          {
            heading: "Confiance des appareils et des SIM",
            paragraphs: [
              "Un appareil doit être vérifié et approuvé avant de pouvoir exécuter des transactions automatisées pour une station. Les SIM sont liées et vérifiées par appareil, empêchant qu'un échange de SIM non autorisé ne prenne le contrôle d'une ligne en silence.",
            ],
          },
          {
            heading: "Contrôle du moteur d'exécution",
            paragraphs: [
              "Les organisations définissent les politiques du moteur d'exécution ; le moteur les applique, et non l'agent individuel. Chaque étape automatisée est toujours présentée à l'agent pour confirmation avant validation.",
            ],
          },
          {
            heading: "Journalisation et audit",
            paragraphs: [
              "Chaque événement lié à la sécurité — inscription d'un appareil, vérification d'une SIM, modification de politique — est enregistré dans le journal d'audit de l'organisation au fur et à mesure.",
            ],
          },
          {
            heading: "Signaler un problème",
            paragraphs: [
              `Si vous pensez avoir trouvé une faille de sécurité, contactez-nous directement à ${siteConfig.email} plutôt que de la divulguer publiquement — nous répondrons dès que possible.`,
            ],
          },
        ],
      },
    };
  }

  return {
    privacy: {
      eyebrow: "Legal",
      title: "Privacy Policy",
      description:
        "How MoMo Assistant handles data when you use the website or the app.",
      lastUpdatedLabel: "Last updated:",
      lastUpdated: LAST_UPDATED,
      sections: [
        {
          heading: "Who we are",
          paragraphs: [
            `MoMo Assistant is built and published by DEUS FEREA. This policy describes how we handle data when you visit ${siteConfig.url} or use the MoMo Assistant app, currently in private beta.`,
          ],
        },
        {
          heading: "Data we collect",
          paragraphs: [
            "The website does not collect any analytics or tracking data today — no analytics provider is connected. When you contact us by email or through a form, we receive whatever information you choose to share (name, email address, message content).",
            "In the app, your station configuration and transaction metadata (amounts, timestamps, status) sync to the cloud for organizations running multiple devices. Mobile Money PINs are never part of that sync — they're sealed in the device's Android KeyStore and never leave it.",
          ],
        },
        {
          heading: "How we use data",
          paragraphs: [
            "Data you provide is used only to respond to your requests, run your account and stations, and improve the product. We don't sell your data or share it with third parties for advertising purposes.",
          ],
        },
        {
          heading: "Data retention",
          paragraphs: [
            "Transaction metadata and audit history are retained for as long as your organization uses MoMo Assistant, to preserve a reliable record for your stations. Reach out to us with any questions about retaining or deleting your data.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You can ask us at any time to access, correct, or delete data we hold about you, subject to what's needed to keep the service running. Write to us at the address below.",
          ],
        },
        {
          heading: "Changes to this policy",
          paragraphs: [
            "MoMo Assistant is in beta and this document will evolve as the product moves toward general availability — including when the multi-tenant SaaS platform launches. We'll update the date at the top of this page with any material change.",
          ],
        },
        {
          heading: "Contact us",
          paragraphs: [`Questions about this policy? Write to us at ${siteConfig.email}.`],
        },
      ],
    },
    terms: {
      eyebrow: "Legal",
      title: "Terms of Service",
      description:
        "The terms that govern using the MoMo Assistant website and app.",
      lastUpdatedLabel: "Last updated:",
      lastUpdated: LAST_UPDATED,
      sections: [
        {
          heading: "Accepting these terms",
          paragraphs: [
            `By using ${siteConfig.url} or the MoMo Assistant app, you agree to these terms. If you don't agree, please don't use the service.`,
          ],
        },
        {
          heading: "Beta status",
          paragraphs: [
            "MoMo Assistant is currently in private beta. That means features may change, service interruptions can happen, and we recommend starting on a single device before rolling the app out across every station.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "MoMo Assistant is built for professional Mobile Money operators automating their own transactions. You agree not to use the service to circumvent a mobile network operator's terms, or for any unlawful activity.",
          ],
        },
        {
          heading: "Accounts and organizations",
          paragraphs: [
            "You're responsible for the security of your credentials and the devices enrolled in your organization. Device Trust and SIM Trust exist to help limit unauthorized access, but managing access ultimately remains your responsibility.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "MoMo Assistant, its brand, and its content belong to DEUS FEREA. You retain ownership of the transaction data your organization generates.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "MoMo Assistant automates USSD sequences but doesn't replace agent confirmation on every transaction. To the extent permitted by law, DEUS FEREA isn't liable for losses arising from use of the service outside its intended purpose.",
          ],
        },
        {
          heading: "Changes to these terms",
          paragraphs: [
            "We may update these terms as the product evolves toward general availability. Material changes will be reflected in the date at the top of this page.",
          ],
        },
        {
          heading: "Contact us",
          paragraphs: [`Questions about these terms? Write to us at ${siteConfig.email}.`],
        },
      ],
    },
    cookies: {
      eyebrow: "Legal",
      title: "Cookie Policy",
      description:
        "What the momoassistant.app website stores in your browser, and why.",
      lastUpdatedLabel: "Last updated:",
      lastUpdated: LAST_UPDATED,
      sections: [
        {
          heading: "Our approach",
          paragraphs: [
            "This website doesn't use advertising or tracking cookies. No third-party analytics provider is connected today — the interaction-tracking code on the site is currently an empty stub, ready to be wired up to a provider if we add one later.",
          ],
        },
        {
          heading: "Strictly necessary cookie",
          paragraphs: [
            "The site sets one functional cookie, NEXT_LOCALE, to remember your language preference (English or French) between visits. It doesn't contain any personal information and isn't used for tracking.",
          ],
        },
        {
          heading: "If we add an analytics provider",
          paragraphs: [
            "If we connect an analytics provider in the future, this page will be updated before that rolls out, naming the provider and what the cookies are used for.",
          ],
        },
        {
          heading: "Managing cookies",
          paragraphs: [
            "You can delete or block cookies through your browser settings at any time. Blocking the NEXT_LOCALE cookie just means the site will ask for your language preference again on each visit.",
          ],
        },
        {
          heading: "Contact us",
          paragraphs: [`Questions about this policy? Write to us at ${siteConfig.email}.`],
        },
      ],
    },
    security: {
      eyebrow: "Legal",
      title: "Security Statement",
      description:
        "A formal statement of our security model — see also the Security page for a product overview.",
      lastUpdatedLabel: "Last updated:",
      lastUpdated: LAST_UPDATED,
      sections: [
        {
          heading: "Guiding principle",
          paragraphs: [
            "MoMo Assistant is built around one rule: Mobile Money transaction PINs never leave the device. Every security decision follows from that rule.",
          ],
        },
        {
          heading: "Credential security",
          paragraphs: [
            "Mobile Money PINs are sealed in the device's Android KeyStore, hardware-backed where the device supports it. They're never transmitted off the device, never included in cloud sync, backups, or transaction metadata.",
          ],
        },
        {
          heading: "Device and SIM trust",
          paragraphs: [
            "A device has to be verified and trusted before it can run automated transactions for a station. SIMs are bound and verified per device, preventing an unauthorized SIM swap from silently taking over a line.",
          ],
        },
        {
          heading: "Runtime control",
          paragraphs: [
            "Organizations define runtime policies; the runtime enforces them, not the individual agent. Every automated step still surfaces to the agent for confirmation before it commits.",
          ],
        },
        {
          heading: "Logging and audit",
          paragraphs: [
            "Every security-relevant event — a device enrollment, a SIM verification, a policy change — is recorded to the organization's audit log as it happens.",
          ],
        },
        {
          heading: "Reporting an issue",
          paragraphs: [
            `If you believe you've found a security issue, contact us directly at ${siteConfig.email} rather than disclosing it publicly — we'll respond as soon as we can.`,
          ],
        },
      ],
    },
  };
}

const CONTENT: Record<AppLocale, LegalContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getLegalContent(locale: AppLocale): LegalContent {
  return CONTENT[locale];
}

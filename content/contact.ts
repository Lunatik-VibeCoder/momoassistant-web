import { Briefcase, Handshake, LifeBuoy } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import { siteConfig } from "@/lib/constants";
import type { ContactChannel } from "@/types";

export interface ContactContent {
  hero: { eyebrow: string; title: string; description: string };
  channelsSrHeading: string;
  channels: ContactChannel[];
}

// All channels route to one inbox today (see lib/constants.ts) — the
// pre-filled subject keeps context and triage easy without pretending
// separate dedicated addresses exist yet.
function build(locale: AppLocale): ContactContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Contact",
        title: "Parlez à une vraie personne",
        description:
          "Que vous évaluiez MoMo Assistant pour vos stations, que vous l'utilisiez déjà, ou que vous ayez simplement une question — choisissez le canal qui vous convient.",
      },
      channelsSrHeading: "Canaux de contact",
      channels: [
        {
          icon: Briefcase,
          title: "Ventes",
          description:
            "Vous évaluez Business ou Enterprise pour plusieurs stations ? Parlons de vos besoins.",
          actionLabel: "Écrire aux ventes",
          href: `mailto:${siteConfig.email}?subject=${encodeURIComponent("Demande commerciale")}`,
          external: true,
        },
        {
          icon: LifeBuoy,
          title: "Support",
          description:
            "Vous utilisez déjà MoMo Assistant et rencontrez un problème ? Dites-nous ce qui se passe, on vous aide.",
          actionLabel: "Écrire au support",
          href: `mailto:${siteConfig.email}?subject=${encodeURIComponent("Demande de support")}`,
          external: true,
        },
        {
          icon: Handshake,
          title: "Demandes générales",
          description:
            "Partenariats, presse, ou tout ce qui ne relève ni des ventes ni du support.",
          actionLabel: "Nous écrire",
          href: `mailto:${siteConfig.email}?subject=${encodeURIComponent("Demande générale")}`,
          external: true,
        },
      ],
    };
  }

  return {
    hero: {
      eyebrow: "Contact",
      title: "Talk to a real person",
      description:
        "Whether you're evaluating MoMo Assistant for your stations, already running it, or just have a question — pick the channel that fits.",
    },
    channelsSrHeading: "Contact channels",
    channels: [
      {
        icon: Briefcase,
        title: "Sales",
        description:
          "Evaluating Business or Enterprise for multiple stations? Let's talk through what you need.",
        actionLabel: "Email Sales",
        href: `mailto:${siteConfig.email}?subject=${encodeURIComponent("Sales inquiry")}`,
        external: true,
      },
      {
        icon: LifeBuoy,
        title: "Support",
        description:
          "Already running MoMo Assistant and hit an issue? Tell us what's happening and we'll help.",
        actionLabel: "Email Support",
        href: `mailto:${siteConfig.email}?subject=${encodeURIComponent("Support request")}`,
        external: true,
      },
      {
        icon: Handshake,
        title: "Business inquiries",
        description:
          "Partnerships, press, or anything that doesn't fit Sales or Support.",
        actionLabel: "Email Us",
        href: `mailto:${siteConfig.email}?subject=${encodeURIComponent("Business inquiry")}`,
        external: true,
      },
    ],
  };
}

const CONTENT: Record<AppLocale, ContactContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getContactContent(locale: AppLocale): ContactContent {
  return CONTENT[locale];
}

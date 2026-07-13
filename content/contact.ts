import { Briefcase, Handshake, LifeBuoy } from "lucide-react";

import { siteConfig } from "@/lib/constants";
import type { ContactChannel } from "@/types";

export const contactHero = {
  eyebrow: "Contact",
  title: "Talk to a real person",
  description:
    "Whether you're evaluating MoMo Assistant for your stations, already running it, or just have a question — pick the channel that fits.",
};

// All channels route to one inbox today (see lib/constants.ts) — the
// pre-filled subject keeps context and triage easy without pretending
// separate dedicated addresses exist yet.
export const contactChannels: ContactChannel[] = [
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
];

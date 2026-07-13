import { Globe2, MessageSquareHeart, Rocket, Timer } from "lucide-react";

import type { WhyPoint } from "@/types";

export const careersHero = {
  eyebrow: "Careers",
  title: "Help build the operating system for Mobile Money agents",
  description:
    "MoMo Assistant is early — small team, real users, a lot still to build. Here's what working on it looks like.",
};

export const culture: WhyPoint[] = [
  {
    icon: Rocket,
    title: "Small team, real impact",
    description:
      "What you ship reaches actual stations processing real transactions — not a backlog waiting for a bigger team to prioritize it.",
  },
  {
    icon: Globe2,
    title: "Built for how Africa actually works",
    description:
      "No country or network hardcoded, offline-first by default — the product is designed around real operating conditions, not assumptions.",
  },
  {
    icon: MessageSquareHeart,
    title: "Confident, calm, no jargon",
    description:
      "The same voice we write the product in is how we work internally — direct, plain language, no corporate filler.",
  },
];

export const benefits: WhyPoint[] = [
  {
    icon: Timer,
    title: "Flexible, remote-first",
    description: "Work from where you're effective. We care about the work, not hours logged.",
  },
  {
    icon: Rocket,
    title: "Ownership over your area",
    description: "Small team means real scope — you'll own outcomes, not just tickets.",
  },
];

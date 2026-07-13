import { BookOpen, Compass, Layers, Rocket } from "lucide-react";

import type { IconListItem, NavLink } from "@/types";

export const docsHero = {
  eyebrow: "Docs",
  title: "Documentation",
  description:
    "Reference material for setting up your organization, understanding the architecture, and integrating with MoMo Assistant. The full documentation center is still being built out.",
};

export const docCategories: (IconListItem & NavLink)[] = [
  {
    icon: Rocket,
    title: "Guides",
    description:
      "Onboarding your organization, registering devices and SIMs, and running your first automated transaction.",
    label: "Guides",
    href: "/docs/guides",
  },
  {
    icon: Layers,
    title: "Architecture",
    description:
      "How Organizations, Stations, Device Trust, and Runtime V2 fit together — the same model covered on the How It Works page, in more technical depth.",
    label: "Architecture",
    href: "/docs/architecture",
  },
  {
    icon: Compass,
    title: "Tutorials",
    description:
      "Step-by-step walkthroughs for common setups: multi-SIM stations, device restoration, and configuring runtime policies.",
    label: "Tutorials",
    href: "/docs/tutorials",
  },
  {
    icon: BookOpen,
    title: "API",
    description:
      "Reference for integrating with MoMo Assistant programmatically. Published alongside the SaaS platform release.",
    label: "API",
    href: "/docs/api",
  },
];

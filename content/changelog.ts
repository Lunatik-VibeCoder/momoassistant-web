import type { RoadmapMilestone } from "@/types";

export const changelogHero = {
  eyebrow: "Changelog",
  title: "Product updates and what's next",
  description:
    "Where MoMo Assistant is today, and the roadmap toward general availability.",
};

// High-level milestones only — internal sprint/build detail stays in
// engineering docs, not on the public site.
export const roadmap: RoadmapMilestone[] = [
  {
    version: "v0.9.0",
    label: "Core Complete",
    status: "shipped",
    description:
      "The USSD automation engine (Runtime V2), transaction reconciliation, and the security model — Device Trust, SIM Trust, and the PIN Vault — reached stability.",
  },
  {
    version: "v0.9.5",
    label: "Private Beta",
    status: "in-progress",
    description:
      "Closed beta rolling out to a limited group of stations ahead of general availability.",
  },
  {
    version: "v1.0.0",
    label: "Public Stable",
    status: "planned",
    description:
      "General availability — open beta enrollment closes, MoMo Assistant becomes available to every station.",
  },
  {
    version: "v1.1.0",
    label: "Agent Tools & UX",
    status: "planned",
    description:
      "Professional calculator, cash counter, and other day-to-day tools built for the agent workflow, alongside broader UX polish.",
  },
  {
    version: "v2.0.0",
    label: "SaaS Platform",
    status: "planned",
    description:
      "Multi-tenant backend, authentication, and subscription management — the foundation for Business and Enterprise plans at scale.",
  },
];

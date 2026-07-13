import type { FaqItem } from "@/types";

export const demoHero = {
  eyebrow: "Demo",
  title: "Try it yourself, or see it with us",
  description:
    "Download the beta and run it on your own devices, or request a walkthrough with your team before you commit to anything.",
};

export const downloadInfo = {
  heading: "Download Beta",
  description:
    "The fastest way to evaluate MoMo Assistant — install it, set up one station, and automate your first USSD sequence.",
  points: [
    "Free for a single station, up to two devices",
    "Same Runtime V2, Device Trust, and PIN Vault as every paid plan",
    "No signup required to install — your data stays yours from the first transaction",
  ],
};

export const requestDemoInfo = {
  heading: "Request a Demo",
  description:
    "If you're evaluating MoMo Assistant for multiple stations or want to see the Organization/Station architecture set up for your business specifically, we'll walk you through it directly.",
};

export const demoFaq: FaqItem[] = [
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
];

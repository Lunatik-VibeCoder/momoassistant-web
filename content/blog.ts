import type { BlogPost } from "@/types";

export const blogHero = {
  eyebrow: "Blog",
  title: "Notes from the team",
  description:
    "Product announcements and technical notes on how MoMo Assistant is built.",
};

export const blogPosts: BlogPost[] = [
  {
    slug: "introducing-momo-assistant",
    title: "Introducing MoMo Assistant",
    excerpt:
      "Why we built an operating system for professional Mobile Money agents instead of another consumer wallet — and what's shipping in the private beta.",
    category: "Announcements",
    publishedAt: "2026-07-01",
    readingTimeMinutes: 4,
    content: [
      "Professional Mobile Money agents don't run a consumer wallet — they run a business through a USSD menu. Every transaction means dialing a code, navigating menus, and re-entering numbers by hand, often dozens of times a day across multiple SIMs and devices.",
      "That repetition is where MoMo Assistant starts. Runtime V2, our USSD execution engine, automates the sequence itself — dialing, navigating, entering amounts — while the agent stays the one who confirms every transaction before it commits. Automation removes the retyping, not the decision.",
      "The rest of the product follows from how professional stations actually operate. Organization/Station architecture models a business with multiple agents, devices, and SIMs, not a single user. Device Trust and SIM Trust mean a device or SIM has to be verified before it can transact. And the one rule everything else is built around: Mobile Money transaction PINs are sealed in the Android KeyStore on-device and never touch the cloud.",
      "We're opening a private beta to a limited group of stations first. If you're running a station today and want in, the Demo page is the fastest way to reach us — or just download the beta and try it on a single device.",
    ],
  },
  {
    slug: "how-runtime-v2-keeps-automation-predictable",
    title: "How Runtime V2 keeps automation predictable",
    excerpt:
      "Consistent timing, one execution path, and a hard rule about what gets automated versus what always requires the agent.",
    category: "Product",
    publishedAt: "2026-07-08",
    readingTimeMinutes: 5,
    content: [
      "Automating a USSD sequence sounds simple until you've watched one fail halfway through — a menu that took a beat longer to load, a confirmation screen that appeared where a balance did last time. Runtime V2 exists to make that reliable.",
      "Every automated transaction, regardless of station or SIM, runs through the same engine. That consistency is deliberate: behavior shouldn't vary because one agent's device is a generation older than another's, or because a station is running its third SIM instead of its first.",
      "Runtime V2 doesn't decide what it's allowed to automate on its own. Organizations define runtime policies — what can run unattended, and where a human has to confirm — and the runtime enforces that, rather than leaving it to individual agent judgment. Every automated step still surfaces to the agent for confirmation before it commits, and security-relevant runtime events are written to the audit log as they happen.",
      "The result is automation that removes repetitive manual entry without removing the agent from the loop — which is the whole point. A Mobile Money business runs on trust, and trust means someone accountable is confirming every transaction, automated or not.",
    ],
  },
];

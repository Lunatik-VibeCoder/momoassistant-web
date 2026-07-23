import type { AppLocale } from "@/i18n/routing";
import type { BlogPost } from "@/types";

export interface BlogContent {
  hero: { eyebrow: string; title: string; description: string };
  posts: BlogPost[];
}

function build(locale: AppLocale): BlogContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Blog",
        title: "Notes de l'équipe",
        description:
          "Annonces produit et notes techniques sur la façon dont MoMo Assistant est construit.",
      },
      posts: [
        {
          slug: "introducing-momo-assistant",
          title: "Présentation de MoMo Assistant",
          excerpt:
            "Pourquoi nous avons construit un système d'exploitation pour les agents Mobile Money professionnels plutôt qu'un nouveau portefeuille grand public — et ce qui arrive dans la bêta privée.",
          category: "Annonces",
          publishedAt: "2026-07-01",
          readingTimeMinutes: 4,
          content: [
            "Les agents Mobile Money professionnels ne gèrent pas un portefeuille grand public — ils font tourner une activité à travers un menu USSD. Chaque transaction signifie composer un code, naviguer dans des menus et ressaisir des numéros à la main, souvent des dizaines de fois par jour sur plusieurs SIM et appareils.",
            "Cette répétition, c'est le point de départ de MoMo Assistant. Runtime V2, notre moteur d'exécution USSD, automatise la séquence elle-même — composer, naviguer, saisir les montants — tandis que l'agent reste celui qui confirme chaque transaction avant sa validation. L'automatisation supprime la ressaisie, pas la décision.",
            "Le reste du produit découle de la façon dont les stations professionnelles fonctionnent réellement. L'architecture Organisation/Station modélise une entreprise avec plusieurs agents, appareils et SIM, pas un utilisateur unique. Device Trust et SIM Trust signifient qu'un appareil ou une SIM doit être vérifié avant de pouvoir transiger. Et la règle autour de laquelle tout le reste est construit : les PIN de transaction Mobile Money sont scellés dans l'Android KeyStore de l'appareil et ne touchent jamais le cloud.",
            "Nous ouvrons d'abord une bêta privée à un groupe restreint de stations. Si vous gérez une station aujourd'hui et souhaitez y participer, la page Démo est le moyen le plus rapide de nous joindre — ou téléchargez simplement la bêta et testez-la sur un seul appareil.",
          ],
        },
        {
          slug: "how-runtime-v2-keeps-automation-predictable",
          title: "Comment Runtime V2 garde l'automatisation prévisible",
          excerpt:
            "Un minutage constant, un seul chemin d'exécution, et une règle stricte sur ce qui est automatisé versus ce qui requiert toujours l'agent.",
          category: "Produit",
          publishedAt: "2026-07-08",
          readingTimeMinutes: 5,
          content: [
            "Automatiser une séquence USSD semble simple jusqu'à ce qu'on en voie une échouer à mi-chemin — un menu qui a mis un peu plus de temps à charger, un écran de confirmation apparu là où un solde s'affichait la dernière fois. Runtime V2 existe pour rendre cela fiable.",
            "Chaque transaction automatisée, quelle que soit la station ou la SIM, passe par le même moteur. Cette constance est délibérée : le comportement ne devrait pas varier parce que l'appareil d'un agent a une génération de moins qu'un autre, ou parce qu'une station utilise sa troisième SIM plutôt que sa première.",
            "Runtime V2 ne décide pas seul de ce qu'il est autorisé à automatiser. Les organisations définissent des politiques du moteur d'exécution — ce qui peut tourner sans supervision, et où un humain doit confirmer — et le moteur les applique, plutôt que de laisser cela au jugement individuel de l'agent. Chaque étape automatisée est toujours présentée à l'agent pour confirmation avant validation, et les événements du moteur liés à la sécurité sont inscrits au journal d'audit au fur et à mesure.",
            "Le résultat est une automatisation qui supprime la saisie manuelle répétitive sans retirer l'agent de la boucle — ce qui est tout l'enjeu. Une entreprise Mobile Money fonctionne sur la confiance, et la confiance signifie qu'une personne responsable confirme chaque transaction, automatisée ou non.",
          ],
        },
      ],
    };
  }

  return {
    hero: {
      eyebrow: "Blog",
      title: "Notes from the team",
      description:
        "Product announcements and technical notes on how MoMo Assistant is built.",
    },
    posts: [
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
    ],
  };
}

const CONTENT: Record<AppLocale, BlogContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getBlogContent(locale: AppLocale): BlogContent {
  return CONTENT[locale];
}

import { defineRouting } from "next-intl/routing";

// English is default (brand kit and all existing copy are authored in
// English; Ghana — an English-speaking market — is the product's first
// real market). French is the secondary locale. Both always carry a URL
// prefix (/en/..., /fr/...) rather than hiding the default locale's prefix,
// so every page has one canonical, shareable, crawlable URL per language.
export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];

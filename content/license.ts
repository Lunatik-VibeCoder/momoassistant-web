import type { AppLocale } from "@/i18n/routing";

export interface LicenseContent {
  title: string;
  noLicenseTitle: string;
  noLicenseBody: string;
  fields: { plan: string; price: string; seats: string; issued: string; expires: string };
  unlimitedSeats: string;
  noExpiry: string;
}

export function getLicenseContent(locale: AppLocale): LicenseContent {
  if (locale === "fr") {
    return {
      title: "Licence",
      noLicenseTitle: "Aucune licence",
      noLicenseBody: "Votre organisation n'a pas encore de licence.",
      fields: { plan: "Forfait", price: "Prix", seats: "Sièges", issued: "Émise le", expires: "Expire le" },
      unlimitedSeats: "Illimité",
      noExpiry: "Aucune expiration",
    };
  }
  return {
    title: "License",
    noLicenseTitle: "No license",
    noLicenseBody: "Your organization doesn't have a license yet.",
    fields: { plan: "Plan", price: "Price", seats: "Seats", issued: "Issued", expires: "Expires" },
    unlimitedSeats: "Unlimited",
    noExpiry: "No expiry",
  };
}

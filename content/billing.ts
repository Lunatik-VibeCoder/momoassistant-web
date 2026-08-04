import type { AppLocale } from "@/i18n/routing";

export interface BillingContent {
  title: string;
  emptyTitle: string;
  emptyBody: string;
  fields: { status: string; issued: string; due: string; paid: string; lineItems: string };
  notPaid: string;
}

export function getBillingContent(locale: AppLocale): BillingContent {
  if (locale === "fr") {
    return {
      title: "Facturation",
      emptyTitle: "Aucune facture",
      emptyBody: "Aucune facture n'a encore été émise pour votre organisation.",
      fields: { status: "Statut", issued: "Émise le", due: "Échéance", paid: "Payée le", lineItems: "Détails" },
      notPaid: "Non payée",
    };
  }
  return {
    title: "Billing",
    emptyTitle: "No invoices",
    emptyBody: "No invoice has been issued for your organization yet.",
    fields: { status: "Status", issued: "Issued", due: "Due", paid: "Paid", lineItems: "Line items" },
    notPaid: "Not paid",
  };
}

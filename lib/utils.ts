import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type { AppLocale } from "@/i18n/routing"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const DATE_LOCALE: Record<AppLocale, string> = {
  en: "en-US",
  fr: "fr-FR",
}

// WS-006 -- no date-formatting library is installed (deliberate, per the
// mini-sprint's own decision not to add one for a handful of date fields);
// native Intl covers everything the Customer Hub pages need.
export function formatDate(locale: AppLocale, value: string | Date | null): string {
  if (!value) return "—"
  return new Intl.DateTimeFormat(DATE_LOCALE[locale], { dateStyle: "medium" }).format(
    new Date(value)
  )
}

export function formatCurrency(locale: AppLocale, amount: string | number, currency: string): string {
  return new Intl.NumberFormat(DATE_LOCALE[locale], { style: "currency", currency }).format(
    Number(amount)
  )
}

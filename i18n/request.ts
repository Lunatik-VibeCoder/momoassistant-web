import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";

// Page-specific copy lives in content/*.ts (locale-keyed there, alongside
// the icons/hrefs it's paired with — see CONTENT_GUIDE.md). This message
// catalog is deliberately small: only the handful of generic, reused-
// everywhere UI strings (skip link, breadcrumb "Home", 404/500 pages,
// language switcher) that don't belong to any one page's content file.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

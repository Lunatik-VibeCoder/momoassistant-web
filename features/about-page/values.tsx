import { getLocale } from "next-intl/server";

import { IconPointGrid } from "@/components/shared/icon-point-grid";
import { getAboutContent } from "@/content/about";
import type { AppLocale } from "@/i18n/routing";

export async function Values() {
  const locale = (await getLocale()) as AppLocale;
  const { values, valuesHeading } = getAboutContent(locale);

  return (
    <IconPointGrid id="values-heading" heading={valuesHeading} items={values} />
  );
}

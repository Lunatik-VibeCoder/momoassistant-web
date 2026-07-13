import { getLocale } from "next-intl/server";

import { IconPointGrid } from "@/components/shared/icon-point-grid";
import { getCareersContent } from "@/content/careers";
import type { AppLocale } from "@/i18n/routing";

export async function Culture() {
  const locale = (await getLocale()) as AppLocale;
  const { culture, cultureHeading } = getCareersContent(locale);

  return (
    <IconPointGrid id="culture-heading" heading={cultureHeading} items={culture} />
  );
}

import { getLocale } from "next-intl/server";

import { IconPointGrid } from "@/components/shared/icon-point-grid";
import { getCareersContent } from "@/content/careers";
import type { AppLocale } from "@/i18n/routing";

export async function Benefits() {
  const locale = (await getLocale()) as AppLocale;
  const { benefits, benefitsHeading } = getCareersContent(locale);

  return (
    <IconPointGrid
      id="benefits-heading"
      heading={benefitsHeading}
      items={benefits}
      className="bg-muted/40"
    />
  );
}

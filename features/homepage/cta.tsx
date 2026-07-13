import { getLocale } from "next-intl/server";

import { CtaBand } from "@/components/shared/cta-band";
import { getHomepageContent } from "@/content/homepage";
import type { AppLocale } from "@/i18n/routing";
import { siteConfig } from "@/lib/constants";

export async function Cta() {
  const locale = (await getLocale()) as AppLocale;
  const { finalCta } = getHomepageContent(locale);

  return (
    <CtaBand
      heading={finalCta.heading}
      description={finalCta.description}
      primaryCta={{
        label: finalCta.primaryCtaLabel,
        href: siteConfig.downloadApkUrl,
        external: true,
        event: "download_apk_final_cta",
      }}
      secondaryCta={{
        label: finalCta.secondaryCta.label,
        href: finalCta.secondaryCta.href,
        event: "final_cta_talk_to_us",
      }}
    />
  );
}

import { CtaBand } from "@/components/shared/cta-band";
import { finalCta } from "@/content/homepage";
import { siteConfig } from "@/lib/constants";

export function Cta() {
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

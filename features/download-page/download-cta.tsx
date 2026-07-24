import { Download } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { getDownloadContent } from "@/content/download";
import type { AppLocale } from "@/i18n/routing";
import { siteConfig } from "@/lib/constants";

export async function DownloadCta() {
  const locale = (await getLocale()) as AppLocale;
  const { downloadCta } = getDownloadContent(locale);

  return (
    <Section className="pt-0 pb-12 sm:pb-16" aria-labelledby="download-cta-heading">
      <h2 id="download-cta-heading" className="sr-only">
        {downloadCta.label}
      </h2>
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
        <CTAButton
          size="lg"
          href={siteConfig.downloadApkUrl}
          external
          event="download_apk_download_page"
          className="h-14 px-10 text-base"
        >
          <Download aria-hidden="true" />
          {downloadCta.label}
        </CTAButton>
        <p className="text-sm text-muted-foreground">{downloadCta.note}</p>
      </div>
    </Section>
  );
}

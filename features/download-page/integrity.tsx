import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { getDownloadContent } from "@/content/download";
import type { AppLocale } from "@/i18n/routing";

// No SHA-256 has been published for this build yet — rather than compute
// or guess one, this section simply doesn't render until a real checksum
// is added to content/download.ts.
export async function Integrity() {
  const locale = (await getLocale()) as AppLocale;
  const { integrity } = getDownloadContent(locale);

  if (!integrity.value) return null;

  return (
    <Section className="pt-0" aria-labelledby="integrity-heading">
      <h2
        id="integrity-heading"
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        {integrity.heading}
      </h2>
      <div className="mt-6 flex flex-col gap-1 rounded-xl border border-border bg-card p-5">
        <span className="text-xs font-medium text-muted-foreground">
          {integrity.label}
        </span>
        <code className="break-all font-mono text-sm text-foreground">
          {integrity.value}
        </code>
      </div>
    </Section>
  );
}

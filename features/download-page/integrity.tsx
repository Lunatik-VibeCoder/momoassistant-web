import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { getDownloadContent } from "@/content/download";
import type { AppLocale } from "@/i18n/routing";
import type { PublicAppRelease } from "@/lib/mcp-client";

interface IntegrityProps {
  release: PublicAppRelease | null;
}

// AND-PR-001 -- sha256 now comes live from the backend's published
// AppRelease (release.sha256), falling back to the static content value
// (frozen at whatever build originally computed it) only if the live fetch
// failed, same fallback pattern as beta-info.tsx. Still doesn't render at
// all if neither source has a value.
export async function Integrity({ release }: IntegrityProps) {
  const locale = (await getLocale()) as AppLocale;
  const { integrity } = getDownloadContent(locale);
  const sha256 = release?.sha256 ?? integrity.value;

  if (!sha256) return null;

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
          {sha256}
        </code>
      </div>
    </Section>
  );
}

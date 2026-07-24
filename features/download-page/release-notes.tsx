import { CheckCircle2 } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { getChangelogContent } from "@/content/changelog";
import { getDownloadContent } from "@/content/download";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

// Reuses the Changelog page's own data (content/changelog.ts) rather than
// writing separate release-note copy, so there is exactly one place that
// tracks what has shipped. Only "shipped" milestones are shown — planned
// future milestones (v1.0.0 and later) don't belong under "what's new in
// the build you're about to install."
export async function ReleaseNotes() {
  const locale = (await getLocale()) as AppLocale;
  const { releaseNotesHeading, releaseNotesDescription } = getDownloadContent(locale);
  const { roadmap } = getChangelogContent(locale);
  const shipped = roadmap.filter((milestone) => milestone.status === "shipped");

  return (
    <Section className="pt-0" aria-labelledby="release-notes-heading">
      <div className="max-w-2xl">
        <h2
          id="release-notes-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {releaseNotesHeading}
        </h2>
        <p className="mt-3 text-muted-foreground">{releaseNotesDescription}</p>
      </div>
      <MotionSection variants={staggerContainer} className="mt-8 flex flex-col gap-4">
        {shipped.map((milestone) => (
          <MotionItem key={milestone.version} className="flex gap-3">
            <CheckCircle2
              className="mt-0.5 size-5 shrink-0 text-success"
              aria-hidden="true"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-medium text-foreground">
                  {milestone.version}
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {milestone.label}
                </h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {milestone.description}
              </p>
            </div>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}

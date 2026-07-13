import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { getAboutContent } from "@/content/about";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function MissionVision() {
  const locale = (await getLocale()) as AppLocale;
  const { mission, vision, missionLabel, visionLabel } = getAboutContent(locale);

  return (
    <Section aria-labelledby="mission-vision-heading" className="bg-muted/40">
      <h2 id="mission-vision-heading" className="sr-only">
        {locale === "fr" ? "Mission et vision" : "Mission and vision"}
      </h2>
      <MotionSection
        variants={staggerContainer}
        className="grid gap-5 sm:grid-cols-2"
      >
        <MotionItem>
          <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-sm font-semibold tracking-wide text-primary uppercase">
              {missionLabel}
            </h3>
            <p className="mt-3 text-xl font-semibold text-balance text-foreground">
              {mission}
            </p>
          </div>
        </MotionItem>
        <MotionItem>
          <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-sm font-semibold tracking-wide text-primary uppercase">
              {visionLabel}
            </h3>
            <p className="mt-3 text-xl font-semibold text-balance text-foreground">
              {vision}
            </p>
          </div>
        </MotionItem>
      </MotionSection>
    </Section>
  );
}

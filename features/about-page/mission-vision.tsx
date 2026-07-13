import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { mission, vision } from "@/content/about";
import { staggerContainer } from "@/lib/motion";

export function MissionVision() {
  return (
    <Section aria-labelledby="mission-vision-heading" className="bg-muted/40">
      <h2 id="mission-vision-heading" className="sr-only">
        Mission and vision
      </h2>
      <MotionSection
        variants={staggerContainer}
        className="grid gap-5 sm:grid-cols-2"
      >
        <MotionItem>
          <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-sm font-semibold tracking-wide text-primary uppercase">
              Mission
            </h3>
            <p className="mt-3 text-xl font-semibold text-balance text-foreground">
              {mission}
            </p>
          </div>
        </MotionItem>
        <MotionItem>
          <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-sm font-semibold tracking-wide text-primary uppercase">
              Vision
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

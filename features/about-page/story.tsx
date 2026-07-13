import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { story } from "@/content/about";
import { staggerContainer } from "@/lib/motion";

export function Story() {
  return (
    <Section aria-labelledby="story-heading">
      <MotionSection variants={staggerContainer} className="max-w-2xl">
        <MotionItem>
          <h2
            id="story-heading"
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {story.heading}
          </h2>
        </MotionItem>
        <div className="mt-6 flex flex-col gap-4">
          {story.paragraphs.map((paragraph) => (
            <MotionItem key={paragraph}>
              <p className="text-muted-foreground">{paragraph}</p>
            </MotionItem>
          ))}
        </div>
      </MotionSection>
    </Section>
  );
}

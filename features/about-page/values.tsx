import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { values } from "@/content/about";
import { staggerContainer } from "@/lib/motion";

export function Values() {
  return (
    <Section aria-labelledby="values-heading">
      <div className="max-w-2xl">
        <h2
          id="values-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          What we hold to
        </h2>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {values.map((value) => (
          <MotionItem key={value.title} className="flex gap-4">
            <value.icon
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {value.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {value.description}
              </p>
            </div>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}

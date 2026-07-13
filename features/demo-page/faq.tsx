import { Section } from "@/components/layout/section";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { MotionSection } from "@/components/shared/motion-section";
import { demoFaq } from "@/content/demo";

export function Faq() {
  return (
    <Section id="faq" aria-labelledby="demo-faq-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="demo-faq-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Questions before you download or talk to us
        </h2>
      </div>

      <MotionSection className="mx-auto mt-10 max-w-2xl">
        <FaqAccordion items={demoFaq} />
      </MotionSection>
    </Section>
  );
}

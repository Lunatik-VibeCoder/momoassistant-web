import { Section } from "@/components/layout/section";
import { MotionSection } from "@/components/shared/motion-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pricingFaq } from "@/content/pricing";

export function Faq() {
  return (
    <Section aria-labelledby="pricing-faq-heading" className="bg-muted/40">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="pricing-faq-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Pricing questions
        </h2>
      </div>

      <MotionSection className="mx-auto mt-10 max-w-2xl">
        <Accordion>
          {pricingFaq.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </MotionSection>
    </Section>
  );
}

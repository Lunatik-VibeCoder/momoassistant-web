import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/shared/page-hero";
import type { LegalDocument as LegalDocumentContent } from "@/types";

interface LegalDocumentProps {
  document: LegalDocumentContent;
  breadcrumbs: { label: string; href: string }[];
}

export function LegalDocument({ document, breadcrumbs }: LegalDocumentProps) {
  return (
    <>
      <PageHero
        eyebrow={document.eyebrow}
        title={document.title}
        description={document.description}
        breadcrumbs={breadcrumbs}
      >
        <p className="mt-4 text-sm text-muted-foreground">
          {document.lastUpdatedLabel} {document.lastUpdated}
        </p>
      </PageHero>

      <Section className="pt-0">
        <div className="mx-auto flex max-w-2xl flex-col gap-10">
          {document.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {section.heading}
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.list && (
                <ul className="mt-3 flex flex-col gap-2">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span
                        className="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground/60"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

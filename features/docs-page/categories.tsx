import { ArrowRight } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { NavLink } from "@/components/shared/nav-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDocsContent } from "@/content/docs";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function Categories() {
  const locale = (await getLocale()) as AppLocale;
  const { categories, categoriesSrHeading } = getDocsContent(locale);

  return (
    <Section aria-labelledby="doc-categories-heading">
      <h2 id="doc-categories-heading" className="sr-only">
        {categoriesSrHeading}
      </h2>
      <MotionSection
        variants={staggerContainer}
        className="grid gap-5 sm:grid-cols-2"
      >
        {categories.map((category) => (
          <MotionItem key={category.title}>
            <NavLink href={category.href} className="block h-full">
              <Card className="h-full transition-colors hover:border-primary/40">
                <CardHeader>
                  <category.icon
                    className="size-5 text-primary"
                    aria-hidden="true"
                  />
                  <CardTitle className="mt-3 flex items-center gap-1.5 text-base">
                    {category.title}
                    <ArrowRight
                      className="size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </NavLink>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}

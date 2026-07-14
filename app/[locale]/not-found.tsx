import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/shared/button-link";
import { Badge } from "@/components/ui/badge";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Badge variant="outline" className="mb-5">
        {t("eyebrow")}
      </Badge>
      <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-md text-pretty text-muted-foreground">
        {t("description")}
      </p>
      <ButtonLink href="/" className="mt-8">
        {t("backHome")}
      </ButtonLink>
    </Container>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/shared/button-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations("ServerError");

  useEffect(() => {
    console.error(error);
  }, [error]);

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
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button nativeButton onClick={() => reset()}>
          {t("retry")}
        </Button>
        <ButtonLink href="/" variant="outline">
          {t("backHome")}
        </ButtonLink>
      </div>
    </Container>
  );
}

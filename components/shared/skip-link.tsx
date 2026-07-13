import { getTranslations } from "next-intl/server";

export async function SkipLink() {
  const t = await getTranslations("Common");

  return (
    <a
      href="#main-content"
      className="sr-only z-50 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
    >
      {t("skipToContent")}
    </a>
  );
}

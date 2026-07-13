"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LocaleSwitcher");

  return (
    <div
      role="radiogroup"
      aria-label={t("label")}
      className="flex items-center gap-0.5 rounded-lg border border-border bg-background p-0.5"
    >
      {routing.locales.map((loc) => {
        const active = locale === loc;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            role="radio"
            aria-checked={active}
            className={cn(
              "rounded-md px-2 py-1 text-xs font-semibold uppercase transition-colors",
              active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {loc}
          </Link>
        );
      })}
    </div>
  );
}

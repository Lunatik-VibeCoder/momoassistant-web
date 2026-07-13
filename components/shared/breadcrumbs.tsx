import { ChevronRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/constants";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  /** Trail after "Home", which is prepended automatically. */
  items: BreadcrumbItem[];
}

export async function Breadcrumbs({ items }: BreadcrumbsProps) {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("Common"),
  ]);
  const allItems: BreadcrumbItem[] = [{ label: t("home"), href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}/${locale}${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
              )}
              {isLast ? (
                <span aria-current="page" className="text-foreground">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

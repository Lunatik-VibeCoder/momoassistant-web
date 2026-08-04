import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/shared/logo";
import { NavLink } from "@/components/shared/nav-link";
import { getFooterLinkGroups } from "@/content/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText, siteConfig } from "@/lib/constants";

interface FooterProps {
  locale: AppLocale;
}

export async function Footer({ locale }: FooterProps) {
  const footerLinkGroups = getFooterLinkGroups(locale);
  const text = getSiteText(locale);
  const t = await getTranslations("Common");

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-12 py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-3 sm:col-span-3 lg:col-span-1">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              {text.tagline}
            </p>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-foreground">
                {group.title}
              </h2>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col-reverse items-center gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}.{" "}
            {t("allRightsReserved")}
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-4" aria-hidden="true" />
            {siteConfig.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}

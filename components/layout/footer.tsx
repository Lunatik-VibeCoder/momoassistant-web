import { Mail } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { NavLink } from "@/components/shared/nav-link";
import { Container } from "@/components/layout/container";
import { FOOTER_LINK_GROUPS } from "@/content/navigation";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-12 py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              Enterprise Mobile Money automation for professional operators.
            </p>
          </div>

          {FOOTER_LINK_GROUPS.map((group) => (
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
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
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

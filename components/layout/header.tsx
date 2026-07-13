"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { CTAButton } from "@/components/shared/cta-button";
import { Logo } from "@/components/shared/logo";
import { NavLink } from "@/components/shared/nav-link";
import { Button } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/content/navigation";
import { siteConfig } from "@/lib/constants";
import { useScrollPosition } from "@/hooks";
import { cn } from "@/lib/utils";

export function Header() {
  const scrolled = useScrollPosition();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors duration-200",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/70"
          : "border-transparent bg-background"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label={`${siteConfig.name} home`}
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} className={navigationMenuTriggerStyle()}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CTAButton
            href={siteConfig.downloadApkUrl}
            external
            event="download_apk_header"
            className="hidden sm:inline-flex"
          >
            {siteConfig.primaryCtaLabel}
          </CTAButton>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose
                    key={link.href}
                    nativeButton={false}
                    render={<NavLink href={link.href} />}
                    className="rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-muted"
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 border-t border-border p-4">
                <CTAButton
                  href={siteConfig.downloadApkUrl}
                  external
                  event="download_apk_header_mobile"
                >
                  {siteConfig.primaryCtaLabel}
                </CTAButton>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

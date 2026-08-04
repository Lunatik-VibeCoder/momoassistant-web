"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { CTAButton } from "@/components/shared/cta-button";
import { LocaleSwitcher } from "@/components/shared/locale-switcher";
import { Logo } from "@/components/shared/logo";
import { NavLink } from "@/components/shared/nav-link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getAuthNavText, getProductMenu, getResourcesMenu } from "@/content/navigation";
import { useScrollPosition } from "@/hooks";
import type { AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface HeaderProps {
  locale: AppLocale;
}

export function Header({ locale }: HeaderProps) {
  const scrolled = useScrollPosition();
  const product = getProductMenu(locale);
  const resources = getResourcesMenu(locale);
  const auth = getAuthNavText(locale);
  const t = useTranslations("Common");

  // WS-005M.1 -- the session cookie is httpOnly (RFC-0011 Invariant 1), so
  // it can't be read from page JS directly; the marketing (locale) layout
  // is statically prerendered (generateStaticParams), so it can't call
  // next/headers' cookies() either without forcing the whole site dynamic.
  // A tiny client-side fetch after mount is the trade-off: defaults to
  // "logged out" (Login/Get Started) until it resolves, then swaps to
  // Dashboard if a session exists.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/session-status")
      .then((res) => res.json())
      .then((data: { isAuthenticated: boolean }) => {
        if (!cancelled) setIsAuthenticated(data.isAuthenticated);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

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

        {/*
          lg:, not md: — at 768-1023px the full nav + locale switcher +
          auth CTAs genuinely don't fit (confirmed via WS-005R: real
          horizontal overflow at exactly 768px, reproduced on every
          marketing/auth page). lg: matches the site's actual desktop
          breakpoint everywhere else (Hero's 2-col grid, etc.).
        */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {product.links.length > 0 && (
              <li>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>{product.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="flex w-48 flex-col gap-0.5">
                          {product.links.map((link) => (
                            <li key={link.href}>
                              <NavigationMenuLink render={<NavLink href={link.href} />}>
                                {link.label}
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </li>
            )}
            {resources.links.length > 0 && (
              <li>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>{resources.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="flex w-48 flex-col gap-0.5">
                          {resources.links.map((link) => (
                            <li key={link.href}>
                              <NavigationMenuLink render={<NavLink href={link.href} />}>
                                {link.label}
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </li>
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <LocaleSwitcher />
          </div>

          {isAuthenticated ? (
            <CTAButton href="/app" event="header_dashboard" className="hidden lg:inline-flex">
              {auth.dashboardLabel}
            </CTAButton>
          ) : (
            <>
              <NavLink
                href="/login"
                className={cn(navigationMenuTriggerStyle(), "hidden lg:inline-flex")}
              >
                {auth.loginLabel}
              </NavLink>
              <CTAButton href="/register" event="header_get_started" className="hidden lg:inline-flex">
                {auth.getStartedLabel}
              </CTAButton>
            </>
          )}

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  aria-label={t("openMenu")}
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
                {product.links.length > 0 && (
                  <>
                    <p className="px-3 text-xs font-semibold text-muted-foreground uppercase">
                      {product.label}
                    </p>
                    {product.links.map((link) => (
                      <SheetClose
                        key={link.href}
                        nativeButton={false}
                        render={<NavLink href={link.href} />}
                        className="rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-muted"
                      >
                        {link.label}
                      </SheetClose>
                    ))}
                  </>
                )}
                {resources.links.length > 0 && (
                  <>
                    <p className="mt-2 px-3 text-xs font-semibold text-muted-foreground uppercase">
                      {resources.label}
                    </p>
                    {resources.links.map((link) => (
                      <SheetClose
                        key={link.href}
                        nativeButton={false}
                        render={<NavLink href={link.href} />}
                        className="rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-muted"
                      >
                        {link.label}
                      </SheetClose>
                    ))}
                  </>
                )}
              </nav>
              <div className="mt-auto flex flex-col gap-3 border-t border-border p-4">
                <LocaleSwitcher />
                {isAuthenticated ? (
                  <CTAButton href="/app" event="header_dashboard_mobile">
                    {auth.dashboardLabel}
                  </CTAButton>
                ) : (
                  <>
                    <SheetClose
                      nativeButton={false}
                      render={<NavLink href="/login" />}
                      className="rounded-lg border border-border px-3 py-2 text-center text-sm font-medium hover:bg-muted"
                    >
                      {auth.loginLabel}
                    </SheetClose>
                    <CTAButton href="/register" event="header_get_started_mobile">
                      {auth.getStartedLabel}
                    </CTAButton>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

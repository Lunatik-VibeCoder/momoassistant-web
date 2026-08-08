"use client";

import { Menu } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { NavLink } from "@/components/shared/nav-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { HubNavItem } from "@/content/hub-nav";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface HubSidebarProps {
  items: HubNavItem[];
  organizationName: string;
}

function isActive(pathname: string, href: string): boolean {
  return pathname === href;
}

function NavList({ items, pathname, onNavigate }: { items: HubNavItem[]; pathname: string; onNavigate?: () => void }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item.href}>
          <NavLink
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive(pathname, item.href)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

// WS-006 -- the first shared chrome the (app) route group has ever had.
// Desktop: a fixed sidebar. Mobile: the exact Sheet pattern already used by
// the marketing header's mobile menu (components/layout/header.tsx), not a
// new pattern.
export function HubSidebar({ items, organizationName }: HubSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden w-56 shrink-0 border-r border-border md:flex md:flex-col md:gap-6 md:px-4 md:py-6">
        {/* "/" not "/app" -- on app.momoassistant.com the bare root IS the
            dashboard (Middleware rewrite, proxy.ts). Only cosmetic effect
            in local dev (no rewrite there): the dashboard nav item won't
            show as active, since it's still served at literal /app. */}
        <NavLink href="/" className="flex items-center px-3">
          <Logo />
        </NavLink>
        <p className="truncate px-3 text-xs font-semibold text-muted-foreground uppercase">
          {organizationName}
        </p>
        <NavList items={items} pathname={pathname} />
      </aside>

      <div className="flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
        <NavLink href="/" className="flex items-center">
          <Logo />
        </NavLink>
        <Sheet>
          <SheetTrigger
            render={<Button variant="outline" size="icon" aria-label="Open menu" />}
          >
            <Menu aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-xs">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav aria-label="Customer Hub" className="flex flex-col gap-1 px-4">
              <p className="truncate px-3 pb-1 text-xs font-semibold text-muted-foreground uppercase">
                {organizationName}
              </p>
              {items.map((item) => (
                <SheetClose
                  key={item.href}
                  nativeButton={false}
                  render={<NavLink href={item.href} />}
                  className={cn(
                    "rounded-lg px-3 py-2 text-left text-sm font-medium",
                    isActive(pathname, item.href)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted",
                  )}
                >
                  {item.label}
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

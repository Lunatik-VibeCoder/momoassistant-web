import { ChevronRight } from "lucide-react";

import { NavLink } from "@/components/shared/nav-link";

// SETTINGS-NAV-1 -- a link row into an existing, unchanged page
// (Health/License/Subscription/Billing). No new UI primitive: plain
// NavLink (the same locale-aware, implemented-route-checked link used
// everywhere else in the Hub) styled as a row, matching this repo's other
// hand-rolled rows (e.g. members/page.tsx's table rows) rather than a new
// shared component for what's currently only 4 call sites.
export function SettingsNavRow({ href, label }: { href: string; label: string }) {
  return (
    <NavLink
      href={href}
      className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
    >
      {label}
      <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
    </NavLink>
  );
}

import { createNavigation } from "next-intl/navigation";

import { routing } from "@/i18n/routing";

// Locale-aware replacements for next/link, next/navigation's usePathname,
// useRouter, and redirect — every internal link in the app should import
// `Link` from here instead of `next/link` so the current locale prefix is
// preserved automatically.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

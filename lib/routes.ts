// Routes that currently exist as real pages. Every other path referenced
// by content/navigation.ts or a CTA is a placeholder that 404s until it's
// built (see WEB_PRODUCT_BOOK.md's sitemap section) — this registry lets
// links to those routes skip Next's automatic prefetch instead of issuing
// doomed network requests on every homepage visit. Add a path here the
// same commit its page ships.
const IMPLEMENTED_ROUTES = new Set<string>([
  "/",
  "/features",
  "/security",
  "/how-it-works",
  "/pricing",
  "/about",
  "/contact",
  "/demo",
  "/docs",
  "/changelog",
  "/blog",
  "/careers",
  "/legal/privacy",
  "/legal/terms",
  "/legal/cookies",
  "/legal/security",
  "/status",
  // WS-006 (Customer Hub) -- authenticated (app)/(hub) routes.
  "/app",
  "/organization",
  "/members",
  "/health",
  "/license",
  "/subscription",
  "/billing",
  "/settings",
]);

export function isRouteImplemented(href: string): boolean {
  const [path] = href.split(/[?#]/);
  return IMPLEMENTED_ROUTES.has(path);
}

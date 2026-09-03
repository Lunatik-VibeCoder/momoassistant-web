// WS-013 -- server-only's real implementation throws unconditionally when
// imported outside Next's server compiler, by design (it has no runtime
// behavior otherwise: the whole package IS the throw). Aliased to this
// empty module only inside vitest.config.ts's test resolution, so
// lib/mcp-client.ts's `import "server-only"` guard becomes a no-op in
// tests -- the app's real build (next build, already verified green) never
// sees this file; the guard is fully intact in production.
export {};

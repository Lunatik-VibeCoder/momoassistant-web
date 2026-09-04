// WEB-RBAC-GATING-1 -- `permissions` is McpUserProfile.permissions
// (lib/mcp-client.ts), sourced verbatim from the backend's
// RolesService.getPermissionsForRole -- this file never re-derives or
// hardcodes which role gets which permission (that mistake already
// happened once, Station Tree Phase B's STATION_MANAGER/workspaces:write
// assumption). `resource`/`action` are plain strings, not a shared enum
// with the backend (different repos/languages) -- the exact
// "resource:action" format is a deliberate contract match with
// permissionCode() (role-permissions.seed.ts), not reinvented here.
export function hasPermission(permissions: string[], resource: string, action: string): boolean {
  return permissions.includes(`${resource}:${action}`);
}

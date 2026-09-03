import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// WS-013 -- minimal config, scoped to what this sprint's tests need
// (jsdom for component rendering, the "@/" alias matching tsconfig.json,
// and the server-only stub so lib/mcp-client.ts is importable in tests --
// see vitest.server-only-stub.ts). No coverage/reporters/extra plugins
// configured: nothing beyond what WS-013's own test files require.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**"],
    // lib/mcp-client.ts reads MCP_API_URL from process.env at module-load
    // time (module-scope const) -- must be set before any test file
    // imports it, hence here rather than inside a test's beforeEach.
    env: {
      MCP_API_URL: "https://mcp.test.invalid",
    },
  },
  resolve: {
    alias: {
      "server-only": fileURLToPath(new URL("./vitest.server-only-stub.ts", import.meta.url)),
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
});

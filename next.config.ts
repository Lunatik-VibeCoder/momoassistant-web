import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Customer Hub subdomain split -- old www.momoassistant.com Hub URLs
  // (bookmarked pre-split) redirect to their app.momoassistant.com
  // equivalent. The bare apex (momoassistant.com) already 308s to
  // www.momoassistant.com at the Vercel/DNS layer before this ever runs,
  // confirmed live -- only the www host needs handling here. The reverse
  // direction (app.* routing/allowlist/404) is per-request host logic and
  // lives in proxy.ts's Middleware instead, not here.
  async redirects() {
    return [
      {
        source:
          "/:locale(en|fr)/:hub(app|organization|members|license|subscription|billing|health|settings)/:rest*",
        has: [{ type: "host", value: "www.momoassistant.com" }],
        destination: "https://app.momoassistant.com/:locale/:hub/:rest*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

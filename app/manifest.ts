import type { MetadataRoute } from "next";

import { getSiteText, siteConfig } from "@/lib/constants";

// A single global manifest (not nested under [locale]) — PWA manifests are
// rarely localized in practice; the English description is a reasonable
// default here even on the French site.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.appName,
    short_name: siteConfig.shortName,
    description: getSiteText("en").description,
    start_url: "/",
    display: "standalone",
    background_color: "#0B0F0B",
    theme_color: "#0B0F0B",
    icons: [
      { src: "/icon.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.appName,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
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

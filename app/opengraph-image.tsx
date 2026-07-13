import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const iconBuffer = readFileSync(
    join(process.cwd(), "public/logos/icon-mark.png")
  );
  const iconSrc = `data:image/png;base64,${iconBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          padding: 96,
          background: "#0B0F0B",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(214,255,92,0.22), rgba(11,15,11,0) 55%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og requires a plain <img>, not next/image */}
        <img
          src={iconSrc}
          alt=""
          width={72}
          height={72}
          style={{ borderRadius: 16 }}
        />
        <div style={{ display: "flex", fontSize: 60, fontWeight: 700 }}>
          <span style={{ color: "#D6FF5C" }}>MoMo</span>
          <span style={{ color: "#ffffff" }}>&nbsp;Assistant</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "rgba(255,255,255,0.72)",
            maxWidth: 880,
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}

import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Image & PDF Compressor`,
    short_name: "Ai2 Compress",
    description:
      "Free, private image and PDF compression tools that run in your browser.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f3",
    theme_color: "#3f51d1",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}

import type { MetadataRoute } from "next";
import { homeDescription, siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "GLG Property",
    description: homeDescription,
    lang: "ro",
    start_url: "/",
    display: "minimal-ui",
    // Paleta din DESIGN.md: fundal alb pur; bara urmează fundalul site-ului.
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/logo.png", sizes: "150x150", type: "image/png" },
    ],
  };
}

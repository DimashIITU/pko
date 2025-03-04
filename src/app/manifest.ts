import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pokerdom",
    short_name: "Pokerdom",
    description: "Pokerdom mod",
    start_url: "/",
    display: "standalone",
    background_color: "#000",
    theme_color: "#000",
    icons: [
        {
          src: "/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any"
        }
      ],
    screenshots: [
      {
        src: "/screen/wide.png",
        sizes: "1903x944",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/screen/mobile.png",
        sizes: "621x1280",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  };
}
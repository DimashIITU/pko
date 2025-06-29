import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Revolute",
    short_name: "Revolute",
    description: "Revolute",
    start_url: "/",
    display: "standalone",
    background_color: "#000",
    theme_color: "#000",
    "icons": [
      {
          "src": "/iconx/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
      },
      {
          "src": "/iconx/android-chrome-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
      },
      {
        "src": "/iconx/android-chrome-maskable-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "/iconx/android-chrome-maskable-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
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
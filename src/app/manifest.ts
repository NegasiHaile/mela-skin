import type { MetadataRoute } from "next";
import { META, brand } from "@/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brand.name} — ${brand.descriptor}`,
    short_name: brand.name,
    /* The same sentence the page metadata uses, rather than a second copy
       of it that had to be found when the clinic moved suburb. */
    description: META.shortDescription,
    start_url: "/",
    display: "standalone",
    // Official palette: Primary 7 (cream) and Primary 2 (the flooded ground).
    background_color: "#f4e7d6",
    theme_color: "#2c190b",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

import type { MetadataRoute } from "next";
import { brand } from "@/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${brand.origin}/sitemap.xml`,
    host: brand.origin,
  };
}

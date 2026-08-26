import type { MetadataRoute } from "next";

/*
  Four public routes. `/editorial` is the alternate design direction and is
  deliberately absent — it carries `noindex` too, so it is never a duplicate of
  the home page in search results.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://melaskin.com";
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/treatment-menu`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/medical-dermatology`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/cosmetic-dermatology`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];
}

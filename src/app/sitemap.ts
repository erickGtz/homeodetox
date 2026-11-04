import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

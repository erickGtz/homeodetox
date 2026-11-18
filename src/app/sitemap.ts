import type { MetadataRoute } from "next";
import { getBlogPosts, getEvents } from "@/lib/content/loader";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getBlogPosts().map((post) => ({
    url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const events = getEvents().map((event) => ({
    url: new URL(`/servicios/eventos/${event.slug}`, siteConfig.url).toString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: new URL("/", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/nosotros", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/servicios/consulta", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/servicios/eventos", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/servicios/terapias", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/agendar", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL("/faq", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: new URL("/farmacovigilancia", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL("/blog", siteConfig.url).toString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts,
    ...events,
  ];
}

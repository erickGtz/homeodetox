import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ZodType } from "zod";
import {
  blogPostSchema,
  eventSchema,
  productSchema,
  serviceSchema,
  type BlogPost,
  type Event,
  type Product,
  type Service,
} from "./schemas";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export type ContentEntry<T> = T & { content: string };

function loadCollection<T>(folder: string, schema: ZodType<T>): ContentEntry<T>[] {
  const directory = path.join(CONTENT_DIR, folder);

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(directory, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = schema.parse(data);

      return { ...parsed, content };
    });
}

export function getServices(): ContentEntry<Service>[] {
  return loadCollection("servicios", serviceSchema).sort((a, b) => a.order - b.order);
}

export function getServiceBySlug(slug: string): ContentEntry<Service> | undefined {
  return getServices().find((service) => service.slug === slug);
}

export function getProducts(): ContentEntry<Product>[] {
  return loadCollection("productos", productSchema).sort((a, b) =>
    a.title.localeCompare(b.title, "es"),
  );
}

export function getProductBySlug(slug: string): ContentEntry<Product> | undefined {
  return getProducts().find((product) => product.slug === slug);
}

export function getBlogPosts(): ContentEntry<BlogPost>[] {
  return loadCollection("blog", blogPostSchema).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getBlogPostBySlug(slug: string): ContentEntry<BlogPost> | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}

export function getEvents(): ContentEntry<Event>[] {
  return loadCollection("eventos", eventSchema).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

export function getEventBySlug(slug: string): ContentEntry<Event> | undefined {
  return getEvents().find((event) => event.slug === slug);
}

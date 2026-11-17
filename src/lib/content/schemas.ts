import { z } from "zod";

export const seoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const serviceCategorySchema = z.enum(["consulta", "terapia", "evento"]);

export const serviceSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: serviceCategorySchema,
  excerpt: z.string().min(1),
  image: z.string().min(1),
  order: z.number().int().nonnegative(),
  price: z.string().optional(),
  duration: z.string().optional(),
  modality: z.string().optional(),
  seo: seoSchema,
});

export const productCategorySchema = z.enum([
  "pomadas",
  "unguentos",
  "infusiones",
  "suplementos",
  "cremas",
  "gotas",
]);

export const productSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: productCategorySchema,
  benefits: z.array(z.string().min(1)).min(1),
  presentations: z.array(z.string().min(1)).min(1),
  price: z.string().optional(),
  sku: z.string().optional(),
  shortDescription: z.string().min(1),
  cover: z.string().min(1),
  gallery: z.array(z.string().min(1)),
  whatIs: z.string().min(1),
  howToUse: z.string().min(1),
  ingredients: z.string().min(1),
  warnings: z.string().optional(),
  seo: seoSchema,
});

export const blogTypeSchema = z.enum(["post", "video"]);

export const blogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  type: blogTypeSchema,
  date: z.string().min(1),
  author: z.string().min(1),
  excerpt: z.string().min(1),
  cover: z.string().min(1).optional(),
  videoUrl: z.string().optional(),
  duration: z.string().optional(),
  tags: z.array(z.string().min(1)).default([]),
  seo: seoSchema,
});

export const eventKindSchema = z.enum(["curso", "taller", "seminario"]);

export const eventSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  kind: eventKindSchema,
  date: z.string().min(1),
  location: z.string().min(1),
  schedule: z.string().optional(),
  cost: z.string().optional(),
  courtesies: z.string().optional(),
  cover: z.string().min(1),
  seo: seoSchema,
});

export type Seo = z.infer<typeof seoSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Product = z.infer<typeof productSchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;
export type Event = z.infer<typeof eventSchema>;
export type ServiceCategory = z.infer<typeof serviceCategorySchema>;
export type ProductCategory = z.infer<typeof productCategorySchema>;
export type BlogType = z.infer<typeof blogTypeSchema>;
export type EventKind = z.infer<typeof eventKindSchema>;

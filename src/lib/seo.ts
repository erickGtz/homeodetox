import type { Metadata } from "next";
import { siteConfig } from "./site-config";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function buildMetadata({ title, description, path = "/", image }: SeoInput): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  const ogImage = new URL(image ?? "/images/og-default.jpg", siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "es_MX",
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function physicianJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: siteConfig.doctor.name,
    medicalSpecialty: siteConfig.doctor.specialty,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Ciudad de México",
      addressCountry: "MX",
    },
    openingHours: siteConfig.schedule,
  } satisfies Record<string, unknown>;
}

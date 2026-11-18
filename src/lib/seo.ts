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

type ArticleJsonLdInput = {
  title: string;
  description: string;
  path: string;
  date: string;
  author: string;
  image?: string;
};

export function articleJsonLd({
  title,
  description,
  path,
  date,
  author,
  image,
}: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    author: { "@type": "Person", name: author },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: new URL(path, siteConfig.url).toString(),
    ...(image ? { image: new URL(image, siteConfig.url).toString() } : {}),
  } satisfies Record<string, unknown>;
}

type EventJsonLdInput = {
  name: string;
  description: string;
  startDate: string;
  location: string;
  path: string;
  image?: string;
};

export function eventJsonLd({
  name,
  description,
  startDate,
  location,
  path,
  image,
}: EventJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: siteConfig.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: location,
        addressLocality: "Ciudad de México",
        addressCountry: "MX",
      },
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: new URL(path, siteConfig.url).toString(),
    ...(image ? { image: new URL(image, siteConfig.url).toString() } : {}),
  } satisfies Record<string, unknown>;
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

type FaqJsonLdInput = {
  path: string;
  items: {
    question: string;
    answer: string;
  }[];
};

export function faqJsonLd({ path, items }: FaqJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url: new URL(path, siteConfig.url).toString(),
  } satisfies Record<string, unknown>;
}

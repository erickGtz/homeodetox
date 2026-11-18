import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { MapEmbed } from "@/components/sections/map-embed";
import { PageHero } from "@/components/sections/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { faqContent, faqEntries } from "@/content/faq";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: faqContent.seo.title,
  description: faqContent.seo.description,
  path: "/faq",
});

export default function FaqPage() {
  const items = faqEntries.map((entry) => ({
    id: entry.id,
    question: entry.question,
    answer: <p>{entry.answer}</p>,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqJsonLd({
              path: "/faq",
              items: faqEntries.map(({ question, answer }) => ({ question, answer })),
            }),
          ),
        }}
      />

      <PageHero title={faqContent.title} tone="light" align="center" titleVariant="page" />

      <section className="bg-surface">
        <Container className="py-8 pb-16 sm:py-10 sm:pb-20">
          <Breadcrumbs items={[{ label: "Inicio" }, { label: faqContent.title }]} />

          <p className="text-text-body mt-5 max-w-2xl text-base leading-[1.85] font-light">
            {faqContent.intro}
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
            <Accordion items={items} defaultOpenId={items[0]?.id} />
            <div className="flex flex-col gap-6">
              <MapEmbed />
              <a
                href={faqContent.cta.href}
                className={buttonClasses({ variant: "primary", className: "self-start" })}
              >
                {faqContent.cta.label}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

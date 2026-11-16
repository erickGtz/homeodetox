import type { Metadata } from "next";
import { PharmacovigilanceForm } from "@/components/forms/pharmacovigilance-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { MediaFrame } from "@/components/ui/media-frame";
import { pharmacovigilanceContent } from "@/content/pharmacovigilance";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: pharmacovigilanceContent.seo.title,
  description: pharmacovigilanceContent.seo.description,
  path: "/farmacovigilancia",
});

export default function FarmacovigilanciaPage() {
  const { hero, intro, media } = pharmacovigilanceContent;

  return (
    <>
      <PageHero title={hero.title} tone="light" align="center" titleVariant="page" />

      <section className="bg-surface">
        <Container className="py-14 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-primary-dark text-2xl leading-snug font-normal sm:text-3xl">
              {intro.title}
            </h2>
            <p className="text-text-body mt-4 text-base leading-[1.85] font-light sm:text-lg">
              {intro.body}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-surface pb-16 sm:pb-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start lg:gap-10">
            <MediaFrame
              alt={media.sideLabel}
              label={media.sideLabel}
              className="rounded-card min-h-[260px] sm:min-h-[360px] lg:min-h-[780px]"
              sizes="(min-width: 1024px) 340px, 100vw"
            />
            <PharmacovigilanceForm />
          </div>
        </Container>
      </section>
    </>
  );
}

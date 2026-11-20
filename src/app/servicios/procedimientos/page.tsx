import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { TherapyGallery } from "@/components/sections/therapy-gallery";
import { Button, buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { terapiasContent } from "@/content/procedimientos";
import { buildMetadata } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: terapiasContent.seo.title,
  description: terapiasContent.seo.description,
  path: "/servicios/terapias",
});

export default function TerapiasPage() {
  const {
  breadcrumbs,
  heading,
  intro,
  regions,
  treatments,
  activities,
  labels,
  note,
  cta,
} = terapiasContent;

  const whatsappHref = getWhatsAppLink(cta.whatsappMessage);

  return (
    <section className="bg-surface">
      <Container className="py-8 pb-16 sm:py-10 sm:pb-20">
        <Breadcrumbs items={breadcrumbs} />

        <h2 className="text-primary-dark mt-5 max-w-4xl text-3xl font-normal tracking-tight sm:text-4xl">
          {heading}
        </h2>

        <p className="text-text-body mt-5 max-w-3xl text-base leading-[1.85] font-light">{intro}</p>

        <div className="mt-10">
          <TherapyGallery
            regions={regions}
            treatments={treatments}
            activities={activities}
            labels={labels}
          />
        </div>

        <p className="text-text-muted mt-6 text-xs leading-relaxed">{note}</p>

        <div className="bg-primary text-on-primary mt-10 rounded-3xl p-6 sm:p-8 lg:p-10">
          <h3 className="text-2xl font-semibold tracking-wide uppercase sm:text-3xl">
            {cta.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-[1.8] text-white/85">{cta.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/agendar" variant="secondary">
              {cta.primaryLabel}
            </Button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({
                variant: "outline",
                className: "hover:text-primary border-white/60 text-white hover:bg-white",
              })}
            >
              {cta.secondaryLabel}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

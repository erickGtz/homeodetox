import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { MediaFrame } from "@/components/ui/media-frame";
import { aboutContent } from "@/content/about";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: aboutContent.seo.title,
  description: aboutContent.seo.description,
  path: "/nosotros",
});

export default function NosotrosPage() {
  const { intro, founder, missionVision, media } = aboutContent;

  return (
    <>
      <PageHero
        title="Nosotros"
        tone="light"
        align="center"
        titleVariant="page"
        image={media.hero ?? undefined}
      />

      <section className="bg-surface">
        <Container className="py-16 text-center sm:py-20">
          <h2 className="font-display text-primary-dark text-3xl font-semibold tracking-tight">
            {siteConfig.name}
          </h2>
          <p className="text-text-body mx-auto mt-4 max-w-xl text-base leading-relaxed">
            {intro.body}
          </p>
        </Container>
      </section>

      <section className="bg-surface">
        <div className="grid w-full items-stretch lg:grid-cols-2">
          <MediaFrame
            src={media.founder?.src}
            alt={media.founder?.alt ?? "Fotografía del fundador"}
            label="Fotografía del fundador"
            className="h-full min-h-[420px] lg:min-h-[632px]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="flex flex-col justify-center px-4 py-14 sm:px-8 lg:px-16 lg:py-20">
            <div className="w-full max-w-xl">
              <p className="text-primary text-sm font-medium tracking-[0.22em] uppercase">
                {founder.eyebrow}
              </p>
              <h2 className="font-display text-primary-dark mt-4 text-4xl leading-snug font-semibold">
                {siteConfig.doctor.name}
              </h2>
              <p className="text-primary mt-2 text-xs font-semibold tracking-[0.2em] uppercase">
                {siteConfig.doctor.specialty}
              </p>
              <p className="text-text-muted mt-1 text-sm">
                {founder.licenseLabel}: {siteConfig.doctor.license}
              </p>
              <div aria-hidden="true" className="bg-primary/60 mt-8 h-0.5 w-10" />
              <p className="text-text-body mt-8 text-base leading-[1.85] font-light">
                {founder.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface pb-16 sm:pb-20">
        <div className="grid w-full items-stretch lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-4 py-14 sm:px-8 lg:order-1 lg:px-16 lg:py-20">
            <div className="w-full max-w-xl">
              <h2 className="font-display text-primary-dark text-4xl leading-snug font-semibold">
                {missionVision.title}
              </h2>
              <div aria-hidden="true" className="bg-primary/60 mt-8 h-0.5 w-10" />
              <div className="mt-8">
                <h3 className="text-primary text-xs font-semibold tracking-[0.22em] uppercase">
                  {missionVision.mission.label}
                </h3>
                <p className="text-text-body mt-3 text-base leading-[1.85] font-light">
                  {missionVision.mission.body}
                </p>
              </div>
              <div className="mt-9">
                <h3 className="text-primary text-xs font-semibold tracking-[0.22em] uppercase">
                  {missionVision.vision.label}
                </h3>
                <p className="text-text-body mt-3 text-base leading-[1.85] font-light">
                  {missionVision.vision.body}
                </p>
              </div>
            </div>
          </div>
          <MediaFrame
            src={media.clinic?.src}
            alt={media.clinic?.alt ?? "Fotografía del consultorio"}
            label="Fotografía del consultorio"
            className="order-1 h-full min-h-[420px] lg:order-2 lg:min-h-[683px]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </section>
    </>
  );
}

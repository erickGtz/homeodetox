import Link from "next/link";
import { IconArrowRight } from "@/components/ui/icons";
import { MediaFrame } from "@/components/ui/media-frame";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeServiceHighlight } from "@/content/home";

type ServiceShowcaseProps = {
  title: string;
  subtitle?: string;
  items: HomeServiceHighlight[];
  footerCta?: {
    label: string;
    href: string;
  };
};

export function ServiceShowcase({ title, subtitle, items, footerCta }: ServiceShowcaseProps) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container>
        <SectionHeading title={title} subtitle={subtitle} variant="display" className="mb-12" />

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {items.map((item) => (
            <Link key={item.id} href={item.href} className="group block">
              <div className="relative overflow-hidden rounded-3xl">
                <MediaFrame
                  src={item.image}
                  alt={`Imagen de ${item.label}`}
                  label={item.imageLabel}
                  className="aspect-[4/5] w-full sm:aspect-[3/4]"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
                <div
                  aria-hidden="true"
                  className="from-primary-dark/85 via-primary-dark/30 absolute inset-0 bg-gradient-to-t to-transparent transition-opacity group-hover:opacity-90"
                />
                <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-full border border-white/40 bg-white/15 px-5 py-3 backdrop-blur-sm sm:inset-x-5 sm:bottom-5">
                  <span className="text-sm font-bold tracking-[0.3em] text-white uppercase">
                    {item.label}
                  </span>
                  <IconArrowRight className="size-4 text-white transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
              <p className="text-text-muted mt-4 text-sm leading-relaxed">{item.description}</p>
            </Link>
          ))}
        </div>

        {footerCta ? (
          <div className="mt-10 text-center">
            <Link
              href={footerCta.href}
              className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide uppercase"
            >
              {footerCta.label}
              <IconArrowRight className="size-4" />
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

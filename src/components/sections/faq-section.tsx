import Link from "next/link";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { IconArrowRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { MapEmbed } from "./map-embed";

type FaqSectionProps = {
  eyebrow?: string;
  title: string;
  items: AccordionItem[];
  cta?: {
    label: string;
    href: string;
  };
};

export function FaqSection({ eyebrow, title, items, cta }: FaqSectionProps) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} className="mb-12" />
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Accordion items={items} defaultOpenId={items[0]?.id} />
            {cta ? (
              <Link
                href={cta.href}
                className="text-primary mt-6 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] uppercase"
              >
                {cta.label}
                <IconArrowRight className="size-3.5" />
              </Link>
            ) : null}
          </div>
          <MapEmbed />
        </div>
      </Container>
    </section>
  );
}

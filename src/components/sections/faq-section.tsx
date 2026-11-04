import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MapEmbed } from "./map-embed";

type FaqSectionProps = {
  title: string;
  items: AccordionItem[];
};

export function FaqSection({ title, items }: FaqSectionProps) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container>
        <SectionHeading title={title} className="mb-12" />
        <div className="grid gap-10 lg:grid-cols-2">
          <Accordion items={items} defaultOpenId={items[0]?.id} />
          <MapEmbed />
        </div>
      </Container>
    </section>
  );
}

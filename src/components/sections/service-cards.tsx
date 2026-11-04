import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export type ServiceCard = {
  title: string;
  description: string;
  href: string;
};

type ServiceCardsProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  services: ServiceCard[];
};

export function ServiceCards({ eyebrow, title, subtitle, services }: ServiceCardsProps) {
  return (
    <section className="bg-bg py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          variant="display"
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.href} className="flex flex-col">
              <div
                aria-hidden="true"
                className="mb-5 h-40 rounded-lg bg-[linear-gradient(135deg,var(--color-primary),var(--color-secondary))]"
              />
              <h3 className="text-primary text-lg font-semibold">{service.title}</h3>
              <p className="text-text-muted mt-2 flex-1 text-sm">{service.description}</p>
              <Button
                href={service.href}
                variant="ghost"
                size="sm"
                className="mt-5 self-start px-0"
              >
                Conocer más
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

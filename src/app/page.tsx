import { CtaBanner } from "@/components/sections/cta-banner";
import { FaqSection } from "@/components/sections/faq-section";
import { Hero } from "@/components/sections/hero";
import { ServiceCards } from "@/components/sections/service-cards";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { physicianJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const services = [
  {
    title: "Consulta",
    description: "TODO_CONTENIDO",
    href: "/servicios/consulta",
  },
  {
    title: "Terapias",
    description: "TODO_CONTENIDO",
    href: "/servicios/terapias",
  },
  {
    title: "Eventos",
    description: "TODO_CONTENIDO",
    href: "/servicios/eventos",
  },
];

const faqItems = [
  {
    id: "homeopatia",
    question: "¿Qué es la homeopatía y cómo funciona?",
    answer: <p>TODO_CONTENIDO</p>,
  },
  {
    id: "agendar",
    question: "¿Cómo puedo agendar una consulta?",
    answer: <p>TODO_CONTENIDO</p>,
  },
  {
    id: "farmacovigilancia",
    question: "¿Qué es la farmacovigilancia?",
    answer: <p>TODO_CONTENIDO</p>,
  },
  {
    id: "eventos",
    question: "¿Cómo puedo asistir a los eventos?",
    answer: <p>TODO_CONTENIDO</p>,
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd()) }}
      />

      <Hero
        eyebrow="Medicina integrativa · Homeopatía · Bienestar"
        title="Salud natural con respaldo científico y clínico"
        subtitle="TODO_CONTENIDO"
        actions={[
          { label: "Agendar consulta", href: "/agendar" },
          { label: "Ver productos", href: "/productos", variant: "secondary" },
        ]}
        highlights={["Productos homeopáticos", "Consulta médica", "Farmacovigilancia"]}
      />

      <ServiceCards
        eyebrow="HomeoDetox"
        title="Nuestros Servicios"
        subtitle="TODO_CONTENIDO"
        services={services}
      />

      <section className="bg-surface py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div
            aria-hidden="true"
            className="rounded-card aspect-4/3 bg-[linear-gradient(135deg,var(--color-secondary),var(--color-accent))]"
          />
          <div>
            <SectionHeading title={`¿Por qué ${siteConfig.name}?`} align="left" className="mb-4" />
            <p className="text-text-muted">TODO_CONTENIDO</p>
          </div>
        </Container>
      </section>

      <CtaBanner
        title="¡Conoce nuestros productos!"
        description="TODO_CONTENIDO"
        href="/productos"
        label="Ver catálogo"
      />

      <FaqSection title="Preguntas frecuentes" items={faqItems} />
    </>
  );
}

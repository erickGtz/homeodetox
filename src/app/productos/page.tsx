import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/sections/page-hero";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo";
import { getWhatsAppLink, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Productos",
    description:
      "Catálogo de productos homeopáticos de HomeoDetox. La tienda en línea estará disponible próximamente.",
    path: "/productos",
  }),
  robots: { index: false, follow: true },
};

export default function ProductosPage() {
  return (
    <>
      <PageHero title="Productos" tone="light" align="center" titleVariant="page" />

      <section className="bg-surface">
        <Container className="py-8 pb-16 sm:py-10 sm:pb-20">
          <Breadcrumbs items={[{ label: "Inicio" }, { label: "Productos" }]} />

          <div className="mx-auto mt-10 max-w-2xl text-center">
            <p className="text-secondary text-xs font-semibold tracking-[0.3em] uppercase">
              Catálogo en preparación
            </p>
            <h2 className="text-primary-dark mt-4 text-3xl font-normal tracking-tight sm:text-4xl">
              Estamos preparando nuestra tienda en línea
            </h2>
            <p className="text-text-body mt-4 text-base leading-[1.85] font-light">
              El catálogo transaccional con carrito y pagos forma parte de la siguiente etapa del
              sitio. Por ahora puedes escribirnos para consultar disponibilidad de productos
              homeopáticos o resolver dudas sobre tu tratamiento.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={getWhatsAppLink("Hola, quiero consultar disponibilidad de productos.")}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "primary" })}
              >
                Consultar por WhatsApp
              </a>
              <Link href="/servicios/consulta" className={buttonClasses({ variant: "outline" })}>
                Agendar una consulta
              </Link>
            </div>

            <p className="text-text-muted mt-10 text-xs leading-relaxed">
              Contenido pendiente de definir con el cliente.
            </p>
            <p className="text-text-muted mt-1 text-xs">
              {siteConfig.name} · {siteConfig.contact.address}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

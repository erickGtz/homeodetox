import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <p className="text-secondary text-xs font-semibold tracking-[0.3em] uppercase">Error 404</p>
      <h1 className="font-display text-primary mt-4 text-4xl font-semibold sm:text-5xl">
        No encontramos esta página
      </h1>
      <p className="text-text-muted mt-4 max-w-xl">
        La dirección puede haber cambiado o la página todavía no existe.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Volver al inicio</Button>
        <Button href="/servicios/consulta" variant="outline">
          Ver servicios
        </Button>
        <Button href="/faq" variant="ghost">
          Preguntas frecuentes
        </Button>
      </div>
      <p className="text-text-muted mt-10 text-sm">
        ¿Buscas algo más?{" "}
        <Link href="/agendar" className="text-primary underline underline-offset-4">
          Agenda una cita
        </Link>
        .
      </p>
    </Container>
  );
}

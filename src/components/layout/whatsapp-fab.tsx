import { IconWhatsApp } from "@/components/ui/icons";
import { getWhatsAppLink } from "@/lib/site-config";

export function WhatsAppFab() {
  return (
    <a
      href={getWhatsAppLink("Hola, me gustaría agendar una consulta.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="bg-accent text-on-primary fixed right-5 bottom-5 z-50 inline-flex size-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105"
    >
      <IconWhatsApp className="size-7" />
    </a>
  );
}

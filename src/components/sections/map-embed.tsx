import { siteConfig } from "@/lib/site-config";

type MapEmbedProps = {
  className?: string;
};

export function MapEmbed({ className }: MapEmbedProps) {
  const query = encodeURIComponent(siteConfig.contact.address);
  const src = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <iframe
      title={`Ubicación de ${siteConfig.name}`}
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={className ?? "rounded-card border-border aspect-4/3 w-full border"}
    />
  );
}

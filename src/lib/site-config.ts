export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  doctor: {
    name: string;
    specialty: string;
    license: string;
  };
  contact: {
    address: string;
    phone: string;
    phoneHref: string;
    whatsapp: string;
    email: string;
  };
  schedule: string;
  social: {
    label: string;
    href: string;
    icon: "facebook" | "instagram" | "linkedin" | "mail" | "map" | "whatsapp";
  }[];
};

export const siteConfig: SiteConfig = {
  name: "HomeoDetox",
  description:
    "Medicina integrativa y homeopatía con respaldo científico y clínico en Ciudad de México.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  doctor: {
    name: "Dr. Ricardo Rojas Esparza",
    specialty: "Medicina integrativa y homeopatía",
    license: "Pendiente de confirmar",
  },
  contact: {
    address: "Av. Insurgentes Sur 1872, Florida, Álvaro Obregón, 01030, CDMX",
    phone: "+52 (222) 222 2222",
    phoneHref: "+522222222222",
    whatsapp: "5212222222222",
    email: "TODO_CONTENIDO",
  },
  schedule: "Lunes a viernes · 9:00 AM – 7:00 PM",
  social: [
    { label: "Facebook", href: "#", icon: "facebook" },
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "Correo", href: "#", icon: "mail" },
    { label: "Mapa", href: "#", icon: "map" },
    { label: "WhatsApp", href: "#", icon: "whatsapp" },
  ],
};

export function getWhatsAppLink(message?: string) {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

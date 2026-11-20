export type HomeServiceHighlight = {
  id: string;
  label: string;
  description: string;
  href: string;
  image?: string | null;
  imageLabel: string;
};

export type HomeValue = {
  title: string;
  description: string;
};

export const homeContent = {
  hero: {
    eyebrow: "Medicina Integrativa · Homeopatía · Bienestar",
    title: "Salud natural con respaldo científico y clínico",
    subtitle:
      "Medicina integrativa y homeopatía en la Ciudad de México. Consultas personalizadas, terapias guiadas por ultrasonido y divulgación para acompañar tu salud.",
    actions: [
      { label: "Agendar consulta", href: "/agendar", variant: "primary" as const },
      { label: "Conocer servicios", href: "/servicios/consulta", variant: "outline" as const },
    ],
    highlights: ["Productos homeopáticos", "Consulta médica", "Divulgación"],
  },
  services: {
    title: "Nuestros Servicios",
    subtitle:
      "Consulta médica integrativa, terapias guiadas por ultrasonido y formación continua para pacientes y profesionales.",
    items: [
      {
        id: "consulta",
        label: "Consulta",
        description: "Valoración médica personalizada y acompañamiento en tu proceso.",
        href: "/servicios/consulta",
        imageLabel: "Fotografía de una consulta médica",
      },
      {
        id: "procedimientos",
        label: "Procedimientos",
        description: "Medicina regenerativa y terapia del dolor en rodilla, cadera y columna.",
        href: "/servicios/procedimientos",
        imageLabel: "Fotografía de una terapia guiada por ultrasonido",
      },
    ] satisfies HomeServiceHighlight[],
    eventsCta: { label: "Ver eventos y talleres", href: "/servicios/eventos" },
  },
  why: {
    eyebrow: "HomeoDetox",
    title: "¿Por qué HomeoDetox?",
    body: "Integramos medicina convencional, homeopatía y procedimientos guiados por imagen en un mismo plan de atención, con seguimiento cercano y explicaciones claras en cada etapa.",
    values: [
      {
        title: "Atención personalizada",
        description:
          "Cada plan se define después de una valoración completa, no con recetas genéricas.",
      },
      {
        title: "Procedimientos guiados por ultrasonido",
        description:
          "Mayor precisión en infiltraciones y bloqueos, con menos molestias para el paciente.",
      },
      {
        title: "Divulgación y seguimiento",
        description:
          "Publicamos contenido educativo y damos seguimiento después de cada procedimiento.",
      },
    ] satisfies HomeValue[],
    imageLabel: "Fotografía del consultorio",
    cta: { label: "Conócenos", href: "/nosotros" },
  },/*
  products: {
    eyebrow: "Catálogo",
    title: "¡Conoce nuestros productos!",
    description:
      "Muy pronto podrás conocer y adquirir nuestros productos homeopáticos desde el sitio. Mientras tanto, escríbenos para consultar disponibilidad.",
    label: "Ver catálogo",
    href: "/productos",
  },*/
  events: {
    title: "Eventos",
    subtitle: "Cursos, talleres y seminarios de medicina integrativa.",
    empty: "Pronto publicaremos nuevos eventos.",
    cta: { label: "Ver todos los eventos", href: "/servicios/eventos" },
    labels: {
      previous: "Eventos anteriores",
      next: "Eventos siguientes",
      more: "Ver más",
      slide: "Evento {current} de {total}",
    },
  },
  blog: {
    title: "Del blog",
    subtitle: "Artículos y videos sobre hábitos, prevención y medicina integrativa.",
    empty: "Pronto publicaremos nuevas publicaciones.",
    cta: { label: "Ver todas las publicaciones", href: "/blog" },
  },
  faq: {
    title: "Preguntas frecuentes",
    cta: { label: "Ver todas las preguntas", href: "/faq" },
  },
  seo: {
    title: "Medicina integrativa y homeopatía en CDMX",
    description:
      "Consulta médica integrativa, terapias guiadas por ultrasonido, eventos y divulgación en HomeoDetox, Ciudad de México.",
  },
};

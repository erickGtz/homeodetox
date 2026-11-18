export const eventosIndexContent = {
  breadcrumbs: {
    section: "Servicios",
    current: "Eventos",
  },
  heading: "Eventos",
  groups: {
    courses: "Cursos de formación en medicina",
    workshops: "Talleres",
  },
  empty: "Pronto publicaremos nuevos eventos.",
  detail: {
    instructorLabel: "Impartido por:",
    labels: {
      date: "Fecha",
      location: "Lugar",
      schedule: "Horario",
      cost: "Costos",
      courtesies: "Cortesías",
    },
    availabilityCta: "Verificar disponibilidad",
    availabilityMessage: (title: string) =>
      `Hola, quiero verificar disponibilidad para el evento "${title}".`,
  },
  seo: {
    title: "Eventos",
    description:
      "Cursos, talleres y seminarios de medicina integrativa y homeopatía impartidos por el Dr. Ricardo Rojas Esparza en HomeoDetox.",
  },
};

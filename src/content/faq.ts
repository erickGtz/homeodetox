export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

export const faqEntries: FaqEntry[] = [
  {
    id: "homeopatia",
    question: "¿Qué es la homeopatía y cómo funciona?",
    answer:
      "La homeopatía es un sistema terapéutico que se apoya en el principio de «lo similar cura lo similar». En HomeoDetox se integra a una valoración médica completa para definir si es adecuada para tu caso; no sustituye tratamientos indicados por otros especialistas.",
  },
  {
    id: "agendar",
    question: "¿Cómo puedo agendar una consulta?",
    answer:
      "Puedes agendar desde la página de agenda: eliges el tipo de consulta, la fecha y el horario disponible. También puedes escribirnos por WhatsApp si prefieres confirmar por esa vía.",
  },
  {
    id: "farmacovigilancia",
    question: "¿Qué es la farmacovigilancia?",
    answer:
      "Es el conjunto de actividades para detectar, registrar y evaluar reacciones adversas asociadas al uso de medicamentos, incluidos los homeopáticos. En el sitio puedes reportar un evento adverso mediante un formulario de tres pasos.",
  },
  {
    id: "eventos",
    question: "¿Cómo puedo asistir a los eventos?",
    answer:
      "En la sección de eventos encontrarás cursos, talleres y seminarios con fecha, sede y costos. Elige el que te interese y verifica disponibilidad por WhatsApp; las cortesías se confirman al momento de la inscripción.",
  },
  {
    id: "ubicacion",
    question: "¿Dónde está el consultorio?",
    answer:
      "Atendemos en Av. Insurgentes Sur 1872, Florida, Álvaro Obregón, 01030, Ciudad de México. El mapa de la página muestra la ubicación exacta y el horario de atención es de lunes a viernes, de 9:00 AM a 7:00 PM.",
  },
  {
    id: "productos",
    question: "¿Cuándo estarán disponibles los productos?",
    answer:
      "El catálogo transaccional estará disponible en una siguiente etapa del proyecto. Por ahora puedes escribirnos por WhatsApp para consultar disponibilidad de productos homeopáticos.",
  },
];

export const faqContent = {
  title: "Preguntas frecuentes",
  intro:
    "Resolvemos las dudas más comunes sobre consultas, terapias, eventos y farmacovigilancia. Si no encuentras tu respuesta, escríbenos por WhatsApp.",
  cta: {
    label: "Agendar una cita",
    href: "/agendar",
  },
  seo: {
    title: "Preguntas frecuentes",
    description:
      "Dudas sobre consultas, terapias, eventos y farmacovigilancia en HomeoDetox, Ciudad de México.",
  },
};

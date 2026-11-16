export type FormOption = {
  value: string;
  label: string;
};

export const sexOptions: FormOption[] = [
  { value: "femenino", label: "Femenino" },
  { value: "masculino", label: "Masculino" },
  { value: "otro", label: "Otro" },
];

export const reporterOptions: FormOption[] = [
  { value: "paciente", label: "Paciente" },
  { value: "cuidador", label: "Cuidador / Familiar / Otro" },
];

export const followUpOptions: FormOption[] = [
  { value: "si", label: "Sí" },
  { value: "no", label: "No" },
];

export const pharmacovigilanceContent = {
  hero: {
    title: "Farmacovigilancia",
  },
  intro: {
    title: "¿Qué es la Farmacovigilancia?",
    body: "La farmacovigilancia es la ciencia y el conjunto de actividades relacionadas con la detección, evaluación, comprensión y prevención de los efectos adversos o cualquier otro problema relacionado con los medicamentos. Su objetivo principal es mejorar la seguridad del paciente y la salud pública.",
  },
  media: {
    sideLabel: "Personal de salud revisando un reporte de evento adverso",
  },
  form: {
    cardTitle: "Reporte de evento adverso",
    steps: [
      { title: "Datos generales" },
      { title: "Identificación de producto" },
      { title: "Reporte del evento" },
    ],
    submitNote:
      "El envío se habilitará cuando se defina el almacenamiento seguro de datos de salud.",
  },
  seo: {
    title: "Farmacovigilancia",
    description:
      "Conoce qué es la farmacovigilancia y cómo reportar un evento adverso relacionado con medicamentos homeopáticos.",
  },
} as const;

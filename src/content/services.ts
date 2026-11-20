export type ServiceTab = {
  id: string;
  label: string;
  href: string;
};

export const servicesTabs: ServiceTab[] = [
  { id: "consulta", label: "Consulta", href: "/servicios/consulta" },
  { id: "procedimientos", label: "Procedimientos", href: "/servicios/procedimientos" },
  { id: "eventos", label: "Eventos", href: "/servicios/eventos" },
];

export const servicesHero = {
  title: "Servicios",
};

export type ConsultaBookingContent = {
  title: string;
  subtitle: string;
  nameLabel: string;
  ageLabel: string;
  nameError: string;
  ageError: string;
  nextLabel: string;
  backLabel: string;
  calendar: {
    legend: string;
    hint: string;
    weekdays: string[];
    previousLabel: string;
    nextLabel: string;
  };
  timeLabel: string;
  timeHintEmpty: string;
  timeHint: string;
  timeSlots: string[];
  consentPrefix: string;
  consentLink: string;
  consentSuffix: string;
  submitLabel: string;
  pendingNotice: string;
};

export type ConsultaContent = {
  breadcrumbs: {
    label: string;
    href?: string;
  }[];
  heading: string;
  intro: {
    title: string;
    body: string;
  };
  doctor: {
    eyebrow: string;
    description: string;
    photoLabel: string;
  };
  booking: ConsultaBookingContent;
  seo: {
    title: string;
    description: string;
  };
};

export const consultaContent: ConsultaContent = {
  breadcrumbs: [{ label: "Servicios" }, { label: "Consulta" }],
  heading: "Consulta",
  intro: {
    title: "Contáctanos para una consulta personalizada",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed turpis lorem, porttitor at tortor in, iaculis semper quam. Maecenas scelerisque nisi in ante mollis vehicula. Nulla egestas dolor ac varius lacinia. Mauris pharetra eros eu ex porta, in tristique ipsum imperdiet. Aenean ac est et felis rutrum pellentesque.",
  },
  doctor: {
    eyebrow: "Medicina General & Homeopática",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    photoLabel: "Fotografía del Dr. Ricardo Rojas Esparza",
  },
  booking: {
    title: "Reservar cita",
    subtitle: "Elige el tipo de consulta, fecha y horario",
    nameLabel: "Nombre del paciente",
    ageLabel: "Edad",
    nameError: "Escribe el nombre del paciente.",
    ageError: "Escribe una edad válida entre 0 y 120 años.",
    nextLabel: "Siguiente",
    backLabel: "Volver",
    calendar: {
      legend: "Selecciona una fecha",
      hint: "Selecciona un día disponible para ver los horarios.",
      weekdays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"],
      previousLabel: "Mes anterior",
      nextLabel: "Mes siguiente",
    },
    timeLabel: "Selecciona un horario",
    timeHintEmpty: "Primero elige una fecha",
    timeHint: "Horarios disponibles",
    timeSlots: [
      "9:00 AM",
      "9:45 AM",
      "10:30 AM",
      "11:15 AM",
      "12:00 PM",
      "4:00 PM",
      "4:45 PM",
      "5:30 PM",
    ],
    consentPrefix: "Acepto el",
    consentLink: "aviso de privacidad",
    consentSuffix: "y el tratamiento de mis datos personales para gestionar esta cita.",
    submitLabel: "Agendar cita",
    pendingNotice: "La agenda en línea estará disponible próximamente. Tu selección no se envió.",
  },
  seo: {
    title: "Consulta",
    description:
      "Agenda una consulta de medicina integrativa y homeopatía con el Dr. Ricardo Rojas Esparza en HomeoDetox, Ciudad de México.",
  },
};

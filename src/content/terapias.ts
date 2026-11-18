export type TherapyRegionId = "rodilla" | "cadera" | "columna-pelvicos";

export type TherapyRegion = {
  id: TherapyRegionId;
  label: string;
  summary: string;
};

export type TherapyVideo = {
  id: string;
  title: string;
  /**
   * TODO_CONTENIDO: ID del archivo en Drive.
   * El archivo debe estar compartido como "Cualquiera con el enlace".
   */
  driveFileId?: string;
};

export type TherapyTreatment = {
  slug: string;
  regionId: TherapyRegionId;
  title: string;
  description?: string;
  image?: string | null;
  imageLabel: string;
  steps: string[];
  videos: TherapyVideo[];
};

export type TherapyLabels = {
  regionNav: string;
  steps: string;
  infoLabel: string;
  imagePlaceholder: string;
  swipeHint: string;
  videoPending: string;
  videoPlay: string;
  previousSlide: string;
  nextSlide: string;
  slideLabel: string;
};

export const therapyLabels: TherapyLabels = {
  regionNav: "Regiones a tratar",
  steps: "Cómo se realiza",
  infoLabel: "Información del tratamiento",
  imagePlaceholder: "Aquí va una imagen",
  swipeHint: "Desliza para ver los videos",
  videoPending: "Video pendiente",
  videoPlay: "Reproducir video",
  previousSlide: "Diapositiva anterior",
  nextSlide: "Diapositiva siguiente",
  slideLabel: "Diapositiva {current} de {total}",
};

export const therapyRegions: TherapyRegion[] = [
  {
    id: "rodilla",
    label: "Rodilla",
    summary:
      "Infiltraciones y ozonoterapia guiadas por ultrasonido para dolor e inflamación de rodilla.",
  },
  {
    id: "cadera",
    label: "Cadera",
    summary: "Infiltración guiada por ultrasonido en la articulación coxofemoral.",
  },
  {
    id: "columna-pelvicos",
    label: "Columna y pélvicos",
    summary:
      "Infiltraciones y ozonoterapia guiadas por ultrasonido en columna lumbar e hiato sacro.",
  },
];

const commonSteps: string[] = [
  "Valoración y diagnóstico",
  "Asepsia y preparación del paciente",
  "Procedimiento guiado por ultrasonido",
  "Apósito, faja y seguimiento",
];

const emptyVideos = (): TherapyVideo[] => [
  { id: "introduccion", title: "Introducción" },
  { id: "procedimiento", title: "Procedimiento" },
  { id: "cuidados", title: "Cuidados posteriores" },
];

export const therapyTreatments: TherapyTreatment[] = [
  {
    slug: "infiltracion-de-rodilla",
    regionId: "rodilla",
    title: "Infiltración de rodillas",
    description: "Extracción y aplicación de plasma y médula ósea.",
    imageLabel: "Infiltración de rodilla",
    steps: commonSteps,
    videos: emptyVideos(),
  },
  {
    slug: "ozonoterapia-rodilla",
    regionId: "rodilla",
    title: "Ozonoterapia",
    description: "Infiltración de ozono para reducir inflamación y dolor.",
    imageLabel: "Ozonoterapia en rodilla",
    steps: commonSteps,
    videos: emptyVideos(),
  },
  {
    slug: "acutomomedicina",
    regionId: "rodilla",
    title: "Acutomomedicina",
    imageLabel: "Acutomomedicina en rodilla",
    steps: commonSteps,
    videos: emptyVideos(),
  },
  {
    slug: "infiltracion-coxofemoral",
    regionId: "cadera",
    title: "Infiltración en articulación coxofemoral",
    imageLabel: "Infiltración en articulación coxofemoral",
    steps: commonSteps,
    videos: emptyVideos(),
  },
  {
    slug: "infiltracion-columna-lumbar",
    regionId: "columna-pelvicos",
    title: "Infiltración de columna lumbar",
    imageLabel: "Infiltración de columna lumbar",
    steps: commonSteps,
    videos: emptyVideos(),
  },
  {
    slug: "infiltracion-hiato-sacro",
    regionId: "columna-pelvicos",
    title: "Infiltración de hiato sacro",
    imageLabel: "Infiltración en hiato sacro",
    steps: commonSteps,
    videos: emptyVideos(),
  },
  {
    slug: "ozonoterapia-columna",
    regionId: "columna-pelvicos",
    title: "Ozonoterapia",
    description: "Infiltración de ozono para reducir inflamación y dolor.",
    imageLabel: "Ozonoterapia en columna",
    steps: commonSteps,
    videos: emptyVideos(),
  },
];

export const terapiasContent = {
  breadcrumbs: [{ label: "Servicios" }, { label: "Terapias" }],
  heading: "Medicina regenerativa y terapia del dolor",
  intro:
    "Procedimientos mínimamente invasivos guiados por ultrasonido para el manejo del dolor articular y de columna. Elige la región para conocer los tratamientos disponibles y ver los videos de cada procedimiento.",
  regions: therapyRegions,
  treatments: therapyTreatments,
  labels: therapyLabels,
  note: "El contenido de esta sección está en revisión médica. Ningún procedimiento sustituye una valoración presencial y los resultados varían en cada paciente.",
  cta: {
    title: "Agenda tu valoración",
    description:
      "El médico define si el tratamiento es adecuado para tu caso después de revisar tu historial y exploración.",
    primaryLabel: "Agendar cita",
    secondaryLabel: "Preguntar por WhatsApp",
    whatsappMessage: "Hola, quiero información sobre medicina regenerativa y terapia del dolor.",
  },
  seo: {
    title: "Medicina regenerativa y terapia del dolor",
    description:
      "Infiltraciones, ozonoterapia y procedimientos guiados por ultrasonido para rodilla, cadera y columna en HomeoDetox, Ciudad de México.",
  },
};

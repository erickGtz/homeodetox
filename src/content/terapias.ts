export type TherapyRegionId = "rodilla" | "cadera" | "columna";

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
  description: string;
  image?: string | null;
  imageLabel: string;
  steps: string[];
  videos: TherapyVideo[];
};

export type TherapyLabels = {
  regionNav: string;
  steps: string;
  watchVideos: string;
  backToCard: string;
  videosTitle: string;
  videoPending: string;
  videoPlay: string;
  videoMissing: string;
  previousVideo: string;
  nextVideo: string;
  slideLabel: string;
};

export const therapyLabels: TherapyLabels = {
  regionNav: "Regiones a tratar",
  steps: "Cómo se realiza",
  watchVideos: "Ver videos",
  backToCard: "Volver",
  videosTitle: "Videos del procedimiento",
  videoPending: "Video pendiente",
  videoPlay: "Reproducir video",
  videoMissing: "Aún no hay videos cargados para este tratamiento.",
  previousVideo: "Video anterior",
  nextVideo: "Video siguiente",
  slideLabel: "Video {current} de {total}",
};

export const therapyRegions: TherapyRegion[] = [
  {
    id: "rodilla",
    label: "Rodilla",
    summary: "Procedimientos guiados por ultrasonido para dolor e inflamación de rodilla.",
  },
  {
    id: "cadera",
    label: "Cadera",
    summary: "Procedimientos guiados por ultrasonido en la articulación coxofemoral.",
  },
  {
    id: "columna",
    label: "Columna",
    summary: "Bloqueos e infiltraciones guiadas por ultrasonido en columna lumbar.",
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
    title: "Infiltración de rodilla",
    description:
      "Aplicación local de medicamento en la articulación de la rodilla, guiada por ultrasonido.",
    imageLabel: "Infiltración de rodilla",
    steps: commonSteps,
    videos: emptyVideos(),
  },
  {
    slug: "infiltracion-con-ozono",
    regionId: "rodilla",
    title: "Infiltración con ozono",
    description: "Aplicación de ozono medicinal en la zona a tratar, con control por ultrasonido.",
    imageLabel: "Infiltración con ozono",
    steps: commonSteps,
    videos: emptyVideos(),
  },
  {
    slug: "acutomo-pata-de-ganso",
    regionId: "rodilla",
    title: "Acutomo (pata de ganso)",
    description:
      "Aguja terapéutica de mayor grosor que la de acupuntura tradicional, aplicada en la región de la pata de ganso.",
    imageLabel: "Acutomo en pata de ganso",
    steps: commonSteps,
    videos: emptyVideos(),
  },
  {
    slug: "puncion-articular",
    regionId: "rodilla",
    title: "Punción articular",
    description:
      "Extracción de líquido o tejido con aguja en la articulación, con apoyo de ultrasonido.",
    imageLabel: "Punción articular",
    steps: commonSteps,
    videos: emptyVideos(),
  },
  {
    slug: "infiltracion-coxofemoral",
    regionId: "cadera",
    title: "Infiltración de articulación coxofemoral",
    description:
      "Aplicación local de medicamento en la articulación de la cadera, guiada por ultrasonido.",
    imageLabel: "Infiltración de articulación coxofemoral",
    steps: commonSteps,
    videos: emptyVideos(),
  },
  {
    slug: "puncion-articular-de-cadera",
    regionId: "cadera",
    title: "Punción articular de cadera",
    description:
      "Extracción de líquido o tejido con aguja en la articulación de la cadera, con apoyo de ultrasonido.",
    imageLabel: "Punción articular de cadera",
    steps: commonSteps,
    videos: emptyVideos(),
  },
  {
    slug: "infiltracion-de-columna-lumbar",
    regionId: "columna",
    title: "Infiltración de columna lumbar",
    description: "Aplicación local de medicamento en la columna lumbar, guiada por ultrasonido.",
    imageLabel: "Infiltración de columna lumbar",
    steps: commonSteps,
    videos: emptyVideos(),
  },
  {
    slug: "bloqueo-epidural",
    regionId: "columna",
    title: "Bloqueo epidural",
    description:
      "Bloqueo con anestésico local en el espacio epidural, con sedación cuando se requiere.",
    imageLabel: "Bloqueo epidural",
    steps: commonSteps,
    videos: emptyVideos(),
  },
  {
    slug: "hiato-sacro",
    regionId: "columna",
    title: "Hiato sacro",
    description: "Infiltración en el hiato sacro, con control por ultrasonido.",
    imageLabel: "Infiltración en hiato sacro",
    steps: commonSteps,
    videos: emptyVideos(),
  },
  {
    slug: "cavitacion-lumbar",
    regionId: "columna",
    title: "Cavitación lumbar",
    description:
      "Ultrasonido de baja frecuencia aplicado en la zona lumbar para actuar sobre los adipocitos.",
    imageLabel: "Cavitación lumbar",
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
      "Infiltraciones, bloqueos y procedimientos guiados por ultrasonido para rodilla, cadera y columna en HomeoDetox, Ciudad de México.",
  },
};

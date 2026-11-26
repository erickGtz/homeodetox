import catalogoMedia from "@/data/catalogo-media.json";

export type TherapyRegionId = "rodilla" | "cadera" | "columna-pelvicos";

export type TherapyRegion = {
  id: TherapyRegionId;
  label: string;
  summary: string;
};

/**
 * Categorías de actividades que forman parte
 * de los procedimientos médicos.
 */
export type TherapyActivityCode =
  | "G"
  | "ES"
  | "S"
  | "M"
  | "EG"
  | "EM"
  | "EP"
  | "IR"
  | "IRO"
  | "VIR"
  | "IC"
  | "ICO"
  | "VCL"
  | "IHS"
  | "IACF";

  const activityFolders: Partial<
  Record<TherapyActivityCode, string>
> = {
  G: "Bloqueos y sedacion",
  ES: "Extraccion sangre",
  S: "Solucion de Klein",
  EG: "Extraccion grasa",
  EM: "Extraccion medula",
  EP: "Extraccion plasma",
  M: "Mezcla",
  IR: "Infiltraccion Rodillas",
  VIR: "Vendoletes rodilla",
};

function getActivityMedia(code: TherapyActivityCode): TherapyMedia[] {
  const folder = activityFolders[code];

  if (!folder) return [];

  return catalogoMedia.files
    .filter((file) => file.folder === folder)
    .flatMap((file): TherapyMedia[] => {
      if (file.type !== "image" && file.type !== "video") {
        return [];
      }

      return [{
        id: file.key,
        type: file.type,
        title: file.filename
          .replace(/^\d+(?:\.\d+)?\s*/, "")
          .replace(/\.[^.]+$/, "")
          .trim(),
        url: file.url,
      }];
    });
}

/**
 * Contenido multimedia de cada actividad.
 * Los archivos se alojan externamente en Google Drive.
 */
export type TherapyMedia = {
  id: string;
  type: "video" | "image";
  title: string;
  url: string;
};

/**
 * Actividad individual con sus recursos multimedia.
 */
export type TherapyActivity = {
  code: TherapyActivityCode;
  title: string;
  description?: string;
  media: TherapyMedia[];
};

/**
 * Tratamiento compuesto por una secuencia de actividades.
 */
export type TherapyTreatment = {
  slug: string;
  regionId: TherapyRegionId;
  title: string;
  description?: string;
  image?: string | null;
  imageLabel: string;
  steps: TherapyActivityCode[];
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
  steps: "Etapas del procedimiento",
  infoLabel: "Información del tratamiento",
  imagePlaceholder: "Aquí va una imagen",
  swipeHint: "Desliza para ver el contenido",
  videoPending: "Contenido pendiente",
  videoPlay: "Reproducir video",
  previousSlide: "Diapositiva anterior",
  nextSlide: "Diapositiva siguiente",
  slideLabel: "Diapositiva {current} de {total}",
};

/**
 * Regiones anatómicas disponibles.
 */
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
    summary:
      "Infiltración guiada por ultrasonido en la articulación coxofemoral.",
  },
  {
    id: "columna-pelvicos",
    label: "Columna y pélvicos",
    summary:
      "Infiltraciones y ozonoterapia guiadas por ultrasonido en columna lumbar e hiato sacro.",
  },
];

/**
 * CATÁLOGO CENTRAL DE ACTIVIDADES
 *
 * Cada actividad contiene sus propios videos e imágenes.
 *
 * Para agregar contenido:
 * 1. Sube el archivo a Google Drive.
 * 2. Configura el acceso correspondiente.
 * 3. Copia su ID.
 * 4. Agrega un elemento al arreglo media.
 *
 * Los arreglos vacíos indican que todavía no se ha
 * registrado contenido multimedia para esa actividad.
 */
export const therapyActivities: Record<
  TherapyActivityCode,
  TherapyActivity
> = {
G: {
  code: "G",
  title: "Preparación clínica del paciente",
  media: getActivityMedia("G"),
},

ES: {
  code: "ES",
  title: "Extracción de sangre",
  media: getActivityMedia("ES"),
},

S: {
  code: "S",
  title: "Preparación de solución tumescente",
  media: getActivityMedia("S"),
},

EG: {
  code: "EG",
  title: "Extracción de grasa",
  media: getActivityMedia("EG"),
},

EM: {
  code: "EM",
  title: "Extracción de médula",
  media: getActivityMedia("EM"),
},

EP: {
  code: "EP",
  title: "Extracción de plasma",
  media: getActivityMedia("EP"),
},

M: {
  code: "M",
  title: "Combinación de componentes autólogos",
  media: getActivityMedia("M"),
},

IR: {
  code: "IR",
  title: "Infiltración de rodillas",
  media: getActivityMedia("IR"),
},

VIR: {
  code: "VIR",
  title: "Colocación de vendoletes",
  media: getActivityMedia("VIR"),

},
IRO: {
  code: "VIR",
  title: "Infiltración de ozono",
  media: [],
},

IC: {
  code: "IC",
  title: "Infiltración de columna",
  media: [],
},

ICO: {
  code: "ICO",
  title: "Infiltración columna ozono",
  media: [],
},

IHS: {
  code: "IHS",
  title: "Infiltración de hiato sacro",
  media: [],
},

IACF: {
  code: "IACF",
  title: "Infiltración coxofemoral",
  media: [],
},

VCL: {
  code: "VCL",
  title: "Colocación de vendoletes",
  media: [],
},
};

/**
 * TRATAMIENTOS
 *
 * Cada tratamiento referencia las actividades que necesita.
 * El orden del arreglo steps determina el orden de presentación.
 *
 * IMPORTANTE:
 * Las secuencias son ejemplos iniciales y deben validarse
 * con el cliente y el personal médico.
 */
export const therapyTreatments: TherapyTreatment[] = [
  {
    slug: "infiltracion-de-rodilla",
    regionId: "rodilla",
    title: "Infiltración de rodillas",
    description: "Extracción y aplicación de plasma y médula ósea.",
    imageLabel: "Infiltración de rodilla",
    steps: ["G", "ES", "S", "EG", "EM", "EP", "M", "IR", "VIR"],
  },

  {
    slug: "ozonoterapia-rodilla",
    regionId: "rodilla",
    title: "Ozonoterapia",
    description: "Infiltración de ozono para reducir inflamación y dolor.",
    imageLabel: "Ozonoterapia en rodilla",
    steps: ["G", "S", "IRO", "VIR"],
  },

  {
    slug: "infiltracion-coxofemoral",
    regionId: "cadera",
    title: "Infiltración en articulación coxofemoral",
    imageLabel: "Infiltración en articulación coxofemoral",
    steps: ["G", "ES", "S", "EG", "EM", "EP", "M", "IACF"],
  },

  {
    slug: "infiltracion-columna-lumbar",
    regionId: "columna-pelvicos",
    title: "Infiltración de columna lumbar",
    imageLabel: "Infiltración de columna lumbar",
    steps: ["G", "ES", "S", "EG", "EM", "EP", "M", "IC", "VCL"],
  },

  {
    slug: "infiltracion-hiato-sacro",
    regionId: "columna-pelvicos",
    title: "Infiltración de hiato sacro",
    imageLabel: "Infiltración en hiato sacro",
    steps: ["G", "ES", "S", "EG", "EM", "EP", "M", "IHS", "VCL"],
  },

  {
    slug: "ozonoterapia-columna",
    regionId: "columna-pelvicos",
    title: "Ozonoterapia",
    description: "Infiltración de ozono para reducir inflamación y dolor.",
    imageLabel: "Ozonoterapia en columna",
    steps: ["G", "S", "ICO", "VCL"],
  },
];

/**
 * CONTENIDO GENERAL DE LA SECCIÓN
 */
export const terapiasContent = {
  breadcrumbs: [{ label: "Servicios" }, { label: "Terapias" }],

  heading: "Medicina regenerativa y terapia del dolor",

  intro:
    "Procedimientos mínimamente invasivos guiados por ultrasonido para el manejo del dolor articular y de columna. Elige la región para conocer los tratamientos disponibles y explorar las diferentes etapas de cada procedimiento.",

  regions: therapyRegions,

  treatments: therapyTreatments,

  activities: therapyActivities,

  labels: therapyLabels,

  note:
    "El contenido de esta sección está en revisión médica. Ningún procedimiento sustituye una valoración presencial y los resultados varían en cada paciente.",

  cta: {
    title: "Agenda tu valoración",

    description:
      "El médico define si el tratamiento es adecuado para tu caso después de revisar tu historial y exploración.",

    primaryLabel: "Agendar cita",

    secondaryLabel: "Preguntar por WhatsApp",

    whatsappMessage:
      "Hola, quiero información sobre medicina regenerativa y terapia del dolor.",
  },

  seo: {
    title: "Medicina regenerativa y terapia del dolor",

    description:
      "Infiltraciones, ozonoterapia y procedimientos guiados por ultrasonido para rodilla, cadera y columna en HomeoDetox, Ciudad de México.",
  },
};
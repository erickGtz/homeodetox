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
  | "IC"
  | "IHS"
  | "IACF";

/**
 * Contenido multimedia de cada actividad.
 * Los archivos se alojan externamente en Google Drive.
 */
export type TherapyMedia = {
  id: string;
  type: "video" | "image";
  title: string;
  driveFileId: string;
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
    title: "Actividades generales",
    media: [
      { id: "g-02",
      type: "image",
      title: "Canalizando al paciente",
      driveFileId: "109EixyKjuYekDBcYPMOM32YEneBk_PRd",
      },
      { id: "g-03",
      type: "image",
      title: "Bloqueo",
      driveFileId: "1k0OxMBULfERxIKX5IiwIQh31097CreCh",
      },
      { id: "g-04",
      type: "image",
      title: "Bloqueo",
      driveFileId: "1VN5KXQlOU6wejfKSXG8JFLn7Xb7a0NoU",
      },
      { id: "g-05",
      type: "video",
      title: "Bloqueo",
      driveFileId: "1rbKQWwZw_pC_dwdij3Y2XMTpAJf1i_cY",
      },
      { id: "g-06",
      type: "image",
      title: "Bloqueo Epidural",
      driveFileId: "1-QIDgJFqymY4WZK1zG07T7RQQK716bjS",
      },
      { id: "g-07",
      type: "video",
      title: "Sedación",
      driveFileId: "1vj6qgCmIvYuX-taUVf6LDFzcBB9-9GS7",
      },
    ],
  },

  ES: {
    code: "ES",
    title: "Extracción de sangre",
    media: [{
      id: "es-01",
      type: "video",
      title: "Preparación del material",
      driveFileId: "1bue1dEzEi66iekXxGfYUcL0L7QUaGtw3",
    },],
  },

  S: {
    code: "S",
    title: "Preparación de soluciones",
    media: [{
      id: "es-08",
      type: "video",
      title: "PREPARACION SOLUCION DE KLEIN",
      driveFileId: "19MIjXy89AQcfmYYfIReBYEjuk5dbh9cB",
    },
    {
      id: "es-09",
      type: "video",
      title: "SOLUCION DE KLEIN",
      driveFileId: "1ewchDagdgYOYkUaGPDH4j4GCjCJsO9dS",
    },
    {
      id: "es-10",
      type: "video",
      title: "SOLUCION DE KLEIN",
      driveFileId: "13uUNy2ICJAmzJLQZQSKpJi1fvuORusSY",
    },
    {
      id: "es-11",
      type: "video",
      title: "Epinefrina",
      driveFileId: "1w4HCT7ivRz6Du87cqpNzMqVeKTqlMX0F",
    },],
  },

  EG: {
    code: "EG",
    title: "Extracción de grasa",
    media: [
      {
      id: "es-11.1",
      type: "video",
      title: "USG Pared abdominal",
      driveFileId: "1x3Py3m-nk8uh5374zqmS_sUrPhuav2Bh",
    },{
      id: "es-12",
      type: "image",
      title: "Epinefrina",
      driveFileId: "1Eb3atJni1cZlqb0uvkxrgfkbiQ_LUTKs",
    },{
      id: "es-12.1",
      type: "video",
      title: "Epinefrina",
      driveFileId: "1ObS-GScG9kaIjzrnwnipHXqG-aCuXBzS",
    },
    {
      id: "es-13",
      type: "image",
      title: "Epinefrina",
      driveFileId: "1WneUxkodsF0Hro6uY_YUjyvmQdgCXkoE",
    },
    {
      id: "es-14",
      type: "video",
      title: "Epinefrina",
      driveFileId: "1c0l_nxAh99i064vQb2rSKo5BJmt1hftb",
    },
    {
      id: "es-15",
      type: "image",
      title: "Epinefrina",
      driveFileId: "1lxNGUk4Z9fETDIdqUIcBSK2jo4cHnUqm",
    },
    {
      id: "es-16",
      type: "video",
      title: "Epinefrina",
      driveFileId: "1zJ7pgtOihvfvJQUkMU1hjn0bwP48cKG6",
    },
    {
      id: "es-17",
      type: "video",
      title: "Epinefrina",
      driveFileId: "17WhkWq6GnJOmXmFWxwyUvnmku1TpZk2u",
    },
    {
      id: "es-18",
      type: "video",
      title: "Epinefrina",
      driveFileId: "1c9ISQvSXcw7liDiHqxWH5HNpqwTfkFoD",
    },
    {
      id: "es-19",
      type: "image",
      title: "Epinefrina",
      driveFileId: "1AGHsY0tMx8ManJgDbV5-CHeMTrYjFRjD",
    },
    {
      id: "es-37",
      type: "image",
      title: "Epinefrina",
      driveFileId: "1a9i2qpf3v7aNFrxeYujv74wusPF1sxdB",
    },
    {
      id: "es-38",
      type: "image",
      title: "Epinefrina",
      driveFileId: "1Zem0j2ZHevKzOvNhqn1n04FTbSWSRjHV",
    },
    {
      id: "es-39",
      type: "image",
      title: "Epinefrina",
      driveFileId: "1YrZVYrFm3C66_5IIUjM2jubvxpPFTKiW",
    },
    
    ],
  },

  EM: {
    code: "EM",
    title: "Extracción de médula",
    media: [
      {
      id: "es-19.1",
      type: "video",
      title: "Epinefrina",
      driveFileId: "1F1cejrp8JlPqbyxyp5ndUgT5maPPNtLr",
    },{
      id: "es-20",
      type: "video",
      title: "Epinefrina",
      driveFileId: "1h1PQWgX2pLlHfcSS42gdJIBItC6eK6ju",
    },
    ],
  },

  EP: {
    code: "EP",
    title: "Extracción de plasma",
    media: [
      {
      id: "es-20",
      type: "image",
      title: "Epinefrina",
      driveFileId: "1Nug4xHIY6svz236N4ZDUHHivVsZ4uLej",
    },
    ],
  },
  
  M: {
    code: "M",
    title: "Mezcla",
    media: [
      {
      id: "es-22",
      type: "image",
      title: "MEZCLA LIPO MEDULA PLASMA",
      driveFileId: "1yj5TxMT_OiXnxWNeowkSlPabso2iXVEH",
    },
    {
      id: "es-23",
      type: "image",
      title: "MEZCLA LIPO MEDULA PLASMA",
      driveFileId: "1IBlO-zst8ELeMxO503PEYBQRaB70EDNH",
    },
    ],
  },

  IR: {
    code: "IR",
    title: "Infiltración de rodillas",
    media: [
      {
      id: "es-24",
      type: "image",
      title: "Epinefrina",
      driveFileId: "1NaP0Ra1pWhqG8t_yphGH7V-znTcs1oMM",
    },{
      id: "es-25",
      type: "image",
      title: "Epinefrina",
      driveFileId: "1Mu9psYPPME_FXFGiR9-RBLUGI9aa7E4K",
    },
    {
      id: "es-26",
      type: "image",
      title: "Epinefrina",
      driveFileId: "1CfKKEuQ-OXmRoxY-VDPKTmG6YnsPLgXP",
    },
    {
      id: "es-27",
      type: "image",
      title: "Epinefrina",
      driveFileId: "13eH5GI4f4gx_x8hUDvdTBFAGSGrxllYW",
    },
    {
      id: "es-28",
      type: "image",
      title: "Epinefrina",
      driveFileId: "1JLxygSusFeJoqHajLy0CMMeTEClUUKjr",
    },
    {
      id: "es-29",
      type: "image",
      title: "Epinefrina",
      driveFileId: "18bWhwwb5szQ1vptRcf4w57h4YprHQwsG",
    },
    {
      id: "es-30",
      type: "image",
      title: "Epinefrina",
      driveFileId: "1q6BZmPolRv37MUP8Gnid5rLgoxf_KAca",
    },
    ],
  },

  IC: {
    code: "IC",
    title: "Infiltración de columna",
    media: [],
  },

  IHS: {
    code: "IHS",
    title: "Infiltración de hiato sacro",
    media: [],
  },

  IACF: {
    code: "IACF",
    title: "Infiltración de articulación coxofemoral",
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
    steps: ["G", "ES", "S", "EP", "IR"],
  },

  {
    slug: "ozonoterapia-rodilla",
    regionId: "rodilla",
    title: "Ozonoterapia",
    description: "Infiltración de ozono para reducir inflamación y dolor.",
    imageLabel: "Ozonoterapia en rodilla",
    steps: ["G", "IR"],
  },

  {
    slug: "infiltracion-coxofemoral",
    regionId: "cadera",
    title: "Infiltración en articulación coxofemoral",
    imageLabel: "Infiltración en articulación coxofemoral",
    steps: ["G", "ES", "S", "EP", "IACF"],
  },

  {
    slug: "infiltracion-columna-lumbar",
    regionId: "columna-pelvicos",
    title: "Infiltración de columna lumbar",
    imageLabel: "Infiltración de columna lumbar",
    steps: ["G", "ES", "S", "EP", "IC"],
  },

  {
    slug: "infiltracion-hiato-sacro",
    regionId: "columna-pelvicos",
    title: "Infiltración de hiato sacro",
    imageLabel: "Infiltración en hiato sacro",
    steps: ["G", "ES", "S", "EP", "IHS"],
  },

  {
    slug: "ozonoterapia-columna",
    regionId: "columna-pelvicos",
    title: "Ozonoterapia",
    description: "Infiltración de ozono para reducir inflamación y dolor.",
    imageLabel: "Ozonoterapia en columna",
    steps: ["G", "IC"],
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
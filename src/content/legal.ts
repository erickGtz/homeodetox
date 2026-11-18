export type LegalSection = {
  heading: string;
  body: string;
};

export type LegalDocument = {
  slug: "aviso-de-privacidad" | "terminos" | "cookies";
  title: string;
  intro: string;
  sections: LegalSection[];
  seo: {
    title: string;
    description: string;
  };
};

export const legalNotice =
  "Documento en preparación. El texto de esta página es un esquema de trabajo y debe ser revisado y aprobado por un abogado antes de publicarse.";

export const legalDocuments: Record<LegalDocument["slug"], LegalDocument> = {
  "aviso-de-privacidad": {
    slug: "aviso-de-privacidad",
    title: "Aviso de privacidad",
    intro:
      "Aviso de privacidad conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).",
    sections: [
      {
        heading: "Responsable del tratamiento",
        body: "TODO_CONTENIDO — Aquí se debe indicar la razón social, domicilio y correo de contacto del responsable de los datos personales.",
      },
      {
        heading: "Datos personales que recabamos",
        body: "TODO_CONTENIDO — Aquí se deben enumerar los datos de identificación, contacto y, en su caso, datos personales sensibles sobre salud recabados en los formularios de contacto, agenda y farmacovigilancia.",
      },
      {
        heading: "Finalidades del tratamiento",
        body: "TODO_CONTENIDO — Aquí se deben describir las finalidades primarias y secundarias del tratamiento, incluyendo la gestión de citas y el reporte de eventos adversos.",
      },
      {
        heading: "Transferencias y encargados",
        body: "TODO_CONTENIDO — Aquí se deben listar los terceros que tratan datos por cuenta del responsable, por ejemplo el proveedor de correo o el servicio de agenda.",
      },
      {
        heading: "Derechos ARCO",
        body: "TODO_CONTENIDO — Aquí se debe explicar cómo ejercer los derechos de acceso, rectificación, cancelación y oposición, con el canal y los plazos correspondientes.",
      },
      {
        heading: "Cambios al aviso",
        body: "TODO_CONTENIDO — Aquí se debe indicar cómo se notificarán las modificaciones al aviso de privacidad.",
      },
    ],
    seo: {
      title: "Aviso de privacidad",
      description:
        "Aviso de privacidad de HomeoDetox conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.",
    },
  },
  terminos: {
    slug: "terminos",
    title: "Términos y condiciones de uso",
    intro:
      "Condiciones generales de uso del sitio web de HomeoDetox y del contenido publicado en él.",
    sections: [
      {
        heading: "Uso del sitio",
        body: "TODO_CONTENIDO — Aquí se deben describir las condiciones de acceso y uso del sitio, así como las conductas no permitidas.",
      },
      {
        heading: "Alcance informativo",
        body: "TODO_CONTENIDO — Aquí se debe aclarar que el contenido del sitio es informativo y no sustituye una consulta médica presencial ni un diagnóstico.",
      },
      {
        heading: "Propiedad intelectual",
        body: "TODO_CONTENIDO — Aquí se deben establecer los derechos sobre marcas, textos, imágenes y material audiovisual del sitio.",
      },
      {
        heading: "Eventos y servicios",
        body: "TODO_CONTENIDO — Aquí se deben precisar las condiciones de inscripción a eventos, costos, cortesías y cancelaciones.",
      },
      {
        heading: "Contacto",
        body: "TODO_CONTENIDO — Aquí se debe indicar el medio oficial para dudas o aclaraciones sobre estos términos.",
      },
    ],
    seo: {
      title: "Términos y condiciones",
      description: "Términos y condiciones de uso del sitio web de HomeoDetox.",
    },
  },
  cookies: {
    slug: "cookies",
    title: "Política de cookies",
    intro:
      "Información sobre las cookies y tecnologías similares que utiliza el sitio web de HomeoDetox.",
    sections: [
      {
        heading: "Qué son las cookies",
        body: "TODO_CONTENIDO — Aquí se debe explicar qué son las cookies, para qué sirven y cómo se almacenan en el navegador.",
      },
      {
        heading: "Cookies necesarias",
        body: "TODO_CONTENIDO — Aquí se deben listar las cookies estrictamente necesarias para el funcionamiento del sitio.",
      },
      {
        heading: "Cookies de analítica y marketing",
        body: "TODO_CONTENIDO — Actualmente no hay herramientas de analítica ni de publicidad instaladas. Cuando se habiliten, deberán listarse aquí y activarse solo con consentimiento previo.",
      },
      {
        heading: "Cómo deshabilitarlas",
        body: "TODO_CONTENIDO — Aquí se debe explicar cómo eliminar o bloquear cookies desde la configuración de cada navegador.",
      },
    ],
    seo: {
      title: "Política de cookies",
      description: "Política de cookies del sitio web de HomeoDetox.",
    },
  },
};

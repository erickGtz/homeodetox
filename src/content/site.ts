export type NavItem = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  items: NavItem[];
};

export const mainNavLeft: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Productos", href: "/productos" },
];

export const mainNavRight: NavItem[] = [
  { label: "Blog", href: "/blog" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Farmacovigilancia", href: "/farmacovigilancia" },
];

export const headerCta: NavItem = { label: "Agendar cita", href: "/agendar" };

export const footerColumns: FooterColumn[] = [
  {
    title: "Productos",
    items: [
      { label: "Todos", href: "/productos" },
      { label: "Suplementos", href: "/productos?categoria=suplementos" },
      { label: "Infusiones", href: "/productos?categoria=infusiones" },
      { label: "Pomadas", href: "/productos?categoria=pomadas" },
      { label: "Ungüentos", href: "/productos?categoria=unguentos" },
    ],
  },
  {
    title: "Obtener ayuda",
    items: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "Farmacovigilancia", href: "/farmacovigilancia" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Servicios",
    items: [
      { label: "Consultas", href: "/servicios/consulta" },
      { label: "Terapias", href: "/servicios/terapias" },
    ],
  },
  {
    title: "Publicaciones",
    items: [{ label: "Blog", href: "/blog" }],
  },
];

export const legalLinks: NavItem[] = [
  { label: "Términos y condiciones de uso", href: "/legal/terminos" },
  { label: "Política de Cookies", href: "/legal/cookies" },
  { label: "Política de privacidad", href: "/legal/aviso-de-privacidad" },
];

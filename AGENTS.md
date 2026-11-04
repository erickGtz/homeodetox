# AGENTS.md — Contexto del proyecto HomeoDetox

Este archivo es la fuente de verdad para cualquier persona o agente que trabaje en este
repositorio. Léelo completo antes de proponer cambios. Si algo aquí contradice una
instrucción puntual, pregunta antes de asumir.

---

## 1. Qué es este proyecto

Sitio web de marca para el **Dr. Ricardo Rojas Esparza**, médico especialista en medicina
integrativa y homeopatía, bajo la marca **HomeoDetox** (Ciudad de México).

El proyecto tiene dos fases contractuales:

| Fase | Alcance                                                                | Estado      |
| ---- | ---------------------------------------------------------------------- | ----------- |
| 1    | Sitio promocional estático (contenido, servicios, blog, formularios)   | No iniciado |
| 2    | Módulo e-commerce (catálogo transaccional, carrito, pagos, inventario) | No iniciado |

Referencia comercial: cotización "Presupuesto de sitio web escalable" — fase 1
$15,800 MXN de desarrollo + $2,600 de infraestructura + IVA; fase 2 $22,000 + IVA.

**Regla de oro:** en fase 1 no se implementa checkout, pagos, carrito, autenticación de
clientes ni inventario. El e-commerce se resuelve con un proveedor externo (Medusa.js o
Shopify headless) en fase 2.

---

## 2. Stack

| Capa               | Tecnología                             | Notas                                |
| ------------------ | -------------------------------------- | ------------------------------------ |
| Framework          | Next.js con App Router                 | Server Components por defecto        |
| Lenguaje           | TypeScript en modo `strict`            | Sin `any` implícito                  |
| Estilos            | Tailwind CSS + tokens en CSS variables | Sin CSS modules ni styled-components |
| Contenido          | MDX + frontmatter validado con Zod     | Detrás de una capa de contenido      |
| Formularios        | Server Actions + Zod                   | Sin backend propio                   |
| Correo             | Resend (pendiente confirmar)           | Alternativa: Formspree               |
| Hosting            | Vercel                                 | Preview por PR                       |
| Gestor de paquetes | npm                                    | Node 20.9+ (local: Node 24)          |
| Idioma             | Español (es-MX)                        | Un solo locale, sin i18n             |

**No agregar dependencias nuevas sin justificarlo y pedir aprobación.** Evitar librerías
de UI completas (MUI, Chakra, shadcn como bloque). Componentes propios y pequeños.

---

## 3. Estructura del repositorio

```

homeodetox/
├─ AGENTS.md
├─ README.md
├─ docs/
│  ├─ arquitectura.md
│  ├─ tecnologias.md
│  ├─ guia-de-contenido.md
│  ├─ roadmap-ecommerce.md
│  ├─ wireframes/           # bocetos de referencia (fase 1)
│  └─ adr/                  # decisiones: stack, CMS, proveedor de comercio
├─ public/
│  ├─ images/
│  └─ fonts/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ globals.css
│  │  ├─ not-found.tsx
│  │  ├─ sitemap.ts
│  │  ├─ robots.ts
│  │  ├─ opengraph-image.tsx
│  │  ├─ servicios/
│  │  ├─ productos/
│  │  ├─ blog/
│  │  ├─ nosotros/
│  │  ├─ farmacovigilancia/
│  │  ├─ contacto/
│  │  ├─ agendar/
│  │  ├─ legal/
│  │  └─ api/               # solo si una Server Action no basta
│  ├─ components/
│  │  ├─ layout/            # header, footer, mobile-nav, whatsapp-fab
│  │  ├─ sections/          # hero, services, products, events, faq, map, cta
│  │  ├─ forms/             # contact-form, booking-form, pharmacovigilance-form
│  │  └─ ui/                # button, container, card, accordion, input, badge
│  ├─ content/
│  │  ├─ site.ts            # datos del consultorio y navegación
│  │  ├─ servicios/.mdx
│  │  ├─ productos/.mdx
│  │  ├─ eventos/.mdx
│  │  ├─ blog/.mdx
│  │  └─ faq.ts
│  ├─ lib/
│  │  ├─ site-config.ts
│  │  ├─ seo.ts
│  │  ├─ content/           # loader + schemas Zod
│  │  ├─ commerce/          # types.ts + provider.ts (fase 2)
│  │  ├─ validation/        # schemas de formularios
│  │  └─ rate-limit.ts
│  └─ types/
├─ .env.example
├─ next.config.ts
├─ tsconfig.json
├─ eslint.config.mjs
└─ prettier.config.mjs
```

---

## 4. Mapa de rutas (derivado de los bocetos de Figma)

> Los bocetos incluyen pantallas de fase 1 y de fase 2. En fase 1 el catálogo es
> contenido estático sin carrito.

| Ruta                               | Pantalla                                                                        | Fase         |
| ---------------------------------- | ------------------------------------------------------------------------------- | ------------ |
| `/`                                | Inicio: hero, servicios, por qué HomeoDetox, CTA productos, eventos, FAQ + mapa | 1            |
| `/servicios`                       | Tabs: Consulta / Terapias / Eventos                                             | 1            |
| `/servicios/consulta`              | Ficha del doctor + agendado en dos pasos                                        | 1            |
| `/servicios/terapias`              | Bloques alternados con CTA de valoración                                        | 1            |
| `/servicios/eventos`               | Cursos de formación y talleres                                                  | 1            |
| `/servicios/eventos/[slug]`        | Detalle de evento: fecha, lugar, horario, costos, cortesías                     | 1            |
| `/productos`                       | Catálogo con búsqueda y filtros (categoría, beneficio, presentación)            | 1 (estático) |
| `/productos/[slug]`                | Detalle con galería, acordeones y productos relacionados                        | 1 (estático) |
| `/blog`                            | Tabs Todos / Videos / Posts                                                     | 1            |
| `/blog/[slug]`                     | Artículo + publicaciones recientes                                              | 1            |
| `/nosotros`                        | Marca, fundador, misión y visión                                                | 1            |
| `/farmacovigilancia`               | Explicación + reporte de evento adverso en 3 pasos                              | 1            |
| `/contacto`                        | Formulario de contacto                                                          | 1            |
| `/agendar`                         | Agendado de cita                                                                | 1            |
| `/legal/aviso-de-privacidad`       | Aviso de privacidad                                                             | 1            |
| `/legal/terminos`                  | Términos y condiciones                                                          | 1            |
| `/legal/cookies`                   | Política de cookies                                                             | 1            |
| `/faq`                             | Preguntas frecuentes                                                            | 1            |
| `/tienda`, `/carrito`, `/checkout` | Comercio transaccional                                                          | 2            |

El mockup usa "Productos" en el header y "Catálogo" en una variante. **Canonical:
`/productos`**; si se requiere "Catálogo" en UI, usar el mismo path.

### Fuente de los bocetos

Los wireframes viven en `docs/wireframes/` y son **referencia visual**, no código de
producción. Correspondencia actual:

| Archivo                            | Pantalla                                                              |
| ---------------------------------- | --------------------------------------------------------------------- |
| `Inicio.png`                       | `/`                                                                   |
| `Nosotros.png`                     | `/nosotros`                                                           |
| `Productos.png`, `Productos-1.png` | `/productos` (dos variantes: teal overlay y hero verde partido)       |
| `Servicios consultas 1.png`        | `/servicios` pestaña Consulta, paso 1 del agendado                    |
| `Servicios consultas 2.png`        | `/servicios` pestaña Consulta, paso 2 (calendario + horarios)         |
| `Servicios consultas 3.png`        | `/servicios` pestaña Terapias                                         |
| `Servicios consultas 4.png`        | `/servicios` pestaña Eventos                                          |
| `Detalle blog-1.png`               | `/servicios/eventos/[slug]` (detalle de evento, pese al nombre)       |
| `Blog.png`                         | `/blog`                                                               |
| `Detalle blog.png`                 | `/blog/[slug]`                                                        |
| `Detalle producto.png`             | `/productos/[slug]`                                                   |
| `FarmacoVigilancia1.png`           | `/farmacovigilancia` paso 1 de 3                                      |
| `FarmacoVigilancia2.png`           | `/farmacovigilancia` paso 2 de 3                                      |
| `FarmacoVigilancia3.png`           | `/farmacovigilancia` paso 3 de 3 (el rótulo del mockup dice "2 de 3") |
| `Container.png`, `Text.png`        | Piezas sueltas: campos de formulario e iconos de categorías           |

**Inconsistencias conocidas a resolver con el cliente antes de implementar:**

1. Dos headers: logo centrado (Inicio/Productos) vs. logo a la izquierda + botón
   "Agendar Cita" (`Productos-1`).
2. Dos heros de catálogo: overlay teal vs. bloque verde partido.
3. Dirección y teléfono distintos entre páginas (footer vs. ficha del doctor).
4. `Nosotros.png` escribe "HomeDetox"; la marca es **HomeoDetox**.
5. Fotos del doctor distintas entre `Nosotros` y `Servicios`: son stock de referencia.
6. No hay mockup de `/contacto`, `/faq` suelta, `/legal/*` ni `/agendar` independiente.
7. Todos los textos son lorem ipsum y requieren contenido real.

Cuando el diseño final llegue como código exportado de Figma, ese código es la
referencia de implementación; los PNG quedan como respaldo histórico.

---

## 5. Inventario de componentes

**Layout**

- `Header`: logo centrado, navegación dividida, CTA "Agendar cita" (variante del mockup), menú móvil.
- `Footer`: 4 columnas (Información, Productos, Obtener ayuda, Servicios, Publicaciones), redes, horario, legales.
- `Breadcrumbs`: patrón `SECCIÓN › SUBSECCIÓN › PÁGINA`.
- `WhatsAppFab`: botón flotante.

**UI**

- `Container`, `Section`, `SectionHeading` (con variante script/serif), `Button` (primary, outline, ghost, disabled), `Badge` (`POST`, `VIDEO`, `CURSO`, `TALLER`, `SEMINARIO`), `Card`, `Accordion`, `Tabs`, `Input`, `Textarea`, `Select`, `RadioGroup`, `Checkbox`, `Stepper`, `Toast`.

**Secciones**

- `Hero` (imagen de fondo + overlay), `PageHero` (título sobre imagen), `ServiceCards`, `ServiceFeature` (bloque alternado), `ProductGrid`, `ProductGallery`, `ProductAccordion`, `EventsCarousel`, `FaqAccordion`, `MapEmbed`, `RecentPosts`, `CtaBanner`.

**Formularios**

- `ContactForm`, `BookingForm` (paso 1: nombre/edad → paso 2: calendario + horario), `PharmacovigilanceForm` (3 pasos + consentimiento + captcha), `NewsletterForm` (si aplica).

---

## 6. Modelo de contenido (frontmatter)

Todos los archivos se validan con Zod en build. Si un campo falta, el build falla.

```yaml
# content/servicios/*.mdx
title: string
slug: string
category: "consulta" | "terapia" | "evento"
excerpt: string
image: string
order: number
price?: string
duration?: string
modality?: string
seo: { title: string, description: string }
```

```yaml
# content/productos/*.mdx
title: string
slug: string
category: "pomadas" | "unguentos" | "infusiones" | "suplementos" | "cremas" | "gotas"
benefits: string[]        # Relajación y Sueño, Dolor Muscular y Articular, ...
presentations: string[]   # Gotas / Extractos, Cápsulas / Pastillas, Uso tópico, Para infusión
price?: string
sku?: string
shortDescription: string
cover: string
gallery: string[]
whatIs: string
howToUse: string
ingredients: string
warnings?: string
seo: { title: string, description: string }
```

```yaml
# content/blog/*.mdx
title: string
slug: string
type: "post" | "video"
date: string              # ISO
author: string
excerpt: string
cover: string
videoUrl?: string
tags: string[]
seo: { title: string, description: string }
```

```yaml
# content/eventos/*.mdx
title: string
slug: string
kind: "curso" | "taller" | "seminario"
date: string
location: string
schedule?: string
cost?: string
courtesies?: string
cover: string
seo: { title: string, description: string }
```

Datos globales (teléfono, WhatsApp, dirección, horario, redes, navegación) viven en
`src/lib/site-config.ts` y `src/content/site.ts`. No duplicar datos de contacto en
componentes.

---

## 7. Design tokens (aproximados a Figma; ajustar con el archivo final)

```css
--color-primary: #0f4c56; /* teal profundo: header de tarjetas, títulos */
--color-primary-dark: #0a363d;
--color-secondary: #7c9992; /* verde grisáceo: footer, botones secundarios */
--color-accent: #7fa45b; /* verde: hero de catálogo, acentos */
--color-bg: #f7f6f2; /* hueso */
--color-surface: #ffffff;
--color-text: #1f2a33;
--color-text-muted: #667085;
--color-border: #e4e7ec;
--color-on-primary: #ffffff;
```

**Tipografía** (pendiente de confirmar contra Figma):

- Display: serif con itálica para "Nuestros Servicios" (candidata: Fraunces o Playfair Display).
- UI y cuerpo: sans humanista (candidata: Inter o Lato).
- Usar `next/font` con subconjunto latin. No cargar fuentes desde CDN externo.

**Reglas visuales observadas:**

- Header blanco, logo centrado, navegación en mayúsculas con tracking amplio.
- Títulos de sección en mayúsculas con tracking; subtítulos en serif itálica.
- Botones primarios en teal o sage, esquinas redondeadas (~8px), texto en mayúsculas.
- Grillas de 3 columnas en desktop, 2 en tablet, 1 en móvil.
- Imágenes de producto y blog en formato 4:3 o 1:1 con bordes redondeados.

---

## 8. Convenciones de código

- Server Components por defecto; `"use client"` solo para interactividad real (tabs, acordeones, formularios, carrusel).
- Un componente por archivo, PascalCase. Rutas en kebab-case.
- Props tipadas explícitamente; no usar `any`. Preferir `type` sobre `interface` para props.
- Datos siempre a través de `src/lib/content/*`; los componentes no leen archivos ni hacen fetch directo.
- Todo texto visible en español; identificadores y nombres de archivo en inglés.
- Validación de formularios en cliente y servidor con el mismo schema Zod.
- Sin comentarios salvo que expliquen una decisión no obvia.
- Formato con Prettier; lint con ESLint. El CI debe pasar antes de merge.

Comandos:

```bash
npm run dev
npm run build
npm run lint
npm run typecheck      # tsc --noEmit
npm run format
```

---

## 9. Reglas de negocio y cumplimiento (México)

**Esto no es opcional:**

1. **Datos personales sensibles.** El formulario de farmacovigilancia recopila datos de salud. No enviarlos por correo plano ni registrarlos en analytics. Requiere aviso de privacidad, consentimiento explícito, acceso restringido y política de retención.
2. **Publicidad médica (COFEPRIS).** No prometer curación, resultados garantizados ni antes/después sin autorización. Incluir cédula profesional y nombre completo del médico.
3. **Aviso de privacidad** conforme a LFPDPPP, enlazado desde todos los formularios.
4. **Cookies y analítica:** banner de consentimiento antes de cargar analítica no esencial.
5. **Imágenes:** solo assets con licencia o autorización escrita de uso de imagen. Los mockups usan fotos de stock de referencia; no publicarlas sin licencia.
6. **Contenido placeholder:** marcar claramente (`TODO_CONTENIDO`) cualquier texto lorem ipsum que no sea real. No inventar credenciales, especialidades ni precios.

---

## 10. SEO, rendimiento y accesibilidad

- Metadata API por ruta: `title`, `description`, `canonical`, Open Graph e imagen OG.
- JSON-LD: `Physician` en home, `Article` en blog, `Product` en producto, `Event` en eventos, `FAQPage` en FAQ.
- `sitemap.ts` y `robots.ts` generados; no indexar páginas vacías, rutas de fase 2 ni `/legal` innecesario.
- Preferir generación estática. Revalidación solo donde el contenido lo exija.
- `next/image` con `sizes` correctos, formatos modernos y `priority` solo en el hero.
- Objetivo Lighthouse: ≥ 90 en rendimiento, accesibilidad, buenas prácticas y SEO.
- WCAG AA: contraste, foco visible, navegación por teclado, labels asociados, errores anunciados, `prefers-reduced-motion`, alt text descriptivo.
- Público adulto: tamaño base mínimo 16px, interlineado amplio, áreas táctiles ≥ 44px.

---

## 11. Variables de entorno

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_COMMERCE_ENABLED=false
COMMERCE_PROVIDER=none          # none | medusa | shopify
RESEND_API_KEY=
CONTACT_TO_EMAIL=

# Fase 2
MEDUSA_BACKEND_URL=
MEDUSA_PUBLISHABLE_KEY=
SHOPIFY_STORE_DOMAIN=
SHOPIFY_STOREFRONT_TOKEN=
```

Nunca commitear `.env.local` ni llaves. `.env.example` siempre actualizado.

---

## 12. Fase 2: preparación, no implementación

Dejar reservado, sin lógica real:

```text
src/lib/commerce/
├─ types.ts        # Product, Variant, Money, Cart, CartLine, Checkout
└─ provider.ts     # getCommerceProvider() lee COMMERCE_PROVIDER
```

Rutas bajo `src/app/(shop)/` detrás de `NEXT_PUBLIC_COMMERCE_ENABLED`. Decisión de
proveedor pendiente:

- **Medusa.js:** propiedad total, backend Node + Postgres + Redis aparte, más mantenimiento. El starter oficial trae su propio diseño; reutilizar solo la lógica, no la UI.
- **Shopify headless:** implementación en días, checkout rentado, costo mensual.

**No instalar Medusa ni Shopify en fase 1.**

---

## 13. Decisiones abiertas

| Tema                                                       | Estado                       |
| ---------------------------------------------------------- | ---------------------------- |
| Nombre de marca final (HomeoDetox vs. Dr. Rojas)           | Pendiente                    |
| CMS: MDX ahora, Sanity después                             | Recomendado, sin confirmar   |
| Proveedor de comercio (Medusa vs Shopify)                  | Pendiente                    |
| Sistema de agendado (formulario propio, Cal.com, Calendly) | Pendiente                    |
| Almacenamiento del reporte de farmacovigilancia            | Pendiente — bloqueante legal |
| Envío de correo (Resend vs Formspree)                      | Pendiente                    |
| Dominio y correo corporativo                               | Pendiente                    |
| Analítica (Vercel Analytics, GA4, Umami)                   | Pendiente                    |
| Textos legales                                             | Pendiente, requiere revisión |
| Assets reales (logo, fotos, textos)                        | Pendiente                    |

---

## 14. Definition of Done (fase 1)

- `npm run lint`, `npm run typecheck` y `npm run build` en verde.
- Todas las rutas de fase 1 navegables y responsive (360px, 768px, 1024px, 1440px).
- Sin código de carrito, pagos, inventario ni autenticación.
- Formularios validados en cliente y servidor, con honeypot y rate limit.
- Aviso de privacidad enlazado desde cada formulario.
- Metadata, sitemap, robots y JSON-LD funcionando.
- Lighthouse ≥ 90 en las cuatro categorías en home y una ficha.
- Sin textos lorem ipsum en producción; placeholders marcados.
- README con instalación, scripts, estructura y guía de contenido.
- Deploy en Vercel con variables documentadas.

---

## 15. Cómo debe trabajar un agente en este repo

1. Leer este archivo y `docs/arquitectura.md` antes de tocar código.
2. No inventar contenido del doctor, precios, credenciales ni testimonios.
3. No agregar dependencias, CMS ni servicios de comercio sin aprobación.
4. No implementar funcionalidad de fase 2.
5. Mantener consistencia con los tokens y componentes existentes antes de crear nuevos.
6. Ejecutar lint, typecheck y build antes de dar una tarea por terminada.
7. No hacer commit, push ni deploy sin instrucción explícita.
8. Si un requisito del mockup contradice el alcance cotizado, señalarlo en lugar de asumir.
9. Cuando llegue código exportado de Figma, tratarlo como referencia de implementación:
   adaptarlo a los tokens, componentes y convenciones de este repo; no copiar estilos
   inline, dependencias nuevas ni markup sin revisión.

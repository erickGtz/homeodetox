# Tecnologías de HomeoDetox

Documento de referencia del stack del proyecto. Explica qué es cada tecnología, por qué
se eligió y qué rol cumple dentro del sitio (fase 1) y en la preparación del e-commerce
(fase 2).

---

## Mapa general

```text
Contenido (MDX + Zod)
        │
        ▼
Next.js (App Router + Server Components)  ← TypeScript
        │
        ├── Tailwind CSS (estilos)
        ├── Server Actions (formularios)
        └── next-mdx-remote (render del contenido)
        │
        ▼
Vercel (hosting)  ← GitHub Actions (CI)
```

---

## 1. Next.js con App Router

**Qué es:** framework de React para aplicaciones web. El App Router es su sistema de
rutas basado en carpetas dentro de `src/app`: cada carpeta representa una URL.

**Por qué aquí:**

- `src/app/servicios/page.tsx` genera `/servicios` sin configurar rutas a mano.
- Permite **Server Components**: el HTML se genera en el servidor y llega listo al
  navegador, lo que mejora el SEO y reduce el JavaScript enviado al cliente. Es clave
  para una web de marca.
- Trae `metadata`, `sitemap.ts`, `robots.ts`, `next/image` y `next/font` integrados,
  justo lo que pide la sección 10 del `AGENTS.md`.
- Vercel es su hosting natural: preview por cada PR sin configuración extra.

**Alternativas descartadas:** Astro (excelente para contenido, pero con menos ecosistema
para formularios y acciones) y Remix (hoy fusionado con React Router).

---

## 2. React + Server Components

**Qué es:** React es la librería de UI. Los Server Components son componentes que se
ejecutan **solo en el servidor** y no envían JavaScript al navegador.

**Por qué aquí:** el sitio es mayormente estático (textos, imágenes, listados). Solo
tabs, acordeones, carrusel y formularios necesitan interactividad, así que esos llevan
`"use client"` y el resto permanece en el servidor. Menos JavaScript significa mejor
rendimiento en móviles de gama media.

---

## 3. TypeScript (modo `strict`)

**Qué es:** JavaScript con tipos. El modo `strict` obliga a declarar tipos correctamente
y prohíbe `any` implícito.

**Por qué aquí:** el modelo de contenido tiene muchos campos (precios opcionales,
categorías cerradas, arrays de beneficios). Con tipos, un error como `producto.precio`
mal escrito se detecta al compilar y no en producción. `npm run typecheck`
(`tsc --noEmit`) es la red de seguridad antes de cada commit.

---

## 4. Tailwind CSS (v4)

**Qué es:** framework de estilos por utilidades. En lugar de escribir `.card { ... }` en
un archivo CSS, se usan clases como `rounded-lg bg-primary p-6`.

**Por qué aquí:**

- El `AGENTS.md` exige **tokens en CSS variables**. Tailwind v4 los declara en `@theme`
  y se consumen como `bg-primary`, `text-text-muted`, etc.
- Evita CSS Modules y styled-components (prohibidos en el proyecto).
- Al ser utilidades, el CSS final solo incluye lo que realmente se usa.
- `@tailwindcss/typography` añade la clase `prose` para que los artículos MDX se lean
  bien sin estilos manuales.

**Tradeoff:** el HTML queda lleno de clases; se compensa extrayendo componentes
(`Button`, `Card`) en `components/ui`.

---

## 5. MDX

**Qué es:** Markdown que permite insertar componentes de React (`.mdx`). Por ejemplo, un
post de blog con texto normal y, de pronto, un `<ProductCard />`.

**Por qué aquí:** el contenido (servicios, productos, eventos, blog) lo escribe una
persona no programadora. MDX permite editarlo como texto plano, versionarlo en Git y a la
vez usar componentes del diseño.

**Piezas asociadas:**

- `gray-matter` → separa el frontmatter (`title`, `slug`, `price`…) del cuerpo del
  artículo.
- `next-mdx-remote` → convierte ese MDX en HTML/React dentro de un Server Component.
- `@tailwindcss/typography` → estilos de lectura para el resultado.

**Alternativa futura:** Sanity (CMS visual). Está en “Decisiones abiertas”: MDX ahora,
Sanity después, detrás de la misma capa `src/lib/content/*`.

---

## 6. Zod

**Qué es:** librería de validación de esquemas en TypeScript. Defines la forma de un dato
una vez y obtienes validación más tipos inferidos.

**Por qué aquí, en tres lugares:**

1. **Frontmatter:** si a un producto le falta `shortDescription`, el build falla en vez
   de publicar una ficha rota.
2. **Formularios:** el mismo schema valida en cliente (UX inmediata) y en servidor
   (seguridad real).
3. **Tipos:** `z.infer<typeof productSchema>` evita duplicar interfaces a mano.

---

## 7. Server Actions

**Qué es:** funciones del servidor que se llaman directamente desde un formulario, sin
crear endpoints API.

**Por qué aquí:** contacto, agendado y farmacovigilancia son formularios que envían
correo. Con Server Actions no hay backend propio ni `/api/*` innecesario (el `AGENTS.md`
solo permite `api/` si una acción no basta). Además facilita aplicar rate limit y
honeypot en el servidor.

---

## 8. Resend (correo)

**Qué es:** API de envío de correo transaccional.

**Por qué aquí:** recibir los formularios por email sin montar SMTP ni un servidor de
correo. Está “pendiente confirmar”; la alternativa es Formspree (servicio externo que
recibe el formulario directamente).

**Nota:** el reporte de farmacovigilancia contiene datos de salud, así que no puede ir por
correo plano; necesita almacenamiento restringido (decisión abierta y bloqueante legal).

---

## 9. Node.js + npm

**Qué es:** Node ejecuta JavaScript fuera del navegador (aquí solo para herramientas) y
npm gestiona dependencias y scripts.

**Por qué aquí:** Next.js corre sobre Node. El `AGENTS.md` fija **npm** (no pnpm ni yarn),
`Node 20.9+` y los scripts `dev`, `build`, `lint`, `typecheck` y `format`. El entorno
local tiene Node 24.19, así que cumple.

---

## 10. ESLint + Prettier

**Qué es:**

- **ESLint** detecta errores y malas prácticas (imports sin usar, hooks mal usados,
  reglas de Next).
- **Prettier** formatea el código de forma automática e idéntica para todos.

**Por qué aquí:** el `AGENTS.md` exige que el CI pase antes de merge. `eslint-config-prettier`
desactiva las reglas de estilo de ESLint para que no pelee con Prettier, y
`prettier-plugin-tailwindcss` ordena las clases Tailwind siempre igual.

---

## 11. Git + GitHub + GitHub Actions

**Qué es:**

- **Git**: historial de cambios local.
- **GitHub**: repositorio remoto, PRs y revisión.
- **GitHub Actions**: ejecuta tareas automáticas en cada push o PR.

**Por qué aquí:** el flujo del proyecto es “PR → CI en verde → merge”. El workflow corre
`npm ci`, `lint`, `typecheck` y `build`, así ningún cambio roto llega a `main`. `gh` es
solo el CLI para crear el repositorio y autenticarse sin salir de la terminal.

---

## 12. Vercel

**Qué es:** plataforma de hosting optimizada para Next.js.

**Por qué aquí:** deploy automático desde GitHub, un preview por PR para revisar con el
cliente, variables de entorno por entorno y CDN global. Cumple el “Deploy en Vercel con
variables documentadas” del Definition of Done.

---

## 13. Fase 2 (solo reservado, no se instala)

| Opción               | Qué aporta                                                              | Coste                                     |
| -------------------- | ----------------------------------------------------------------------- | ----------------------------------------- |
| **Medusa.js**        | Backend de comercio open source, control total, Node + Postgres + Redis | Más mantenimiento e infraestructura       |
| **Shopify headless** | Checkout, pagos e inventario resueltos; integración en días             | Costo mensual y dependencia del proveedor |

En fase 1 solo existen `src/lib/commerce/types.ts` y `provider.ts` como stubs; ningún
carrito, pago ni autenticación.

---

## Lo que deliberadamente **no** usamos

| Descartado                        | Motivo                                                                       |
| --------------------------------- | ---------------------------------------------------------------------------- |
| MUI / Chakra / shadcn como bloque | Librerías de UI completas; el proyecto quiere componentes propios y pequeños |
| CSS Modules / styled-components   | El `AGENTS.md` fija Tailwind + tokens                                        |
| Backend propio (Express, etc.)    | Server Actions cubren los formularios                                        |
| CMS ahora                         | MDX primero; Sanity se evalúa después                                        |
| i18n                              | Un solo locale: es-MX                                                        |

---

## Resumen de dependencias

### Producción

| Paquete                   | Rol                                     |
| ------------------------- | --------------------------------------- |
| `next`                    | Framework y rutas                       |
| `react` / `react-dom`     | UI                                      |
| `zod`                     | Validación de frontmatter y formularios |
| `gray-matter`             | Lectura de frontmatter en MDX           |
| `next-mdx-remote`         | Render de MDX en Server Components      |
| `@tailwindcss/typography` | Estilos `prose` para blog               |
| `resend`                  | Envío de correo (pendiente configurar)  |

### Desarrollo

| Paquete                         | Rol                            |
| ------------------------------- | ------------------------------ |
| `typescript`                    | Tipado estático                |
| `eslint` + `eslint-config-next` | Lint                           |
| `prettier`                      | Formato                        |
| `eslint-config-prettier`        | Compatibilidad ESLint/Prettier |
| `prettier-plugin-tailwindcss`   | Orden de clases Tailwind       |

---

_Documento de referencia del proyecto HomeoDetox. Mantener sincronizado con `AGENTS.md`
cuando cambie el stack._

# Arquitectura — HomeoDetox

Documento de referencia técnica para fase 1. Complementa `AGENTS.md`; si hay
contradicción, manda `AGENTS.md`.

---

## 1. Vista general

Sitio estático de marca construido con Next.js (App Router) y generación estática.
El contenido vive en archivos MDX versionados en Git y se valida con Zod en build.
No hay base de datos, backend propio ni autenticación en fase 1.

```text
src/content/*.mdx
      │  gray-matter + Zod
      ▼
src/lib/content/*        (loader tipado)
      ▼
Server Components (src/app/**)
      ▼
HTML estático en Vercel
```

---

## 2. Capas

| Capa      | Ubicación                 | Responsabilidad                                     |
| --------- | ------------------------- | --------------------------------------------------- |
| Rutas     | `src/app/**`              | Layouts, páginas, metadata, sitemap y robots        |
| Secciones | `src/components/sections` | Bloques de página reutilizables (hero, FAQ, CTA)    |
| Layout    | `src/components/layout`   | Header, footer, breadcrumbs, WhatsApp               |
| UI        | `src/components/ui`       | Primitivas de diseño (botón, card, input, tabs)     |
| Contenido | `src/content`             | Datos editables por personas no programadoras       |
| Dominio   | `src/lib`                 | Configuración, SEO, validación, contenido, comercio |

Regla: las páginas y secciones **no** leen archivos ni hacen fetch directo. Todo dato
pasa por `src/lib`.

---

## 3. Renderizado

- Server Components por defecto; `"use client"` solo en tabs, acordeones, carrusel,
  menú móvil y formularios.
- Preferir estático. No usar `dynamic = "force-dynamic"` salvo necesidad real.
- Imágenes con `next/image` y `sizes`; `priority` solo en el hero.
- Fuentes con `next/font` (sin CDN externo).

---

## 4. Contenido

- Colecciones: `servicios`, `productos`, `eventos`, `blog`.
- Cada archivo es MDX con frontmatter; el schema Zod vive en `src/lib/content/schemas.ts`.
- El loader (`src/lib/content/loader.ts`) valida, ordena y expone funciones tipadas.
- Si un campo obligatorio falta, el build falla a propósito.
- Detalle de campos y ejemplos: `docs/guia-de-contenido.md`.

---

## 5. Formularios

- Server Actions + Zod; sin endpoints `/api/*` salvo que una acción no baste.
- Mismo schema en cliente y servidor (`src/lib/validation/`).
- Honeypot y rate limit (`src/lib/rate-limit.ts`).
- Aviso de privacidad enlazado en todos los formularios.
- Farmacovigilancia: datos de salud. No enviar por correo plano ni registrar en
  analítica. Almacenamiento pendiente (bloqueante legal).

---

## 6. SEO

- Metadata API por ruta desde `src/lib/seo.ts`.
- JSON-LD: `Physician`, `Product`, `Article`, `Event`, `FAQPage`.
- `sitemap.ts` y `robots.ts` generados.
- Open Graph e imagen OG por ruta.

---

## 7. Estilos

- Tailwind CSS v4 con tokens declarados en `@theme` dentro de `src/app/globals.css`.
- Sin CSS Modules ni styled-components.
- Componentes propios; nada de librerías de UI completas.
- Tipografía: Fraunces (display, itálica) e Inter (UI y cuerpo).

---

## 8. Entornos y despliegue

- Local: `npm run dev` en `http://localhost:3000`.
- Variables documentadas en `.env.example`; nunca commitear `.env.local`.
- Vercel: deploy desde `main`, preview por PR.
- CI en GitHub Actions: lint → typecheck → build.

---

## 9. Fase 2 (reservado)

`src/lib/commerce/` contiene solo tipos y un provider stub. Las rutas de tienda,
carrito y checkout **no** existen todavía. Ver `docs/roadmap-ecommerce.md`.

---

## 10. Estado actual

Scaffold inicial: estructura, tokens, layout, primitivas de UI, schemas de contenido y
home mínima. Las páginas internas se implementan conforme llegue el código de Figma y el
contenido real.

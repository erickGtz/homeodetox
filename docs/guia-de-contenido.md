# Guía de contenido — HomeoDetox

Cómo agregar y editar contenido sin tocar componentes. Todo el contenido se valida con
Zod en build: si falta un campo obligatorio, el build falla.

---

## 1. Reglas generales

- Un archivo MDX por entrada, nombre en kebab-case: `pomada-arnica.mdx`.
- El `slug` del frontmatter debe coincidir con el nombre del archivo.
- Texto visible en español (es-MX); identificadores en inglés.
- No inventar credenciales, especialidades, precios ni testimonios del doctor.
- Cualquier texto provisional se marca con `TODO_CONTENIDO`.
- Imágenes solo con licencia o autorización escrita. Los wireframes usan stock de
  referencia y no deben publicarse.

---

## 2. Servicios — `src/content/servicios/*.mdx`

```yaml
---
title: "Consulta de medicina integrativa"
slug: "consulta-medicina-integrativa"
category: "consulta" # consulta | terapia | evento
excerpt: "TODO_CONTENIDO"
image: "/images/servicios/consulta.jpg"
order: 1
price: "TODO_CONTENIDO"
duration: "TODO_CONTENIDO"
modality: "presencial"
seo:
  title: "Consulta de medicina integrativa"
  description: "TODO_CONTENIDO"
---
```

---

## 3. Productos — `src/content/productos/*.mdx`

```yaml
---
title: "Pomada Árnica"
slug: "pomada-arnica"
category: "pomadas" # pomadas | unguentos | infusiones | suplementos | cremas | gotas
benefits:
  - "Dolor Muscular y Articular"
presentations:
  - "Uso tópico"
price: "TODO_CONTENIDO"
sku: "TODO_CONTENIDO"
shortDescription: "TODO_CONTENIDO"
cover: "/images/productos/pomada-arnica.jpg"
gallery:
  - "/images/productos/pomada-arnica-1.jpg"
whatIs: "TODO_CONTENIDO"
howToUse: "TODO_CONTENIDO"
ingredients: "TODO_CONTENIDO"
warnings: "TODO_CONTENIDO"
seo:
  title: "Pomada Árnica"
  description: "TODO_CONTENIDO"
---
```

Beneficios canónicos: Relajación y Sueño, Dolor Muscular y Articular, Cuidado de la Piel,
Sistema Inmunológico, Desintoxicación, Salud Digestiva.

Presentaciones canónicas: Gotas / Extractos, Cápsulas / Pastillas, Uso Tópico (Cremas,
pomadas), Para infusión.

---

## 4. Blog — `src/content/blog/*.mdx`

```yaml
---
title: "TODO_CONTENIDO"
slug: "TODO_CONTENIDO"
type: "post" # post | video
date: "2026-01-01"
author: "Dr. Ricardo Rojas Esparza"
excerpt: "TODO_CONTENIDO"
cover: "/images/blog/portada.jpg"
videoUrl: ""
tags:
  - "TODO_CONTENIDO"
seo:
  title: "TODO_CONTENIDO"
  description: "TODO_CONTENIDO"
---
```

`type: "video"` requiere `videoUrl`.

---

## 5. Eventos — `src/content/eventos/*.mdx`

```yaml
---
title: "TODO_CONTENIDO"
slug: "TODO_CONTENIDO"
kind: "curso" # curso | taller | seminario
date: "2026-01-01"
location: "TODO_CONTENIDO"
schedule: "TODO_CONTENIDO"
cost: "TODO_CONTENIDO"
courtesies: "TODO_CONTENIDO"
cover: "/images/eventos/portada.jpg"
seo:
  title: "TODO_CONTENIDO"
  description: "TODO_CONTENIDO"
---
```

---

## 6. Imágenes

- Guardar en `public/images/{servicios|productos|eventos|blog}/`.
- Formato 4:3 o 1:1 para producto y blog; 16:9 para heros.
- Optimizar antes de commitear (WebP/AVIF cuando sea posible).
- Alt text descriptivo en el componente, no en el frontmatter.

---

## 7. Flujo para publicar una entrada

1. Crear el `.mdx` en la carpeta de la colección.
2. Completar el frontmatter según el schema.
3. Agregar imágenes en `public/images/...`.
4. Ejecutar `npm run build`; Zod reporta cualquier campo faltante.
5. Revisar la página en local con `npm run dev`.
6. Abrir PR; el CI debe quedar en verde.

---

## 8. Cuando llegue el CMS

La capa `src/lib/content/` aísla el origen de datos. Si más adelante se adopta Sanity,
solo cambia la implementación del loader; las páginas y componentes no se tocan.

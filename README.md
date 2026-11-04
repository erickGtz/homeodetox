# HomeoDetox

Sitio web de marca del **Dr. Ricardo Rojas Esparza** — medicina integrativa y homeopatía
en Ciudad de México.

Este repositorio contiene la **fase 1**: sitio promocional estático con contenido, servicios,
blog, eventos y formularios. El e-commerce (fase 2) está reservado, no implementado.

---

## Stack

| Capa        | Tecnología                                      |
| ----------- | ----------------------------------------------- |
| Framework   | Next.js 16 (App Router)                         |
| Lenguaje    | TypeScript `strict`                             |
| Estilos     | Tailwind CSS v4 con tokens en `@theme`          |
| Contenido   | MDX + frontmatter validado con Zod              |
| Formularios | Server Actions + Zod (pendiente de implementar) |
| Correo      | Resend (pendiente confirmar)                    |
| Hosting     | Vercel                                          |
| CI          | GitHub Actions                                  |

La justificación de cada tecnología está en [`docs/tecnologias.md`](docs/tecnologias.md).

---

## Requisitos

- Node.js 20.9 o superior (local: 24)
- npm 10 o superior
- Git

---

## Instalación

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre <http://localhost:3000>.

---

## Scripts

| Comando                | Descripción                                 |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo                      |
| `npm run build`        | Build de producción                         |
| `npm run start`        | Sirve el build                              |
| `npm run lint`         | ESLint                                      |
| `npm run typecheck`    | Genera tipos de Next y corre `tsc --noEmit` |
| `npm run format`       | Formatea con Prettier                       |
| `npm run format:check` | Verifica formato sin escribir               |

Antes de abrir un PR: `npm run lint && npm run typecheck && npm run build`.

---

## Estructura

```text
src/
├─ app/                 Rutas, layout, metadata, sitemap y robots
├─ components/
│  ├─ layout/           Header, footer, breadcrumbs, WhatsApp
│  ├─ sections/         Hero, servicios, CTA, FAQ, mapa
│  ├─ forms/            Formularios (pendiente)
│  └─ ui/               Primitivas de diseño
├─ content/             Contenido editable (site.ts + MDX)
└─ lib/                 Configuración, SEO, contenido, validación, comercio
docs/
├─ arquitectura.md
├─ tecnologias.md
├─ guia-de-contenido.md
├─ roadmap-ecommerce.md
├─ wireframes/          Bocetos de referencia
└─ adr/                 Decisiones de arquitectura
```

---

## Contenido

Todo el contenido vive en `src/content/` y se valida en build. Para agregar servicios,
productos, eventos o blog sigue [`docs/guia-de-contenido.md`](docs/guia-de-contenido.md).

Cualquier texto provisional se marca con `TODO_CONTENIDO`. No inventar credenciales,
precios ni testimonios del doctor.

---

## Variables de entorno

Ver `.env.example`. Nunca commitear `.env.local` ni llaves.

| Variable                       | Uso                                |
| ------------------------------ | ---------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | URL canónica del sitio             |
| `NEXT_PUBLIC_COMMERCE_ENABLED` | Bandera de fase 2 (`false`)        |
| `COMMERCE_PROVIDER`            | `none`, `medusa` o `shopify`       |
| `RESEND_API_KEY`               | Envío de correo (pendiente)        |
| `CONTACT_TO_EMAIL`             | Destino de formularios (pendiente) |

---

## Crear el repositorio en GitHub

Desde Git Bash, en la raíz del proyecto:

```bash
git init -b main
git add .
git status
git commit -m "chore: scaffold HomeoDetox fase 1"
```

### Opción A — con GitHub CLI

```bash
gh auth login
gh repo create homeodetox --private --source=. --remote=origin --push
```

### Opción B — repo creado manualmente en github.com

```bash
git remote add origin https://github.com/USUARIO/homeodetox.git
git push -u origin main
```

### Compartir con una colaboradora

Con GitHub CLI:

```bash
gh api -X PUT repos/USUARIO/homeodetox/collaborators/USUARIO_COMPANERA -f permission=push
```

O en la web: **Settings → Collaborators → Add people → rol Write**.

### Proteger `main`

En **Settings → Branches → Add branch protection rule**:

- Require a pull request before merging.
- Require status checks to pass: `Lint`, `Typecheck`, `Build` (workflow **CI**).
- No permitir force push.

---

## Onboarding de la colaboradora

```bash
git clone https://github.com/USUARIO/homeodetox.git
cd homeodetox
npm install
cp .env.example .env.local
npm run dev
```

Flujo de trabajo: crear rama → cambios → PR → CI en verde → merge a `main`.

---

## Deploy en Vercel

1. Importar el repositorio en Vercel.
2. Cargar las variables de `.env.example` por entorno.
3. Cada PR genera un preview automático.

---

## Alcance de fase 1

- Sin carrito, pagos, inventario ni autenticación de clientes.
- El catálogo es contenido estático.
- El reporte de farmacovigilancia contiene datos de salud: no enviar por correo plano ni
  registrar en analítica. Almacenamiento pendiente (bloqueante legal).

## Estado

Scaffold inicial: estructura, tokens, layout, componentes base, schemas de contenido y home
mínima. Las páginas internas se implementan conforme llegue el código de Figma y el
contenido real.

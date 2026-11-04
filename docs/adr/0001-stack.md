# ADR 0001 — Stack de fase 1

- **Estado:** aceptado
- **Fecha:** 2026-11-03

## Contexto

Sitio de marca con contenido editorial, formularios y requisitos de SEO, sin backend
propio ni comercio en fase 1. El equipo es pequeño y el contenido lo edita una persona
no programadora.

## Decisión

Next.js (App Router) + TypeScript strict + Tailwind CSS v4 + MDX con Zod, desplegado en
Vercel con CI en GitHub Actions. Gestor de paquetes: npm.

## Consecuencias

- Server Components reducen JavaScript y mejoran SEO.
- El contenido se versiona en Git; no hay CMS en fase 1.
- El build falla si el frontmatter es inválido, lo que evita fichas rotas.
- Se descartan Astro, Remix, CSS Modules y librerías de UI completas.

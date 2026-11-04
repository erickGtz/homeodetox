# ADR 0003 — Proveedor de comercio (fase 2)

- **Estado:** pendiente
- **Fecha:** 2026-11-03

## Contexto

La fase 2 requiere catálogo transaccional, carrito, pagos e inventario. El equipo puede
operar infraestructura Node, pero el mantenimiento tiene costo.

## Opciones

1. **Medusa.js:** control total, backend Node + Postgres + Redis, mayor mantenimiento.
2. **Shopify headless:** checkout e inventario gestionados, menor tiempo de
   implementación y costo mensual.

## Decisión

Pendiente de aprobación del cliente. En fase 1 solo existen stubs en
`src/lib/commerce/` y la bandera `NEXT_PUBLIC_COMMERCE_ENABLED=false`.

## Consecuencias

- No se instala ningún proveedor hasta cerrar la decisión.
- El catálogo de fase 1 debe mantener SKU y precios compatibles con una futura migración.

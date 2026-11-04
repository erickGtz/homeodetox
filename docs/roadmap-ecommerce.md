# Roadmap del e-commerce (fase 2)

Documento de preparación. **Nada de esto se implementa en fase 1.**

---

## 1. Alcance de fase 2

- Catálogo transaccional con variantes (presentación, tamaño).
- Carrito persistente.
- Checkout y pagos.
- Inventario y órdenes.
- Cuentas de cliente (opcional, según proveedor).

Fuera de fase 2: facturación fiscal automatizada, suscripciones y marketplace
multi-vendedor, salvo cotización aparte.

---

## 2. Lo que ya está reservado

```text
src/lib/commerce/
├─ types.ts        # Product, Variant, Money, Cart, CartLine, Checkout
└─ provider.ts     # getCommerceProvider() lee COMMERCE_PROVIDER
```

- `NEXT_PUBLIC_COMMERCE_ENABLED=false` en fase 1.
- `COMMERCE_PROVIDER=none | medusa | shopify`.
- Las rutas de tienda vivirán bajo `src/app/(shop)/` y solo se activan con la bandera.

---

## 3. Proveedores

| Criterio        | Medusa.js               | Shopify headless       |
| --------------- | ----------------------- | ---------------------- |
| Propiedad       | Total                   | Limitada al checkout   |
| Infraestructura | Node + Postgres + Redis | Gestionada             |
| Mantenimiento   | Alto                    | Bajo                   |
| Implementación  | Semanas                 | Días                   |
| Costo           | Infraestructura propia  | Mensualidad + comisión |
| UI              | Reutilizar solo lógica  | Storefront API         |

Decisión pendiente. Ver `docs/adr/0003-proveedor-comercio.md`.

---

## 4. Checklist antes de arrancar fase 2

- [ ] Proveedor elegido y aprobado por el cliente.
- [ ] Catálogo real con SKU, precios, inventario y variantes.
- [ ] Política de envíos, devoluciones y garantías.
- [ ] Cumplimiento COFEPRIS para venta de productos.
- [ ] Pasarela de pago y requisitos fiscales.
- [ ] Aviso de privacidad y términos actualizados para compras.
- [ ] Presupuesto de infraestructura aprobado.

---

## 5. Riesgos

- Productos regulados: restricciones de venta en línea y etiquetado.
- Inventario desincronizado si se mantiene catálogo estático en paralelo.
- Costo recurrente del proveedor elegido.
- Migración de contenido MDX al proveedor sin perder URLs ni SEO.

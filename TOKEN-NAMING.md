# TOKEN-NAMING — Convención de nombres de tokens de Vuno

> Convención elegida: **tres capas** (primitivo → semántico → componente), con puntos como separador.
> Solo nombres; **sin valores** (hex, px, ms). Los valores se definen en una etapa posterior.

## Regla de capas

```
componente  →  semántico  →  primitivo
```

- Un token de componente solo referencia tokens semánticos.
- Un token semántico solo referencia primitivos.
- La interfaz **nunca usa un primitivo directamente**.
- El modo oscuro, cuando llegue, cambia únicamente la capa semántica. Por eso los nombres no mencionan claro ni oscuro.

## Capa 1 — Primitivo (el material crudo)

Formato: `categoría.familia.paso`. Describe qué es, no para qué sirve.

```
color.purple.500
color.ink.900
color.mint.200
color.blue.200
color.lime.400
color.coral.400
radius.200
space.300
font.family.display
font.family.ui
motion.duration.200
```

## Capa 2 — Semántico (el rol)

Formato: `categoría.rol.variante`. Describe para qué sirve.

```
color.brand.primary
color.text.primary
color.surface.page
color.status.error.fg
color.status.success.bg
color.vertical.save.accent
color.vertical.credit.accent
radius.card
radius.pill
space.inset.card
font.role.balance
font.role.headline
motion.spring.soft
```

Los colores de vertical (`color.vertical.<nombre>.accent`) son independientes de los de estado (`color.status.*`), como se decidió en `DESIGN-BRIEF.md`.

## Capa 3 — Componente

Formato: `componente.variante.propiedad` o `componente.parte.estado.propiedad`.

```
button.primary.bg
button.primary.radius
chip.status.success.bg
card.vertical.save.bg
tabbar.item.active.icon
input.error.border
```

## Categorías

| Categoría | Prefijo | Notas |
|---|---|---|
| Color | `color` | Marca, texto, superficie, estado y vertical. |
| Radio | `radius` | Escala primitiva y roles (`card`, `pill`). |
| Espaciado | `space` | Escala primitiva y roles de padding (`inset.*`). |
| Tipografía | `font` | Familias, y roles como `balance` y `headline`. |
| Movimiento | `motion` | Duraciones y resortes (`spring.soft`). |
| Iconos | `icon` | Tamaños y trazo; el relleno en activo se resuelve a nivel de componente. |

## Verticales

Banking, Save, Invest y Credit viven en `color.vertical.<nombre>.accent` y se usan en componentes como `card.vertical.save.bg`. Los nombres de vertical en minúscula: `banking`, `save`, `invest`, `credit`.

## Reglas de escritura

- Todo en minúsculas, en inglés, separado por puntos.
- Escalas numéricas en los primitivos (`200`, `500`, `900`); nunca nombres de valor (`light`, `dark`, `big`).
- Los semánticos describen función, no apariencia: `color.text.primary`, no `color.text.black`.
- Un token nuevo de componente solo se crea si ningún semántico existente lo cubre.

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
radius.md
space.md
font.family.display
font.family.ui
motion.duration.200
```

### Escala de los primitivos

**Color: escala numérica de 100 a 900, de claro a oscuro, en pasos de 100.**

| Paso | Qué representa |
|---|---|
| `100` | El tono más claro de la familia |
| `200`–`400` | Tonos cada vez más oscuros, entre el más claro y la base |
| `500` | El tono base: el que identifica a la familia |
| `600`–`800` | Tonos cada vez más oscuros que la base |
| `900` | El tono más oscuro de la familia |

- El número indica **orden de luminosidad dentro de la familia**, no un valor ni un porcentaje.
- Todas las familias de color usan los mismos nueve pasos, y `500` siempre es la base.
- No se añaden pasos intermedios (por ejemplo `550`) ni extremos (`50`, `950`) sin acordarlo.

**`radius`, `space` y `font.size`: tallas con nombre `xs`, `sm`, `md`, `lg`, `xl`.**

- Cada talla es mayor que la anterior; solo expresan **orden**, no un valor.
- No se añaden tallas (por ejemplo `2xl`) sin acordarlo.

## Capa 2 — Semántico (el rol)

Formato: `categoría.rol.variante`, o `categoría.rol.variante.estado` cuando hay estado interactivo. Describe para qué sirve.

```
color.brand.primary
color.text.primary
color.surface.page
color.status.error.fg
color.status.success.bg
color.vertical.save.accent
color.vertical.save.on-accent
color.vertical.accent
color.vertical.on-accent
radius.card
radius.pill
space.inset.card
font.role.balance
font.role.headline
motion.spring.soft
```

### Estados interactivos

Los estados `pressed`, `disabled` y `focus` se nombran en la capa semántica, como sufijo del token al que modifican:

```
color.brand.primary.pressed
color.brand.primary.disabled
color.text.primary.disabled
border.focus.ring
```

- `pressed` y `disabled` cambian el color o la opacidad del token base.
- `focus` se expresa como un contorno (`border.focus.ring`), no como un relleno distinto.
- Los tokens de componente no definen estados propios: referencian el estado semántico que corresponda.

### Par de contraste del acento de vertical

Cada acento de vertical lleva un token de texto (o icono) para ponerse encima:

```
color.vertical.save.accent       →  fondo del acento
color.vertical.save.on-accent    →  texto e iconos sobre ese fondo
```

- Se define **un par por vertical**: `color.vertical.<nombre>.accent` y `color.vertical.<nombre>.on-accent`.
- El sufijo `on-` significa "sobre": `on-accent` es lo que se coloca encima de `accent`.
- Un componente que usa un acento como fondo siempre usa su `on-accent` para el contenido.

## Capa 3 — Componente

Formato: `componente.variante.propiedad` o `componente.parte.estado.propiedad`.

```
button.primary.bg
button.primary.radius
chip.status.success.bg
card.accent.bg
card.accent.fg
tabbar.item.active.icon
input.error.border
```

### Regla: un token por componente, la vertical es contexto

Los tokens de componente **nunca nombran una vertical**. No existen `card.vertical.save.bg` ni `card.vertical.credit.bg`: hay un único `card.accent.bg`, y su valor se resuelve según el contexto en que se usa.

- El **contexto** (la vertical activa en esa pantalla) decide a qué par apuntan los semánticos `color.vertical.accent` y `color.vertical.on-accent`. En Save apuntan a `color.vertical.save.accent` y `color.vertical.save.on-accent`; en Credit, a los de credit.
- `card.accent.bg` referencia `color.vertical.accent` y `card.accent.fg` referencia `color.vertical.on-accent`.
- La **variante** también resuelve por nombre, no por duplicación: `button.primary.bg` y `chip.status.success.bg` son un token cada uno, con la variante como parte del nombre.
- Añadir una vertical nueva solo añade tokens en la capa semántica; no toca ningún componente.

## Categorías

| Categoría | Prefijo | Notas |
|---|---|---|
| Color | `color` | Marca, texto, superficie, estado y vertical. |
| Radio | `radius` | Tallas primitivas y roles (`card`, `pill`). |
| Espaciado | `space` | Tallas primitivas y roles de padding (`inset.*`). |
| Tipografía | `font` | Familias, tallas (`font.size.*`) y roles como `balance` y `headline`. |
| Movimiento | `motion` | Duraciones y resortes (`spring.soft`). |
| Iconos | `icon` | Tamaños y trazo; el relleno en activo se resuelve a nivel de componente. |
| Elevación | `elevation` | Profundidad de superficies (por ejemplo `elevation.card`, `elevation.floating`). |
| Borde | `border` | Grosor y color de bordes (por ejemplo `border.default`, `border.focus.ring`). |
| Tamaño | `size` | Tamaños con regla de accesibilidad. Incluye `size.touch.min`, el área táctil mínima. |
| Opacidad | `opacity` | Opacidades con rol (por ejemplo `opacity.disabled`, `opacity.overlay`). |

## Verticales

Banking, Save, Invest y Credit viven en `color.vertical.<nombre>.accent` y `color.vertical.<nombre>.on-accent`, con los nombres en minúscula: `banking`, `save`, `invest`, `credit`. Los componentes no los usan por nombre: usan `color.vertical.accent` y `color.vertical.on-accent`, que el contexto resuelve.

Los colores de vertical (`color.vertical.*`) son independientes de los de estado (`color.status.*`), como se decidió en `DESIGN-BRIEF.md`.

## Reglas de escritura

- Todo en minúsculas, en inglés, separado por puntos. Las palabras compuestas llevan guion (`on-accent`).
- Los primitivos de color usan la escala `100`–`900`; `radius`, `space` y `font.size` usan tallas `xs`–`xl`. Nunca nombres de valor (`light`, `dark`, `big`).
- Los semánticos describen función, no apariencia: `color.text.primary`, no `color.text.black`.
- Un token nuevo de componente solo se crea si ningún semántico existente lo cubre.
- Un token de componente nunca nombra una vertical.

## Pendiente

- Escala de `motion.duration`: el ejemplo `motion.duration.200` usa números y queda sin regla propia hasta decidirla.
- Reglas de pasos para los primitivos de `elevation`, `border` y `opacity`.
- Lista final de roles semánticos de `elevation`, `border` y `opacity`; los ejemplos de este documento son ilustrativos.

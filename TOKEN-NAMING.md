# TOKEN-NAMING — Convención de nombres de tokens de Vuno

> Convención elegida: **tres capas** (primitivo → semántico → componente), con puntos como separador.
> Este documento define **nombres**. Los valores (hex, px, ms) están en `FOUNDATIONS.md`.

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
color.mint.300
color.sky.300
color.lime.500
color.red.600
radius.md
radius.full
space.lg
font.family.display
font.family.ui
font.size.2xl
elevation.sm
border.width.sm
opacity.40
motion.duration.250
```

### Familias de color

| Familia | Rol |
|---|---|
| `ink` | Neutros: texto, superficies y bordes |
| `purple` | Marca y acción primaria |
| `mint` | Vertical Save |
| `sky` | Vertical Invest |
| `coral` | Vertical Credit |
| `lime` | Destacado: el 10% |
| `green` | Estado de éxito |
| `red` | Estado de error |
| `amber` | Estado de advertencia |
| `azure` | Estado de información |

- Banking no tiene familia propia: su acento sale de `ink`.
- Las familias de estado son distintas de las de vertical, aunque se parezcan en tono.
- No se añaden familias sin acordarlo.

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

**`space`, `font.size`, `radius`, `elevation`, `border.width` e `icon.size`: tallas con nombre.**

| Categoría | Tallas acordadas |
|---|---|
| `space` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl` |
| `font.size` | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` |
| `radius` | `xs`, `sm`, `md`, `lg`, `xl`, más `full` |
| `elevation` | `sm`, `md` |
| `border.width` | `sm`, `md` |
| `icon.size` | `sm`, `md`, `lg` |

- Cada talla es mayor que la anterior; solo expresan **orden**, no un valor.
- Las tallas más allá de `xs`–`xl` llevan prefijo numérico (`2xs`, `2xl`, `3xl`).
- `radius.full` es la única talla que no expresa orden: significa "completamente redondeado" (pastilla o círculo). La usa `radius.pill`.
- No se añaden tallas fuera de esta tabla sin acordarlo.

**`motion.duration` y `opacity`: número con unidad implícita.**

- `motion.duration.<ms>`: el número son milisegundos (`motion.duration.250` = 250 ms).
- `opacity.<porcentaje>`: el número es el porcentaje (`opacity.40` = 0.40).

**Sin escala:** `font.family.ui`, `font.family.display`, `motion.easing.standard` y `motion.easing.exit` se nombran por rol, porque son valores únicos.

## Capa 2 — Semántico (el rol)

Formato: `categoría.rol.variante`, o `categoría.rol.variante.estado` cuando hay estado interactivo. Describe para qué sirve.

```
color.surface.page
color.text.primary
color.brand.primary
color.brand.logo
color.border.input
color.status.error.fg
color.status.error.border
color.status.success.bg
color.vertical.save.accent
color.vertical.save.on-accent
color.vertical.accent
color.vertical.on-accent
color.highlight.accent
color.highlight.on-accent
radius.card
radius.pill
space.inset.card
space.gap.section
font.role.balance
font.role.title
elevation.floating
border.default
opacity.disabled
motion.duration.press
motion.spring.soft
size.touch.min
```

### Estados interactivos

Los estados `pressed`, `disabled` y `focus` se nombran en la capa semántica, como sufijo del token al que modifican:

```
color.brand.primary.pressed
color.brand.primary.disabled
border.focus.ring
opacity.disabled
```

- `pressed` y `disabled` cambian el color del token base. En los elementos sin un color propio de deshabilitado, se usa `opacity.disabled`.
- `focus` se expresa como un contorno (`border.focus.ring`), no como un relleno distinto.
- El **error** de un control se expresa con los semánticos de estado: `color.status.error.border` para el borde y `color.status.error.fg` para el texto.
- Los tokens de componente no definen estados propios: referencian el estado semántico que corresponda (`input.error.border` → `color.status.error.border`, `input.border.focus` → `border.focus.ring`).

### Pares de contraste: `accent` / `on-accent` y `bg` / `fg`

Todo color que se usa como fondo lleva un token para el texto o icono que va encima:

```
color.vertical.save.accent       →  fondo del acento
color.vertical.save.on-accent    →  texto e iconos sobre ese fondo
color.highlight.accent           →  fondo lima (el 10%)
color.highlight.on-accent        →  texto e iconos sobre la lima
color.status.error.bg            →  fondo del chip de error
color.status.error.fg            →  texto e icono del chip de error
color.brand.primary              →  fondo del botón primario
color.brand.on-primary           →  texto e icono del botón primario
```

- El sufijo `on-` significa "sobre": `on-accent` es lo que se coloca encima de `accent`.
- Se define **un par por vertical** (`color.vertical.<nombre>.accent` / `.on-accent`) y un par para el destacado (`color.highlight.accent` / `.on-accent`).
- Los estados usan `bg` / `fg`, porque `fg` también sirve como texto sobre la superficie de la página.
- Un componente que usa un acento como fondo siempre usa su `on-accent` para el contenido.

### Bordes compuestos

Los tokens semánticos `border.*` combinan un grosor y un color:

| Token | Grosor | Color |
|---|---|---|
| `border.default` | `border.width.sm` | `color.border.default` |
| `border.input` | `border.width.sm` | `color.border.input` |
| `border.focus.ring` | `border.width.md` | `color.border.focus` |

El color de un borde vive en `color.border.*`, y el borde completo en `border.*`.

## Capa 3 — Componente

Formato: `componente.variante.propiedad` o `componente.parte.estado.propiedad`.

```
button.primary.bg
button.primary.radius
button.circle.size
chip.status.success.bg
chip.highlight.bg
card.accent.bg
card.accent.fg
input.border
input.error.border
tabbar.item.active.icon
balance.font
```

### Regla: un token por componente, la vertical es contexto

Los tokens de componente **nunca nombran una vertical**. No existen `card.vertical.save.bg` ni `card.vertical.credit.bg`: hay un único `card.accent.bg`, y su valor se resuelve según el contexto en que se usa.

- El **contexto** (la vertical activa en esa pantalla) decide a qué par apuntan los semánticos `color.vertical.accent` y `color.vertical.on-accent`. En Save apuntan a `color.vertical.save.accent` y `color.vertical.save.on-accent`; en Credit, a los de credit.
- `card.accent.bg` referencia `color.vertical.accent` y `card.accent.fg` referencia `color.vertical.on-accent`.
- La **variante** también resuelve por nombre, no por duplicación: `button.primary.bg` y `chip.status.success.bg` son un token cada uno, con la variante como parte del nombre.
- Añadir una vertical nueva solo añade tokens en la capa semántica; no toca ningún componente.

**Cómo se resuelve el contexto:**
- **En código:** un proveedor de vertical en React Native fija `color.vertical.accent` y `color.vertical.on-accent` para todo lo que tiene debajo.
- **En Figma:** una colección "Vertical" con un modo por vertical (`banking`, `save`, `invest`, `credit`). Un frame en modo `save` resuelve `card/accent/*` con los valores de Save.

## Categorías

| Categoría | Prefijo | Primitivos | Semánticos |
|---|---|---|---|
| Color | `color` | Familias de color (`color.<familia>.100`–`900`) | `surface`, `text`, `brand`, `border`, `status`, `vertical` y `highlight` (el 10%) |
| Radio | `radius` | `xs`–`xl`, `full` | `input`, `card`, `sheet`, `pill` |
| Espaciado | `space` | `2xs`–`3xl` | `inset.screen`, `inset.card`, `inset.chip`, `gap.list`, `gap.stack`, `gap.section` |
| Tipografía | `font` | `family.ui`, `family.display`, `size.xs`–`2xl` | `role.balance`, `headline`, `title`, `body`, `label`, `caption` |
| Movimiento | `motion` | `duration.<ms>`, `easing.standard`, `easing.exit` | `duration.press`, `state`, `nav`, `celebrate` · `spring.soft`, `spring.bounce` |
| Iconos | `icon` | `size.sm`, `md`, `lg` | El trazo lo fija la librería (Ionicons); el relleno en activo se resuelve en el componente. |
| Elevación | `elevation` | `sm`, `md` | `floating`, `overlay` |
| Borde | `border` | `width.sm`, `width.md` | `default`, `input`, `focus.ring` (compuestos de grosor + `color.border.*`) |
| Tamaño | `size` | — | `touch.min`, el área táctil mínima |
| Opacidad | `opacity` | `<porcentaje>` (`40`, `50`) | `disabled`, `overlay` |

## Verticales

Banking, Save, Invest y Credit viven en `color.vertical.<nombre>.accent` y `color.vertical.<nombre>.on-accent`, con los nombres en minúscula: `banking`, `save`, `invest`, `credit`. Los componentes no los usan por nombre: usan `color.vertical.accent` y `color.vertical.on-accent`, que el contexto resuelve.

Los colores de vertical (`color.vertical.*`) son independientes de los de estado (`color.status.*`), como se decidió en `DESIGN-BRIEF.md`.

## Conversión a Figma

- **Separador:** el punto se convierte en barra: `color.purple.500` → `color/purple/500`.
- **Nombres:** se conservan tal cual, con tallas, números y guiones (`space/2xs`, `motion/duration/250`, `color/vertical/save/on-accent`).
- **Estilos:** los estilos de texto omiten el prefijo `font.` (`font.role.balance` → `role/balance`). Los estilos de efecto conservan el nombre completo (`elevation.floating` → `elevation/floating`).
- **Colecciones de variables:**
  - **Primitivos:** capa 1.
  - **Semánticos:** capa 2, con modo `Light` (y `Dark` cuando llegue).
  - **Vertical:** un modo por vertical.
  - **Componentes:** capa 3.
- Detalle de tipos, scopes y estilos en `FOUNDATIONS.md` §12.

## Reglas de escritura

- Todo en minúsculas, en inglés, separado por puntos. Las palabras compuestas llevan guion (`on-accent`).
- Los primitivos de color usan la escala `100`–`900`; las categorías con tallas usan solo las de la tabla de tallas acordadas; `motion.duration` y `opacity` usan números. Nunca nombres de valor (`light`, `dark`, `big`).
- Los semánticos describen función, no apariencia: `color.text.primary`, no `color.text.black`.
- Un token nuevo de componente solo se crea si ningún semántico existente lo cubre.
- Un token de componente nunca nombra una vertical.

## Resuelto

- Escala de `motion.duration`: número en milisegundos.
- Pasos de `elevation` (`sm`, `md`), `border.width` (`sm`, `md`) y `opacity` (porcentaje).
- Tallas ampliadas de `space` (`2xs`–`3xl`) y `font.size` (hasta `2xl`, para que quepa el rol `title`), y `radius.full`.
- Lista final de roles de `elevation`, `border` y `opacity`, con sus valores: ver `FOUNDATIONS.md`.

# FOUNDATIONS — Sistema de diseño de Vuno

> Opción elegida: **B · Tech suave**.
> Los nombres siguen `TOKEN-NAMING.md`: el primitivo dice qué es, el semántico para qué sirve y el de componente dónde se usa. La interfaz nunca usa un primitivo directamente.
> Las decisiones vienen de `DESIGN-BRIEF.md`. Por ahora hay solo modo claro; el modo oscuro solo cambiará la capa semántica.
> Todos los valores son Figma-ready (ver §12).

---

## 1. Color

### 1.1 Primitivos

`500` es la base de cada familia. Las escalas se generaron en OKLCH y se recortaron a sRGB.

| Familia | Rol | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| `color.ink` | Neutros | `#F8F7F1` | `#F2F0EA` | `#E3E1DB` | `#C5C4BE` | `#94928D` | `#6D6C67` | `#4E4D48` | `#2C2B27` | `#141411` |
| `color.purple` | Marca y vertical Credit | `#F5F6FF` | `#E0E3FE` | `#C2C8FF` | `#9BA1FD` | `#6C63FF` | `#5347D3` | `#4034AC` | `#2E2383` | `#1B1355` |
| `color.mint` | Vertical | `#E9FCF5` | `#D1F5E7` | `#ABEBD4` | `#7BDABB` | `#46BE9C` | `#0F7B61` | `#0A614C` | `#034938` | `#002F23` |
| `color.sky` | Vertical | `#F2F7FF` | `#DEEDFF` | `#C4DDFE` | `#9CC7FF` | `#6AA8F7` | `#2D64A7` | `#1E4D87` | `#123865` | `#082240` |
| `color.coral` | Paleta del brief, sin rol semántico | `#FFF4F2` | `#FFE7E2` | `#FED4CC` | `#FEB8AB` | `#FF8D7A` | `#B45243` | `#913D30` | `#6C2B21` | `#461912` |
| `color.lime` | Destacado (10%) | `#F4FCD7` | `#EFFCBA` | `#E8FC90` | `#E1F964` | `#D9F23F` | `#8C9D03` | `#64710C` | `#444E02` | `#2B3200` |
| `color.green` | Estado | `#E9FDEE` | `#CCF2D6` | `#A0E3B4` | `#67CA8A` | `#17A35B` | `#107641` | `#085D31` | `#014422` | `#012A13` |
| `color.red` | Estado | `#FFF4F2` | `#FFDCD6` | `#FEB8AE` | `#FC8172` | `#E0352B` | `#B81814` | `#940204` | `#6D0505` | `#480000` |
| `color.amber` | Estado | `#FFF5E9` | `#FEEAD0` | `#FED9AA` | `#FDC16E` | `#F0A21A` | `#B57801` | `#8D5E0E` | `#694403` | `#472C00` |
| `color.azure` | Estado | `#F1F7FF` | `#D5E7FE` | `#ADD0FD` | `#6EAEFF` | `#2B7FE0` | `#1162B8` | `#014B95` | `#03376E` | `#002148` |

### 1.2 Semánticos

| Token | → Primitivo | Valor |
|---|---|---|
| `color.surface.page` | `color.ink.200` | `#F2F0EA` |
| `color.surface.card` | `color.ink.100` | `#F8F7F1` |
| `color.surface.inverse` | `color.ink.900` | `#141411` |
| `color.surface.scrim` | `color.ink.900` | `#141411` (con `opacity.overlay`) |
| `color.text.primary` | `color.ink.900` | `#141411` |
| `color.text.secondary` | `color.ink.700` | `#4E4D48` |
| `color.text.tertiary` | `color.ink.600` | `#6D6C67` |
| `color.text.on-inverse` | `color.ink.100` | `#F8F7F1` |
| `color.text.on-inverse-muted` | `color.ink.400` | `#C5C4BE` |
| `color.brand.primary` | `color.purple.600` | `#5347D3` |
| `color.brand.primary.pressed` | `color.purple.700` | `#4034AC` |
| `color.brand.primary.disabled` | `color.purple.300` | `#C2C8FF` |
| `color.brand.on-primary` | `color.ink.100` | `#F8F7F1` |
| `color.brand.logo` | `color.purple.500` | `#6C63FF` |
| `color.border.default` | `color.ink.300` | `#E3E1DB` |
| `color.border.input` | `color.ink.600` | `#6D6C67` |
| `color.border.focus` | `color.purple.600` | `#5347D3` |
| `color.vertical.banking.accent` | `color.ink.900` | `#141411` |
| `color.vertical.banking.on-accent` | `color.ink.100` | `#F8F7F1` |
| `color.vertical.save.accent` | `color.mint.300` | `#ABEBD4` |
| `color.vertical.save.on-accent` | `color.mint.900` | `#002F23` |
| `color.vertical.invest.accent` | `color.sky.300` | `#C4DDFE` |
| `color.vertical.invest.on-accent` | `color.sky.900` | `#082240` |
| `color.vertical.credit.accent` | `color.purple.300` | `#C2C8FF` |
| `color.vertical.credit.on-accent` | `color.purple.900` | `#1B1355` |
| `color.vertical.accent` / `color.vertical.on-accent` | El par de la vertical activa (lo resuelve el contexto) | — |
| `color.status.success.bg` / `.fg` | `color.green.200` / `color.green.800` | `#CCF2D6` / `#014422` |
| `color.status.error.bg` / `.fg` | `color.red.200` / `color.red.800` | `#FFDCD6` / `#6D0505` |
| `color.status.error.border` | `color.red.600` | `#B81814` |
| `color.status.warning.bg` / `.fg` | `color.amber.200` / `color.amber.900` | `#FEEAD0` / `#472C00` |
| `color.status.info.bg` / `.fg` | `color.azure.200` / `color.azure.800` | `#D5E7FE` / `#03376E` |
| `color.highlight.accent` | `color.lime.500` | `#D9F23F` |
| `color.highlight.on-accent` | `color.ink.900` | `#141411` |

### 1.3 Reglas

- **Proporción 70/20/10.**
  - 70%: neutros `ink`.
  - 20%: morado de acción y acentos de vertical.
  - 10%: lima, solo según §9.
- **Morado:** `color.brand.primary` se usa solo para la acción principal y el foco. `color.brand.logo` (#6C63FF) se usa solo para el logo y superficies de marca sin texto.
- **Verticales:** su color identifica la vertical y nada más. Nunca expresa estado ni éxito.
- **Credit en la escala morada:** `purple.300` / `purple.900` (10.23:1). Comparte paso con `color.brand.primary.disabled`, pero el botón deshabilitado lleva además `opacity.disabled` y nunca aparece como superficie de contenido, así que no se confunden. `coral` se mantiene en la paleta (viene del brief) pero no tiene rol semántico.
- **Estados:** su color expresa estado y nada más. Siempre va acompañado de icono o texto.
- **Pares accent / on-accent:** un componente que usa un acento como fondo siempre usa su `on-accent` para el contenido.
- **Sin blanco ni negro puros:** el fondo más claro es `ink.100` y el más oscuro `ink.900`.

### 1.4 Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Un solo botón morado por pantalla. | Usar morado en tarjetas, iconos decorativos o fondos. |
| Mint para la tarjeta de Save. | Mint para decir "pago exitoso": eso es `color.status.success`. |
| Chip de error con icono ✕ + texto. | Comunicar un error solo pintando algo de rojo. |
| Texto `ink.900` sobre lima. | Texto blanco sobre lima, o lima como texto sobre fondo claro. |
| `ink.100` / `ink.200` como fondos. | `#FFFFFF` o `#000000`. |

---

## 2. Tipografía

### 2.1 Primitivos

| Token | Valor |
|---|---|
| `font.family.ui` | Plus Jakarta Sans. Expo: `@expo-google-fonts/plus-jakarta-sans` → `PlusJakartaSans_400Regular`, `PlusJakartaSans_500Medium`, `PlusJakartaSans_600SemiBold` |
| `font.family.display` | Bricolage Grotesque. Expo: `@expo-google-fonts/bricolage-grotesque` → `BricolageGrotesque_700Bold` |
| `font.size.xs` | 12 |
| `font.size.sm` | 14 |
| `font.size.md` | 16 |
| `font.size.lg` | 20 |
| `font.size.xl` | 28 |
| `font.size.2xl` | 52 |

### 2.2 Roles (semánticos)

| Token | Tamaño | Familia y peso | Línea | Tracking | Uso |
|---|---|---|---|---|---|
| `font.role.balance` | `font.size.2xl` | display · Bold 700 | 56 | −2% (−1.04 px) | Cifra del saldo principal |
| `font.role.headline` | `font.size.xl` | display · Bold 700 | 32 | −1% (−0.28 px) | Titular de pantalla, monto en tarjeta de vertical |
| `font.role.title` | `font.size.lg` | ui · SemiBold 600 | 28 | 0% | Título de sección, de hoja y de modal |
| `font.role.body` | `font.size.md` | ui · Regular 400 | 24 | 0% | Texto corrido, descripciones |
| `font.role.label` | `font.size.sm` | ui · SemiBold 600 | 20 | 0% | Botones, etiquetas, nombres en listas, montos en listas |
| `font.role.caption` | `font.size.xs` | ui · Medium 500 | 16 | +1% (0.12 px) | Fechas, metadatos, chips |

### 2.3 Reglas

- **La display es parte del 20%:** se usa solo en `balance` y `headline`, nunca en párrafos, botones ni etiquetas.
- **Un solo `balance` por pantalla.**
- **Cifras en listas:** los montos usan `fontVariant: ['tabular-nums']` para que queden alineados.
- **React Native:** cada peso es una familia distinta. El rol apunta al nombre de la instancia, no a `fontWeight`, porque en Android `fontWeight` se ignora con fuentes personalizadas.
- **Mínimos:** el texto nunca baja de 12 px. Todas las alturas de línea son múltiplos de 4.
- **Escalado:** se respeta el tamaño de fuente del sistema, hasta 200% en `body`. `balance` usa `maxFontSizeMultiplier` 1.5.

### 2.4 Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| `$1,050.77` en `balance` y un solo saldo grande. | Dos saldos en `balance` compitiendo en la misma pantalla. |
| Títulos de sección en `title`, con la sans. | Bricolage en un botón o en un párrafo. |
| Montos de lista en `label` con cifras tabulares. | Texto de 10 o 11 px para "que quepa". |
| Escribir en minúsculas normales (oración). | TODO EN MAYÚSCULAS, salvo captions cortos de sección. |

---

## 3. Espaciado (grilla de 4 pt)

### 3.1 Primitivos

| `space.2xs` | `space.xs` | `space.sm` | `space.md` | `space.lg` | `space.xl` | `space.2xl` | `space.3xl` |
|---|---|---|---|---|---|---|---|
| 4 | 8 | 12 | 16 | 20 | 24 | 32 | 48 |

### 3.2 Semánticos

| Token | → Primitivo | Valor | Uso |
|---|---|---|---|
| `space.inset.screen` | `space.lg` | 20 | Margen lateral de pantalla |
| `space.inset.card` | `space.lg` | 20 | Padding interno de tarjeta |
| `space.inset.chip` | `space.xs` | 8 | Padding horizontal de chip (vertical: `space.2xs`) |
| `space.gap.list` | `space.xs` | 8 | Entre filas de una lista y entre tarjetas en grilla |
| `space.gap.stack` | `space.md` | 16 | Entre bloques dentro de una sección |
| `space.gap.section` | `space.2xl` | 32 | Entre secciones |

### 3.3 Reglas

- Todo espacio es múltiplo de 4 y sale de un token.
- **Densidad equilibrada:** inicio y pantallas de marca usan `gap.section`; transacciones y detalle usan `gap.list`.
- Entre dos áreas táctiles hay al menos `space.xs` (8).

### 3.4 Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Margen de pantalla 20 en todas las verticales. | Margen de 18 "porque se ve mejor". |
| Más aire en inicio, más compacto en movimientos. | La misma densidad en todo. |

---

## 4. Radios

### 4.1 Primitivos

| `radius.xs` | `radius.sm` | `radius.md` | `radius.lg` | `radius.xl` | `radius.full` |
|---|---|---|---|---|---|
| 4 | 8 | 16 | 20 | 28 | 999 |

### 4.2 Semánticos

| Token | → Primitivo | Valor | Uso |
|---|---|---|---|
| `radius.input` | `radius.md` | 16 | Campos de texto, selectores |
| `radius.card` | `radius.lg` | 20 | Tarjetas |
| `radius.sheet` | `radius.xl` | 28 | Esquinas superiores de hojas inferiores |
| `radius.pill` | `radius.full` | 999 | Botones, chips, barra inferior, botones circulares |

### 4.3 Reglas y Do / Don't

- Redondeado medio en contenedores; pastilla en todo lo que se pulsa.
- Un elemento anidado tiene un radio menor o igual que su contenedor.

| ✅ Do | ❌ Don't |
|---|---|
| Botón primario en pastilla. | Botón con `radius.md`. |
| Tarjeta 20, imagen interna 16 o menos. | Imagen interna con radio mayor que la tarjeta. |

---

## 5. Elevación, bordes y opacidad

### 5.1 Primitivos

| Token | Valor |
|---|---|
| `elevation.sm` | x 0 · y 6 · blur 20 · spread 0 · `ink.900` al 12% |
| `elevation.md` | x 0 · y 12 · blur 32 · spread 0 · `ink.900` al 18% |
| `border.width.sm` | 1 |
| `border.width.md` | 2 |
| `opacity.40` | 0.40 |
| `opacity.50` | 0.50 |

### 5.2 Semánticos

| Token | → Primitivo(s) | Uso |
|---|---|---|
| `elevation.floating` | `elevation.sm` | Barra inferior, botón flotante |
| `elevation.overlay` | `elevation.md` | Hojas, modales, menús |
| `border.default` | `border.width.sm` + `color.border.default` | Tarjetas neutras, separadores, botón circular |
| `border.input` | `border.width.sm` + `color.border.input` | Campos de texto, selectores y cualquier control cuyo límite deba distinguirse (3:1) |
| `border.focus.ring` | `border.width.md` + `color.border.focus`, separado 2 px del elemento | Foco de teclado |
| `opacity.disabled` | `opacity.40` | Elementos deshabilitados |
| `opacity.overlay` | `opacity.50` | Velo detrás de hojas y modales (`color.surface.scrim`) |

### 5.3 Reglas y Do / Don't

- Las tarjetas son planas: usan `border.default` y no tienen sombra. La sombra es solo para lo que flota sobre el contenido.
- En React Native se usa `boxShadow` (nueva arquitectura, Expo SDK 52 o superior). El respaldo en Android es `elevation` nativo.

| ✅ Do | ❌ Don't |
|---|---|
| Sombra en la barra inferior flotante. | Sombra en tarjetas de lista. |
| Velo `ink.900` al 50% detrás de una hoja. | Velo negro puro. |

---

## 6. Movimiento

### 6.1 Primitivos

| Token | Valor |
|---|---|
| `motion.duration.100` | 100 ms |
| `motion.duration.150` | 150 ms |
| `motion.duration.250` | 250 ms |
| `motion.duration.400` | 400 ms |
| `motion.duration.1800` | 1800 ms |
| `motion.easing.standard` | cubic-bezier(0.2, 0, 0, 1) |
| `motion.easing.exit` | cubic-bezier(0.4, 0, 1, 1) |

### 6.2 Semánticos

| Token | Valor | Uso |
|---|---|---|
| `motion.duration.press` | `motion.duration.100` | Respuesta al tocar |
| `motion.duration.state` | `motion.duration.150` | Chips, cambios de estado, fundidos |
| `motion.duration.nav` | `motion.duration.250` | Navegación, hojas, tarjetas |
| `motion.duration.celebrate` | `motion.duration.400` | Momentos 10% |
| `motion.duration.effect` | `motion.duration.1800` | Efectos decorativos que no bloquean la interfaz (partículas) |
| `motion.spring.soft` | masa 1 · rigidez 300 · amortiguación 22 (≈8% de rebote, asienta en ≈370 ms) | Botones, tarjetas, indicador de la barra inferior |
| `motion.spring.bounce` | masa 1 · rigidez 340 · amortiguación 20 (≈13% de rebote, asienta en ≈470 ms) | Solo momentos 10% |

El asentamiento se mide como el momento en que el resorte queda dentro de ±1% del valor final. `bounce` tarda más que `soft` porque amortigua menos.

**Transiciones y efectos.** La escala `press` → `celebrate` (100–400 ms) es de transiciones: mueven la interfaz de un estado a otro y la persona las espera, así que son cortas (como referencia, la escala de Material 3 termina en 1000 ms). `motion.duration.effect` es otra categoría: efectos decorativos que no bloquean nada (se puede seguir tocando mientras se ven). Vive fuera de la escala de transiciones para que un efecto largo nunca sirva de precedente para una transición lenta. Los parámetros propios de un efecto van en la capa de componente y apuntan al semántico; los valores físicos sin significado semántico, como la gravedad, son tokens DTCG de tipo `number` con la unidad en `$description`:

| Token de componente | Valor | Uso |
|---|---|---|
| `confetti.duration` | `motion.duration.effect` | Vida de la ráfaga, desde el lanzamiento hasta que sale la última pieza |
| `confetti.gravity` | 1400 (pt/s², dp/s² en Android) | Aceleración hacia abajo de cada pieza |
| `confetti.count` | 48 | Piezas por ráfaga |

### 6.3 Reglas

- El movimiento confirma, explica o conecta una acción. Nunca es decorativo en reposo.
- **Al pulsar:** en iOS el elemento se escala a 0.96 durante `press` y vuelve con `spring.soft`. En Android se usa el ripple de Material con una capa de estado del 10% del color del contenido (§14).
- **Entradas y salidas:** las entradas usan `easing.standard`, y las salidas `easing.exit` con `duration.state`.
- **Navegación:** sigue las transiciones nativas de cada plataforma.
- **Reducir movimiento:** si el sistema lo pide, los resortes se cambian por un cambio inmediato o un fundido de `duration.state`, y los efectos (`motion.duration.effect`) no se reproducen.

### 6.4 Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Rebote suave al soltar un botón. | `spring.bounce` en un botón normal. |
| Saldo que aparece con un fundido corto. | Saldo que cuenta números hacia arriba en cada visita. |
| Respetar "Reducir movimiento". | Animaciones de más de 400 ms en flujos de pago. |

---

## 7. Iconos

| Token | Valor |
|---|---|
| `icon.size.sm` | 16 (dentro de chips y junto a `caption`) |
| `icon.size.md` | 24 (por defecto) |
| `icon.size.lg` | 32 (estados vacíos, hitos) |
| Librería | Ionicons, incluida en `@expo/vector-icons` |
| Grosor | El de Ionicons outline: trazo de 32 sobre 512, es decir **1.5 px a 24 px** (1 px a 16, 2 px a 32). |

### 7.1 Reglas

- Por defecto se usa la variante `-outline`. En estado activo o seleccionado se usa la variante rellena del mismo icono.
- El color sale del texto que acompaña al icono (`color.text.*`, `.fg` o `on-accent`).
- Un icono sin texto necesita `accessibilityLabel`, y su área táctil es `size.touch.min` aunque el icono mida 24.

| ✅ Do | ❌ Don't |
|---|---|
| `home-outline` → `home` al seleccionar la pestaña. | Mezclar Ionicons con otra librería. |
| Botón circular de 48 con un icono de 24. | Un icono de 24 como área táctil de 24. |

---

## 8. Accesibilidad y tamaños

| Token | Valor | Regla |
|---|---|---|
| `size.touch.min` | 48 | Área táctil mínima. Cubre los 44 pt de iOS y los 48 dp de Android. |

- **Contraste WCAG 2.2 AA:**
  - Texto normal: 4.5:1.
  - Texto grande (24 px o más, o 18.66 px o más en negrita): 3:1.
  - Iconos, bordes de componentes y anillo de foco: 3:1.
  - Los elementos deshabilitados están exentos.
- **Estados sin depender del color:** el color nunca es el único indicador. Los chips llevan icono y los errores llevan texto.
- **Escalado:** se respeta el tamaño de fuente del sistema (§2.3).
- **Movimiento:** se respeta "Reducir movimiento" (§6.3).
- **Lectores de pantalla:** VoiceOver (iOS) y TalkBack (Android). Los montos se leen completos (en la app, en inglés: "1050 dollars and 77 cents").

---

## 9. El 10%: detalles inesperados

**Definición:** una parte pequeña de la identidad reservada para detalles distintivos e inesperados que aporten personalidad, sin afectar la claridad ni la confianza. Se expresa con acentos lima muy puntuales, microinteracciones, formas abstractas y pequeños momentos de sorpresa. No significa llenar la interfaz de elementos llamativos.

| Regla | Detalle |
|---|---|
| Tokens | `color.highlight.accent`, `color.highlight.on-accent`, `motion.spring.bounce`, `motion.duration.celebrate` y, para el confeti, `motion.duration.effect` (§6.2). |
| Cuándo | Solo en eventos positivos que provoca el usuario: crear una meta, alcanzar un hito, primer depósito, completar el alta. |
| Cuándo no | Nunca en errores, pagos fallidos, pagos vencidos de Credit ni avisos legales. |
| Cuánto | Como máximo un momento por pantalla y por acción. La parte que la persona espera (anillo, chip) dura menos de 1 s; el confeti puede durar `motion.duration.effect` porque no bloquea nada. |
| Dónde no | Nunca sobre saldos, montos, botones primarios ni información crítica. |
| Acento fijo | Una única excepción permanente: el icono activo de la barra inferior, en lima sobre `color.surface.inverse`. |
| Formas | Solo círculo y pastilla (el punto del logo y la pastilla de la portada), con `radius.full`. Son geometría de interfaz, no ilustración. |
| Háptica | Notificación de éxito al llegar al hito (`expo-haptics`, `NotificationFeedbackType.Success`). |

**Ejemplo de momento de hito (meta creada, implementado en el prototipo):**
1. El anillo de progreso se llena con `easing.standard` durante `duration.nav`.
2. Entra el chip lima "Goal created!" con `spring.bounce` y suena el háptico de éxito.
3. 80 ms después aparece el punto lima y sale el confeti (`Confetti`, `motion.duration.effect`). Con "Reducir movimiento" solo hay fundidos y no hay confeti.

| ✅ Do | ❌ Don't |
|---|---|
| Un chip lima al cumplir una meta. | Lima en el botón de "Pagar". |
| Un punto lima que aparece una vez y se queda quieto. | Formas lima flotando en reposo en el inicio. |
| Celebrar el primer depósito. | Celebrar que se pagó el mínimo de una deuda. |

---

## 10. Componentes de muestra (capa 3)

| Componente | Tokens |
|---|---|
| Botón primario | `button.primary.bg` → `color.brand.primary` (los estados pressed y disabled se resuelven con `color.brand.primary.pressed` / `.disabled`; el componente no define estados propios) · `button.primary.fg` → `color.brand.on-primary` · `button.primary.radius` → `radius.pill` · `button.primary.height` → `size.touch.min` · `button.primary.font` → `font.role.label` |
| Botón circular (`IconButton`) | `button.circle.bg` → `color.surface.card` · `button.circle.border` → `border.default` · `button.circle.size` → `size.touch.min` · `button.circle.icon` → `color.text.primary` |
| Chip de estado | `chip.status.<estado>.bg` / `.fg` → `color.status.<estado>.bg` / `.fg` · `chip.radius` → `radius.pill` · `chip.font` → `font.role.caption` · `chip.icon` → `icon.size.sm` |
| Chip destacado | `chip.highlight.bg` → `color.highlight.accent` · `chip.highlight.fg` → `color.highlight.on-accent` |
| Tarjeta de vertical | `card.accent.bg` → `color.vertical.accent` · `card.accent.fg` → `color.vertical.on-accent` · `card.radius` → `radius.card` · `card.inset` → `space.inset.card` |
| Tarjeta neutra | `card.bg` → `color.surface.card` · `card.border` → `border.default` |
| Campo de texto | `input.bg` → `color.surface.card` · `input.border` → `border.input` · `input.border.focus` → `border.focus.ring` · `input.error.border` → `color.status.error.border` · `input.radius` → `radius.input` · `input.height` → `size.touch.min` |
| Barra inferior flotante | `tabbar.bg` → `color.surface.card` · `tabbar.radius` → `radius.pill` · `tabbar.elevation` → `elevation.floating` · `tabbar.item.icon` → `color.text.tertiary` · `tabbar.item.active.bg` → `color.surface.inverse` · `tabbar.item.active.icon` → `color.highlight.accent` |
| Saldo | `balance.fg` → `color.text.primary` · `balance.font` → `font.role.balance` |

**Componentes añadidos con la app (v0.2.0).** Referencian tokens semánticos existentes; los únicos valores nuevos son los parámetros físicos del confeti (§6.2). Fuente: `tokens/component.json` (114 tokens). Documentación: Storybook → Components.

| Componente | Tokens |
|---|---|
| Botón secundario | `button.secondary.bg` → `color.surface.card` · `button.secondary.fg` → `color.text.primary` · `button.secondary.border` → `border.default` |
| Botón terciario | `button.tertiary.fg` → `color.text.primary` (sin fondo ni borde) |
| Acción rápida | `action.bg` → `color.surface.card` · `action.border` → `border.default` · `action.icon` → `color.text.primary` · `action.label` → `color.text.secondary` · `action.inset` → `space.md` |
| Chip (común) | `chip.inset` → `space.inset.chip` |
| Chip de elección | `chip.choice.bg` → `color.surface.card` · `chip.choice.fg` → `color.text.primary` · `chip.choice.border` → `border.default` · `chip.choice.height` → `size.touch.min` · `chip.choice.font` → `font.role.label` · `chip.choice.selected.bg` → `color.surface.inverse` · `chip.choice.selected.fg` → `color.text.on-inverse` · `chip.choice.selected.icon` → `color.highlight.accent` |
| Campo de texto (resto) | `input.fg` → `color.text.primary` · `input.placeholder` → `color.text.tertiary` · `input.font` → `font.role.body` · `input.large.font` → `font.role.headline` |
| Lista | `list.divider` → `border.default` · `list.row.height` → `size.touch.min` · `list.row.inset` → `space.sm` · `list.row.title` → `color.text.primary` · `list.row.detail` → `color.text.secondary` · `list.row.positive` → `color.status.success.fg` |
| Insignia de icono | `badge.bg` → `color.surface.page` (con vertical: `color.vertical.accent`) · `badge.icon` → `icon.size.md` · `badge.inset` → `space.xs` |
| Avatar | `avatar.bg` → `color.surface.inverse` · `avatar.fg` → `color.text.on-inverse` · `avatar.size` → `size.touch.min` |
| Saldo (centavos) | `balance.cents` → `font.size.xl` |
| Teclado de importe | `keypad.key.height` → `size.touch.min` · `keypad.key.font` → `font.role.title` · `keypad.key.fg` → `color.text.primary` |
| Slider por pasos | `slider.track` → `color.border.default` · `slider.fill` → `color.surface.inverse` · `slider.height` → `space.xs` · `slider.thumb.bg` → `color.surface.card` · `slider.thumb.border` → `border.input` · `slider.thumb.size` → `space.2xl` · `slider.thumb.elevation` → `elevation.floating` |
| Control segmentado | `segmented.bg` → `color.surface.card` · `segmented.border` → `border.default` · `segmented.indicator` → `color.surface.inverse` · `segmented.label` → `color.text.secondary` · `segmented.active.label` → `color.text.on-inverse` · `segmented.inset` → `space.2xs` |
| Deslizar para confirmar | `slide-confirm.bg` → `color.brand.primary` · `slide-confirm.fill` → `color.brand.primary.pressed` · `slide-confirm.fg` → `color.brand.on-primary` · `slide-confirm.font` → `font.role.label` · `slide-confirm.inset` → `space.2xs` · `slide-confirm.thumb.bg` → `color.brand.on-primary` · `slide-confirm.thumb.icon` → `color.brand.primary` · `slide-confirm.thumb.size` → `size.touch.min` |
| Progreso | `progress.height` → `space.xs` · `progress.slim` → `space.2xs` · `progress.ring.stroke` → `space.sm` · `progress.step.track` → `color.border.default` · `progress.step.done` → `color.surface.inverse` (barra y anillo: `color.vertical.on-accent` sobre `color.vertical.accent`) |
| Interruptor | `switch.on` → `color.brand.primary` · `switch.off` → `color.border.input` · `switch.thumb` → `color.surface.card` |
| Barra inferior (resto) | `tabbar.strip` → `color.surface.page` · `tabbar.inset` → `space.2xs` · `tabbar.item.height` → `size.touch.min` · `tabbar.item.active.label` → `color.text.on-inverse` |
| Confeti | `confetti.duration` → `motion.duration.effect` · `confetti.gravity` (1400) · `confetti.count` (48). Piezas en `radius.pill` con `color.highlight.accent`, `color.brand.primary` y `color.vertical.<vertical>.accent`. Solo en hitos (§9) y nunca con Reducir movimiento. |
| Barra superior (`TopBar`) | Sin tokens propios: `size.touch.min`, `font.role.title` y `space.inset.screen`. Título centrado en iOS y alineado al inicio en Android, en una barra de 64 dp (§14). |
| Logo | `color.brand.logo` (cuadrado de la marca), `color.brand.on-primary` (la V) y `color.highlight.accent` (el punto). Palabra en la familia display. `color.brand.logo` nunca lleva texto encima. |

`card.accent.*` no se escribe en `component.json`: lo resuelve `VerticalProvider` en tiempo de ejecución con el par de la vertical activa.

---

## 11. Contraste AA

Ratios WCAG 2.x calculados sobre los hex de §1. Mínimos: **4.5:1** texto normal · **3:1** texto grande, iconos, bordes de componente y foco.

### 11.1 Pares en uso

| Texto / icono | Fondo | Ratio | Mín. | |
|---|---|---|---|---|
| `text.primary` (ink.900) | `surface.page` (ink.200) | 16.19 | 4.5 | ✅ |
| `text.primary` (ink.900) | `surface.card` (ink.100) | 17.19 | 4.5 | ✅ |
| `text.secondary` (ink.700) | `surface.page` (ink.200) | 7.43 | 4.5 | ✅ |
| `text.secondary` (ink.700) | `surface.card` (ink.100) | 7.89 | 4.5 | ✅ |
| `text.tertiary` (ink.600) | `surface.page` (ink.200) | 4.62 | 4.5 | ✅ |
| `text.tertiary` (ink.600) | `surface.card` (ink.100) | 4.90 | 4.5 | ✅ |
| `text.on-inverse` (ink.100) | `surface.inverse` (ink.900) | 17.19 | 4.5 | ✅ |
| `text.on-inverse-muted` (ink.400) | `surface.inverse` (ink.900) | 10.56 | 4.5 | ✅ |
| `brand.on-primary` (ink.100) | `brand.primary` (purple.600) | 6.10 | 4.5 | ✅ |
| `brand.on-primary` (ink.100) | `brand.primary.pressed` (purple.700) | 8.49 | 4.5 | ✅ |
| `border.focus` (purple.600) | `surface.page` (ink.200) | 5.74 | 3 | ✅ |
| `border.focus` (purple.600) | `surface.card` (ink.100) | 6.10 | 3 | ✅ |
| `border.input` (ink.600) | `surface.card` (ink.100) | 4.90 | 3 | ✅ |
| `vertical.banking.on-accent` (ink.100) | `vertical.banking.accent` (ink.900) | 17.19 | 4.5 | ✅ |
| `vertical.save.on-accent` (mint.900) | `vertical.save.accent` (mint.300) | 10.88 | 4.5 | ✅ |
| `vertical.invest.on-accent` (sky.900) | `vertical.invest.accent` (sky.300) | 11.51 | 4.5 | ✅ |
| `vertical.credit.on-accent` (purple.900) | `vertical.credit.accent` (purple.300) | 10.23 | 4.5 | ✅ |
| `status.success.fg` (green.800) | `status.success.bg` (green.200) | 9.31 | 4.5 | ✅ |
| `status.error.fg` (red.800) | `status.error.bg` (red.200) | 9.83 | 4.5 | ✅ |
| `status.error.border` (red.600), borde de campo con error | `surface.card` (ink.100) | 6.16 | 3 | ✅ |
| `status.warning.fg` (amber.900) | `status.warning.bg` (amber.200) | 10.99 | 4.5 | ✅ |
| `status.info.fg` (azure.800) | `status.info.bg` (azure.200) | 9.40 | 4.5 | ✅ |
| `status.success.fg` (green.800) | `surface.page` / `surface.card` | 9.95 / 10.57 | 4.5 | ✅ |
| `status.error.fg` (red.800) | `surface.page` / `surface.card` | 11.01 / 11.69 | 4.5 | ✅ |
| `status.warning.fg` (amber.900) | `surface.page` / `surface.card` | 11.32 / 12.02 | 4.5 | ✅ |
| `status.info.fg` (azure.800) | `surface.page` / `surface.card` | 10.38 / 11.02 | 4.5 | ✅ |
| `highlight.on-accent` (ink.900) | `highlight.accent` (lime.500) | 14.70 | 4.5 | ✅ |
| `highlight.accent` (lime.500), icono activo | `surface.inverse` (ink.900) | 14.70 | 3 | ✅ |
| `surface.inverse` (ink.900), pastilla activa | `surface.card` (ink.100), barra | 17.19 | 3 | ✅ |

**Resultado: 29 de 29 pares en uso cumplen AA.**

### 11.2 Pares que NO cumplen (prohibidos)

| Par | Ratio | Por qué no se usa |
|---|---|---|
| Texto `ink.100` sobre `purple.500` (#6C63FF) | 4.02 ❌ | Es el morado del PDF. Por eso la acción usa `purple.600`. `brand.logo` nunca lleva texto. |
| Texto `ink.900` sobre `purple.500` | 4.28 ❌ | Ídem. |
| `ink.500` como texto sobre `surface.card` / `page` | 2.90 / 2.73 ❌ | `ink.500` no es un token de texto. |
| `lime.500` sobre `surface.card` / `page` | 1.17 / 1.10 ❌ | La lima nunca transmite información sobre fondo claro (§9). |
| `ink.600` sobre los acentos mint / sky / purple 300 | 3.90 / 3.79 / 3.26 ❌ | Sobre un acento solo va su `on-accent`. |
| `color.border.default` (ink.300) sobre `surface.card` | 1.22 ❌ (como límite de componente) | Válido solo como borde decorativo de tarjeta o separador. Para campos y controles se usa `border.input`. |
| Texto `ink.100` sobre `brand.primary.disabled` (purple.300) | 1.51 | Exento: elemento deshabilitado (WCAG 1.4.3). Se acompaña de `opacity.disabled`. |

---

## 12. Mapeo a Figma

Archivo de Figma: [Vuno Design System](https://www.figma.com/design/m05PZu0ab0numdST2ebXf2). Se generó desde `tokens/*.json` y contiene variables, estilos, iconos, 24 componentes y patrones. El Figma sigue al JSON: ningún valor se edita a mano en Figma sin cambiarlo antes en el JSON.

### 12.1 Conversión de nombres

Los puntos pasan a ser barras: `color.purple.500` → `color/purple/500`. Las tallas y los números se mantienen tal cual (`space/2xs`, `motion/duration/250`). Un token que además es grupo recibe una hoja `/default` (`color.brand.primary` → `color/brand/primary/default`, `input.border` → `input/border/default`).

### 12.2 Colecciones de variables

| Colección | Modos | Contenido | Variables |
|---|---|---|---|
| **Primitives** | `Base` | `color/*`, `space/*`, `radius/*`, `font/size/*`, `font/family/*`, `border/width/*`, `opacity/*`, `icon/size/*`, `motion/duration/*` | 124 (COLOR · NUMBER · STRING), ocultas de los selectores (`scopes: []`) |
| **Semantic** | `Light` (después se añade `Dark`) | `color/*`, `space/inset/*`, `space/gap/*`, `radius/*`, `opacity/*`, `motion/duration/*`, `size/touch/min`, `border/*/width` y `border/*/color` | 60, alias de Primitives |
| **Vertical** | `banking`, `save`, `invest`, `credit` | `color/vertical/accent`, `color/vertical/on-accent` | 2, alias de Semantic, distintos en cada modo |
| **Component** | `Default` | `button/*`, `action/*`, `chip/*`, `input/*`, `card/*`, `list/*`, `badge/*`, `avatar/*`, `balance/*`, `keypad/*`, `slider/*`, `segmented/*`, `slide-confirm/*`, `progress/*`, `switch/*`, `tabbar/*`, `confetti/*` | 118, alias de Semantic y de Vertical (`card/accent/*`, `badge/vertical/*`) |

- **Resolución por contexto:** el modo de la colección **Vertical** implementa la regla de `TOKEN-NAMING.md`. Un frame de Save se pone en modo `save` y todo `card/accent/*` dentro de él se resuelve solo.
- **Bordes:** los tokens DTCG de tipo `border` son compuestos; en Figma cada uno se divide en `…/width` (NUMBER) y `…/color` (COLOR).
- **Valores de cada tipo:** los NUMBER van en px sin unidad; `opacity` en NUMBER de 0 a 100, porque así lo enlaza Figma; las duraciones en ms (solo como referencia para Smart animate).
- **Scopes:** relleno para superficies y acentos, texto (y forma/trazo, porque también colorean iconos) para `color/text/*` y los `fg`, trazo para `color/border/*`, gap para `space/*`, radio para `radius/*`, ancho/alto para tamaños, opacidad para `opacity/*`. Nada usa `ALL_SCOPES`.
- **Sintaxis de código:** cada variable lleva el acceso real de React Native en Web, iOS y Android: `tokens['color.brand.primary']` (o `useVerticalColors().accent` para la colección Vertical).

### 12.3 Estilos de texto

Las dos familias están en Google Fonts y disponibles en Figma sin instalar nada. Cada estilo enlaza `font/family/*` y `font/size/*` como variables.

| Estilo de Figma | Fuente | Estilo | Tamaño | Alto de línea | Tracking |
|---|---|---|---|---|---|
| `role/balance` | Bricolage Grotesque | Bold | 52 | 56 px | −2% |
| `role/headline` | Bricolage Grotesque | Bold | 28 | 32 px | −1% |
| `role/title` | Plus Jakarta Sans | SemiBold | 20 | 28 px | 0% |
| `role/body` | Plus Jakarta Sans | Regular | 16 | 24 px | 0% |
| `role/label` | Plus Jakarta Sans | SemiBold | 14 | 20 px | 0% |
| `role/caption` | Plus Jakarta Sans | Medium | 12 | 16 px | 1% |

En Figma el tracking se escribe en %, y en React Native en px (§2.2).

### 12.4 Estilos de efecto

| Estilo de Figma | Drop shadow |
|---|---|
| `elevation/floating` | X 0 · Y 6 · Blur 20 · Spread 0 · `#141411` al 12% |
| `elevation/overlay` | X 0 · Y 12 · Blur 32 · Spread 0 · `#141411` al 18% |

La opacidad va dentro del efecto: enlazar el color a `color/ink/900` sustituiría el alfa por el 100%.

### 12.5 Movimiento en prototipos

| Token | Configuración en Figma |
|---|---|
| `motion.spring.soft` | Smart animate → Spring personalizado: Mass 1 · Stiffness 300 · Damping 22 |
| `motion.spring.bounce` | Smart animate → Spring personalizado: Mass 1 · Stiffness 340 · Damping 20 |
| `motion.easing.standard` | Custom bezier 0.2, 0, 0, 1 |
| `motion.easing.exit` | Custom bezier 0.4, 0, 1, 1 |
| `motion.duration.*` | Duración en ms del Smart animate (variables NUMBER solo como referencia) |

Los mismos parámetros funcionan en Reanimated: `withSpring({ mass, stiffness, damping })` y `Easing.bezier(...)`.

### 12.6 Iconos

- 60 componentes `Icon/<nombre>` con los SVG de Ionicons que usa la app, a 24 px.
- Cada icono es **una sola capa de relleno llamada `glyph`** (los trazos se convierten a contorno), enlazada a `color/text/primary`. Así el color que se aplica en un componente se conserva al cambiar de icono con la propiedad de swap.
- Outline y relleno son componentes distintos (`home-outline` / `home`); los componentes los exponen como propiedades de swap (por ejemplo `Icon (active)` / `Icon (inactive)` en el TabBar).
- Tamaños 16 / 24 / 32 escalando la instancia o enlazando ancho y alto a `icon/size/*`.

### 12.7 Componentes en Figma

- Una página por componente, agrupadas por familia con separadores (`↳ Actions`, `↳ Inputs`, `↳ Content`, `↳ Progress`, `↳ Navigation`, `↳ Brand & Moments`).
- Cada página documenta lo mismo que el Storybook: overview, anatomía numerada (partes → tokens), import, tabla de propiedades (propiedad de Figma ↔ prop de código), uso, accesibilidad, variantes rotuladas, plataformas, do's and don'ts, casos de uso, código, tokens, componentes relacionados y, al final, el componente principal.
- El encabezado de cada página lleva la etiqueta «View in Storybook ↗», enlazada a la página del mismo componente en el Storybook publicado (`https://vuno-storybook.vercel.app/?path=/docs/components-<nombre>--docs`).
- Todos los rellenos, trazos, paddings, gaps, radios y alturas están enlazados a variables; los textos usan los estilos `role/*`.
- Las diferencias de plataforma son una variante `Platform=iOS | Android` (TopBar, Toggle) o iconos de sistema (IconButton).
- Cada estado de Chip tiene su icono por defecto (checkmark, close, alert, information-circle-outline); para cambiarlo se hace swap de la capa `icon`.
- La página Patterns compone una pantalla Home completa solo con instancias.

### 12.8 Pantallas en Figma

- La página **Screens** tiene las 15 pantallas del prototipo en iOS (393 × 852 pt) y Android (412 × 915 dp), agrupadas por flujo: pestañas principales, detalle de meta, crear una meta de ahorro y mover dinero.
- Están hechas solo con instancias del DS, variables (color, espaciado, radios) y estilos `role/*`; cada sección fija el modo de la colección Vertical que usa en código (`VerticalProvider`).
- La versión Android cambia las variantes `Platform` (TopBar, Toggle), la flecha atrás y las barras de sistema.
- `System / Status bar` y `System / Home indicator` son chrome de dispositivo para maquetas, no componentes de Vuno.
- La página **Design Brief**, justo después de la portada, resume en inglés el brief: el reto, la plataforma de marca, el usuario de referencia, el 70/20/10, las cuatro verticales (cada tarjeta con su modo de la colección Vertical), los principios de UI, las decisiones clave y qué se toma de las referencias. Está hecha solo con variables y estilos `role/*`.
- La página **Wireframes** repite las 15 pantallas de iOS en baja fidelidad (líneas, círculos y bloques grises, sin contenido real ni tokens), con flechas entre pantallas y notas de decisiones, ideas y preguntas abiertas. Sirve para discutir el flujo, no como especificación visual.

### 12.9 Intercambio

- **Fuente única:** un JSON en formato DTCG (W3C Design Tokens).
- **A código:** Style Dictionary 5 genera el `tokens.ts` para React Native.
- **A Figma:** las variables se crearon desde el mismo JSON; para sincronizar cambios se puede usar Tokens Studio o regenerarlas.
- **Regla:** ningún valor se edita a mano en Figma sin cambiarlo antes en el JSON.

---

## 13. Pendientes del brief resueltos

| Pendiente | Resolución |
|---|---|
| Colores de vertical | Banking `ink.900` / Save `mint.300` / Invest `sky.300` / Credit `purple.300` (antes `coral.300`; se cambió para que Credit use la escala de marca), cada uno con su `on-accent` (§1.2). Signal Lime no es de ninguna vertical: es el 10%. |
| Colores de estado | Éxito `green`, error `red`, advertencia `amber`, info `azure`. Son familias propias, separadas de las de vertical (§1.2). |
| El 10% del 70/20/10 | Detalles inesperados y puntuales con lima, `spring.bounce` y formas círculo/pastilla, solo en hitos positivos (§9). |
| Grosor de iconos | Ionicons outline, 1.5 px a 24 px. Relleno en estado activo (§7). |
| Tamaño mínimo de toque | `size.touch.min` = 48, con 8 de separación entre áreas táctiles (§8, §3.3). |
| Familias tipográficas | Plus Jakarta Sans + Bricolage Grotesque (§2). |
| Movimiento, elevación, accesibilidad | §5, §6 y §8. |
| Herramientas | JSON DTCG → Style Dictionary 5 (`npm run tokens`); importable en Tokens Studio. Storybook nativo (`@storybook/react-native`) y web (`@storybook/react-native-web-vite`, build estático con `npm run build-storybook`). |
| Borde de campos de texto | `border.input` = 1 px `ink.600` (4.90:1 sobre `surface.card`), para cumplir WCAG 1.4.11. `border.default` queda solo para tarjetas y separadores decorativos. |

---

## 14. Plataformas: iOS y Android

Los valores de §1–§9 son los mismos en las dos plataformas (los tokens valen igual en pt y dp). Lo que resuelve el sistema operativo sigue su guía: Apple Human Interface Guidelines en iOS y Material 3 en Android. Documentación: Storybook → Foundations → Plataformas.

| Tema | iOS | Android | Regla de Vuno |
|---|---|---|---|
| Área táctil | 44 pt | 48 dp | `size.touch.min` = 48 cumple las dos. |
| Barras del sistema | Barra de estado + indicador de inicio | Barra de estado + navegación por gestos o 3 botones (de borde a borde) | Siempre `useSafeAreaInsets()`, nunca alturas fijas. |
| Volver | Chevron y gesto desde el borde | Flecha y Atrás del sistema | `TopBar` / `useSystemIcon('back')`. No se bloquea el Atrás del sistema. |
| Título | Centrado | Alineado al inicio (top app bar de 64 dp) | `TopBar`. |
| Feedback al tocar | Escala 0.96 + `motion.spring.soft` (§6) | Ripple con capa de estado: color del contenido al 10% | `Pressable`. |
| Interruptor | UISwitch nativo | Switch de Material 3 | `Toggle` con `switch.*`. |
| Iconos de sistema | Más horizontal, compartir de iOS | Más vertical, compartir de Material | `useSystemIcon('more' | 'share')`. |
| Modales | Hoja | Pantalla completa desde abajo | `presentation: 'modal'`. |
| Tipografía | Familias de marca | Familias de marca con `includeFontPadding: false` | Mismos roles (§2). |
| Lector de pantalla | VoiceOver | TalkBack | Mismos roles, etiquetas y estados; se prueba con los dos. |

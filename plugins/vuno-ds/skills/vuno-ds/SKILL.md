---
name: vuno-ds
description: Reglas y catálogo del Vuno Design System para diseñar e implementar interfaz de Vuno (React Native + Expo) solo con sus tokens y componentes. Úsala siempre que se cree o modifique una pantalla, un flujo o un componente de Vuno, se implemente un frame de Figma de Vuno, o se revise si un código respeta el design system.
---

# Vuno Design System

Vuno es un neobanco móvil (iOS y Android). Su design system vive en el repositorio `camila338/vuno` y su documentación visual está publicada en https://vuno-storybook.vercel.app. Esta skill hace que todo lo que se diseñe o implemente salga **solo del sistema**: sin colores, tamaños ni duraciones sueltos y sin componentes inventados.

## 0. Encuentra el DS en este proyecto

Hay dos casos. Identifica cuál es antes de nada y usa sus rutas en el resto de la skill.

| Caso | Cómo se reconoce | `<components>` | `<theme>` | `<docs>` |
|---|---|---|---|---|
| **Proyecto con el DS instalado** | Hay un `VUNO.md` fuera de `node_modules` (normalmente `src/vuno/VUNO.md`) | `<carpeta de VUNO.md>/components` | `<carpeta de VUNO.md>/theme` | `<carpeta de VUNO.md>/docs` |
| **El repositorio del DS** | `TOKEN-NAMING.md` y `src/components/index.ts` en la raíz | `src/components` | `src/theme` | la raíz del repo |

Si no hay ninguno de los dos, el DS no está instalado: propón ejecutar `/vuno-ds:setup` y para.

En un proyecto con el DS instalado, **`<components>` y `<theme>` no se editan**: se reemplazan al actualizar. Si hace falta cambiar el sistema (un token o un componente nuevo), dilo: ese cambio se hace en el repositorio del DS.

## 1. Fuentes de verdad

Léelas antes de decidir; no las resumas de memoria.

| Archivo | Qué decide |
|---|---|
| `<docs>/DESIGN-BRIEF.md` | Marca, producto, verticales y decisiones de producto |
| `<docs>/TOKEN-NAMING.md` | Cómo se llama cada token (tres capas: primitivo → semántico → componente) |
| `<docs>/FOUNDATIONS.md` | Valores y reglas de uso: color, tipografía, espaciado, movimiento, accesibilidad (§8), el 10% (§9), componentes (§10), Figma (§12) y plataformas (§14) |
| `<theme>/tokens.ts` | Todos los tokens con su valor: aquí se comprueba que un nombre existe |
| `<components>/index.ts` | Los componentes públicos y, en cada archivo, sus props. El catálogo resumido está en [components.md](components.md) |

## 2. Reglas que no se rompen

1. **No cambies valores de `FOUNDATIONS.md` ni inventes decisiones.** Si falta una decisión de diseño, pregunta.
2. **Solo tokens.** Todo color, espacio, radio, tipografía, sombra y duración sale de `tokens['…']` (`import { tokens } from '<ruta>/theme'`). Nada de hex, `rgba()`, números de espaciado ni milisegundos escritos a mano.
3. **Color y tipografía nunca son primitivos.** Usa semánticos (`color.text.primary`, `font.role.*` a través de `Text variant`) o de componente (`button.primary.bg`), nunca `color.purple.600` o `font.size.md`. En **espaciado y radio**, usa primero los semánticos (`space.inset.*`, `space.gap.*`, `radius.card`, `radius.pill`); para ajustes internos de layout se usa la escala (`space.2xs`–`space.3xl`, `radius.xs`–`radius.xl`), como en el resto del código.
4. **Solo componentes del sistema.** Construye con los de `<components>`. Si algo no existe, no lo dibujes a mano: propón un componente nuevo siguiendo `/vuno-ds:component`.
5. **La vertical es contexto.** Envuelve cada zona en `<VerticalProvider vertical="banking|save|invest|credit">` y toma sus colores con `useVerticalColors()`. Ningún token ni componente nombra una vertical.
6. **Una acción primaria por pantalla.** Un solo `Button kind="primary"`. `fullWidth` solo para la llamada a la acción principal de la pantalla.
7. **Plataformas.** Mismos componentes en iOS y Android; lo que difiere se resuelve con `useOS()` y `useSystemIcon()`. `TopBar`, `Toggle` y `Pressable` ya siguen Apple HIG y Material 3.
8. **Accesibilidad WCAG 2.2 AA.** Área táctil mínima 48 (`size.touch.min`). El color nunca va solo: los chips llevan icono y los errores, texto. Usa `Text` con su `variant` (`balance`, `headline`, `title`, `body`, `label`, `caption`) y `tabular` en montos. Cada control interactivo lleva `accessibilityLabel` o un `label` visible.
9. **El 10% (FOUNDATIONS §9).** Lima y confetti solo en logros que provoca la persona, uno por pantalla como máximo, nunca sobre saldos, errores ni pagos.
10. **Movimiento.** Duraciones y resortes de `motion.*`. Con Reducir movimiento, solo fundidos (`useReducedMotion`).
11. **Idioma.** La interfaz y Storybook en inglés. Los documentos `.md` del repo, en español.

### Así se usan los tokens en código

Los props de color, tamaño o duración reciben el **valor** del token, leído con su nombre completo. No existen atajos como `color="primary"`.

```tsx
import { StyleSheet } from 'react-native';
import { Card, Text } from '<components>';
import { tokens, useVerticalColors, VerticalProvider } from '<theme>';

// Text usa color.text.primary por defecto; otro color = el valor de otro token.
<Text variant="caption" color={tokens['color.text.secondary']}>Due Oct 15</Text>
<Text variant="headline" tabular>$1,240.00</Text>

// Estilos: solo tokens semánticos o de componente.
const styles = StyleSheet.create({
  content: { padding: tokens['space.inset.screen'], gap: tokens['space.gap.section'] },
});

// Color de la vertical: del contexto, nunca por nombre.
<VerticalProvider vertical="save">
  <Card tone="accent">…</Card>
</VerticalProvider>
const { accent, onAccent } = useVerticalColors();
```

## 3. Cómo trabajar

1. **Plan primero.** Antes de escribir código, entrega: pantallas o partes, qué componente usa cada una (con sus props), la vertical de cada zona, la ruta de la pantalla y lo que no se puede resolver con el sistema. Espera la confirmación si hay algo ambiguo.
2. **Construye con estos patrones de Vuno:**
   - **Pantalla de pestaña:** fondo `color.surface.page`, margen `space.inset.screen`, título con `Text variant="headline"` y, si la pantalla tiene acción principal, el `Button` primario junto al título o al pie.
   - **Paso de un flujo:** `TopBar` con `StepProgress` y `IconButton` para cerrar; «Step n of N» en `caption`; titular en `headline`; la acción principal al pie con `fullWidth`; en movimientos de dinero, `SlideToConfirm`.
   - **Detalle:** `TopBar` con `leading={{ kind: 'back', onPress }}`; el dato protagonista arriba (`Balance` o `ProgressRing`) y debajo secciones con `SectionHeader` y `List`.
   - Separa la lógica y los datos de ejemplo de la pantalla, siguiendo la estructura del proyecto.
   - En el repositorio del DS hay ejemplos completos: `src/app/(tabs)/save.tsx`, `src/features/goals/FlowScreen.tsx` y `src/app/goal/[id].tsx`.
3. **Verifica:**
   - El chequeo de tipos del proyecto (`npx tsc --noEmit` o su script) sin errores.
   - Ningún valor suelto en lo que tocaste: `grep -nE "#[0-9A-Fa-f]{3,8}\b|rgba?\(|(padding|margin|gap|borderRadius|fontSize|lineHeight)[A-Za-z]*: *[1-9]" <archivos>` no debe devolver nada (las excepciones documentadas en el CHANGELOG son medidas de plataforma).
   - En el repositorio del DS, si cambiaste un componente: su story y su página siguen al día.

## 4. Desde Figma

El plugin conecta el MCP de Figma (archivo [Vuno Design System](https://www.figma.com/design/m05PZu0ab0numdST2ebXf2)). Con un enlace con `node-id`:

- `get_design_context` y `get_variable_defs` del frame: cada instancia es el componente de `<components>` con las mismas props (`Kind` → `kind`, `State=Disabled` → `disabled`).
- Las variables de Figma son los tokens: `color/text/primary` en Figma es `tokens['color.text.primary']`. Cuando un token tiene estados, la base lleva `/default` en Figma: `color/brand/primary/default` es `tokens['color.brand.primary']`.
- El modo de la colección Vertical del frame es el `VerticalProvider`; la variante `Platform` es `useOS()`, no dos componentes.
- Termina comparando con `get_screenshot` del frame y lista las diferencias.
- Si el frame tiene algo que no es un componente del sistema, no lo inventes: pregunta.

## 5. Hacia Figma (cuando se pida)

Si la persona pide llevar a Figma un componente o una pantalla nuevos, trabaja con `use_figma` en el archivo `m05PZu0ab0numdST2ebXf2` y carga antes las skills `figma-use` y `figma-generate-library` (componente) o `figma-generate-design` (pantalla).

- **Componente:**
  - Página propia en su familia (`↳ Actions`, `↳ Inputs`, `↳ Content`…) con un frame `<Nombre> — Documentation`. Copia la estructura de una página existente: encabezado con etiquetas (`Available`, `iOS · Android`, `src/components/<Nombre>.tsx`, «View in Storybook ↗»), anatomía, propiedades, variantes, do's and don'ts y el componente principal.
  - Todo enlazado a variables existentes: cero colores ni medidas sueltos.
  - Las propiedades del componente en Figma se llaman como sus props en código.
- **Pantalla:**
  - En la página `Screens`, dentro de la sección del flujo que corresponda, en iOS y Android.
  - Solo instancias de los componentes y las variables del archivo.
- Verifica con una captura y cuenta los rellenos sin variable (deben ser 0).

## 6. Publicar (solo en el repositorio del DS)

Después de un cambio aprobado:

1. `npm run typecheck`.
2. Commit.
3. `npm run deploy-storybook` (documentación en https://vuno-storybook.vercel.app).
4. `npm run deploy-prototype` (app en https://vuno-prototype.vercel.app).
5. `git push`, para que los proyectos con el DS instalado lo reciban con `/vuno-ds:setup`.

Pide confirmación antes de publicar o hacer push: son enlaces públicos.

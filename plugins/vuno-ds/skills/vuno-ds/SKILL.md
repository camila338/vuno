---
name: vuno-ds
description: Reglas y catálogo del Vuno Design System para diseñar e implementar interfaz de Vuno (React Native + Expo) solo con sus tokens y componentes. Úsala siempre que se cree o modifique una pantalla, un flujo o un componente de Vuno, se implemente un frame de Figma de Vuno, o se revise si un código respeta el design system.
---

# Vuno Design System

Vuno es un neobanco móvil (iOS y Android). Su design system vive en este repositorio y está publicado en https://vuno-storybook.vercel.app. Esta skill hace que todo lo que se diseñe o implemente salga **solo del sistema**: sin colores, tamaños ni duraciones sueltos y sin componentes inventados.

## 0. Comprueba dónde estás

El plugin trabaja dentro de un clon del repositorio de Vuno. Antes de nada, confirma que existen `TOKEN-NAMING.md`, `FOUNDATIONS.md`, `tokens/` y `src/components/index.ts`. Si no están, díselo a la persona: necesita clonar el repo y abrir Claude Code en su carpeta.

## 1. Fuentes de verdad

Léelas antes de decidir; no las resumas de memoria.

| Archivo | Qué decide |
|---|---|
| `DESIGN-BRIEF.md` | Marca, producto, verticales y decisiones de producto |
| `TOKEN-NAMING.md` | Cómo se llama cada token (tres capas: primitivo → semántico → componente) |
| `FOUNDATIONS.md` | Valores y reglas de uso: color, tipografía, espaciado, movimiento, accesibilidad (§8), el 10% (§9), componentes (§10), Figma (§12) y plataformas (§14) |
| `tokens/*.json` | Los tokens en formato DTCG; `src/theme/tokens.ts` se genera con `npm run tokens` y nunca se edita a mano |
| `src/components/index.ts` | Los componentes públicos; el catálogo resumido está en [components.md](components.md) |
| `src/docs/Contributing.mdx` | Cómo se añade un token, una foundation o un componente |

## 2. Reglas que no se rompen

1. **No cambies valores de `FOUNDATIONS.md` ni inventes decisiones.** Si falta una decisión de diseño, pregunta.
2. **Solo tokens.** Todo color, espacio, radio, tipografía, sombra y duración sale de `tokens['…']` (`import { tokens } from '<ruta>/theme'`). Nada de hex, `rgba()`, números de espaciado ni milisegundos escritos a mano.
3. **La interfaz nunca usa primitivos.** Usa semánticos (`color.text.primary`, `space.inset.screen`) o de componente (`button.primary.bg`), nunca `color.purple.600` o `space.lg` directamente.
4. **Solo componentes del sistema.** Construye con los de `src/components`. Si algo no existe, no lo dibujes a mano: propón un componente nuevo siguiendo `/vuno-ds:component`.
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
import { Card, Text } from '../../components';
import { tokens, useVerticalColors, VerticalProvider } from '../../theme';

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

1. **Plan primero.** Antes de escribir código, entrega: pantallas o partes, qué componente usa cada una (con sus props), la vertical de cada zona, la ruta de Expo Router (`src/app/…`) y lo que no se puede resolver con el sistema. Espera la confirmación si hay algo ambiguo.
2. **Construye siguiendo las pantallas existentes como patrón:**
   - Pestaña: `src/app/(tabs)/save.tsx`.
   - Paso de un flujo modal: `src/features/goals/FlowScreen.tsx` y `src/app/goal/create/*.tsx`.
   - Detalle con `TopBar`: `src/app/goal/[id].tsx`.
   - La lógica y los datos de ejemplo van en `src/features/<dominio>/`.
3. **Verifica:**
   - `npm run typecheck` sin errores.
   - Ningún valor suelto en lo que tocaste: `grep -nE "#[0-9A-Fa-f]{3,8}\b|rgba?\(|(padding|margin|gap|borderRadius|fontSize|lineHeight)[A-Za-z]*: *[1-9]" <archivos>` no debe devolver nada (las excepciones documentadas en el CHANGELOG son medidas de plataforma).
   - Si cambiaste un componente: su story y su página en `src/components/` siguen al día.

## 4. Desde Figma

El plugin conecta el MCP de Figma (archivo [Vuno Design System](https://www.figma.com/design/m05PZu0ab0numdST2ebXf2)). Con un enlace con `node-id`:

- `get_design_context` y `get_variable_defs` del frame: cada instancia es el componente de `src/components` con las mismas props (`Kind` → `kind`, `State=Disabled` → `disabled`).
- Las variables de Figma son los tokens: `color/brand/primary` en Figma es `tokens['color.brand.primary']`.
- El modo de la colección Vertical del frame es el `VerticalProvider`; la variante `Platform` es `useOS()`, no dos componentes.
- Termina comparando con `get_screenshot` del frame y lista las diferencias.
- Si el frame tiene algo que no es un componente del sistema, no lo inventes: pregunta.

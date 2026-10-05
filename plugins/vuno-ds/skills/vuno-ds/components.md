# Catálogo de componentes

Resumen de `<components>/index.ts` (las rutas `<components>` y `<theme>` se explican en la sección 0 de la skill). Antes de usar un componente, lee su archivo: las props completas y sus comentarios están ahí. Cada uno tiene su página en https://vuno-storybook.vercel.app.

## Actions

| Componente | Props principales | Cuándo |
|---|---|---|
| `Button` | `label`, `onPress`, `kind` (`primary` · `secondary` · `tertiary`), `icon`, `iconPosition`, `fullWidth`, `disabled`, `loading` | `primary` solo para la acción principal, una por pantalla. Se ajusta a su contenido salvo con `fullWidth` |
| `IconButton` | `icon`, `label`, `onPress`, `disabled` | Acciones secundarias con icono; `label` es para el lector de pantalla |
| `ActionButton` | `icon`, `label`, `onPress` | Acciones rápidas bajo un saldo |
| `SlideToConfirm` | `label`, `onConfirm`, `disabled` | Confirmar movimientos de dinero sin un diálogo |

## Inputs

| Componente | Props principales | Cuándo |
|---|---|---|
| `TextField` | `label`, `error`, `size` (`default` · `large`), `footer` y las de `TextInput` | Texto libre; el error siempre con texto |
| `ChoiceChip` | `label`, `icon`, `selected`, `onPress` | Elegir una opción rápida |
| `Toggle` | `value`, `onValueChange`, `label`, `hint`, `disabled` | Activar o desactivar; UISwitch en iOS, Material 3 en Android |
| `Segmented` | `options`, `value`, `onChange` | Cambiar entre 2 o 3 vistas o modos |
| `StepSlider` | `min`, `max`, `value`, `onChange`, `label`, `valueText` | Elegir un valor en pasos |
| `Keypad` + `applyKey` | `onKey` | Montos: la cifra nunca queda tapada por el teclado del sistema |

## Content

| Componente | Props principales | Cuándo |
|---|---|---|
| `Text` | `variant` (`balance` · `headline` · `title` · `body` · `label` · `caption`), `color`, `tabular` | Todo texto. `tabular` en montos |
| `Card` | `tone` (`neutral` · `accent`), `padded` | `accent` toma el color de la vertical del contexto |
| `List` + `ListRow` | `title`, `detail`, `icon`, `iconTone`, `trailing`, `value`, `valueTone`, `onPress` | Filas de datos, ajustes o movimientos |
| `SectionHeader` | `title`, `detail`, `icon`, `trailing` | Encabezado de una sección |
| `Balance` | `amount`, `label` | El saldo principal, uno por pantalla |
| `Chip` | `label`, `status` (`success` · `error` · `warning` · `info` · `highlight`), `icon` | Estado; cada estado trae su icono. `highlight` es el 10% |
| `IconBadge` | `icon`, `tone` (`neutral` · `vertical`) | Icono en círculo |
| `Avatar` | `initials`, `label` | La persona |

## Progress

| Componente | Props principales | Cuándo |
|---|---|---|
| `ProgressBar` | `value` (0–1), `color`, `track`, `slim` | Avance lineal |
| `ProgressRing` | `value`, `color`, `track`, `children` | Avance de una meta como protagonista |
| `StepProgress` | `step`, `total` | Paso de un flujo, dentro de `TopBar` |

## Navigation

| Componente | Props principales | Cuándo |
|---|---|---|
| `TopBar` | `title`, `leading` (`{ kind: 'back' \| 'close', onPress }`), `trailing`, `children` | Barra superior; centra el título en iOS y lo alinea al inicio en Android |
| `TabBar` | `items`, `activeKey`, `onChange` | Navegación principal, de 2 a 5 pestañas |

## Brand & Moments

| Componente | Props principales | Cuándo |
|---|---|---|
| `Logo` | `size`, `wordmark`, `color` | Cabecera del Home |
| `Confetti` | `x`, `y`, `delay`, `count` | Solo en el momento del 10% |

## Base y contexto

- `Pressable`: base de todo lo pulsable (escala en iOS, ripple en Android, háptico).
- `money`, `moneySpoken` e `IconName`: desde `<components>`.
- `tokens`, `VerticalProvider`, `useVerticalColors`, `PlatformProvider`, `useOS`, `useSystemIcon` y `FontGate`: desde `<theme>`.

# Vuno

Neobanco móvil (iOS y Android) de Hibrids. Este repo contiene el sistema de diseño de Vuno (documentos de decisión, tokens, componentes y el Storybook nativo y web) y un prototipo de la app construido solo con ese sistema.

## Documentos

- `DESIGN-BRIEF.md`: decisiones de marca y producto.
- `TOKEN-NAMING.md`: convención de nombres de tokens.
- `FOUNDATIONS.md`: valores, reglas de uso, contraste AA, plataformas y mapeo a Figma.
- `CHANGELOG.md`: cambios por versión (en inglés, porque se muestra en el Storybook).
- Storybook web publicado: [vuno-storybook.vercel.app](https://vuno-storybook.vercel.app), con la documentación de foundations, componentes y patrones.
- Figma: [Vuno Design System](https://www.figma.com/design/m05PZu0ab0numdST2ebXf2), con variables, estilos, iconos, una página documentada por componente, patrones y las 15 pantallas del prototipo en iOS y Android, todo conectado al DS (`FOUNDATIONS.md` §12).

Los documentos de decisión están en español. El Storybook y la interfaz de la app están en inglés.

## Plugin de Claude Code

`plugins/vuno-ds` es un plugin para diseñar e implementar con el sistema desde Claude Code: una skill con las reglas y el catálogo, los comandos `/vuno-ds:screen`, `/vuno-ds:component` y `/vuno-ds:audit`, un agente revisor y la conexión al MCP de Figma. Para instalarlo, dentro de Claude Code en la raíz del repo:

```
/plugin marketplace add ./
/plugin install vuno-ds@vuno
```

Detalle y ejemplos en `plugins/vuno-ds/README.md`.

## Stack

Expo SDK 57 (React Native 0.86, Expo Router), Reanimated 4, Storybook 10 (`@storybook/react-native` en dispositivo y `@storybook/react-native-web-vite` en web) y Style Dictionary 5.

## Tokens

La fuente de verdad son los JSON en formato DTCG de `tokens/`, en tres capas: `primitives.json`, `semantic.light.json` y `component.json`. El script `npm run tokens` genera `src/theme/tokens.ts`, un mapa con los nombres exactos de `TOKEN-NAMING.md`, y `tokens.meta.ts`, que alimenta las tablas del Storybook:

```ts
import { tokens } from './src/theme';

tokens['color.brand.primary']; // '#5347D3'
tokens['font.role.balance'];   // { fontFamily: 'BricolageGrotesque_700Bold', fontSize: 52, ... }
```

Los archivos generados no se editan a mano: se cambia el JSON y se vuelve a generar.

## Componentes y plataformas

Los 24 componentes viven en `src/components/` y se importan desde `src/components/index.ts`. Siguen las convenciones de cada plataforma (Apple HIG en iOS, Material 3 en Android) con `useOS()`, `PlatformProvider` y `useSystemIcon()` de `src/theme/platform.tsx`. Detalle en `FOUNDATIONS.md` §14.

## App

Expo Router, con las rutas en `src/app/`:

| Ruta | Pantalla |
|---|---|
| `/` (pestaña Home) | Saldo de débito, acciones rápidas, tarjeta de débito, crédito, ahorros, actividad y gastos |
| `/cards` | Tarjeta de débito (congelar) y tarjeta de crédito |
| `/save` | Vuno Save · metas y botón "Create goal" junto al título |
| `/goal/create` | Flujo "Create a saving goal" (modal): para qué → cuánto → plan → automatiza → meta creada |
| `/goal/[id]` | Detalle de una meta |
| `/move/[type]` | Transferir, retirar o añadir dinero (modal) |

La lógica vive en `src/features/` y todo se construye con los componentes de `src/components/` y los tokens de `src/theme/`.

## Scripts

| Script | Qué hace |
|---|---|
| `npm start` | Arranca la app. |
| `npm run ios` / `npm run android` | Arranca la app en el simulador o emulador. |
| `npm run storybook:native` | Arranca la app directamente en el Storybook nativo. |
| `npm run storybook:ios` / `storybook:android` | Lo mismo, abriendo el simulador o emulador. |
| `npm run storybook:generate` | Regenera la lista de stories del Storybook nativo. |
| `npm run storybook:web` | Storybook web en `http://localhost:6006`. |
| `npm run build-storybook` | Build estático del Storybook web en `storybook-static/`, para publicar. |
| `npm run deploy-storybook` | Hace el build y lo publica en Vercel (proyecto `vuno-storybook` del equipo Cafe_bumbul). Requiere `npx vercel login` la primera vez. |
| `npm run tokens` | Regenera `src/theme/tokens.ts` y `tokens.meta.ts` desde `tokens/`. |
| `npm run typecheck` | Comprueba los tipos con TypeScript. |

Las stories viven junto a su componente en `src/components/*.stories.tsx` y las dos versiones de Storybook las comparten. Las páginas de documentación (MDX) solo existen en el Storybook web.

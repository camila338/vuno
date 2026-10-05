# vuno-ds · plugin de Claude Code

Plugin para diseñar e implementar pantallas de Vuno con Claude Code usando solo el Vuno Design System: sus tokens, sus componentes y sus reglas.

## Qué incluye

| Pieza | Qué hace |
|---|---|
| `/vuno-ds:setup [destino]` | Instala o actualiza el DS en el proyecto Expo actual: copia componentes, tema y documentos de decisión en `src/vuno/`, instala las dependencias y configura la raíz de la app |
| Skill `vuno-ds` | Reglas del sistema, fuentes de verdad, catálogo de componentes y cómo trabajar desde Figma. Claude la carga sola cuando se trabaja en interfaz de Vuno |
| `/vuno-ds:screen <pedido o enlace de Figma>` | Planifica e implementa una pantalla o un flujo, primero el plan y después el código |
| `/vuno-ds:component <nombre y para qué>` | Propone un componente nuevo; en el repositorio del DS, además lo crea con tokens, story y página de documentación |
| `/vuno-ds:audit [ruta]` | Revisa si el código respeta el sistema y propone correcciones |
| Agente `ds-reviewer` | El revisor que usa la auditoría; también se puede pedir directamente |
| MCP de Figma | Conexión a `https://mcp.figma.com/mcp` para leer el archivo [Vuno Design System](https://www.figma.com/design/m05PZu0ab0numdST2ebXf2) |

## Instalación

Requisitos: [Claude Code](https://claude.com/claude-code), Node.js, un proyecto Expo y acceso al repositorio privado `camila338/vuno` con una sesión de GitHub (`gh auth login`).

**1. Instala el plugin** (una vez por máquina). Dentro de Claude Code, en cualquier carpeta:

```
/plugin marketplace add camila338/vuno
/plugin install vuno-ds@vuno
```

Reinicia Claude Code. La primera vez que se use Figma, ejecuta `/mcp` y autentícate en el servidor `figma`.

**2. Instala el DS en tu proyecto.** Abre Claude Code en la raíz de tu app Expo y ejecuta:

```
/vuno-ds:setup
```

Queda en `src/vuno/` (o `vuno/` si el proyecto no tiene `src/`):

| Carpeta | Contenido |
|---|---|
| `components/` | Los 24 componentes |
| `theme/` | Tokens, contexto de vertical y plataforma, y fuentes |
| `docs/` | Decisiones, CHANGELOG y tokens fuente |
| `VUNO.md` | Versión instalada |

Esa carpeta no se edita a mano: para traer una versión nueva del sistema, vuelve a ejecutar `/vuno-ds:setup`.

**3. Diseña e implementa:**

```
/vuno-ds:screen Una pantalla de detalle de transacción con el comercio, el monto, la fecha y una acción para reportar un problema
/vuno-ds:screen https://www.figma.com/design/m05PZu0ab0numdST2ebXf2/...?node-id=...
/vuno-ds:audit
```

## Cómo se mantiene

El DS se cambia solo en este repositorio (tokens, componentes y documentos). Al hacer push a `main`, los proyectos lo reciben con `/vuno-ds:setup`. El instalador acepta `VUNO_REF` para fijar una rama o un tag.

## Referencias

- Storybook: https://vuno-storybook.vercel.app
- Decisiones: `DESIGN-BRIEF.md`, `TOKEN-NAMING.md` y `FOUNDATIONS.md` en la raíz del repo

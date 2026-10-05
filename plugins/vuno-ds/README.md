# vuno-ds · plugin de Claude Code

Plugin para diseñar e implementar pantallas de Vuno con Claude Code usando solo el Vuno Design System: sus tokens, sus componentes y sus reglas.

## Qué incluye

| Pieza | Qué hace |
|---|---|
| Skill `vuno-ds` | Reglas del sistema, fuentes de verdad, catálogo de componentes y cómo trabajar desde Figma. Claude la carga sola cuando se trabaja en interfaz de Vuno |
| `/vuno-ds:screen <pedido o enlace de Figma>` | Planifica e implementa una pantalla o un flujo, primero el plan y después el código |
| `/vuno-ds:component <nombre y para qué>` | Propone y crea un componente nuevo con tokens, story y página de documentación |
| `/vuno-ds:audit [ruta]` | Revisa si el código respeta el sistema y propone correcciones |
| Agente `ds-reviewer` | El revisor que usa la auditoría; también se puede pedir directamente |
| MCP de Figma | Conexión a `https://mcp.figma.com/mcp` para leer el archivo [Vuno Design System](https://www.figma.com/design/m05PZu0ab0numdST2ebXf2) |

## Instalación

Requisitos: [Claude Code](https://claude.com/claude-code), Node.js y un clon de este repositorio. El plugin trabaja dentro del repo, porque ahí viven los tokens y los componentes.

```bash
git clone <url-del-repo> vuno && cd vuno
npm install
claude
```

Dentro de Claude Code:

```
/plugin marketplace add ./
/plugin install vuno-ds@vuno
```

Reinicia Claude Code. La primera vez que se use Figma, ejecuta `/mcp` y autentícate en el servidor `figma` con tu cuenta.

Cuando el repositorio esté en GitHub, también se puede instalar sin clonarlo antes: `/plugin marketplace add <owner>/<repo>`.

## Ejemplos

```
/vuno-ds:screen Una pantalla de detalle de transacción con el comercio, el monto, la fecha y una acción para reportar un problema
/vuno-ds:screen https://www.figma.com/design/m05PZu0ab0numdST2ebXf2/...?node-id=...
/vuno-ds:component Un banner para avisos importantes con icono, texto y una acción opcional
/vuno-ds:audit src/app/(tabs)/cards.tsx
```

## Referencias

- Storybook: https://vuno-storybook.vercel.app
- Decisiones: `DESIGN-BRIEF.md`, `TOKEN-NAMING.md` y `FOUNDATIONS.md` en la raíz del repo

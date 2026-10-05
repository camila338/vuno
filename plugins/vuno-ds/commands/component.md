---
description: Propone y crea un componente nuevo del Vuno Design System, con tokens, story y página de documentación
argument-hint: <nombre y para qué sirve>
---

# Nuevo componente del Vuno Design System

Pedido: $ARGUMENTS

Usa la skill `vuno-ds` y sigue `src/docs/Contributing.mdx` («Add a component»).

1. **¿Hace falta?** Revisa `src/components/index.ts` y [components.md](../skills/vuno-ds/components.md). Si un componente existente o una variante lo resuelve, dilo y para.
2. **Propuesta, sin código todavía:**
   - nombre y familia (Actions, Inputs, Content, Progress, Navigation, Brand & Moments);
   - props, con sus nombres en código y en Figma;
   - variantes y estados;
   - tokens de componente nuevos, cada uno apuntando a un semántico existente;
   - accesibilidad;
   - qué cambia entre iOS y Android.

   Ningún token nombra una vertical. Si hace falta un valor o un semántico que no existe en `FOUNDATIONS.md`, pregunta: no lo inventes. Espera la aprobación.
3. **Implementa en este orden:**
   1. Tokens en `tokens/component.json` y `npm run tokens`.
   2. `src/components/Name.tsx` con `Text` y `Pressable` del sistema.
   3. Exportarlo en `src/components/index.ts`.
   4. `Name.stories.tsx` (`Components/Name`): `Overview` y una story por variante, con contenido genérico.
   5. `Name.mdx`, con la estructura de las demás páginas.
   6. Su tarjeta en el catálogo de Components.
   7. La entrada en `CHANGELOG.md`, en inglés.
4. **Verifica:** `npm run typecheck`, ningún valor suelto y AA en cada par de texto y fondo nuevo (añádelo a `src/docs/contrast.ts`).

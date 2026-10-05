---
description: Instala o actualiza el Vuno Design System en el proyecto Expo actual y deja la app lista para usarlo
argument-hint: "[carpeta de destino; por defecto src/vuno]"
---

# Instalar el Vuno Design System

Destino pedido: $ARGUMENTS

1. **Comprueba el proyecto.**
   - Si el proyecto actual **es** el repositorio del DS (tiene `TOKEN-NAMING.md` y `src/components/index.ts` en la raíz), no instales nada: dilo y para.
   - Si ya existe un `VUNO.md` en el proyecto (fuera de `node_modules`), es una actualización: usa esa carpeta como destino. Si `git status` muestra cambios locales dentro de ella, avisa de que se perderán y pide confirmación antes de seguir.
2. **Instala.** Desde la raíz del proyecto, ejecuta:

   ```bash
   bash "${CLAUDE_PLUGIN_ROOT}/scripts/install-ds.sh" $ARGUMENTS
   ```

   El script trae el DS desde GitHub (repositorio privado: hace falta `gh auth login` o acceso por git), copia `components/`, `theme/` y `docs/` en el destino, escribe `VUNO.md` e instala las dependencias con `npx expo install`. Si falla por acceso al repositorio, explícale a la persona que necesita acceso a `camila338/vuno` y una sesión de GitHub.
3. **Configura la raíz de la app** (solo la primera vez; revisa si ya está hecho):
   - Con Expo Router, en `app/_layout.tsx` (o `src/app/_layout.tsx`). Sin Expo Router, en `App.tsx`.
   - Envuelve la app en `GestureHandlerRootView` (`style={{ flex: 1 }}`) y dentro en `FontGate` (desde `<destino>/theme`), que espera a que carguen las fuentes del sistema.
   - Sin Expo Router, añade también `SafeAreaProvider`.
   - Fondo de las pantallas: `tokens['color.surface.page']` (en Expo Router, `contentStyle` del `Stack`). Si hay `StatusBar`, `style="dark"`.
   - No toques nada más de la navegación existente.
4. **Deja el contexto para próximas sesiones.** Añade al `CLAUDE.md` del proyecto (créalo si no existe) una sección corta:
   - la interfaz usa el Vuno Design System instalado en `<destino>`;
   - se construye solo con sus componentes y tokens (skill `vuno-ds`);
   - `<destino>` no se edita a mano y se actualiza con `/vuno-ds:setup`.
5. **Verifica.**
   - `npx tsc --noEmit` sin errores nuevos.
   - Una pantalla mínima que importe `Button` y `Text` desde el destino compila.
6. **Resume:** versión instalada (de `VUNO.md`), archivos tocados y los siguientes pasos (`/vuno-ds:screen …`).

---
description: Diseña e implementa una pantalla o un flujo de Vuno solo con el design system, desde una descripción o un enlace de Figma
argument-hint: <qué pantalla o flujo, o un enlace de Figma con node-id>
---

# Nueva pantalla con el Vuno Design System

Pedido: $ARGUMENTS

Usa la skill `vuno-ds` y sigue sus reglas sin excepción.

1. **Contexto.** Lee `DESIGN-BRIEF.md`, `FOUNDATIONS.md` (§8 accesibilidad, §9 el 10%, §10 componentes y §14 plataformas), `src/components/index.ts` y la pantalla existente más parecida.
   - Si el pedido es un enlace de Figma, lee el frame con `get_design_context`, `get_variable_defs` y `get_screenshot`.
   - Si es una descripción, diséñala tú con los componentes del sistema y los principios del brief: una acción clara por pantalla, jerarquía antes que decoración, color con significado.
2. **Plan, sin código todavía.** Entrega:
   - la ruta de Expo Router y cómo se llega a la pantalla;
   - las secciones de arriba abajo, cada una con su componente, sus props y su vertical;
   - la acción primaria (una sola);
   - qué cambia entre iOS y Android;
   - el copy en inglés;
   - lo que el sistema no resuelve.

   Si algo es ambiguo o falta una decisión de diseño, pregunta y espera.
3. **Implementa.** Pantalla en `src/app/…`; lógica y datos de ejemplo en `src/features/<dominio>/`. Solo componentes de `src/components` y tokens de `src/theme`.
4. **Verifica** con los pasos de la sección 3 de la skill. Si vino de Figma, compara con `get_screenshot` y lista las diferencias.
5. **Cierra con un resumen:** archivos creados, componentes usados, decisiones de diseño con su porqué y lo que quedó pendiente.

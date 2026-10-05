---
description: Audita si una pantalla, carpeta o cambio respeta el Vuno Design System y propone las correcciones
argument-hint: "[ruta o archivos; por defecto, los cambios sin commit]"
---

# Auditoría del Vuno Design System

Alcance: $ARGUMENTS

Si no hay alcance, usa los archivos cambiados según `git status` y `git diff`.

Lanza el agente `ds-reviewer` sobre ese alcance. Después:

1. Muestra sus hallazgos en una tabla: archivo:línea → regla → corrección propuesta.
2. Pregunta si aplicar las correcciones. Si la respuesta es sí, aplícalas y vuelve a correr `npm run typecheck` y el chequeo de valores sueltos de la skill `vuno-ds`.

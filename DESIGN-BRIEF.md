# DESIGN-BRIEF — Sistema de diseño de Vuno

> Documento de decisiones. Fuente: entrevista con la persona dueña del proyecto, sobre el borrador `brief/Vuno_Brand_Brief.pdf` (hecho con otra herramienta de IA; punto de partida, no decisión final) y las imágenes de `references/`.
> **No contiene valores finales** (hex, tamaños, duraciones). Esos se definen después.

## 1. Marca y producto

- **Hibrids es la empresa, Vuno es el producto.**
- Vuno es un **neobanco** digital de EE. UU., mobile (iOS y Android).
- Es una **prueba de diseño**: no hay Figma. Todo se define en documentos y se ve en **Storybook**.
- Las referencias son **solo visuales, de UI**; no definen el tipo de producto.
- **El sistema no incluye ilustración, mascotas ni objetos 3D.**

## 2. Decisiones

| Tema | Decisión (en palabras del usuario) | Qué implica |
|---|---|---|
| Personalidad | "Como el PDF: 70% sobrio, 20% juego" | Confianza adulta. El 20% de "juego" vive únicamente en el color de acento, la tipografía display y el movimiento con rebote suave; la interfaz se mantiene calmada. |
| Tipografía | "Sans para UI + display para titulares y saldos" | Dos familias: una sans legible para interfaz y una display con carácter para titulares y cifras de saldo. |
| Color de marca | "Morado de marca" para el botón primario | El morado es marca y acción primaria. |
| Color de estado | "Estados con su propio color, aparte" | Éxito, error, advertencia e info son semánticos fijos. Los colores de vertical solo identifican la vertical. |
| Radios | "Redondeado medio" | Radios moderados en tarjetas y campos; botones en pastilla. |
| Densidad | "Equilibrada" | Aire en inicio y marca; listas más compactas en transacciones y detalle. |
| Iconos | "Trazo (outline) con relleno en activo" | Línea por defecto; versión rellena para el estado seleccionado. |
| Movimiento | "Con rebote suave" | Resortes ligeros en botones, tarjetas y momentos de logro. Siguen siendo transiciones cortas y con propósito. |
| Dark mode | "Solo claro por ahora" | Los tokens se preparan para añadir oscuro después sin renombrar nada. |
| Plataformas | "Misma marca, convenciones nativas en lo crítico" | Mismos tokens y componentes; navegación, hojas y selectores siguen a cada plataforma. |
| Stack | "React Native (Storybook nativo)" | Componentes reales de app móvil, probados en simulador o dispositivo. |
| Storybook | Versión nativa y versión web para compartir | El Storybook tendrá una versión nativa y una versión web que se pueda compartir. |
| Nombres de tokens | "A: tres capas (primitivo, semántico, componente)" | Ver `TOKEN-NAMING.md`. |

## 3. Qué se toma de las referencias (solo estilo de UI)

Se adopta:
- Fondos cálidos o pasteles suaves en lugar de blanco o negro puro.
- Barra de navegación inferior flotante con pastilla en el elemento activo.
- Chips pequeños para estado y montos (por ejemplo, un aviso de ingreso pendiente).
- Botones circulares para acciones secundarias (atrás, más).
- Jerarquía fuerte: titulares y cifras grandes.
- Tarjetas por color de categoría, aplicadas a las verticales.

No se adopta:
- Ilustración, mascotas y objetos 3D: el sistema no incluye ninguno, aunque aparecen en las referencias.
- El nivel de juego de las referencias de educación y viajes, que es mayor que el 70/20/10 elegido.

## 4. Contradicciones del PDF y cómo se resolvieron

| Contradicción | Resolución |
|---|---|
| El PDF dice Vuno, el proyecto dice Hibrids | Hibrids es la empresa, Vuno el producto. |
| Referencias de educación y viajes frente a un neobanco | El producto es un neobanco; las referencias son solo visuales. |
| El PDF propone "ilustración editorial ocasional" y evita mascotas y monedas; las referencias usan mascotas y objetos 3D | El sistema no incluye ilustración, mascotas ni objetos 3D. |
| El PDF sugiere Inter o Geist, las referencias usan tipos display | Sans para UI más una display para titulares y saldos. |
| El PDF usa Mint y Coral como color de vertical y como color de estado | Los estados tienen su propio color, separado del de vertical. |

## 5. Verticales

Banking, Save, Invest y Credit comparten sistema, con un acento de color por vertical. El PDF propone una asignación cromática por vertical; esa asignación está **por confirmar** (ver pendientes).

## 6. Pendiente por decidir

- Qué es el 10% restante del 70/20/10. El 70% es sobrio y el 20% es "juego" (color de acento, tipografía display y movimiento con rebote suave); el 10% no está definido.
- Cómo se genera y se publica la versión web del Storybook para compartir.
- Paleta final y escalas de neutros (sin hex todavía).
- Familias tipográficas concretas (sans de UI y display).
- Asignación de color por vertical y qué hacer con Signal Lime, que en el PDF no tiene vertical.
- Colores semánticos de error y advertencia, que el PDF no define.
- Grosor y librería de iconos.
- Curvas y duraciones del movimiento.
- Accesibilidad: criterios de contraste y tamaños mínimos de toque.
- Elevación y sombras.
- Herramienta para generar los tokens para React Native.
- Si el PDF se actualiza o se reemplaza por este documento como fuente de verdad.

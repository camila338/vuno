# DESIGN-BRIEF — Sistema de diseño de Vuno

> Documento de decisiones. Fuente: entrevista con la persona dueña del proyecto, sobre el borrador `brief/Vuno_Brand_Brief.pdf` (hecho con otra herramienta de IA; punto de partida, no decisión final) y las imágenes de `references/`.
> **No contiene valores finales** (hex, tamaños, duraciones): están en `FOUNDATIONS.md`.

## 1. Marca y producto

- **Hibrids es la empresa, Vuno es el producto.**
- Vuno es un **neobanco** digital de EE. UU., mobile (iOS y Android).
- Es una **prueba de diseño**: no hay archivo de Figma. Todo se define en documentos y se ve en **Storybook**, que tendrá una **versión nativa** (simulador o dispositivo) y una **versión web para compartir**. Los tokens están preparados para llevarse a Figma (`FOUNDATIONS.md` §12).
- Las referencias son **solo visuales, de UI**; no definen el tipo de producto.

## 2. Decisiones

| Tema | Decisión (en palabras del usuario) | Qué implica |
|---|---|---|
| Personalidad | "Como el PDF: 70% sobrio, 20% juego" | Confianza adulta. El 20% de "juego" vive únicamente en el color de acento, la tipografía display y el movimiento con rebote suave; la interfaz se mantiene calmada. |
| El 10% "unexpected" | "Detalles distintivos e inesperados que aporten personalidad, sin afectar la claridad ni la confianza" | Una parte pequeña de la identidad reservada para detalles distintivos e inesperados que aporten personalidad, sin afectar la claridad ni la confianza. Se expresa con acentos lima muy puntuales, microinteracciones, formas abstractas y pequeños momentos de sorpresa. No significa llenar la interfaz de elementos llamativos. Reglas en `FOUNDATIONS.md` §9. |
| Foundations | "Me gusta la B" | Opción B · Tech suave: neutros casi grises con un toque cálido, morado del PDF, Plus Jakarta Sans + Bricolage Grotesque, tarjetas planas con borde. Valores en `FOUNDATIONS.md`. |
| Tipografía | "Sans para UI + display para titulares y saldos" | Dos familias: una sans legible para interfaz y una display con carácter para titulares y cifras de saldo. |
| Color de marca | "Morado de marca" para el botón primario | El morado es marca y acción primaria. |
| Color de estado | "Estados con su propio color, aparte" | Éxito, error, advertencia e info son semánticos fijos. Los colores de vertical solo identifican la vertical. |
| Radios | "Redondeado medio" | Radios moderados en tarjetas y campos; botones en pastilla. |
| Densidad | "Equilibrada" | Aire en inicio y marca; listas más compactas en transacciones y detalle. |
| Iconos | "Trazo (outline) con relleno en activo" | Línea por defecto; versión rellena para el estado seleccionado. |
| Movimiento | "Con rebote suave" | Resortes ligeros en botones, tarjetas y momentos de logro. Siguen siendo transiciones cortas y con propósito. |
| Dark mode | "Solo claro por ahora" | Los tokens se preparan para añadir oscuro después sin renombrar nada. |
| Plataformas | "Misma marca, convenciones nativas en lo crítico" | Mismos tokens y componentes; navegación, hojas y selectores siguen a cada plataforma. |
| Stack | "React Native (Storybook nativo)" | Componentes reales de app móvil, probados en simulador o dispositivo con el Storybook nativo. |
| Storybook | Versión nativa y versión web para compartir | El Storybook tendrá dos versiones con las mismas stories: una nativa, para probar en simulador o dispositivo, y una web, para compartir con un enlace. |
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
- El nivel de juego de las referencias de educación y viajes, que es mayor que el 70/20/10 elegido.

## 4. Contradicciones del PDF y cómo se resolvieron

| Contradicción | Resolución |
|---|---|
| El PDF dice Vuno, el proyecto dice Hibrids | Hibrids es la empresa, Vuno el producto. |
| Referencias de educación y viajes frente a un neobanco | El producto es un neobanco; las referencias son solo visuales. |
| El PDF sugiere Inter o Geist, las referencias usan tipos display | Sans para UI más una display para titulares y saldos. |
| El PDF usa Mint y Coral como color de vertical y como color de estado | Los estados tienen su propio color, separado del de vertical. |

## 5. Verticales

Banking, Save, Invest y Credit comparten sistema, con un acento de color por vertical:

- **Banking**: tinta oscura.
- **Save**: mint.
- **Invest**: sky.
- **Credit**: coral.

Signal Lime no es de ninguna vertical: es el color del 10%. Valores en `FOUNDATIONS.md` §1.

## 6. Pendientes resueltos

Todos los pendientes se resolvieron con la opción B. Los valores están en `FOUNDATIONS.md`.

| Pendiente | Resolución |
|---|---|
| Qué es el 10% del 70/20/10 | Detalles inesperados y puntuales (ver §2). Reglas en §9 de `FOUNDATIONS.md`. |
| Versión web del Storybook | Versión nativa con `@storybook/react-native` y versión web para compartir con `@storybook/react-native-web-vite`, con build estático publicado en Vercel. |
| Paleta final y neutros | Familias `ink`, `purple`, `mint`, `sky`, `coral`, `lime`, `green`, `red`, `amber` y `azure`, en pasos 100–900. |
| Familias tipográficas | Plus Jakarta Sans (UI) + Bricolage Grotesque (display). |
| Color por vertical y Signal Lime | Ver §5: lima = 10%. |
| Error y advertencia | Familias propias `red` y `amber`, separadas de `coral`. |
| Iconos | Ionicons: outline por defecto, relleno en activo. |
| Movimiento | Resortes `soft` y `bounce`; duraciones de 100, 150, 250 y 400 ms. |
| Accesibilidad | WCAG 2.2 AA y área táctil mínima de 48. |
| Elevación | Tarjetas planas con borde; sombra solo en elementos flotantes y overlays. |
| Herramienta de tokens | JSON en formato DTCG + Style Dictionary v4. |
| ¿PDF o este documento? | `DESIGN-BRIEF.md`, `TOKEN-NAMING.md` y `FOUNDATIONS.md` son la fuente de verdad. El PDF queda como antecedente. |

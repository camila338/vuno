#!/usr/bin/env bash
# Instala o actualiza el Vuno Design System en el proyecto Expo actual.
# Uso: install-ds.sh [destino]   (por defecto src/vuno, o vuno/ si el proyecto no tiene src/)
# Variables opcionales: VUNO_REPO (owner/repo, por defecto camila338/vuno), VUNO_REF (rama o tag, por defecto main),
# VUNO_SKIP_DEPS=1 para no instalar dependencias.
set -euo pipefail

REPO="${VUNO_REPO:-camila338/vuno}"
REF="${VUNO_REF:-main}"

fail() { echo "Error: $*" >&2; exit 1; }

[ -f package.json ] || fail "ejecútalo desde la raíz del proyecto (no hay package.json)."
node -e "const p=require('./package.json');process.exit((p.dependencies||{}).expo?0:1)" \
  || fail "este proyecto no usa Expo. El DS necesita Expo (en React Native sin Expo, instala antes los módulos con 'npx install-expo-modules')."

DEST="${1:-}"
if [ -z "$DEST" ]; then
  if [ -d src ]; then DEST=src/vuno; else DEST=vuno; fi
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# El repo es privado: gh usa la sesión de GitHub; si no, git usa las credenciales configuradas.
if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  gh repo clone "$REPO" "$TMP/ds" -- --depth 1 --branch "$REF" --quiet
else
  git clone --quiet --depth 1 --branch "$REF" "https://github.com/$REPO.git" "$TMP/ds"
fi
SRC="$TMP/ds"

# Componentes y tema sin stories, páginas de docs ni el marco de dispositivo del prototipo web.
mkdir -p "$DEST"
rm -rf "$DEST/components" "$DEST/theme" "$DEST/docs"
rsync -a --exclude '*.stories.tsx' --exclude '*.mdx' --exclude 'DeviceFrame*' "$SRC/src/components/" "$DEST/components/"
rsync -a --exclude 'tokens.meta.ts' "$SRC/src/theme/" "$DEST/theme/"

# Documentos de decisión y tokens fuente, para consulta.
mkdir -p "$DEST/docs/tokens"
cp "$SRC/DESIGN-BRIEF.md" "$SRC/TOKEN-NAMING.md" "$SRC/FOUNDATIONS.md" "$SRC/CHANGELOG.md" "$DEST/docs/"
cp "$SRC"/tokens/*.json "$DEST/docs/tokens/"

VERSION="$(node -p "require('$SRC/package.json').version")"
COMMIT="$(git -C "$SRC" rev-parse --short HEAD)"
cat > "$DEST/VUNO.md" <<EOF
# Vuno Design System v$VERSION

Copia instalada por el plugin \`vuno-ds\` de Claude Code desde \`$REPO\` (\`$REF\`, commit \`$COMMIT\`).

- **No edites estos archivos:** se reemplazan al actualizar con \`/vuno-ds:setup\`. Los cambios al sistema se hacen en el repo del DS.
- \`components/\`: los componentes (\`import { Button } from '<ruta>/components'\`).
- \`theme/\`: tokens, contexto de vertical y plataforma, y fuentes (\`import { tokens } from '<ruta>/theme'\`).
- \`docs/\`: las decisiones (\`DESIGN-BRIEF.md\`, \`TOKEN-NAMING.md\`, \`FOUNDATIONS.md\`), el \`CHANGELOG.md\` y los tokens fuente.
- Documentación visual: https://vuno-storybook.vercel.app
EOF

if [ "${VUNO_SKIP_DEPS:-0}" != "1" ]; then
  npx --yes expo install \
    @expo/vector-icons @expo-google-fonts/plus-jakarta-sans @expo-google-fonts/bricolage-grotesque \
    expo-font expo-haptics react-native-reanimated react-native-worklets react-native-gesture-handler \
    react-native-safe-area-context react-native-svg
fi

echo "Vuno Design System v$VERSION ($COMMIT) instalado en $DEST"

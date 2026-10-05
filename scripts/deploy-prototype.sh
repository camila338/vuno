#!/usr/bin/env bash
# Publica el prototipo web (Expo) en Vercel: proyecto vuno-prototype del equipo Cafe_bumbul.
# Igual que el Storybook, se publica una copia fuera del repo para que Vercel no lea los datos de Git.
set -euo pipefail

[ -d dist ] || { echo "Error: falta dist; ejecuta antes npx expo export --platform web." >&2; exit 1; }

TMP="$(mktemp -d)/vuno-prototype"
mkdir -p "$TMP"
trap 'rm -rf "$(dirname "$TMP")"' EXIT
cp -R dist/. "$TMP/"
# Expo guarda fuentes e iconos en assets/node_modules, y Vercel nunca sube carpetas node_modules:
# se renombran a assets/vendor y se actualizan sus rutas en el bundle.
if [ -d "$TMP/assets/node_modules" ]; then
  mv "$TMP/assets/node_modules" "$TMP/assets/vendor"
  grep -rl "assets/node_modules/" "$TMP/_expo" "$TMP/index.html" | while read -r f; do
    sed -i '' 's#assets/node_modules/#assets/vendor/#g' "$f"
  done
fi
# La app es una SPA (web.output = single): toda ruta carga index.html.
printf '{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }\n' > "$TMP/vercel.json"

npx --yes vercel deploy "$TMP" --prod --yes --scope cafebumbul < /dev/null

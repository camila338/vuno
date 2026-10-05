#!/usr/bin/env bash
# Publica storybook-static en Vercel (proyecto vuno-storybook del equipo Cafe_bumbul).
# Se publica una copia fuera del repo: así Vercel no lee los datos de Git, y un autor de commit
# que no es miembro del equipo no bloquea la publicación.
set -euo pipefail

[ -d storybook-static ] || { echo "Error: falta storybook-static; ejecuta antes npm run build-storybook." >&2; exit 1; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cp -R storybook-static/. "$TMP/"

VERCEL_ORG_ID=team_Yo6KUAjtwa6pzmfQymDxI49q VERCEL_PROJECT_ID=prj_b8VUnftjBCLfI0vTlHET92i8n6kg \
  npx --yes vercel deploy "$TMP" --prod --yes < /dev/null

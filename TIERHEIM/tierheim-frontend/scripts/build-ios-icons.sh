#!/usr/bin/env bash
set -euo pipefail

IM() {
  if command -v magick >/dev/null 2>&1; then
    magick "$@"
  elif command -v convert >/dev/null 2>&1; then
    convert "$@"
  else
    echo "FEHLER: ImageMagick ist nicht installiert (weder 'magick' noch 'convert' gefunden)." >&2
    echo "Installiere z.B.: sudo apt-get install -y imagemagick" >&2
    exit 1
  fi
}

SRC="${1:-$HOME/tierheim-frontend/public/Tierheim_favicon.png}"

OUT_DIR="${OUT_DIR:-$HOME/tierheim-frontend/public}"
mkdir -p "$OUT_DIR"

BG="${BG:-#FFFFFF}"

FILL_PCT="${FILL_PCT:-72}"

BASE=1024
CONTENT=$(( BASE * FILL_PCT / 100 ))

if [[ ! -f "$SRC" ]]; then
  echo "FEHLER: Quelldatei nicht gefunden: $SRC" >&2
  exit 1
fi

echo "Building iOS base (1024x1024, content ${CONTENT}px) from: $SRC"

IM "$SRC" \
  -background "$BG" -gravity center \
  -resize "${CONTENT}x${CONTENT}" \
  -extent ${BASE}x${BASE} \
  -alpha remove -alpha off -strip \
  "$OUT_DIR/apple-touch-icon-1024.png"

for s in 180 167 152; do
  IM "$OUT_DIR/apple-touch-icon-1024.png" -resize ${s}x${s} -alpha off -strip \
    "$OUT_DIR/apple-touch-icon-${s}.png"
done

cp "$OUT_DIR/apple-touch-icon-180.png" "$OUT_DIR/apple-touch-icon.png"

echo "Done. Generated:"
ls -lah "$OUT_DIR"/apple-touch-icon*.png

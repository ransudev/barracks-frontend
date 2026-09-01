#!/usr/bin/env bash
set -euo pipefail

SRC=/tmp/barracks-pwa-src
rm -rf "$SRC"
git clone --depth 1 --branch sprint-1 https://github.com/ransudev/Barracks-PWA.git "$SRC"

find . -mindepth 1 -maxdepth 1 \
  ! -name '.git' \
  ! -name 'vercel.json' \
  ! -name 'deploy-sprint1.sh' \
  -exec rm -rf {} +

cp -a "$SRC/barracks-pwa/." .
npm ci --include=dev
npm run build

#!/usr/bin/env sh
set -e
cd /app

echo "[client:dev] Installing dependencies..."
bun install

echo "[client:dev] Starting Vite..."
exec bun run dev

#!/usr/bin/env sh
set -e
cd /app

echo "[server:dev] Installing dependencies..."
bun install

echo "[server:dev] Running database migrations..."
bun run db:migrate

echo "[server:dev] Starting NestJS (watch)..."
exec bun run dev

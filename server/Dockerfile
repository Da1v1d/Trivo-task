# Build stage
FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Production runtime (Bun runs TS migrate scripts and compiled Nest output)
FROM oven/bun:1-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist
COPY scripts ./scripts
COPY sql ./sql

EXPOSE 3000

CMD ["sh", "-c", "bun run db:migrate && exec bun ./dist/main.js"]

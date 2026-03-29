# Trivo task — accounts & settings

Monorepo with a **React (Vite) + MUI** client and a **NestJS + PostgreSQL** server. Account settings are driven by a shared settings definition (API) and stored per account.

## ⏱ Task Effort

**Approximate time spent:** 12 hours

Scope covered within this time:

- Backend architecture design (NestJS feature-based modules)
- PostgreSQL schema design
- SQL migrations & seed scripts
- REST API implementation (accounts, settings)
- Shared settings definition system
- React client integration (TanStack Query, React Hook Form, Zod)
- Docker configuration (development & production)
- End-to-end testing and fixes

---

## Repository layout

| Path      | Description                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------- |
| `client/` | SPA: accounts list, per-account settings form (React, TypeScript, TanStack Query, React Hook Form, Zod, Axios, Tailwind). |
| `server/` | REST API: NestJS, raw SQL via `pg`, migrations and seeds under `server/sql/`.                                             |

**Prerequisites:** [Bun](https://bun.sh/) (for local runs), [Docker](https://docs.docker.com/get-docker/) (for container workflows).

---

## Docker — production-style stack

Builds static client (nginx) + compiled API + Postgres. Migrations run automatically when the **server** container starts.

```bash
docker compose up --build
```

| Service    | URL / port                                                                |
| ---------- | ------------------------------------------------------------------------- |
| Web UI     | http://localhost:8080                                                     |
| API        | http://localhost:3000                                                     |
| PostgreSQL | `localhost:5432` — user `postgres`, password `postgres`, database `trivo` |

Detached mode:

```bash
docker compose up --build -d
docker compose logs -f
docker compose down
```

---

## Docker — development stack

Hot reload: Vite on the client, `nest start --watch` on the server. Uses a **separate** Postgres volume (`postgres_data_dev`) from the default compose file.

```bash
docker compose -f docker-compose.dev.yml up --build
```

| Service    | URL / port                                   |
| ---------- | -------------------------------------------- |
| Web UI     | http://localhost:5173                        |
| API        | http://localhost:3000                        |
| PostgreSQL | `localhost:5432` (same credentials as above) |

Stop:

```bash
docker compose -f docker-compose.dev.yml down
```

**Note:** Do not run both compose files at once if they both publish `5432` (and the same API port) on the host — stop one stack before starting the other.

---

## Database seeding

Seeds are **not** executed automatically. After the stack is up and migrations have run, execute seed from the **server** container (or from `server/` with `DATABASE_URL` set).

**Development compose:**

```bash
docker compose -f docker-compose.dev.yml exec server bun run db:seed
```

**Default (production) compose:**

```bash
docker compose exec server bun run db:seed
```

**Local (no Docker), from `server/`:**

```bash
cp .env.example .env   # adjust DATABASE_URL if needed
bun install
bun run db:migrate
bun run db:seed
```

### Resetting account data before reseeding

Each seed run **inserts** rows. To avoid duplicate accounts, truncate accounts (and dependent `account_settings`) first:

```bash
docker compose -f docker-compose.dev.yml exec postgres psql -U postgres -d trivo -c "TRUNCATE accounts CASCADE;"
```

Then run `bun run db:seed` again as above. This does **not** remove `setting_definitions`.

---

## Local development without Docker

**Server** (`server/`):

```bash
bun install
cp .env.example .env
bun run db:migrate
bun run dev
```

**Client** (`client/`):

```bash
bun install
cp .env.example .env
# Set VITE_API_BASE_URL to your API origin, e.g. http://localhost:3000
bun run dev
```

---

## Useful commands (reference)

| Goal                      | Command                           |
| ------------------------- | --------------------------------- |
| Server migrations (local) | `cd server && bun run db:migrate` |
| Server seed (local)       | `cd server && bun run db:seed`    |
| Client production build   | `cd client && bun run build`      |
| Lint client               | `cd client && bun run lint`       |

---

## License

All rights reserved to me (David), except for any materials or terms that belong to Trivo or are provided under the Trivo task.

---

## Ending

If you reached this part, here's a little gift for you: 🎁✨ Thanks for reading!

# Database

## Connection

- **`DATABASE_URL`** — PostgreSQL connection string (see repo root `.env` / Docker compose).
- **`DatabaseModule`** creates a shared **`Pool`** and injects it as **`DATABASE_POOL`** into repositories.

### Why use a connection pool instead of a single client

We use the **`Pool`** from `node-postgres` on purpose:

- **Concurrency** — Nest handles many overlapping requests. A single `Client` would serialize queries on one TCP connection; a **pool** keeps several connections and assigns idle ones to each query, which matches how the server actually runs under load.
- **Stability** — The pool manages connection lifecycle (timeouts, reuse). That is the usual production pattern for Node + PostgreSQL when you are not using an ORM’s built-in pool.
- **Transactions** — When you need a transaction, you can `pool.connect()`, run `BEGIN` / `COMMIT` on that client, and release it back to the pool (see `AccountsRepository.upsertAccountSettingsValues` for an example of multi-statement work on one client).

A **plain `Client`** would be fine for scripts or a single-threaded CLI, but not as the default for a long-lived HTTP API.

## Scripts (Bun)

| Script  | Command              | What it does                                      |
| ------- | -------------------- | ------------------------------------------------- |
| Migrate | `bun run db:migrate` | Runs every `sql/migrations/*.sql` in sorted order |
| Seed    | `bun run db:seed`    | Runs every `sql/seed/*.sql` in sorted order       |

Implementation: `scripts/migrate.ts`, `scripts/seed.ts`.

**Note:** Migrations use `CREATE TABLE IF NOT EXISTS` for initial schema. Schema changes after the first deploy should add **new** numbered migration files (e.g. `002_*.sql`) with `ALTER TABLE` / `ADD COLUMN` as needed — re-running `001` alone will not alter existing tables.

## Schema (overview)

| Table                     | Purpose                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **`accounts`**            | User rows: `name`, `surname`, `image_url`, `role`, `created_at`                                                    |
| **`setting_definitions`** | Catalog of settings: `key`, `label`, `type`, `default_value`, `options`, **`validation` (JSONB)**, `display_order` |
| **`account_settings`**    | Per-account values: `account_id`, `setting_definition_id`, `value` (JSONB), unique per pair                        |

`validation` stores optional rules aligned with the client (`required`, `min`, `max`, `pattern`).

## File locations

- **`server/sql/migrations/`** — Ordered DDL
- **`server/sql/seed/`** — Idempotent or upsert seed data (see seed files for `ON CONFLICT` behavior)

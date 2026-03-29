# Architecture

## Stack

- **NestJS** (Express)
- **PostgreSQL** with **`pg` `Pool`** — raw SQL in repositories only (see [Database: why a pool](./database.md#why-use-a-connection-pool-instead-of-a-single-client))
- **class-validator** + **`ValidationPipe`** (global) for query, params, and body DTOs
- **ConfigModule** — `DATABASE_URL`, `PORT`, etc.

## Layering

| Layer          | Responsibility                                              |
| -------------- | ----------------------------------------------------------- |
| **Controller** | HTTP: routes, delegates to service; DTOs for input          |
| **Service**    | Business rules, orchestration, mapping rows → API responses |
| **Repository** | Parameterized SQL, typed row shapes — **no** business logic |

Flow: `Controller → Service → Repository → PostgreSQL`.

## Layout (`src/`)

```
database/          # DatabaseModule, Pool provider, DATABASE_POOL token
modules/
  accounts/        # accounts.controller, service, repository, dto/
  configurations/  # configurations controller, service, repository
common/            # Shared DTOs (e.g. pagination)
main.ts            # bootstrap, global ValidationPipe, CORS
app.module.ts      # imports ConfigModule, DatabaseModule, feature modules
```

## Global HTTP behavior (`main.ts`)

- **`ValidationPipe`**: `whitelist`, `transform`, `enableImplicitConversion` for query string numbers and enums where applicable.
- **`enableCors()`** for the SPA.

## Modules

- **`DatabaseModule`** — Provides and exports `DATABASE_POOL` (`pg` `Pool`); closes the pool on shutdown.
- **`AccountsModule`** — Accounts CRUD-style list/detail + per-account settings.
- **`ConfigurationsModule`** — Setting definitions catalog (`GET /configurations/settings`).

No ORM migrations from code — SQL files are run by `scripts/migrate.ts` and `scripts/seed.ts`.

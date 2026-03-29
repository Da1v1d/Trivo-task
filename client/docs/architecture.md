# Architecture

## Layers

The client follows a **Feature Sliced Design**–style layout under `src/`:


| Layer         | Path                          | Role                                                            |
| ------------- | ----------------------------- | --------------------------------------------------------------- |
| **App**       | `src/app.tsx`, `src/main.tsx` | Router, root layout, provider composition                       |
| **Pages**     | `src/pages/`                  | Route screens; compose features and shared UI                   |
| **Features**  | `src/features/<name>/`        | Domain slices: `ui/`, `model/`, `lib/`                          |
| **Shared**    | `src/shared/`                 | Reusable components, services, types, utils, constants, configs |
| **Providers** | `src/providers/`              | Theme, React Query, etc.                                        |


## Feature slice segments

Each feature typically uses:

- `**lib/`** — Types, constants, pure helpers (e.g. `types.ts`, `schemas.ts`, `utils.ts`).
- `**model/**` — Data access and state: `api/`, `hooks/`, optional `data/`, `context/`, `store/`.
- `**ui/**` — Feature-only components.

## Routing

Defined in `src/app.tsx`:

- `/` → redirect to `/accounts`
- `/accounts` — accounts list (`AccountsListPage`)
- `/accounts/:accountId` — per-account settings (`AccountsSettingsPage`)

`PageLayout` wraps nested routes and supplies the app shell (e.g. app bar).

## Tech stack

- **Build:** Vite and docker
- **UI:** React 19, MUI 7, Tailwind (Tailwind classes alongside MUI where used)
- **Data:** TanStack Query, Axios via `ApiService`
- **Forms:** React Hook Form + Zod (`@hookform/resolvers`)


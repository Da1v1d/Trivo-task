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

- **`lib/`** — Types, constants, pure helpers (e.g. `types.ts`, `schemas.ts`, `utils.ts`).
- **`model/`** — Data access and state: `api/`, `hooks/`, optional `data/`, `context/`, `store/`.
- **`ui/`** — Feature-only components.

## Routing

Defined in `src/app.tsx`:

- `/` → redirect to `/accounts`
- `/accounts` — accounts list (`AccountsListPage`)
- `/accounts/:accountId` — per-account settings (`AccountsSettingsPage`)

`PageLayout` wraps nested routes and supplies the app shell (e.g. app bar).

## Tech stack

- **Build:** Vite (and Docker for the dev/prod stacks in the repo root)
- **UI:** React 19 and **MUI 7** as the primary system (components, theme, layout primitives).
- **Tailwind CSS:** Used as an **optional utility layer** on top of MUI (`className` on `Box`, `Paper`, etc.) for spacing, flex, and responsive tweaks. It is **not required** for MUI — the same layout could be expressed with MUI `sx`. Keeping both is a trade-off: utilities are quick to write, but you maintain two styling approaches. For a MUI-only codebase, you could remove Tailwind and rely on `sx` / theme tokens for consistency.
- **Data:** TanStack Query, Axios via `ApiService`
- **Forms:** React Hook Form + Zod (`@hookform/resolvers`)

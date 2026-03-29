# Shared layer and API

## HTTP client

- **`src/shared/services/api/base-api.service.ts`** — Axios instance factory; base URL, interceptors if any.
- **`src/shared/services/api/api.service.ts`** — Exported **`ApiService`**: singleton extending `BaseApiService` with `import.meta.env.VITE_API_BASE_URL || ""`.

Feature APIs should call `ApiService.get`, `put`, etc., with typed generics for the JSON body shape.

## API response shapes (`src/shared/types/api.ts`)

- **`ApiResponse<T>`** — `{ data: T }`.
- **`PaginationResponse<T>`** — `{ data: T[], total, page, limit }`.

Hooks that use `useQuery<T>` must return **`T` directly** from `queryFn`. If the endpoint returns `ApiResponse<T>`, unwrap with `.then((res) => res.data)`.

## React Query

- **`src/shared/configs/query-client.ts`** — Default `QueryClient` options.
- **`src/providers/app-query-provider.tsx`** — Wraps the app with `QueryClientProvider`.

## Layout and shell

- **`src/shared/components/core/`** — `PageLayout`, headers, back button.
- **`src/shared/components/layout/`** — Box, Stack, Paper, AppBar, Toolbar.
- **`src/providers/app-theme-provider.tsx`** — MUI theme + CssBaseline.

## Conventions

- Prefer path aliases (`@/features/...`, `@/shared/...`) as configured in Vite/TypeScript.
- Keep feature-specific types in `features/<name>/lib/`; promote to `shared/types/` only when multiple features need them.

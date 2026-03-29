# Accounts feature

Location: `src/features/accounts/`

## Purpose

- List accounts with pagination and loading/error states.
- Load a single account for header/persona.
- Load and update **per-account settings** (merged definitions + values from the API).

## Types (`lib/types.ts`)

- **`Account`** — `id`, `name`, `surname`, `image`, `role`.
- **`AccountSettingsValues`** — `Record<string, unknown>` map of setting key → value for PUT payloads.
- **`MergedAccountSetting`** — Alias of `SettingFieldDefinition` plus `value` from the server; each row is a full field definition with resolved value.

## API (`model/api/accounts.api.ts`)

Base path: `/accounts` (via `ApiService` + `VITE_API_BASE_URL`).

| Method | Endpoint | Notes |
| ------ | -------- | ----- |
| `getAll` | `GET /accounts` | Query: `page`, `limit`, returns paginated `Account[]` |
| `getById` | `GET /accounts/:id` | Single account |
| `getSettings` | `GET /accounts/:id/settings` | `MergedAccountSetting[]` |
| `updateSettings` | `PUT /accounts/:id/settings` | Body `{ values: AccountSettingsValues }` |

Responses use `ApiResponse<T>` or `PaginationResponse<T>` from `src/shared/types/api.ts`.

## Hooks (`model/hooks/`)

- **`useAccounts`** — List + pagination state; wraps list query.
- **`useAccount`** — Single account by id.
- **`useAccountSettings`** — Settings for an account: query + mutation for `updateSettings`.

## UI (`ui/`)

- **`accounts-list.tsx`** — Main list with pagination block.
- **`blocks/`** — Pagination, skeleton, empty, error states.
- **`elements/`** — List row, persona card.

## Pages

- `src/pages/accounts-list-page.tsx` — list route.
- `src/pages/accounts-settings-page.tsx` — settings route; uses `DynamicSettingsForm` from the settings feature.

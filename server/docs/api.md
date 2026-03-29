# HTTP API

Base path: server root (e.g. `http://localhost:3000`). Responses for single resources and lists are usually wrapped as **`{ data: ... }`** unless noted.

## Accounts (`/accounts`)

### `GET /accounts`

Paginated list.

**Query** (`GetAccountsQueryDto` extends pagination):

| Param       | Type                | Notes                                                                 |
| ----------- | ------------------- | --------------------------------------------------------------------- |
| `page`      | int                 | Default `1`, min `1`                                                  |
| `limit`     | int                 | Default `20`, max `100`                                               |
| `search`    | string              | Optional; name/surname filter (server-side)                           |
| `role`      | string              | Optional                                                              |
| `sortBy`    | string              | Whitelisted in service (e.g. `name`, `surname`, `role`, `created_at`) |
| `sortOrder` | `"asc"` \| `"desc"` | Optional                                                              |

**Response:** `{ data: AccountResponse[], total, page, limit }` — exact field names match `AccountsService` / controller return value.

### `GET /accounts/:id`

**Params:** `id` — UUID.

**Response:** `{ data: { id, name, surname, image, role } }` (see `AccountResponse` in `accounts.service.ts`).

### `GET /accounts/:id/settings`

**Params:** `id` — UUID.

**Response:** `{ data: MergedAccountSetting[] }` — each item includes definition metadata (`key`, `type`, `label`, `options`, `validation`, `defaultValue`) and resolved **`value`** (stored value or default).

### `PUT /accounts/:id/settings`

**Params:** `id` — UUID.

**Body** (`UpdateAccountSettingsDto`):

```json
{
  "values": {
    "setting_key": "<json-compatible value>"
  }
}
```

**Response:** Same shape as `GET .../settings` — full merged list after upsert.

**Errors:** Unknown keys → `400`; missing account → `404`.

---

## Configurations (`/configurations`)

### `GET /configurations/settings`

**Response:** `{ data: SettingDefinitionResponse[] }` — all rows from `setting_definitions` (ordered by `display_order`, `key`). Each item includes `id`, `key`, `label`, `type`, `defaultValue`, `options`, `validation`, `displayOrder`.

---

## DTO validation

- Query and body are validated by **`ValidationPipe`** (whitelist, transform).
- UUID params use `AccountIdParamDto` (`@IsUUID()`).
- Pagination defaults and bounds come from `PaginationDto` / `GetAccountsQueryDto`.

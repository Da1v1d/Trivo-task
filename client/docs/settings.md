# Settings feature

Location: `src/features/settings/`

## Purpose

- Describe **setting field definitions** (type, label, options, validation, defaults).
- Render a **dynamic form** per account using React Hook Form + Zod schemas built from those definitions.

## Types (`lib/types.ts`)

- **`SettingField`** — `boolean` | `text` | `number` | `select` | `multiselect`.
- **`SettingFieldOption`** — `{ value, label }` for select/multiselect.
- **`SettingFieldValidation`** — Optional `required`, `min`, `max`, `pattern` (aligned with server JSON).
- **`SettingFieldDefinition`** — Full metadata for one setting key, including optional `value` when merged.

## Validation (`lib/schemas.ts`)

- **`buildValidationSchema(fields)`** — Builds a Zod object schema: one key per field, rules depend on `field.type` and `field.validation`.
- Used by **`DynamicSettingsForm`** with `zodResolver`.

## Defaults (`lib/utils.ts`)

- **`buildDefaultValues(fields, existingValues?)`** — Computes initial form values from definitions and optional existing account values.

## API (`model/api/settings-definition.api.ts`)

- **`GET /configurations/settings`** — Returns `{ data: SettingFieldDefinition[] }` (note: unwrap `.data` in `queryFn` when using TanStack Query).

## Hooks (`model/hooks/`)

- **`useSettingsDefinition`** — React Query for global definitions (when used standalone).

Account settings screens often use **`GET /accounts/:id/settings`** instead, which returns definitions with `value` already merged.

## UI (`ui/`)

- **`dynamic-settings-form.tsx`** — Renders fields from `SettingFieldDefinition[]`, submit handler receives `AccountSettingsValues`.
- **`setting-field-control.tsx`** — Dispatches to the correct control by `field.type`.
- **`account-settings.tsx`** — Example page wiring (may be used or superseded by `accounts-settings-page`).

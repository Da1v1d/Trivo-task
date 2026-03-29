# Forms (`BaseForm` and controlled fields)

This project wraps **react-hook-form** `Controller` in a small, reusable primitive so each field component stays thin and typed.

## Inspiration

The pattern is adapted from Kyle Cook / WebDevSimplified’s **shadcn-style field helpers**: a shared `FormBase` uses `Controller`, merges `field` with `id` and `aria-invalid`, and exposes errors for labels and a11y. See the reference implementation:

- [WebDevSimplified / shadcn-field-component — `form.tsx`](https://github.com/WebDevSimplified/shadcn-field-component/blob/main/src/components/form.tsx)

Walkthrough (same idea: composable form controls on top of `Controller`):

- [YouTube — related tutorial](https://www.youtube.com/watch?v=gjrXeqgxbas&t=2632s)

Here we use **MUI** (`TextField`, `Switch`, etc.) instead of shadcn `Field` / `Input`, but the structure matches: one `BaseForm` + many `FormX` components that only supply the control UI.

## Source

- **`src/shared/components/forms/base-form.tsx`** — `BaseForm` (default export) and shared types.
- **`src/shared/components/forms/*.tsx`** — `FormInput`, `FormSwitch`, `FormSelect`, etc., each built with `BaseForm`.

## `BaseForm` behavior

`BaseForm` renders a `Controller` and calls `children` with:

| Argument | Role |
| -------- | ---- |
| `field` | RHF `field` spread, plus stable `id` (dots in `name` become `-` for the DOM id) and `aria-invalid` from `fieldState` |
| `invalid` | Boolean from `fieldState.invalid` |
| `errorMessage` | `fieldState.error?.message` for helper text or alerts |

Child components must return a **`ReactElement`** (single root).

## Types (exported from `base-form.tsx`)

- **`FormControlProps`** — `name`, `control` (typed to your form values).
- **`FormBaseProps`** — `FormControlProps` + `children` render function with `FormBaseRenderArgs`.
- **`FormControlFunc<ExtraProps>`** — Helper type for “form control” components: generic function taking `control`, `name`, and extra props (e.g. MUI `TextField` props).

Use these so `FormInput`, `FormSelect`, etc. stay generic over `TFieldValues` and field names.

## Example: `FormInput`

`FormInput` composes `BaseForm` with MUI `TextField`, wiring `error` and `helperText` from validation:

```tsx
<BaseForm control={control} name={name}>
  {({ field, invalid, errorMessage }) => (
    <TextField
      {...field}
      value={field.value ?? ""}
      error={invalid}
      helperText={errorMessage ?? description}
    />
  )}
</BaseForm>
```

See **`src/shared/components/forms/input.tsx`** for the full implementation.

## Adding a new field type

1. Import `BaseForm` and `FormControlFunc` (or `FormBaseProps` if you need a custom signature).
2. Render `<BaseForm control={control} name={name}>` and map `field` / `invalid` / `errorMessage` to your MUI (or other) control.
3. Re-export from **`src/shared/components/forms/index.ts`** if it is part of the public form API.

Validation rules live in the parent form (e.g. Zod + `useForm` in feature code); `BaseForm` only bridges RHF state into the control.

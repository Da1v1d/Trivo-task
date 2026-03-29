import type { SettingFieldDefinition } from "@/features/settings/lib/types";
import type { AccountSettingsValues } from "@/features/accounts/lib/types";

const getFieldDefault = (field: SettingFieldDefinition): unknown => {
  if (field.defaultValue !== undefined) return field.defaultValue;

  switch (field.type) {
    case "boolean":
      return false;
    case "number":
      return field.validation?.min ?? 0;
    case "multiselect":
      return [];
    case "select":
      return field.options?.[0]?.value ?? "";
    case "text":
    default:
      return "";
  }
};

export const buildDefaultValues = (
  fields: SettingFieldDefinition[] | null | undefined,
  existingValues?: AccountSettingsValues,
): AccountSettingsValues => {
  const defaults: AccountSettingsValues = {};
  const list = Array.isArray(fields) ? fields : [];

  for (const field of list) {
    const existing = existingValues?.[field.key];
    defaults[field.key] =
      existing !== undefined ? existing : getFieldDefault(field);
  }

  return defaults;
};

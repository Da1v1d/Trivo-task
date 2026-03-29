import type { SettingFieldDefinition } from "@/shared/types/settings-definition";
import type { AccountSettingsValues } from "@/shared/types/accounts";

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
  fields: SettingFieldDefinition[],
  existingValues?: AccountSettingsValues,
): AccountSettingsValues => {
  const defaults: AccountSettingsValues = {};

  for (const field of fields) {
    const existing = existingValues?.[field.key];
    defaults[field.key] =
      existing !== undefined ? existing : getFieldDefault(field);
  }

  return defaults;
};

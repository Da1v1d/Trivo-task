export type SettingFieldType =
  | "boolean"
  | "text"
  | "number"
  | "select"
  | "multiselect";

export type SettingFieldOption = {
  value: string;
  label: string;
};

export type SettingFieldValidation = {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
};

export type SettingFieldDefinition = {
  key: string;
  type: SettingFieldType;
  label: string;
  options?: SettingFieldOption[];
  validation?: SettingFieldValidation;
  defaultValue?: unknown;
};

export type SettingsDefinitionResponse = {
  fields: SettingFieldDefinition[];
};

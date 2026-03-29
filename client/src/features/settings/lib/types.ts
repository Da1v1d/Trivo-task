export type SettingField =
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
  type: SettingField;
  label: string;
  options?: SettingFieldOption[];
  validation?: SettingFieldValidation;
  defaultValue?: unknown;
  value?: unknown;
};

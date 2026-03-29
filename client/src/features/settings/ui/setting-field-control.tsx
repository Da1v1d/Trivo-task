import type { Control } from "react-hook-form";
import type { SettingFieldDefinition } from "@/features/settings/lib/types";
import { FormInput } from "@/shared/components/forms/input";
import { FormSwitch } from "@/shared/components/forms/switch";
import { FormNumberInput } from "@/shared/components/forms/number";
import { FormSelect } from "@/shared/components/forms/select";
import { FormMultiCheckbox } from "@/shared/components/forms/multiselect";

type SettingFieldControlProps = {
  field: SettingFieldDefinition;
  control: Control<Record<string, unknown>>;
};

export const SettingFieldControl = ({
  field,
  control,
}: SettingFieldControlProps) => {
  switch (field.type) {
    case "boolean":
      return (
        <FormSwitch control={control} name={field.key} label={field.label} />
      );

    case "text":
      return (
        <FormInput
          control={control}
          name={field.key}
          label={field.label}
          fullWidth
        />
      );

    case "number":
      return (
        <FormNumberInput
          control={control}
          name={field.key}
          label={field.label}
          min={field.validation?.min}
          max={field.validation?.max}
          fullWidth
        />
      );

    case "select":
      return (
        <FormSelect
          control={control}
          name={field.key}
          label={field.label}
          options={field.options ?? []}
        />
      );

    case "multiselect":
      return (
        <FormMultiCheckbox
          control={control}
          name={field.key}
          label={field.label}
          options={field.options ?? []}
        />
      );

    default:
      return null;
  }
};

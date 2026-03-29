import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@/shared/components/layout";
import type { SettingFieldDefinition } from "@/features/settings/lib/types";
import type { AccountSettingsValues } from "@/features/accounts/lib/types";
import { buildValidationSchema } from "@/features/settings/lib/schemas";
import { buildDefaultValues } from "@/features/settings/lib/utils";
import { SettingFieldControl } from "./setting-field-control";
import { Button } from "@/shared/components/buttons";

type DynamicSettingsFormProps = {
  fields: SettingFieldDefinition[];
  values?: AccountSettingsValues;
  onSubmit: (values: AccountSettingsValues) => void;
  isSaving?: boolean;
};

export const DynamicSettingsForm = ({
  fields,
  values,
  onSubmit,
  isSaving,
}: DynamicSettingsFormProps) => {
  const fieldList = useMemo(
    () => (Array.isArray(fields) ? fields : []),
    [fields],
  );
  const schema = buildValidationSchema(fieldList);
  const defaultValues = buildDefaultValues(fieldList, values);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    reset(buildDefaultValues(fieldList, values));
  }, [fieldList, values, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={3}>
        {fieldList.map((field) => (
          <SettingFieldControl
            key={field.key}
            field={field}
            control={control}
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          disabled={!isDirty || isSaving}
          className="self-start"
          aria-label="Save settings"
          loading={isSaving}
        >
          Save settings
        </Button>
      </Stack>
    </form>
  );
};

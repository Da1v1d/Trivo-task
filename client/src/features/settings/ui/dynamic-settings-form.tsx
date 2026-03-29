import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@/shared/components/layout";
import { CircularProgress } from "@/shared/components/feedback";
import type { SettingFieldDefinition } from "@/shared/types/settings-definition";
import type { AccountSettingsValues } from "@/shared/types/accounts";
import { buildValidationSchema } from "@/features/settings/lib/build-validation-schema";
import { buildDefaultValues } from "@/features/settings/lib/build-default-values";
import { SettingFieldControl } from "./settng-field-control";
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
  const schema = buildValidationSchema(fields);
  const defaultValues = buildDefaultValues(fields, values);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    reset(buildDefaultValues(fields, values));
  }, [fields, values, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={3}>
        {fields.map((field) => (
          <SettingFieldControl
            key={field.key}
            field={field}
            control={control}
            errors={errors}
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          disabled={!isDirty || isSaving}
          className="self-start"
          aria-label="Save settings"
        >
          {isSaving ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Save settings"
          )}
        </Button>
      </Stack>
    </form>
  );
};

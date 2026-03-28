import type { ReactNode } from "react";
import {
  Checkbox as MuiCheckbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import type { CheckboxProps } from "@mui/material";
import BaseForm, {
  type FormControlFunc,
} from "@/shared/components/forms/base-form";

const Checkbox = MuiCheckbox;

type FormCheckboxExtraProps = Omit<
  CheckboxProps,
  | "name"
  | "checked"
  | "defaultChecked"
  | "onChange"
  | "onBlur"
  | "value"
  | "inputRef"
  | "id"
> & {
  label: ReactNode;
  description?: ReactNode;
};

export const FormCheckbox: FormControlFunc<FormCheckboxExtraProps> = ({
  control,
  name,
  label,
  description,
  ...checkboxProps
}) => {
  return (
    <BaseForm control={control} name={name}>
      {({ field, invalid, errorMessage }) => {
        const helperId = `${field.id}-helper-text`;
        const helperText = errorMessage ?? description;
        const showHelper = helperText != null && helperText !== "";

        return (
          <FormControl error={invalid} variant="standard" fullWidth>
            <FormControlLabel
              label={label}
              control={
                <Checkbox
                  {...checkboxProps}
                  id={field.id}
                  name={field.name}
                  checked={Boolean(field.value)}
                  onChange={(_, checked) => {
                    field.onChange(checked);
                  }}
                  onBlur={field.onBlur}
                  slotProps={{
                    ...checkboxProps.slotProps,
                    input: {
                      ref: field.ref,
                      ...(checkboxProps.slotProps?.input ?? {}),
                      "aria-invalid": field["aria-invalid"],
                      "aria-describedby": showHelper ? helperId : undefined,
                    },
                  }}
                />
              }
            />
            {showHelper ? (
              <FormHelperText id={helperId}>{helperText}</FormHelperText>
            ) : null}
          </FormControl>
        );
      }}
    </BaseForm>
  );
};

export default Checkbox;

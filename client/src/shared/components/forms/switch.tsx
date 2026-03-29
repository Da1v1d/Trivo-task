import type { ReactNode } from "react";
import {
  Switch as MuiSwitch,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import type { SwitchProps } from "@mui/material";
import BaseForm, {
  type FormControlFunc,
} from "@/shared/components/forms/base-form";

const Switch = MuiSwitch;

type FormSwitchExtraProps = Omit<
  SwitchProps,
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

export const FormSwitch: FormControlFunc<FormSwitchExtraProps> = ({
  control,
  name,
  label,
  description,
  ...switchProps
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
                <Switch
                  {...switchProps}
                  id={field.id}
                  name={field.name}
                  checked={Boolean(field.value)}
                  onChange={(_, checked) => {
                    field.onChange(checked);
                  }}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                  inputProps={{
                    "aria-invalid": field["aria-invalid"],
                    "aria-describedby": showHelper ? helperId : undefined,
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

export default Switch;

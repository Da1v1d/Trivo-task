import type { ReactNode } from "react";
import {
  Select as MuiSelect,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from "@mui/material";
import type { SelectProps } from "@mui/material";
import BaseForm, {
  type FormControlFunc,
} from "@/shared/components/forms/base-form";

const Select = MuiSelect;

type SelectOption = {
  value: string;
  label: string;
};

type FormSelectExtraProps = Omit<
  SelectProps,
  | "name"
  | "value"
  | "defaultValue"
  | "onChange"
  | "onBlur"
  | "error"
  | "labelId"
  | "inputRef"
> & {
  label: ReactNode;
  description?: ReactNode;
  options: SelectOption[];
};

export const FormSelect: FormControlFunc<FormSelectExtraProps> = ({
  control,
  name,
  label,
  description,
  options,
  ...selectProps
}) => {
  return (
    <BaseForm control={control} name={name}>
      {({ field, invalid, errorMessage }) => {
        const labelId = `${field.id}-label`;
        const helperId = `${field.id}-helper-text`;
        const helperText = errorMessage ?? description;
        const showHelper = helperText != null && helperText !== "";

        return (
          <FormControl fullWidth error={invalid}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
              {...selectProps}
              {...field}
              value={field.value ?? ""}
              labelId={labelId}
              label={label}
              inputRef={field.ref}
              aria-describedby={showHelper ? helperId : undefined}
            >
              {options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
            {showHelper ? (
              <FormHelperText id={helperId}>{helperText}</FormHelperText>
            ) : null}
          </FormControl>
        );
      }}
    </BaseForm>
  );
};

export default Select;

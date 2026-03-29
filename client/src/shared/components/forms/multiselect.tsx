import type { ReactNode } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import BaseForm, {
  type FormControlFunc,
} from "@/shared/components/forms/base-form";

type MultiselectOption = {
  value: string;
  label: string;
};

type FormMultiCheckboxExtraProps = {
  label: ReactNode;
  description?: ReactNode;
  options: MultiselectOption[];
};

export const FormMultiCheckbox: FormControlFunc<
  FormMultiCheckboxExtraProps
> = ({ control, name, label, description, options }) => {
  return (
    <BaseForm control={control} name={name}>
      {({ field, invalid, errorMessage }) => {
        const selected = (field.value as string[]) ?? [];
        const helperId = `${field.id}-helper-text`;
        const helperText = errorMessage ?? description;
        const showHelper = helperText != null && helperText !== "";

        const handleToggle = (optionValue: string) => {
          const next = selected.includes(optionValue)
            ? selected.filter((v) => v !== optionValue)
            : [...selected, optionValue];
          field.onChange(next);
        };

        return (
          <FormControl
            component="fieldset"
            error={invalid}
            fullWidth
            variant="standard"
          >
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
              {options.map((opt) => (
                <FormControlLabel
                  key={opt.value}
                  label={opt.label}
                  control={
                    <Checkbox
                      checked={selected.includes(opt.value)}
                      onChange={() => handleToggle(opt.value)}
                      onBlur={field.onBlur}
                      inputProps={{ "aria-label": opt.label }}
                    />
                  }
                />
              ))}
            </FormGroup>
            {showHelper ? (
              <FormHelperText id={helperId}>{helperText}</FormHelperText>
            ) : null}
          </FormControl>
        );
      }}
    </BaseForm>
  );
};

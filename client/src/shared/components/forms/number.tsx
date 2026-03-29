import BaseForm, {
  type FormControlFunc,
} from "@/shared/components/forms/base-form";
import { TextField, type TextFieldProps } from "@mui/material";

const NumberInput = TextField;

type FormNumberInputExtraProps = Omit<
  TextFieldProps,
  | "name"
  | "value"
  | "defaultValue"
  | "onBlur"
  | "onChange"
  | "error"
  | "helperText"
  | "type"
> & {
  description?: TextFieldProps["helperText"];
  min?: number;
  max?: number;
};

export const FormNumberInput: FormControlFunc<FormNumberInputExtraProps> = ({
  control,
  name,
  label,
  description,
  min,
  max,
  ...props
}) => {
  return (
    <BaseForm control={control} name={name}>
      {({ field, invalid, errorMessage }) => (
        <NumberInput
          {...props}
          {...field}
          type="number"
          value={field.value ?? ""}
          onChange={(e) => {
            const raw = e.target.value;
            field.onChange(raw === "" ? "" : Number(raw));
          }}
          label={label}
          error={invalid}
          helperText={errorMessage ?? description}
          slotProps={{
            ...props.slotProps,
            htmlInput: {
              ...(props.slotProps?.htmlInput ?? {}),
              min,
              max,
              "aria-label": typeof label === "string" ? label : undefined,
            },
          }}
        />
      )}
    </BaseForm>
  );
};

export default NumberInput;

import BaseForm, {
  type FormControlFunc,
} from "@/shared/components/forms/base-form";
import { TextField, type TextFieldProps } from "@mui/material";

const Input = TextField;

type FormInputExtraProps = Omit<
  TextFieldProps,
  "name" | "value" | "defaultValue" | "onBlur" | "onChange" | "error"
> & {
  label: TextFieldProps["label"];
  description?: TextFieldProps["helperText"];
};

export const FormInput: FormControlFunc<FormInputExtraProps> = ({
  control,
  name,
  label,
  description,
  ...props
}) => {
  return (
    <BaseForm control={control} name={name}>
      {({ field, invalid, errorMessage }) => (
        <Input
          {...props}
          {...field}
          value={field.value ?? ""}
          label={label}
          error={invalid}
          helperText={errorMessage ?? description}
        />
      )}
    </BaseForm>
  );
};

export default Input;

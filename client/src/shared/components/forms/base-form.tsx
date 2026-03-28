import type { ReactElement } from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

export type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName;
  control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"];
};

export type FormBaseRenderArgs<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  field: Parameters<
    ControllerProps<TFieldValues, TName, TTransformedValues>["render"]
  >[0]["field"] & {
    "aria-invalid": boolean;
    id: string;
  };
  invalid: boolean;
  errorMessage?: string;
};

export type FormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormControlProps<TFieldValues, TName, TTransformedValues> & {
  children: (
    args: FormBaseRenderArgs<TFieldValues, TName, TTransformedValues>,
  ) => ReactElement;
};

export type FormControlFunc<
  ExtraProps extends Record<string, unknown> = Record<never, never>,
> = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: FormControlProps<TFieldValues, TName, TTransformedValues> & ExtraProps,
) => ReactElement;

const BaseForm = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  children,
  control,
  name,
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) => {
  const inputId = String(name).replace(/\./g, "-");

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) =>
        children({
          field: {
            ...field,
            id: inputId,
            "aria-invalid": fieldState.invalid,
          },
          invalid: fieldState.invalid,
          errorMessage: fieldState.error?.message,
        })
      }
    />
  );
};

export default BaseForm;

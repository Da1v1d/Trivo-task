import { z, type ZodTypeAny } from "zod";
import type { SettingFieldDefinition } from "@/features/settings/lib/types";

const buildFieldSchema = (field: SettingFieldDefinition): ZodTypeAny => {
  const v = field.validation;

  switch (field.type) {
    case "boolean":
      return z.boolean();

    case "text": {
      let schema = z.string();
      if (v?.required) schema = schema.min(1, "This field is required");
      if (v?.pattern)
        schema = schema.regex(new RegExp(v.pattern), "Invalid format");
      return schema;
    }

    case "number": {
      let schema = z.coerce.number();
      if (v?.min !== undefined)
        schema = schema.min(v.min, `Minimum is ${v.min}`);
      if (v?.max !== undefined)
        schema = schema.max(v.max, `Maximum is ${v.max}`);
      return schema;
    }

    case "select": {
      let schema = z.string();
      if (v?.required) schema = schema.min(1, "Please select an option");
      return schema;
    }

    case "multiselect": {
      const inner = z.string();
      const schema = z.array(inner);
      if (v?.required) return schema.min(1, "Select at least one option");
      return schema;
    }

    default:
      return z.unknown();
  }
};

export const buildValidationSchema = (
  fields: SettingFieldDefinition[] | null | undefined,
) => {
  const shape: Record<string, ZodTypeAny> = {};
  const list = Array.isArray(fields) ? fields : [];

  for (const field of list) {
    shape[field.key] = buildFieldSchema(field);
  }

  return z.object(shape);
};

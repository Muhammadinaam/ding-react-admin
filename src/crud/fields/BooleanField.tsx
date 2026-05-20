import { Switch } from "antd";
import type { BaseSourceProps, FieldRules } from "../types";
import { useInlineOrFormField } from "./useInlineOrFormField";

export type BooleanFieldProps = BaseSourceProps & {
  required?: boolean;
  rules?: FieldRules;
};

export function BooleanField({
  source,
  label,
  required,
  rules,
}: BooleanFieldProps) {
  const field = useInlineOrFormField(
    source,
    label,
    required,
    rules,
    ({ value, onChange, disabled }) => (
      <Switch
        checked={Boolean(value)}
        onChange={onChange}
        disabled={disabled}
      />
    ),
  );

  if (field.mode === "inline") return null;
  return field.element;
}

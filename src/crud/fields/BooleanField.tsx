import { Switch } from "antd";
import type { FieldSourceProps, FieldRules } from "../types";
import { FieldWrapper } from "./FieldWrapper";

export type BooleanFieldProps = FieldSourceProps & {
  name?: string;
  required?: boolean;
  rules?: FieldRules;
  hideLabel?: boolean;
  disabled?: boolean;
};

export function BooleanField({
  source,
  name,
  label,
  required,
  rules,
  hideLabel,
  hidden,
  disabled: disabledProp,
}: BooleanFieldProps) {
  return (
    <FieldWrapper
      source={source}
      name={name}
      label={label}
      required={required}
      rules={rules}
      hideLabel={hideLabel}
      hidden={hidden}
    >
      {({ value, onChange, disabled }) => (
        <Switch
          checked={Boolean(value)}
          onChange={onChange}
          disabled={disabled || disabledProp}
        />
      )}
    </FieldWrapper>
  );
}

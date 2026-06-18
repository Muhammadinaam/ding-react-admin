import { Input } from "antd";
import type { CSSProperties } from "react";
import type { BaseSourceProps, FieldRules } from "../types";
import { FieldWrapper } from "./FieldWrapper";

export type TextFieldProps = BaseSourceProps & {
  name?: string;
  required?: boolean;
  rules?: FieldRules;
  placeholder?: string;
  inputStyle?: CSSProperties;
  hideLabel?: boolean;
};

export function TextField({
  source,
  name,
  label,
  required,
  rules,
  placeholder,
  inputStyle,
  hideLabel,
}: TextFieldProps) {
  return (
    <FieldWrapper
      source={source}
      name={name}
      label={label}
      required={required}
      rules={rules}
      hideLabel={hideLabel}
    >
      {({ value, onChange, onBlur, disabled }) => (
        <Input
          value={value as string | undefined}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          style={inputStyle}
        />
      )}
    </FieldWrapper>
  );
}

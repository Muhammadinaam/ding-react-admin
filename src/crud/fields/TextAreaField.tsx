import { Input } from "antd";
import type { CSSProperties } from "react";
import type { BaseSourceProps, FieldRules } from "../types";
import { FieldWrapper } from "./FieldWrapper";

export type TextAreaFieldProps = BaseSourceProps & {
  name?: string;
  required?: boolean;
  rules?: FieldRules;
  placeholder?: string;
  inputStyle?: CSSProperties;
  hideLabel?: boolean;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  autoSize?: boolean | { minRows?: number; maxRows?: number };
};

export function TextAreaField({
  source,
  name,
  label,
  required,
  rules,
  placeholder,
  inputStyle,
  hideLabel,
  rows = 4,
  maxLength,
  showCount,
  autoSize,
}: TextAreaFieldProps) {
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
        <Input.TextArea
          value={value as string | undefined}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          style={inputStyle}
          rows={autoSize ? undefined : rows}
          maxLength={maxLength}
          showCount={showCount}
          autoSize={autoSize}
        />
      )}
    </FieldWrapper>
  );
}

import { Input } from "antd";
import type { CSSProperties } from "react";
import type { BaseSourceProps, FieldRules, InlineFieldOptions } from "../types";
import { useInlineOrFormField } from "./useInlineOrFormField";

export type TextFieldProps = BaseSourceProps &
  InlineFieldOptions & {
    required?: boolean;
    rules?: FieldRules;
    placeholder?: string;
    inputStyle?: CSSProperties;
  };

export function TextField({
  source,
  label,
  required,
  rules,
  placeholder,
  width: inlineWidth,
  minWidth: inlineMinWidth,
  inputStyle,
}: TextFieldProps) {
  const field = useInlineOrFormField(
    source,
    label,
    required,
    rules,
    ({ value, onChange, onBlur, disabled }) => (
      <Input
        value={value as string | undefined}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        style={inputStyle}
      />
    ),
    { width: inlineWidth, minWidth: inlineMinWidth },
  );

  if (field.mode === "inline") return null;
  return field.element;
}

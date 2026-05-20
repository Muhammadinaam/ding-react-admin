import { InputNumber } from "antd";
import type { CSSProperties } from "react";
import type { BaseSourceProps, FieldRules, InlineFieldOptions } from "../types";
import { useInlineOrFormField } from "./useInlineOrFormField";

export type NumberFieldProps = BaseSourceProps &
  InlineFieldOptions & {
    required?: boolean;
    rules?: FieldRules;
    min?: number;
    max?: number;
    step?: number;
    inputStyle?: CSSProperties;
  };

export function NumberField({
  source,
  label,
  required,
  rules,
  min,
  max,
  step,
  width: inlineWidth,
  minWidth: inlineMinWidth,
  inputStyle,
}: NumberFieldProps) {
  const field = useInlineOrFormField(
    source,
    label,
    required,
    rules,
    ({ value, onChange, onBlur, disabled }) => (
      <InputNumber
        value={value as number | undefined}
        onChange={(v) => onChange(v)}
        onBlur={onBlur}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        style={{ width: "100%", ...inputStyle }}
      />
    ),
    { width: inlineWidth, minWidth: inlineMinWidth },
  );

  if (field.mode === "inline") return null;
  return field.element;
}

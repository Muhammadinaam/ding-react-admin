import { InputNumber } from "antd";
import type { CSSProperties } from "react";
import type { BaseSourceProps, FieldRules } from "../types";
import { FieldWrapper } from "./FieldWrapper";

export type NumberFieldProps = BaseSourceProps & {
  name?: string;
  required?: boolean;
  rules?: FieldRules;
  min?: number;
  max?: number;
  step?: number;
  inputStyle?: CSSProperties;
  hideLabel?: boolean;
};

export function NumberField({
  source,
  name,
  label,
  required,
  rules,
  min,
  max,
  step,
  inputStyle,
  hideLabel,
}: NumberFieldProps) {
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
      )}
    </FieldWrapper>
  );
}

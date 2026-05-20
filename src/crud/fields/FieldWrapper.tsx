import { Form } from "antd";
import { Controller, useFormContext, type FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import type { FieldRules } from "../types";
import { useFormMetaOptional } from "../context/FormContext";

export type FieldWrapperProps = {
  source: string;
  label?: string;
  required?: boolean;
  rules?: FieldRules;
  children: (props: {
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
    disabled?: boolean;
  }) => ReactNode;
};

export function FieldWrapper({
  source,
  label,
  required,
  rules,
  children,
}: FieldWrapperProps) {
  const { control } = useFormContext<FieldValues>();
  const meta = useFormMetaOptional();
  const fieldLabel = label ?? source;

  return (
    <Controller
      name={source}
      control={control}
      rules={{
        required: required ? `${fieldLabel} is required` : false,
        ...rules,
      }}
      render={({ field, fieldState }) => (
        <Form.Item
          label={fieldLabel}
          validateStatus={fieldState.error ? "error" : undefined}
          help={fieldState.error?.message}
          required={required}
        >
          {children({
            value: field.value,
            onChange: field.onChange,
            onBlur: field.onBlur,
            disabled: meta?.disabled,
          })}
        </Form.Item>
      )}
    />
  );
}

export function InlineFieldWrapper({
  name,
  label,
  required,
  rules,
  hideLabel,
  children,
}: {
  name: string;
  label?: string;
  required?: boolean;
  rules?: FieldRules;
  /** Tabular inlines use column headers — suppress per-cell labels. */
  hideLabel?: boolean;
  children: (props: {
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
  }) => ReactNode;
}) {
  const { control } = useFormContext<FieldValues>();
  const fieldLabel = hideLabel ? undefined : label;
  const requiredMessage = label ?? "This field";

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${requiredMessage} is required` : false,
        ...rules,
      }}
      render={({ field, fieldState }) => (
        <Form.Item
          label={fieldLabel}
          validateStatus={fieldState.error ? "error" : undefined}
          help={fieldState.error?.message}
          required={required && !hideLabel}
          style={{ marginBottom: 0 }}
        >
          {children({
            value: field.value,
            onChange: field.onChange,
            onBlur: field.onBlur,
          })}
        </Form.Item>
      )}
    />
  );
}

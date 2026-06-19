import { Form } from "antd";
import { Controller, useFormContext, type FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import type { FieldRules } from "../types";
import { useFormMetaOptional } from "../context/FormContext";
import {
  useRegisterPayloadField,
  useRegisterSectionField,
} from "../context/PayloadFieldsContext";

export type FieldWrapperProps = {
  /** Logical field name — used for submit payload tracking on top-level fields. */
  source: string;
  /** Full RHF path. Defaults to `source`. Inline cells pass e.g. `lines.0.label`. */
  name?: string;
  label?: string;
  required?: boolean;
  rules?: FieldRules;
  /** Tabular inline cells: column header replaces the label. */
  hideLabel?: boolean;
  children: (props: {
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
    disabled?: boolean;
    name: string;
  }) => ReactNode;
};

export function FieldWrapper({
  source,
  name,
  label,
  required,
  rules,
  hideLabel,
  children,
}: FieldWrapperProps) {
  const fieldName = name ?? source;
  const isTopLevel = !fieldName.includes(".");

  // react-hook-form: connect this field to the form from <ResourceForm>'s FormProvider.
  // `control` is passed to <Controller> below so value, onChange, and validation work.
  const { control } = useFormContext<FieldValues>();

  // ding-react-admin: optional form-wide flags from <FormMetaProvider> (inside ResourceForm).
  // Used here for `disabled` on inputs (e.g. read-only view mode). Returns null outside a form page.
  const meta = useFormMetaOptional();
  const fieldLabel = hideLabel ? undefined : (label ?? source);
  const requiredMessage = label ?? source;

  // Add this field's `source` to the Save payload (ResourceForm → buildFormPayload).
  // `isTopLevel` is false when `name` contains "." (e.g. inline cell `__inline_lines.0.label`) —
  // those values live in the inline array and are saved by saveInlineRows, not the parent PATCH.
  useRegisterPayloadField(source, isTopLevel);

  // Same top-level check: attach this field to the current FormTab / FormStep for error highlighting.
  useRegisterSectionField(source, isTopLevel);

  return (
    <Controller
      name={fieldName}
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
          style={hideLabel ? { marginBottom: 0 } : undefined}
        >
          {children({
            value: field.value,
            onChange: field.onChange,
            onBlur: field.onBlur,
            disabled: meta?.disabled,
            name: fieldName,
          })}
        </Form.Item>
      )}
    />
  );
}

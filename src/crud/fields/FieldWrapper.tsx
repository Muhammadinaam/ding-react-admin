import { Form } from "antd";
import { Controller, useFormContext, type FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import type { FieldRules } from "../types";
import { useFormMetaOptional } from "../context/FormContext";
import {
  useSectionField,
  useSubmitField,
} from "../context/SubmitFieldsContext";

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

  // ding-react-admin: remember this `source` so Save sends only fields you rendered in JSX
  // (see pickBySources in ResourceForm). Skipped for inline row cells — nested `name` paths.
  useSubmitField(source, isTopLevel);

  // ding-react-admin: group this field with the current FormTab / FormStep for error highlighting
  // and "jump to first invalid tab" on Save. No-op outside tabs/steps.
  useSectionField(source, isTopLevel);

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

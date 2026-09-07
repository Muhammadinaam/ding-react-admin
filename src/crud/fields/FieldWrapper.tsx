import { Form } from "antd";
import { Controller, useFormContext, type FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import type { FieldRules } from "../types";
import { useFormMetaOptional } from "../context/FormContext";
import {
  useRegisterPayloadField,
  useRegisterSectionField,
} from "../context/PayloadFieldsContext";
import { shouldRegisterSourceInPayload } from "../utils/shouldRegisterSourceInPayload";
import { isSourceHidden, useHiddenSources } from "../HiddenSources";

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
  /** Hide the control but keep the value in the form and save payload. */
  hidden?: boolean;
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
  hidden,
  children,
}: FieldWrapperProps) {
  const fieldName = name ?? source;
  const registerSource = shouldRegisterSourceInPayload(source, name);
  const isHidden = isSourceHidden(source, hidden, useHiddenSources());

  // react-hook-form: connect this field to the form from <ResourceForm>'s FormProvider.
  // `control` is passed to <Controller> below so value, onChange, and validation work.
  const { control } = useFormContext<FieldValues>();

  // ding-react-admin: optional form-wide flags from <FormMetaProvider> (inside ResourceForm).
  // Used here for `disabled` on inputs (e.g. read-only view mode). Returns null outside a form page.
  const meta = useFormMetaOptional();
  const fieldLabel = hideLabel ? undefined : (label ?? source);
  const requiredMessage = label ?? source;

  // Nested parent fields (`source="address.city"`) register; inline cells
  // (`name="lines.0.label"`, `source="label"`) do not — those go through the inline array.
  useRegisterPayloadField(source, registerSource);
  useRegisterSectionField(source, registerSource);

  if (isHidden) {
    return (
      <Controller
        name={fieldName}
        control={control}
        render={() => <></>}
      />
    );
  }

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

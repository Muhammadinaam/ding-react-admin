import { Input } from "antd";
import { useWatch } from "react-hook-form";
import type { BaseSourceProps, FieldRules, InlineFieldOptions } from "../types";
import { useInlineOrFormField } from "./useInlineOrFormField";

export type PasswordFieldProps = BaseSourceProps &
  InlineFieldOptions & {
    required?: boolean;
    rules?: FieldRules;
    /** When set, renders a second field and validates it matches `source`. */
    confirmSource?: string;
    confirmLabel?: string;
    autoComplete?: string;
  };

function PasswordInputField({
  source,
  label,
  required,
  rules,
  autoComplete,
  width: inlineWidth,
  minWidth: inlineMinWidth,
}: PasswordFieldProps) {
  const field = useInlineOrFormField(
    source,
    label,
    required,
    rules,
    ({ value, onChange, onBlur, disabled }) => (
      <Input.Password
        value={value as string | undefined}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        autoComplete={autoComplete}
      />
    ),
    { width: inlineWidth, minWidth: inlineMinWidth },
  );

  if (field.mode === "inline") return null;
  return field.element;
}

export function PasswordField({
  source,
  label,
  required,
  rules,
  confirmSource,
  confirmLabel = "Confirm password",
  autoComplete = "new-password",
  width,
  minWidth,
}: PasswordFieldProps) {
  const password = useWatch({ name: source, disabled: !confirmSource });

  if (!confirmSource) {
    return (
      <PasswordInputField
        source={source}
        label={label}
        required={required}
        rules={rules}
        autoComplete={autoComplete}
        width={width}
        minWidth={minWidth}
      />
    );
  }

  return (
    <>
      <PasswordInputField
        source={source}
        label={label}
        required={required}
        rules={rules}
        autoComplete={autoComplete}
        width={width}
        minWidth={minWidth}
      />
      <PasswordInputField
        source={confirmSource}
        label={confirmLabel}
        required={required}
        autoComplete={autoComplete}
        width={width}
        minWidth={minWidth}
        rules={{
          validate: (value: string) =>
            !password || value === password || "Passwords do not match",
        }}
      />
    </>
  );
}

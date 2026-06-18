import { Input } from "antd";
import { useWatch } from "react-hook-form";
import type { BaseSourceProps, FieldRules } from "../types";
import { FieldWrapper } from "./FieldWrapper";

export type PasswordFieldProps = BaseSourceProps & {
  name?: string;
  required?: boolean;
  rules?: FieldRules;
  /** When set, renders a second field and validates it matches `source`. */
  confirmSource?: string;
  confirmLabel?: string;
  autoComplete?: string;
  hideLabel?: boolean;
};

function PasswordInputField({
  source,
  name,
  label,
  required,
  rules,
  autoComplete,
  hideLabel,
}: PasswordFieldProps) {
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
        <Input.Password
          value={value as string | undefined}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete={autoComplete}
        />
      )}
    </FieldWrapper>
  );
}

export function PasswordField({
  source,
  name,
  label,
  required,
  rules,
  confirmSource,
  confirmLabel = "Confirm password",
  autoComplete = "new-password",
  hideLabel,
}: PasswordFieldProps) {
  const password = useWatch({ name: name ?? source, disabled: !confirmSource });

  if (!confirmSource) {
    return (
      <PasswordInputField
        source={source}
        name={name}
        label={label}
        required={required}
        rules={rules}
        autoComplete={autoComplete}
        hideLabel={hideLabel}
      />
    );
  }

  return (
    <>
      <PasswordInputField
        source={source}
        name={name}
        label={label}
        required={required}
        rules={rules}
        autoComplete={autoComplete}
        hideLabel={hideLabel}
      />
      <PasswordInputField
        source={confirmSource}
        label={confirmLabel}
        required={required}
        autoComplete={autoComplete}
        hideLabel={hideLabel}
        rules={{
          validate: (value: string) =>
            !password || value === password || "Passwords do not match",
        }}
      />
    </>
  );
}

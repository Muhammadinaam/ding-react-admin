import { Select } from "antd";
import type { FieldSourceProps, ChoiceOption, FieldRules } from "../types";
import { FieldWrapper } from "./FieldWrapper";

export type SelectFieldProps = FieldSourceProps & {
  name?: string;
  required?: boolean;
  rules?: FieldRules;
  choices: ChoiceOption[];
  mode?: "multiple";
  hideLabel?: boolean;
};

export function SelectField({
  source,
  name,
  label,
  required,
  rules,
  choices,
  mode,
  hideLabel,
  hidden,
}: SelectFieldProps) {
  return (
    <FieldWrapper
      source={source}
      name={name}
      label={label}
      required={required}
      rules={rules}
      hideLabel={hideLabel}
      hidden={hidden}
    >
      {({ value, onChange, disabled }) => (
        <Select
          value={value as string | number | (string | number)[] | undefined}
          onChange={(next) => onChange(next ?? null)}
          options={choices}
          mode={mode}
          allowClear
          disabled={disabled}
          style={{ width: "100%" }}
        />
      )}
    </FieldWrapper>
  );
}

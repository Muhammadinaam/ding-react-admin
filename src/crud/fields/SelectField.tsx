import { Select } from "antd";
import type { BaseSourceProps, ChoiceOption, FieldRules } from "../types";
import { FieldWrapper } from "./FieldWrapper";

export type SelectFieldProps = BaseSourceProps & {
  name?: string;
  required?: boolean;
  rules?: FieldRules;
  choices: ChoiceOption[];
  mode?: "multiple";
  allowClear?: boolean;
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
  allowClear,
  hideLabel,
}: SelectFieldProps) {
  return (
    <FieldWrapper
      source={source}
      name={name}
      label={label}
      required={required}
      rules={rules}
      hideLabel={hideLabel}
    >
      {({ value, onChange, disabled }) => (
        <Select
          value={value as string | number | (string | number)[] | undefined}
          onChange={onChange}
          options={choices}
          mode={mode}
          allowClear={allowClear}
          disabled={disabled}
          style={{ width: "100%" }}
        />
      )}
    </FieldWrapper>
  );
}

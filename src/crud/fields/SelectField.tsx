import { Select } from "antd";
import type { BaseSourceProps, ChoiceOption, FieldRules } from "../types";
import { FieldWrapper } from "./FieldWrapper";

export type SelectFieldProps = BaseSourceProps & {
  required?: boolean;
  rules?: FieldRules;
  choices: ChoiceOption[];
  mode?: "multiple";
  allowClear?: boolean;
};

export function SelectField({
  source,
  label,
  required,
  rules,
  choices,
  mode,
  allowClear,
}: SelectFieldProps) {
  return (
    <FieldWrapper
      source={source}
      label={label}
      required={required}
      rules={rules}
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

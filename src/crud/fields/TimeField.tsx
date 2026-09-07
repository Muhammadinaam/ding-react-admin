import { TimePicker } from "antd";
import type { FieldSourceProps, FieldRules } from "../types";
import { parseDayjsValue } from "../utils/parseDayjsValue";
import { FieldWrapper } from "./FieldWrapper";

const DEFAULT_TIME_FORMAT = "HH:mm:ss";
const PARSE_FORMATS = [DEFAULT_TIME_FORMAT, "HH:mm", "H:mm:ss", "H:mm"];

export type TimeFieldProps = FieldSourceProps & {
  name?: string;
  required?: boolean;
  rules?: FieldRules;
  hideLabel?: boolean;
  /** Output / display format. Default `HH:mm:ss` (Django TimeField). */
  format?: string;
};

export function TimeField({
  source,
  name,
  label,
  required,
  rules,
  hideLabel,
  hidden,
  format = DEFAULT_TIME_FORMAT,
}: TimeFieldProps) {
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
      {({ value, onChange, onBlur, disabled }) => (
        <TimePicker
          value={parseDayjsValue(value, PARSE_FORMATS)}
          onChange={(d) => onChange(d ? d.format(format) : null)}
          onBlur={onBlur}
          disabled={disabled}
          format={format}
          style={{ width: "100%" }}
        />
      )}
    </FieldWrapper>
  );
}

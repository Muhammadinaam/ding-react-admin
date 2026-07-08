import { DatePicker } from "antd";
import type { BaseSourceProps, FieldRules } from "../types";
import { parseDayjsValue } from "../utils/parseDayjsValue";
import { FieldWrapper } from "./FieldWrapper";

const DATE_FORMAT = "YYYY-MM-DD";
const DATE_TIME_FORMAT = `${DATE_FORMAT} HH:mm:ss`;
const PARSE_FORMATS = [DATE_FORMAT, DATE_TIME_FORMAT, "YYYY-MM-DDTHH:mm:ss", "YYYY-MM-DDTHH:mm:ssZ"];

export type DateFieldProps = BaseSourceProps & {
  name?: string;
  required?: boolean;
  rules?: FieldRules;
  showTime?: boolean;
  hideLabel?: boolean;
};

export function DateField({
  source,
  name,
  label,
  required,
  rules,
  showTime,
  hideLabel,
}: DateFieldProps) {
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
        <DatePicker
          value={parseDayjsValue(value, showTime ? [...PARSE_FORMATS, DATE_TIME_FORMAT] : PARSE_FORMATS)}
          onChange={(d) =>
            onChange(
              d
                ? d.format(showTime ? DATE_TIME_FORMAT : DATE_FORMAT)
                : null,
            )
          }
          onBlur={onBlur}
          showTime={showTime}
          disabled={disabled}
          format={showTime ? DATE_TIME_FORMAT : DATE_FORMAT}
          style={{ width: "100%" }}
        />
      )}
    </FieldWrapper>
  );
}

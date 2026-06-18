import { DatePicker } from "antd";
import dayjs from "dayjs";
import type { BaseSourceProps, FieldRules } from "../types";
import { FieldWrapper } from "./FieldWrapper";

const DATE_FORMAT = "YYYY-MM-DD";

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
          value={value ? dayjs(String(value)) : null}
          onChange={(d) =>
            onChange(
              d
                ? d.format(showTime ? `${DATE_FORMAT} HH:mm:ss` : DATE_FORMAT)
                : null,
            )
          }
          onBlur={onBlur}
          showTime={showTime}
          disabled={disabled}
          format={showTime ? `${DATE_FORMAT} HH:mm:ss` : DATE_FORMAT}
          style={{ width: "100%" }}
        />
      )}
    </FieldWrapper>
  );
}

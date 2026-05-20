import { DatePicker } from "antd";
import dayjs from "dayjs";
import type { BaseSourceProps, FieldRules } from "../types";
import { useInlineOrFormField } from "./useInlineOrFormField";

const DATE_FORMAT = "YYYY-MM-DD";

export type DateFieldProps = BaseSourceProps & {
  required?: boolean;
  rules?: FieldRules;
  showTime?: boolean;
};

export function DateField({
  source,
  label,
  required,
  rules,
  showTime,
}: DateFieldProps) {
  const field = useInlineOrFormField(
    source,
    label,
    required,
    rules,
    ({ value, onChange, onBlur, disabled }) => (
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
    ),
  );

  if (field.mode === "inline") return null;
  return field.element;
}

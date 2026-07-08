import type { DateFieldProps } from "./DateField";
import { DateField } from "./DateField";

export type DateTimeFieldProps = Omit<DateFieldProps, "showTime">;

/** Shorthand for `<DateField showTime />` — date + time via Ant Design DatePicker. */
export function DateTimeField(props: DateTimeFieldProps) {
  return <DateField showTime {...props} />;
}

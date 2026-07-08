import dayjs, { type Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function parseDayjsValue(
  value: unknown,
  formats: string[],
): Dayjs | null {
  if (value == null || value === "") return null;
  if (dayjs.isDayjs(value)) return value;
  const parsed = dayjs(String(value), formats, true);
  return parsed.isValid() ? parsed : dayjs(String(value)).isValid() ? dayjs(String(value)) : null;
}

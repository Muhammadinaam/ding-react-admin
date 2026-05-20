import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";
import type { BaseSourceProps } from "../types";
import { useRegisterFilter } from "../context/FilterContext";

export type DateFilterProps = BaseSourceProps;

export function DateFilter({ source, label }: DateFilterProps) {
  const def = useMemo(
    () => ({
      key: source,
      source,
      label,
      render: ({
        value,
        onChange,
      }: {
        value: unknown;
        onChange: (value: unknown) => void;
      }) => (
        <DatePicker
          allowClear
          placeholder={label ?? source}
          value={value ? dayjs(String(value)) : null}
          onChange={(d) => onChange(d ? d.format("YYYY-MM-DD") : undefined)}
          style={{ minWidth: 160 }}
        />
      ),
    }),
    [source, label],
  );
  useRegisterFilter(def);
  return null;
}

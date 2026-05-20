import { Select } from "antd";
import { useMemo } from "react";
import type { BaseSourceProps } from "../types";
import { useRegisterFilter } from "../context/FilterContext";

export type BooleanFilterProps = BaseSourceProps;

export function BooleanFilter({ source, label }: BooleanFilterProps) {
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
        <Select
          allowClear
          placeholder={label ?? source}
          value={value as boolean | undefined}
          onChange={(v) => onChange(v)}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ]}
          style={{ minWidth: 100 }}
        />
      ),
    }),
    [source, label],
  );
  useRegisterFilter(def);
  return null;
}

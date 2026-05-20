import { InputNumber } from "antd";
import { useMemo } from "react";
import type { BaseSourceProps } from "../types";
import { useRegisterFilter } from "../context/FilterContext";

export type NumberFilterProps = BaseSourceProps;

export function NumberFilter({ source, label }: NumberFilterProps) {
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
        <InputNumber
          placeholder={label ?? source}
          value={value as number | undefined}
          onChange={(v) => onChange(v ?? undefined)}
          style={{ minWidth: 120 }}
        />
      ),
    }),
    [source, label],
  );
  useRegisterFilter(def);
  return null;
}

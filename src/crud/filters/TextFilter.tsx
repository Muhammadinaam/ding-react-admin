import { Input } from "antd";
import { useMemo } from "react";
import type { BaseSourceProps } from "../types";
import { useRegisterFilter } from "../context/FilterContext";

export type TextFilterProps = BaseSourceProps & {
  placeholder?: string;
};

export function TextFilter({ source, label, placeholder }: TextFilterProps) {
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
        <Input
          allowClear
          placeholder={placeholder ?? label ?? source}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value || undefined)}
          style={{ minWidth: 160 }}
        />
      ),
    }),
    [source, label, placeholder],
  );
  useRegisterFilter(def);
  return null;
}

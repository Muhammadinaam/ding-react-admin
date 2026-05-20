import { Select } from "antd";
import { useMemo } from "react";
import type { BaseSourceProps, ChoiceOption } from "../types";
import { useRegisterFilter } from "../context/FilterContext";

export type SelectFilterProps = BaseSourceProps & {
  choices: ChoiceOption[];
  multiple?: boolean;
};

export function SelectFilter({
  source,
  label,
  choices,
  multiple,
}: SelectFilterProps) {
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
          mode={multiple ? "multiple" : undefined}
          placeholder={label ?? source}
          value={value as string | number | (string | number)[] | undefined}
          onChange={onChange}
          options={choices}
          style={{ minWidth: 160 }}
        />
      ),
    }),
    [source, label, choices, multiple],
  );
  useRegisterFilter(def);
  return null;
}

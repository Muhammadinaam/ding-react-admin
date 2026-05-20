import { useMemo } from "react";
import type { BaseSourceProps } from "../types";
import { useRegisterColumn } from "../context/ListContext";

export type DateColumnProps = BaseSourceProps & {
  sortable?: boolean;
};

export function DateColumn({ source, label, sortable = true }: DateColumnProps) {
  const def = useMemo(
    () => ({
      key: source,
      source,
      label,
      sortable,
      buildColumn: () => ({
        title: label ?? source,
        dataIndex: source,
        key: source,
        sorter: sortable ? true : undefined,
        render: (v: string) => (v ? String(v).slice(0, 10) : "—"),
      }),
    }),
    [source, label, sortable],
  );
  useRegisterColumn(def);
  return null;
}

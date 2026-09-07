import { useMemo } from "react";
import type { BaseSourceProps } from "../types";
import { columnDataIndex } from "../utils/columnDataIndex";
import { useRegisterColumn } from "../context/ListContext";

export type BooleanColumnProps = BaseSourceProps & {
  sortable?: boolean;
};

export function BooleanColumn({
  source,
  label,
  sortable = true,
}: BooleanColumnProps) {
  const def = useMemo(
    () => ({
      key: source,
      source,
      label,
      sortable,
      buildColumn: () => ({
        title: label ?? source,
        dataIndex: columnDataIndex(source),
        key: source,
        sorter: sortable ? true : undefined,
        render: (v: boolean) => (v ? "Yes" : "No"),
      }),
    }),
    [source, label, sortable],
  );
  useRegisterColumn(def);
  return null;
}

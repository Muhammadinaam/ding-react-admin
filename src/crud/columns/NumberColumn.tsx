import { useMemo } from "react";
import type { BaseSourceProps } from "../types";
import { columnDataIndex } from "../utils/columnDataIndex";
import { useRegisterColumn } from "../context/ListContext";

export type NumberColumnProps = BaseSourceProps & {
  sortable?: boolean;
};

export function NumberColumn({
  source,
  label,
  sortable = true,
}: NumberColumnProps) {
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
      }),
    }),
    [source, label, sortable],
  );
  useRegisterColumn(def);
  return null;
}

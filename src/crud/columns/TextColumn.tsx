import { useMemo } from "react";
import type { BaseSourceProps } from "../types";
import { getByPath } from "../utils/getByPath";
import { useRegisterColumn } from "../context/ListContext";

export type TextColumnProps = BaseSourceProps & {
  sortable?: boolean;
};

export function TextColumn({ source, label, sortable = true }: TextColumnProps) {
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
      }),
    }),
    [source, label, sortable],
  );
  useRegisterColumn(def);
  return null;
}

export function renderDisplayValue(
  record: Record<string, unknown>,
  source: string,
  display?: string | ((record: Record<string, unknown>) => unknown),
): unknown {
  if (typeof display === "function") return display(record);
  if (display) return getByPath(record, display);
  return record[source];
}

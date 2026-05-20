import { useMemo, type ReactNode } from "react";
import { useRegisterColumn } from "../context/ListContext";

export type CustomColumnProps = {
  source: string;
  label?: string;
  sortable?: boolean;
  render: (record: Record<string, unknown>) => ReactNode;
};

export function CustomColumn({
  source,
  label,
  sortable = false,
  render,
}: CustomColumnProps) {
  const def = useMemo(
    () => ({
      key: source,
      source,
      label,
      sortable,
      buildColumn: () => ({
        title: label ?? source,
        key: source,
        render: (_: unknown, record: Record<string, unknown>) => render(record),
      }),
    }),
    [source, label, sortable, render],
  );
  useRegisterColumn(def);
  return null;
}

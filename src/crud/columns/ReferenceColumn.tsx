import { useMemo } from "react";
import type { BaseSourceProps, DisplayProps, ReferenceProps } from "../types";
import { useRegisterColumn } from "../context/ListContext";
import { useChoices } from "../utils/useChoices";
import { renderDisplayValue } from "./TextColumn";

export type ReferenceColumnProps = BaseSourceProps &
  ReferenceProps &
  DisplayProps & {
    sortable?: boolean;
  };

function ReferenceColumnCell({
  record,
  source,
  display,
  reference,
  choices,
  optionLabel,
  optionValue,
}: ReferenceColumnProps & { record: Record<string, unknown> }) {
  const { labelForValue } = useChoices(
    choices,
    reference,
    optionLabel,
    optionValue,
  );
  const raw = record[source];
  if (typeof display === "function") return <>{display(record)}</>;
  if (display && display !== source) {
    const nested = renderDisplayValue(record, source, display);
    return <>{nested != null ? String(nested) : "—"}</>;
  }
  return <>{labelForValue(raw)}</>;
}

export function ReferenceColumn({
  source,
  label,
  reference,
  choices,
  optionLabel = "name",
  optionValue = "id",
  display,
  sortable = true,
}: ReferenceColumnProps) {
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
        render: (_: unknown, record: Record<string, unknown>) => (
          <ReferenceColumnCell
            record={record}
            source={source}
            label={label}
            reference={reference}
            choices={choices}
            optionLabel={optionLabel}
            optionValue={optionValue}
            display={display ?? optionLabel}
          />
        ),
      }),
    }),
    [
      source,
      label,
      sortable,
      reference,
      choices,
      optionLabel,
      optionValue,
      display,
    ],
  );
  useRegisterColumn(def);
  return null;
}

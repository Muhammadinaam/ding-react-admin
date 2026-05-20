import { useMemo } from "react";
import type { BaseSourceProps, DisplayProps, ReferenceProps } from "../types";
import { useRegisterColumn } from "../context/ListContext";
import { useChoices } from "../utils/useChoices";

export type ReferenceManyColumnProps = BaseSourceProps &
  ReferenceProps &
  DisplayProps & {
    sortable?: boolean;
  };

function ReferenceManyColumnCell({
  record,
  source,
  reference,
  choices,
  optionLabel,
  optionValue,
}: ReferenceManyColumnProps & { record: Record<string, unknown> }) {
  const { labelsForValues } = useChoices(
    choices,
    reference,
    optionLabel,
    optionValue,
  );
  const raw = record[source];
  const values = Array.isArray(raw) ? raw : [];
  return <>{labelsForValues(values)}</>;
}

export function ReferenceManyColumn({
  source,
  label,
  reference,
  choices,
  optionLabel = "name",
  optionValue = "id",
  sortable = false,
}: ReferenceManyColumnProps) {
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
          <ReferenceManyColumnCell
            record={record}
            source={source}
            reference={reference}
            choices={choices}
            optionLabel={optionLabel}
            optionValue={optionValue}
          />
        ),
      }),
    }),
    [source, label, sortable, reference, choices, optionLabel, optionValue],
  );
  useRegisterColumn(def);
  return null;
}

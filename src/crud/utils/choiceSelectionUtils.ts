import type { ChoiceOption } from "../types";

export function isRecordObject(
  value: unknown,
  optionValue: string,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    optionValue in value
  );
}

export function valueAsId(
  value: unknown,
  optionValue: string,
): string | number | undefined {
  if (value == null || value === "") return undefined;
  if (isRecordObject(value, optionValue)) {
    const id = value[optionValue];
    if (typeof id === "string" || typeof id === "number") return id;
    return undefined;
  }
  if (typeof value === "string" || typeof value === "number") return value;
  return undefined;
}

export function valuesAsIds(
  values: unknown,
  optionValue: string,
): (string | number)[] {
  if (!Array.isArray(values)) return [];
  return values
    .map((value) => valueAsId(value, optionValue))
    .filter((value): value is string | number => value != null);
}

export function normalizeSelectedIds(
  selectedValues: unknown | unknown[] | undefined,
  optionValue: string,
): unknown[] {
  if (selectedValues == null) return [];
  const values = Array.isArray(selectedValues)
    ? selectedValues
    : [selectedValues];
  return values
    .filter((value) => value != null && value !== "")
    .map((value) =>
      isRecordObject(value, optionValue) ? value[optionValue] : value,
    );
}

export function collectSelectedRecords(
  selectedValues: unknown | unknown[] | undefined,
  selectedRecords: Record<string, unknown> | Record<string, unknown>[] | undefined,
  optionValue: string,
): Record<string, unknown>[] {
  const records: Record<string, unknown>[] = [];

  if (selectedRecords != null) {
    if (Array.isArray(selectedRecords)) {
      records.push(
        ...selectedRecords.filter(
          (record): record is Record<string, unknown> =>
            isRecordObject(record, optionValue),
        ),
      );
    } else if (isRecordObject(selectedRecords, optionValue)) {
      records.push(selectedRecords);
    }
  }

  if (selectedValues == null) return records;

  const values = Array.isArray(selectedValues)
    ? selectedValues
    : [selectedValues];
  for (const value of values) {
    if (isRecordObject(value, optionValue)) {
      records.push(value);
    }
  }

  return records;
}

export function resolveOptionLabel(
  record: Record<string, unknown>,
  optionLabel: string | ((record: Record<string, unknown>) => string),
): string {
  if (typeof optionLabel === "function") return optionLabel(record);
  return String(record[optionLabel] ?? "");
}

export function recordsToOptions(
  records: Record<string, unknown>[],
  optionLabel: string | ((record: Record<string, unknown>) => string),
  optionValue: string,
): ChoiceOption[] {
  return records.map((record) => ({
    label: resolveOptionLabel(record, optionLabel),
    value: record[optionValue],
    record,
  }));
}

export function mergeOptions(
  existing: ChoiceOption[],
  incoming: ChoiceOption[],
): ChoiceOption[] {
  const byValue = new Map<unknown, ChoiceOption>();
  for (const option of existing) byValue.set(option.value, option);
  for (const option of incoming) byValue.set(option.value, option);
  return Array.from(byValue.values());
}

/** Selected ids that do not yet have a matching option (label still unresolved). */
export function unresolvedSelectedIds(
  selectedIds: unknown[],
  knownOptions: ChoiceOption[],
): unknown[] {
  return selectedIds.filter(
    (value) => !knownOptions.some((option) => option.value === value),
  );
}

/**
 * Remember selected labels from a sibling string / string[] on the form record.
 * When ids and labels are the same length, rebuild the map (retrieve / reset).
 * When the user adds or removes ids, keep previous id→label entries so order
 * changes do not scramble labels.
 */
export function mergeSelectedLabelMap(
  selectedIds: unknown[],
  selectedLabels: unknown,
  previous: ReadonlyMap<unknown, string>,
): Map<unknown, string> {
  if (typeof selectedLabels === "string") {
    if (selectedIds.length === 1 && selectedLabels !== "") {
      const next = new Map(previous);
      next.set(selectedIds[0], selectedLabels);
      return next;
    }
    return new Map(previous);
  }

  if (Array.isArray(selectedLabels) && selectedIds.length === selectedLabels.length) {
    const next = new Map<unknown, string>();
    for (let i = 0; i < selectedIds.length; i++) {
      const label = selectedLabels[i];
      const id = selectedIds[i];
      if (typeof label === "string" && id != null && id !== "") {
        next.set(id, label);
      }
    }
    return next;
  }

  return new Map(previous);
}

export function optionsFromLabelMap(
  selectedIds: unknown[],
  labelMap: ReadonlyMap<unknown, string>,
): ChoiceOption[] {
  const options: ChoiceOption[] = [];
  for (const id of selectedIds) {
    const label = labelMap.get(id);
    if (typeof label === "string") {
      options.push({ label, value: id });
    }
  }
  return options;
}

/**
 * Keep options for currently selected ids when replacing the dropdown list
 * (e.g. closing a lazy select) so selected labels do not flash back to raw ids.
 */
export function keepSelectedOptions(
  previous: ChoiceOption[],
  selectedIds: unknown[],
  embeddedOptions: ChoiceOption[] = [],
): ChoiceOption[] {
  const keep = previous.filter((option) =>
    selectedIds.some((value) => option.value === value),
  );
  return mergeOptions(embeddedOptions, keep);
}

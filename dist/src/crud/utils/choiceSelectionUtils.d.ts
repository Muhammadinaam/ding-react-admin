import { ChoiceOption } from '../types';
export declare function isRecordObject(value: unknown, optionValue: string): value is Record<string, unknown>;
export declare function valueAsId(value: unknown, optionValue: string): string | number | undefined;
export declare function valuesAsIds(values: unknown, optionValue: string): (string | number)[];
export declare function normalizeSelectedIds(selectedValues: unknown | unknown[] | undefined, optionValue: string): unknown[];
export declare function collectSelectedRecords(selectedValues: unknown | unknown[] | undefined, selectedRecords: Record<string, unknown> | Record<string, unknown>[] | undefined, optionValue: string): Record<string, unknown>[];
export declare function resolveOptionLabel(record: Record<string, unknown>, optionLabel: string | ((record: Record<string, unknown>) => string)): string;
export declare function recordsToOptions(records: Record<string, unknown>[], optionLabel: string | ((record: Record<string, unknown>) => string), optionValue: string): ChoiceOption[];
export declare function mergeOptions(existing: ChoiceOption[], incoming: ChoiceOption[]): ChoiceOption[];
/** Selected ids that do not yet have a matching option (label still unresolved). */
export declare function unresolvedSelectedIds(selectedIds: unknown[], knownOptions: ChoiceOption[]): unknown[];
/**
 * Remember selected labels from a sibling string / string[] on the form record.
 * When ids and labels are the same length, rebuild the map (retrieve / reset).
 * When the user adds or removes ids, keep previous id→label entries so order
 * changes do not scramble labels.
 */
export declare function mergeSelectedLabelMap(selectedIds: unknown[], selectedLabels: unknown, previous: ReadonlyMap<unknown, string>): Map<unknown, string>;
export declare function optionsFromLabelMap(selectedIds: unknown[], labelMap: ReadonlyMap<unknown, string>): ChoiceOption[];
/**
 * Keep options for currently selected ids when replacing the dropdown list
 * (e.g. closing a lazy select) so selected labels do not flash back to raw ids.
 */
export declare function keepSelectedOptions(previous: ChoiceOption[], selectedIds: unknown[], embeddedOptions?: ChoiceOption[]): ChoiceOption[];
//# sourceMappingURL=choiceSelectionUtils.d.ts.map
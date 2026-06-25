import { ChoiceOption } from '../types';
export declare function isRecordObject(value: unknown, optionValue: string): value is Record<string, unknown>;
export declare function valueAsId(value: unknown, optionValue: string): string | number | undefined;
export declare function valuesAsIds(values: unknown, optionValue: string): (string | number)[];
export declare function normalizeSelectedIds(selectedValues: unknown | unknown[] | undefined, optionValue: string): unknown[];
export declare function collectSelectedRecords(selectedValues: unknown | unknown[] | undefined, selectedRecords: Record<string, unknown> | Record<string, unknown>[] | undefined, optionValue: string): Record<string, unknown>[];
export declare function resolveOptionLabel(record: Record<string, unknown>, optionLabel: string | ((record: Record<string, unknown>) => string)): string;
export declare function recordsToOptions(records: Record<string, unknown>[], optionLabel: string | ((record: Record<string, unknown>) => string), optionValue: string): ChoiceOption[];
export declare function mergeOptions(existing: ChoiceOption[], incoming: ChoiceOption[]): ChoiceOption[];
//# sourceMappingURL=choiceSelectionUtils.d.ts.map
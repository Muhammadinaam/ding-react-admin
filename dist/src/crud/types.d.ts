import { ReactNode } from 'react';
import { ColumnsType } from 'antd/es/table';
import { DataProvider } from '../data/dataProviderTypes';
import { RegisterOptions } from 'react-hook-form';
export type BaseSourceProps = {
    source: string;
    label?: string;
};
export type ChoiceOption = {
    label: string;
    value: unknown;
    /** Full record when loaded from a reference resource (for dependent fields). */
    record?: Record<string, unknown>;
};
export type ChoicesContext = {
    dataProvider: DataProvider;
    search?: string;
};
export type ChoicesLoader = {
    resource: string;
    filter?: Record<string, unknown>;
} | ChoiceOption[] | ((ctx: ChoicesContext) => Promise<ChoiceOption[]>);
export type ReferenceProps = {
    reference?: string;
    choices?: ChoicesLoader;
    optionLabel?: string | ((record: Record<string, unknown>) => string);
    optionValue?: string;
    /** When true (default), options load on dropdown open / search instead of on mount. */
    lazy?: boolean;
    /**
     * Key on the loaded form record with the related object or array of objects.
     * Use when retrieve embeds relations, e.g. `source="branch_id"` + `recordSource="branch"`.
     */
    recordSource?: string;
    /**
     * When true (default), fetch labels for primitive ids via `getOne` if they are not
     * already embedded in the form record. Set `false` to never call `getOne`.
     */
    fetchSelected?: boolean;
};
export type DisplayProps = {
    display?: string | ((record: Record<string, unknown>) => ReactNode);
};
export type FieldRules = RegisterOptions;
export type ColumnDefinition<T extends Record<string, unknown>> = {
    key: string;
    source: string;
    label?: string;
    sortable?: boolean;
    buildColumn: () => ColumnsType<T>[number];
};
export type FilterDefinition = {
    key: string;
    source: string;
    label?: string;
    render: (props: {
        value: unknown;
        onChange: (value: unknown) => void;
    }) => ReactNode;
};
export type InlineFormSetBaseProps = {
    /** RHF `useFieldArray` name and default API nested key, e.g. `"lines"`. */
    field: string;
    label?: string;
    /** API key when different from `field`. */
    payloadKey?: string;
    transformRows?: (rows: Record<string, unknown>[]) => unknown;
};
/** Passed to each tabular inline column's `cell` renderer. */
export type InlineCellContext = {
    /** Full RHF path, e.g. `lines.0.label`. */
    name: string;
    index: number;
    field: string;
};
export type InlineColumnDef = {
    source: string;
    label?: string;
    width?: number | string;
    minWidth?: number | string;
    cell: (ctx: InlineCellContext) => ReactNode;
};
/** Passed to `InlineFormSetStacked`'s `renderRow` for one related row. */
export type InlineRowContext = {
    field: string;
    index: number;
    /** RHF path helper — `name("label")` → `field.index.label`. */
    name: (source: string) => string;
};
export type EditMode = "page" | "modal" | "both";
/** Toggle built-in row actions. Omitted keys default to `true` (still gated by permissions). */
export type ResourceListBuiltInActions = {
    edit?: boolean;
    quickEdit?: boolean;
    delete?: boolean;
};
export type ResourceListRowActionsHelpers = {
    reload: () => void;
    openEditModal: (id: string | number) => void;
};
export type ResourceListBulkActionHelpers = {
    reload: () => void;
    clearSelection: () => void;
};
/** Bulk list action (Django admin–style). Runs on selected row ids. */
export type ResourceListBulkAction = {
    key: string;
    label: string;
    /** Optional confirmation message. Return false to cancel. */
    confirm?: string | ((selectedIds: (string | number)[], helpers: ResourceListBulkActionHelpers) => string | false | Promise<string | false>);
    execute: (selectedIds: (string | number)[], helpers: ResourceListBulkActionHelpers) => void | Promise<void>;
};
export declare const LIST_QUERY_RESERVED: Set<string>;
//# sourceMappingURL=types.d.ts.map
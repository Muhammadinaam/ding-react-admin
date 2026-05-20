import type { ReactNode } from "react";
import type { ColumnsType } from "antd/es/table";
import type { DataProvider } from "../data/dataProviderTypes";
import type { RegisterOptions } from "react-hook-form";

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

export type ChoicesLoader =
  | { resource: string; filter?: Record<string, unknown> }
  | ChoiceOption[]
  | ((ctx: ChoicesContext) => Promise<ChoiceOption[]>);

export type ReferenceProps = {
  reference?: string;
  choices?: ChoicesLoader;
  optionLabel?: string | ((record: Record<string, unknown>) => string);
  optionValue?: string;
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

export type InlineFieldDefinition = {
  key: string;
  source: string;
  label?: string;
  /** Column width in tabular inline tables (Ant Design Table `width`). */
  width?: number | string;
  /** Minimum column width in tabular inline tables. */
  minWidth?: number | string;
  render: (props: {
    name: string;
    index: number;
  }) => ReactNode;
};

export type InlineFieldOptions = {
  width?: number | string;
  minWidth?: number | string;
};

export type FieldRenderProps = {
  value: unknown;
  onChange: (value: unknown) => void;
  onBlur: () => void;
  disabled?: boolean;
  /** Set when rendered inside `InlineFormSet`. */
  name?: string;
  index?: number;
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
  confirm?:
    | string
    | ((
        selectedIds: (string | number)[],
        helpers: ResourceListBulkActionHelpers,
      ) => string | false | Promise<string | false>);
  execute: (
    selectedIds: (string | number)[],
    helpers: ResourceListBulkActionHelpers,
  ) => void | Promise<void>;
};

export const LIST_QUERY_RESERVED = new Set([
  "page",
  "perPage",
  "sort",
  "create",
  "edit",
]);

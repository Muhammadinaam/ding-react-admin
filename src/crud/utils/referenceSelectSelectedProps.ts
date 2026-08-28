import type { SelectProps } from "antd";

/** Select loading/disabled while selected labels resolve via getOne. */
export function referenceSelectSelectedProps(
  listLoading: boolean,
  selectedLoading: boolean,
  disabled?: boolean,
): Pick<SelectProps, "loading" | "disabled"> {
  return {
    loading: listLoading || selectedLoading,
    disabled: Boolean(disabled || selectedLoading),
  };
}

/** Omit the raw id from the Select while the selected label is still loading. */
export function referenceSelectDisplayValue<T>(
  selectedLoading: boolean,
  value: T,
  empty: T,
): T {
  return selectedLoading ? empty : value;
}

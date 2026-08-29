import { SelectProps } from 'antd';
/** Select loading/disabled while selected labels resolve via getOne. */
export declare function referenceSelectSelectedProps(listLoading: boolean, selectedLoading: boolean, disabled?: boolean): Pick<SelectProps, "loading" | "disabled">;
/** Omit the raw id from the Select while the selected label is still loading. */
export declare function referenceSelectDisplayValue<T>(selectedLoading: boolean, value: T, empty: T): T;
//# sourceMappingURL=referenceSelectSelectedProps.d.ts.map
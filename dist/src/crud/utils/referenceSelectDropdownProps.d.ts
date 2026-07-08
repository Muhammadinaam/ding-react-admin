import { SelectProps } from 'antd';
export declare const REFERENCE_SELECT_POPUP_MIN_WIDTH = 360;
export type ReferenceSelectDropdownOptions = {
    /** When false (default), the dropdown may be wider than the input. */
    popupMatchSelectWidth?: boolean | number;
    /** Minimum popup width in px when `popupMatchSelectWidth` is false. */
    popupMinWidth?: number;
};
/** Ant Design Select props so reference dropdowns are not clipped to input width. */
export declare function referenceSelectDropdownProps(options?: ReferenceSelectDropdownOptions): Pick<SelectProps, "popupMatchSelectWidth" | "styles">;
//# sourceMappingURL=referenceSelectDropdownProps.d.ts.map
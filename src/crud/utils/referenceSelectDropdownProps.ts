import type { SelectProps } from "antd";

export const REFERENCE_SELECT_POPUP_MIN_WIDTH = 360;

export type ReferenceSelectDropdownOptions = {
  /** When false (default), the dropdown may be wider than the input. */
  popupMatchSelectWidth?: boolean | number;
  /** Minimum popup width in px when `popupMatchSelectWidth` is false. */
  popupMinWidth?: number;
};

/** Ant Design Select props so reference dropdowns are not clipped to input width. */
export function referenceSelectDropdownProps(
  options: ReferenceSelectDropdownOptions = {},
): Pick<SelectProps, "popupMatchSelectWidth" | "styles"> {
  const popupMatchSelectWidth = options.popupMatchSelectWidth ?? false;
  if (popupMatchSelectWidth !== false) {
    return { popupMatchSelectWidth };
  }

  const minWidth = options.popupMinWidth ?? REFERENCE_SELECT_POPUP_MIN_WIDTH;
  return {
    popupMatchSelectWidth: false,
    styles: {
      popup: {
        root: { minWidth },
      },
    },
  };
}

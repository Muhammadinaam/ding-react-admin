import { BaseSourceProps } from '../types';
/** Default debounce for list text filters (ms). */
export declare const DEFAULT_TEXT_FILTER_DEBOUNCE_MS = 300;
export type TextFilterProps = BaseSourceProps & {
    placeholder?: string;
    /**
     * Debounce delay before applying the filter to the list / URL (ms).
     * Defaults to `ResourceList` `textFilterDebounceMs`, then {@link DEFAULT_TEXT_FILTER_DEBOUNCE_MS}.
     * Set `0` for immediate apply (legacy behavior).
     */
    debounceMs?: number;
};
export declare function TextFilter({ source, label, placeholder, debounceMs: debounceMsProp, }: TextFilterProps): null;
//# sourceMappingURL=TextFilter.d.ts.map
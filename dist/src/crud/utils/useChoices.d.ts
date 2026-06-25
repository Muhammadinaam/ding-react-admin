import { ChoiceOption, ChoicesLoader } from '../types';
export type UseChoicesOptions = {
    /** When true, the option list loads only while the dropdown is open or the user is searching. */
    lazy?: boolean;
    /** Dropdown open or active search — triggers lazy list loading. */
    active?: boolean;
    /**
     * Current field value — primitive id(s), nested object(s), or mixed.
     * Objects shaped like `{ id, name, … }` are turned into options without `getOne`.
     */
    selectedValues?: unknown | unknown[];
    /**
     * Related record(s) from the loaded form row (e.g. `recordSource="branch"`).
     * Used to show labels on edit when the retrieve API embeds relations.
     */
    selectedRecords?: Record<string, unknown> | Record<string, unknown>[];
    /**
     * When true (default), fetch labels for primitive ids via `getOne` if they are
     * not already known from `selectedValues` / `selectedRecords`.
     */
    fetchSelected?: boolean;
    /**
     * Cache list results in memory. Defaults to `false` when `lazy` is true so each
     * dropdown open refetches; eager loads (e.g. table columns) default to `true`.
     */
    cache?: boolean;
};
export declare function useChoices(loader: ChoicesLoader | undefined, reference: string | undefined, optionLabel?: string | ((record: Record<string, unknown>) => string), optionValue?: string, search?: string, hookOptions?: UseChoicesOptions): {
    options: ChoiceOption[];
    loading: boolean;
    labelForValue: (value: unknown) => string;
    labelsForValues: (values: unknown[]) => string;
    optionForValue: (value: unknown) => ChoiceOption | undefined;
    reload: () => Promise<void>;
};
//# sourceMappingURL=useChoices.d.ts.map
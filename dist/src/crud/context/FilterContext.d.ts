import { ReactNode } from 'react';
import { FilterDefinition } from '../types';
type FilterContextValue = {
    registerFilter: (def: FilterDefinition) => () => void;
    filters: FilterDefinition[];
    values: Record<string, unknown>;
    setFilterValue: (source: string, value: unknown) => void;
};
export declare function FilterContextProvider({ children, values, setFilterValue, }: {
    children: ReactNode;
    values: Record<string, unknown>;
    setFilterValue: (source: string, value: unknown) => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function useFilterContext(): FilterContextValue | null;
export declare function useRegisterFilter(def: FilterDefinition): void;
export {};
//# sourceMappingURL=FilterContext.d.ts.map
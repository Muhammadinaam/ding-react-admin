import { ReactNode } from 'react';
import { ColumnDefinition } from '../types';
type ListContextValue = {
    registerColumn: (def: ColumnDefinition<Record<string, unknown>>) => () => void;
    columns: ColumnDefinition<Record<string, unknown>>[];
    toggleSort: (field: string) => void;
    sortFields: Set<string>;
    sortOrders: Map<string, "ASC" | "DESC">;
    sortPriorities: Map<string, number>;
};
export declare function ListContextProvider({ children, toggleSort, sort, }: {
    children: ReactNode;
    toggleSort: (field: string) => void;
    sort: {
        field: string;
        order: "ASC" | "DESC";
    }[];
}): import("react/jsx-runtime").JSX.Element;
export declare function useListContext(): ListContextValue;
export declare function useRegisterColumn(def: ColumnDefinition<Record<string, unknown>>): void;
export {};
//# sourceMappingURL=ListContext.d.ts.map
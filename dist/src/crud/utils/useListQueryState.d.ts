import { SortSpec } from '../../data/dataProviderTypes';
export type ListQueryState = {
    page: number;
    perPage: number;
    sort: SortSpec[];
    filter: Record<string, unknown>;
    createModal: boolean;
    editId: string | null;
};
export type ListQueryActions = {
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
    setSort: (sort: SortSpec[]) => void;
    toggleSort: (field: string) => void;
    setFilter: (source: string, value: unknown) => void;
    setFilters: (filter: Record<string, unknown>) => void;
    openCreateModal: () => void;
    openEditModal: (id: string | number) => void;
    closeModal: () => void;
};
export declare function useListQueryState(staticFilter?: Record<string, unknown>): [ListQueryState, ListQueryActions];
//# sourceMappingURL=useListQueryState.d.ts.map
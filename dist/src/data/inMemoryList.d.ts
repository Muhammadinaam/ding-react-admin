import { GetListParams, Identifier } from './dataProviderTypes';
export declare function getById<T extends {
    id: number;
}>(rows: T[], id: Identifier): T;
export declare function filterRows<T extends Record<string, unknown>>(rows: T[], filter?: Record<string, unknown>): T[];
/** Apply CRUD list filters, sort, and pagination to an in-memory row array. */
export declare function applyInMemoryListParams<T extends Record<string, unknown>>(rows: T[], params: GetListParams): {
    data: T[];
    total: number;
};
//# sourceMappingURL=inMemoryList.d.ts.map
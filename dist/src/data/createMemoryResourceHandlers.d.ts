import { GetListParams } from './dataProviderTypes';
import { ResourceHandlers } from './resourceHandlers';
type Row = Record<string, unknown>;
export type MemoryResourceHandlersConfig<T extends Record<string, unknown> & {
    id: string | number;
}> = {
    getRows: () => T[];
    nextId: () => string | number;
    /** Defaults to `{ ...data, id }` from form field sources. */
    mapCreate?: (data: Row, id: string | number) => T;
    /** Defaults to spread patch over current row. */
    applyUpdate?: (current: T, patch: Row) => T;
    scopeList?: (rows: T[], params: GetListParams) => T[];
    afterDelete?: (removed: T) => void;
};
/**
 * Generic in-memory CRUD for demos and tests. Override hooks for entity-specific rules.
 */
export declare function createMemoryResourceHandlers<T extends Record<string, unknown> & {
    id: string | number;
}>(config: MemoryResourceHandlersConfig<T>): ResourceHandlers<T>;
export {};
//# sourceMappingURL=createMemoryResourceHandlers.d.ts.map
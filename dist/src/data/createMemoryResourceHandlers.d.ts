import { GetListParams } from './dataProviderTypes';
import { ResourceHandlers } from './resourceHandlers';
type Row = Record<string, unknown>;
export type MemoryResourceHandlersConfig<T extends Record<string, unknown> & {
    id: number;
}> = {
    getRows: () => T[];
    nextId: () => number;
    mapCreate: (data: Row, id: number) => T;
    applyUpdate?: (current: T, patch: Row) => T;
    /** Narrow rows before list filter/sort (e.g. parent FK scope). */
    scopeList?: (rows: T[], params: GetListParams) => T[];
    afterDelete?: (removed: T) => void;
};
/**
 * Generic in-memory CRUD for demos and tests. Override hooks for entity-specific rules.
 */
export declare function createMemoryResourceHandlers<T extends Record<string, unknown> & {
    id: number;
}>(config: MemoryResourceHandlersConfig<T>): ResourceHandlers<T>;
export {};
//# sourceMappingURL=createMemoryResourceHandlers.d.ts.map
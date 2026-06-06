import { CreateResult, DataProvider, DeleteResult, GetListParams, GetListResult, GetOneResult, Identifier, UpdateParams, UpdateResult } from './dataProviderTypes';
export type ResourceAction = "list" | "read" | "write" | "delete";
export type ResourceGuard = (resource: string, action: ResourceAction) => void;
/** CRUD handlers for a single resource (no resource name on each method). */
export type ResourceHandlers<RecordType extends Record<string, unknown> = Record<string, unknown>> = {
    getList: (params: GetListParams) => Promise<GetListResult<RecordType>>;
    getOne: (id: Identifier) => Promise<GetOneResult<RecordType>>;
    create: (data: Partial<RecordType>) => Promise<CreateResult<RecordType>>;
    update: (params: UpdateParams<RecordType>) => Promise<UpdateResult<RecordType>>;
    delete: (id: Identifier) => Promise<DeleteResult<RecordType>>;
};
export type ResourceHandlerMap = Record<string, ResourceHandlers>;
export type CombineResourceHandlersOptions = {
    /** Optional auth / logging hook before each operation. */
    guard?: ResourceGuard;
};
/**
 * Compose per-entity handlers into a react-admin-style `DataProvider`.
 * Map an OpenAPI / tRPC / REST client in each entity module, then register here.
 */
export declare function combineResourceHandlers(handlers: ResourceHandlerMap, options?: CombineResourceHandlersOptions): DataProvider;
//# sourceMappingURL=resourceHandlers.d.ts.map
import { PermissionsChecker } from '../context/PermissionsProvider';
import { ResourcePermissions } from '../permissions/resourcePermissions';
import { CreateResult, DataProvider, DeleteResult, GetListParams, GetListResult, GetOneResult, Identifier, ParseFormError, UpdateParams, UpdateResult } from './dataProviderTypes';
export type ResourceAction = "list" | "read" | "add" | "change" | "delete";
/** @deprecated Use per-resource `permissions` with `can` in combineResourceHandlers options. */
export type ResourceGuard = (resource: string, action: ResourceAction) => void;
/** CRUD handlers for a single resource (no resource name on each method). */
export type ResourceHandlers<RecordType extends Record<string, unknown> = Record<string, unknown>> = {
    getList: (params: GetListParams) => Promise<GetListResult<RecordType>>;
    getOne: (id: Identifier) => Promise<GetOneResult<RecordType>>;
    create: (data: Partial<RecordType>) => Promise<CreateResult<RecordType>>;
    update: (params: UpdateParams<RecordType>) => Promise<UpdateResult<RecordType>>;
    delete: (id: Identifier) => Promise<DeleteResult<RecordType>>;
};
export type ResourceHandlerEntry = ResourceHandlers | {
    handlers: ResourceHandlers;
    permissions?: ResourcePermissions;
};
export type ResourceHandlerMap = Record<string, ResourceHandlerEntry>;
export type CombineResourceHandlersOptions = {
    /** Permission checker from PermissionsProvider wiring. */
    can?: PermissionsChecker;
    /** @deprecated Use per-resource `permissions` entries instead. */
    guard?: ResourceGuard;
    /** Wired to `ResourceForm` / `ResourceFormModal` save error handling. */
    parseFormError?: ParseFormError;
};
/**
 * Compose per-entity handlers into a react-admin-style `DataProvider`.
 * Map an OpenAPI / tRPC / REST client in each entity module, then register here.
 */
export declare function combineResourceHandlers(handlers: ResourceHandlerMap, options?: CombineResourceHandlersOptions): DataProvider;
//# sourceMappingURL=resourceHandlers.d.ts.map
import type {
  CreateResult,
  DataProvider,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetOneResult,
  Identifier,
  UpdateParams,
  UpdateResult,
} from "./dataProviderTypes";

export type ResourceAction = "list" | "read" | "write" | "delete";

export type ResourceGuard = (
  resource: string,
  action: ResourceAction,
) => void;

/** CRUD handlers for a single resource (no resource name on each method). */
export type ResourceHandlers<
  RecordType extends Record<string, unknown> = Record<string, unknown>,
> = {
  getList: (params: GetListParams) => Promise<GetListResult<RecordType>>;
  getOne: (id: Identifier) => Promise<GetOneResult<RecordType>>;
  create: (data: Partial<RecordType>) => Promise<CreateResult<RecordType>>;
  update: (
    params: UpdateParams<RecordType>,
  ) => Promise<UpdateResult<RecordType>>;
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
export function combineResourceHandlers(
  handlers: ResourceHandlerMap,
  options?: CombineResourceHandlersOptions,
): DataProvider {
  const guard = options?.guard;

  const resolve = (resource: string): ResourceHandlers => {
    const h = handlers[resource];
    if (!h) throw new Error(`Unknown resource: ${resource}`);
    return h;
  };

  return {
    async getList(resource, params) {
      guard?.(resource, "list");
      return resolve(resource).getList(params);
    },
    async getOne(resource, id) {
      guard?.(resource, "read");
      return resolve(resource).getOne(id);
    },
    async create(resource, data) {
      guard?.(resource, "write");
      return resolve(resource).create(data);
    },
    async update(resource, params) {
      guard?.(resource, "write");
      return resolve(resource).update(params);
    },
    async delete(resource, id) {
      guard?.(resource, "delete");
      return resolve(resource).delete(id);
    },
  };
}

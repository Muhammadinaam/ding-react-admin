import type { PermissionsChecker } from "../context/PermissionsProvider";
import type { ResourcePermissions } from "../permissions/resourcePermissions";
import { checkResourcePermission } from "../permissions/resourcePermissions";
import type {
  CreateResult,
  DataProvider,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetOneResult,
  Identifier,
  ParseFormError,
  UpdateParams,
  UpdateResult,
} from "./dataProviderTypes";

export type ResourceAction = "list" | "read" | "add" | "change" | "delete";

/** @deprecated Use per-resource `permissions` with `can` in combineResourceHandlers options. */
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

export type ResourceHandlerEntry =
  | ResourceHandlers
  | {
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

function resolveEntry(entry: ResourceHandlerEntry): {
  handlers: ResourceHandlers;
  permissions?: ResourcePermissions;
} {
  if ("handlers" in entry) return entry;
  return { handlers: entry };
}

function assertPermission(
  can: PermissionsChecker | undefined,
  permissions: ResourcePermissions | undefined,
  slot: keyof ResourcePermissions,
) {
  if (!can || !permissions) return;
  if (!checkResourcePermission(can, permissions, slot)) {
    throw new Error("Forbidden");
  }
}

/**
 * Compose per-entity handlers into a react-admin-style `DataProvider`.
 * Map an OpenAPI / tRPC / REST client in each entity module, then register here.
 */
export function combineResourceHandlers(
  handlers: ResourceHandlerMap,
  options?: CombineResourceHandlersOptions,
): DataProvider {
  const { can, guard, parseFormError } = options ?? {};

  const resolve = (resource: string) => {
    const entry = handlers[resource];
    if (!entry) throw new Error(`Unknown resource: ${resource}`);
    return resolveEntry(entry);
  };

  return {
    async getList(resource, params) {
      const { handlers: h, permissions } = resolve(resource);
      guard?.(resource, "list");
      assertPermission(can, permissions, "list");
      return h.getList(params);
    },
    async getOne(resource, id) {
      const { handlers: h, permissions } = resolve(resource);
      guard?.(resource, "read");
      assertPermission(can, permissions, "read");
      return h.getOne(id);
    },
    async create(resource, data) {
      const { handlers: h, permissions } = resolve(resource);
      guard?.(resource, "add");
      assertPermission(can, permissions, "add");
      return h.create(data);
    },
    async update(resource, params) {
      const { handlers: h, permissions } = resolve(resource);
      guard?.(resource, "change");
      assertPermission(can, permissions, "change");
      return h.update(params);
    },
    async delete(resource, id) {
      const { handlers: h, permissions } = resolve(resource);
      guard?.(resource, "delete");
      assertPermission(can, permissions, "delete");
      return h.delete(id);
    },
    parseFormError,
  };
}

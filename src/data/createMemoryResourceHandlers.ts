import { applyInMemoryListParams, getById } from "./inMemoryList";
import type {
  CreateResult,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetOneResult,
  UpdateResult,
} from "./dataProviderTypes";
import type { ResourceHandlers } from "./resourceHandlers";

type Row = Record<string, unknown>;

export type MemoryResourceHandlersConfig<
  T extends Record<string, unknown> & { id: number },
> = {
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
export function createMemoryResourceHandlers<
  T extends Record<string, unknown> & { id: number },
>(config: MemoryResourceHandlersConfig<T>): ResourceHandlers<T> {
  const asRows = (xs: T[]) => xs as unknown as Row[];

  return {
    async getList(params): Promise<GetListResult<T>> {
      const base = config.scopeList
        ? config.scopeList(config.getRows(), params)
        : config.getRows();
      return applyInMemoryListParams(asRows(base), params) as GetListResult<T>;
    },

    async getOne(id): Promise<GetOneResult<T>> {
      return { data: getById(config.getRows(), id) as T };
    },

    async create(data): Promise<CreateResult<T>> {
      const row = config.mapCreate(data as Row, config.nextId());
      config.getRows().push(row);
      return { data: row };
    },

    async update({ id, data }): Promise<UpdateResult<T>> {
      const current = getById(config.getRows(), id);
      const patch = data as Row;
      const next = config.applyUpdate
        ? config.applyUpdate(current, patch)
        : ({ ...current, ...patch, id: current.id } as T);
      Object.assign(current, next);
      return { data: current };
    },

    async delete(id): Promise<DeleteResult<T>> {
      const rows = config.getRows();
      const n = typeof id === "string" ? Number(id) : id;
      const idx = rows.findIndex((r) => r.id === n);
      if (idx < 0) return { data: null };
      const [removed] = rows.splice(idx, 1);
      config.afterDelete?.(removed);
      return { data: removed };
    },
  };
}

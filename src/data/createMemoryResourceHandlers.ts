import { applyInMemoryListParams, getById, rowIdMatches } from "./inMemoryList";
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
  T extends Record<string, unknown> & { id: string | number },
> = {
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
export function createMemoryResourceHandlers<
  T extends Record<string, unknown> & { id: string | number },
>(config: MemoryResourceHandlersConfig<T>): ResourceHandlers<T> {
  const asRows = (xs: T[]) => xs as unknown as Row[];

  const mapCreate =
    config.mapCreate ??
    ((data: Row, id: string | number) => ({ ...data, id }) as T);

  const applyUpdate =
    config.applyUpdate ??
    ((current: T, patch: Row) => ({ ...current, ...patch, id: current.id }) as T);

  return {
    async getList(params): Promise<GetListResult<T>> {
      const base = config.scopeList
        ? config.scopeList(config.getRows(), params)
        : config.getRows();
      return applyInMemoryListParams(asRows(base), params) as GetListResult<T>;
    },

    async getOne(id, _params?): Promise<GetOneResult<T>> {
      return { data: getById(config.getRows(), id) as T };
    },

    async create(data): Promise<CreateResult<T>> {
      const row = mapCreate(data as Row, config.nextId());
      config.getRows().push(row);
      return { data: row };
    },

    async update({ id, data }): Promise<UpdateResult<T>> {
      const current = getById(config.getRows(), id);
      const patch = data as Row;
      const next = applyUpdate(current, patch);
      Object.assign(current, next);
      return { data: current };
    },

    async delete(id): Promise<DeleteResult<T>> {
      const rows = config.getRows();
      const idx = rows.findIndex((r) => rowIdMatches(r.id, id));
      if (idx < 0) return { data: null };
      const [removed] = rows.splice(idx, 1);
      config.afterDelete?.(removed);
      return { data: removed };
    },
  };
}

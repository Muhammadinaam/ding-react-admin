import type { GetListParams, GetOneParams, Identifier } from "./dataProviderTypes";
import type { ResourceHandlers } from "./resourceHandlers";

export type RestResourceHandlersConfig<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  list: (params: GetListParams) => Promise<{ data: T[]; total: number }>;
  retrieve: (id: Identifier, params?: GetOneParams) => Promise<T>;
  create: (data: Record<string, unknown>) => Promise<T>;
  update: (id: Identifier, data: Record<string, unknown>) => Promise<T>;
  destroy: (id: Identifier) => Promise<void>;
  /** When API create body differs from form `source` paths. */
  transformCreate?: (data: Record<string, unknown>) => unknown;
  /** When API update body differs from form `source` paths. */
  transformUpdate?: (data: Record<string, unknown>) => unknown;
};

/**
 * Thin CRUD glue for REST backends. Form payload comes from field `source` paths;
 * wire your fetch or API client in the five functions below.
 */
export function createRestResourceHandlers<
  T extends Record<string, unknown> = Record<string, unknown>,
>(config: RestResourceHandlersConfig<T>): ResourceHandlers<T> {
  return {
    async getList(params) {
      return config.list(params);
    },

    async getOne(id, params) {
      return { data: await config.retrieve(id, params) };
    },

    async create(data) {
      const body = config.transformCreate
        ? config.transformCreate(data as Record<string, unknown>)
        : data;
      return {
        data: await config.create(body as Record<string, unknown>),
      };
    },

    async update({ id, data }) {
      const body = config.transformUpdate
        ? config.transformUpdate(data as Record<string, unknown>)
        : data;
      return {
        data: await config.update(id, body as Record<string, unknown>),
      };
    },

    async delete(id) {
      await config.destroy(id);
      return { data: null };
    },
  };
}

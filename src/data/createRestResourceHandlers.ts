import type { GetListParams, GetOneParams, Identifier, FormMutationBody } from "./dataProviderTypes";
import type { ResourceHandlers } from "./resourceHandlers";

export type RestResourceHandlersConfig<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  list: (params: GetListParams) => Promise<{ data: T[]; total: number }>;
  retrieve: (id: Identifier, params?: GetOneParams) => Promise<T>;
  create: (data: FormMutationBody) => Promise<T>;
  update: (id: Identifier, data: FormMutationBody) => Promise<T>;
  destroy: (id: Identifier) => Promise<void>;
  /** When API create body differs from form `source` paths. Not applied when body is already `FormData`. */
  transformCreate?: (data: Record<string, unknown>) => unknown;
  /** When API update body differs from form `source` paths. Not applied when body is already `FormData`. */
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
      const body =
        data instanceof FormData
          ? data
          : config.transformCreate
            ? config.transformCreate(data as Record<string, unknown>)
            : data;
      return {
        data: await config.create(body as FormMutationBody),
      };
    },

    async update({ id, data }) {
      const body =
        data instanceof FormData
          ? data
          : config.transformUpdate
            ? config.transformUpdate(data as Record<string, unknown>)
            : data;
      return {
        data: await config.update(id, body as FormMutationBody),
      };
    },

    async delete(id) {
      await config.destroy(id);
      return { data: null };
    },
  };
}

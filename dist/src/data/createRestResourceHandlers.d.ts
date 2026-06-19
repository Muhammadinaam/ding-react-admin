import { GetListParams, GetOneParams, Identifier, FormMutationBody } from './dataProviderTypes';
import { ResourceHandlers } from './resourceHandlers';
export type RestResourceHandlersConfig<T extends Record<string, unknown> = Record<string, unknown>> = {
    list: (params: GetListParams) => Promise<{
        data: T[];
        total: number;
    }>;
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
export declare function createRestResourceHandlers<T extends Record<string, unknown> = Record<string, unknown>>(config: RestResourceHandlersConfig<T>): ResourceHandlers<T>;
//# sourceMappingURL=createRestResourceHandlers.d.ts.map
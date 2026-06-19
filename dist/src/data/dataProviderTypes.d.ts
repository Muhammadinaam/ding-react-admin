/** Resource primary key as accepted by `DataProvider` methods. */
export type Identifier = string | number;
export type SortOrder = "ASC" | "DESC";
export type SortSpec = {
    field: string;
    order: SortOrder;
};
export type PaginationParams = {
    page: number;
    perPage: number;
};
export type GetOneParams = {
    /** Forward to fetch/axios to cancel in-flight reads when the UI unmounts or deps change. */
    signal?: AbortSignal;
};
export type GetListParams = {
    pagination?: PaginationParams;
    /** Single or multi-column sort. */
    sort?: SortSpec | SortSpec[];
    /** Filter values; arrays mean "match any of" for that field. */
    filter?: Record<string, unknown>;
    /** Forward to fetch/axios to cancel in-flight reads when the UI unmounts or deps change. */
    signal?: AbortSignal;
};
export type GetListResult<RecordType extends Record<string, unknown>> = {
    data: RecordType[];
    total: number;
};
export type GetOneResult<RecordType extends Record<string, unknown>> = {
    data: RecordType;
};
export type CreateResult<RecordType extends Record<string, unknown>> = {
    data: RecordType;
};
export type UpdateParams<RecordType extends Record<string, unknown>> = {
    id: Identifier;
    data: Partial<RecordType> | FormData;
};
export type UpdateResult<RecordType extends Record<string, unknown>> = {
    data: RecordType;
};
export type DeleteResult<RecordType extends Record<string, unknown>> = {
    data: RecordType | null;
};
/** Save body from forms — plain JSON object or multipart `FormData` when uploads are present. */
export type FormMutationBody = Record<string, unknown> | FormData;
export type FormMutation = "create" | "update";
export type ParseFormErrorContext = {
    resource: string;
    mutation: FormMutation;
    /** Top-level inline field-array paths on the form, e.g. `["lines"]`. */
    inlineFieldPaths?: string[];
};
/** Field paths match react-hook-form `name` (form `source` or inline `arrayName.index.source`). */
export type FormValidationErrors = {
    fields?: Record<string, string | string[]>;
    /** Errors not tied to a single field (e.g. non_field_errors). */
    global?: string | string[];
};
export type ParseFormError = (error: unknown, context: ParseFormErrorContext) => FormValidationErrors | null | undefined;
/**
 * Small, framework-agnostic data layer (react-admin–style names).
 * Implement with REST, GraphQL, or an in-memory mock.
 */
export type DataProvider<RecordType extends Record<string, unknown> = Record<string, unknown>> = {
    getList: (resource: string, params: GetListParams) => Promise<GetListResult<RecordType>>;
    getOne: (resource: string, id: Identifier, params?: GetOneParams) => Promise<GetOneResult<RecordType>>;
    create: (resource: string, data: Partial<RecordType> | FormData) => Promise<CreateResult<RecordType>>;
    update: (resource: string, params: UpdateParams<RecordType>) => Promise<UpdateResult<RecordType>>;
    delete: (resource: string, id: Identifier) => Promise<DeleteResult<RecordType>>;
    /** Map API validation errors to form field paths. Optional. */
    parseFormError?: ParseFormError;
};
//# sourceMappingURL=dataProviderTypes.d.ts.map
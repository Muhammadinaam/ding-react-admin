/** Resource primary key as accepted by `DataProvider` methods. */
export type Identifier = string | number;

export type SortOrder = "ASC" | "DESC";

export type PaginationParams = {
  page: number;
  perPage: number;
};

export type GetListParams = {
  pagination?: PaginationParams;
  sort?: { field: string; order: SortOrder };
  filter?: Record<string, unknown>;
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
  data: Partial<RecordType>;
};

export type UpdateResult<RecordType extends Record<string, unknown>> = {
  data: RecordType;
};

export type DeleteResult<RecordType extends Record<string, unknown>> = {
  data: RecordType | null;
};

/**
 * Small, framework-agnostic data layer (react-admin–style names).
 * Implement with REST, GraphQL, or an in-memory mock.
 */
export type DataProvider<
  RecordType extends Record<string, unknown> = Record<string, unknown>,
> = {
  getList: (
    resource: string,
    params: GetListParams,
  ) => Promise<GetListResult<RecordType>>;
  getOne: (
    resource: string,
    id: Identifier,
  ) => Promise<GetOneResult<RecordType>>;
  create: (
    resource: string,
    data: Partial<RecordType>,
  ) => Promise<CreateResult<RecordType>>;
  update: (
    resource: string,
    params: UpdateParams<RecordType>,
  ) => Promise<UpdateResult<RecordType>>;
  delete: (
    resource: string,
    id: Identifier,
  ) => Promise<DeleteResult<RecordType>>;
};

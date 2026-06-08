import { SortSpec } from './dataProviderTypes';
/**
 * Django REST Framework `ordering` query param.
 * ASC → `username`; DESC → `-username`; multi → `username,-date_joined`.
 */
export declare function toDjangoRestOrdering(sort?: SortSpec | SortSpec[]): string | undefined;
/**
 * OData `$orderby` query param.
 * ASC → `username asc`; DESC → `username desc`.
 */
export declare function toODataOrderBy(sort?: SortSpec | SortSpec[]): string | undefined;
/**
 * Common JSON:API `sort` query param.
 * ASC → `username`; DESC → `-username`.
 */
export declare function toJsonApiSort(sort?: SortSpec | SortSpec[]): string | undefined;
//# sourceMappingURL=sortHelpers.d.ts.map
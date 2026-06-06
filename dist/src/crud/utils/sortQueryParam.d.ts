import { SortSpec } from '../../data/dataProviderTypes';
/** Parse `sort` query (Django-style: `sku,-price`; legacy: `sku:asc,price:desc`). */
export declare function parseSortParam(raw: string | null): SortSpec[];
/** Serialize sort specs to Django-style `sku,-price`. */
export declare function serializeSort(specs: SortSpec[]): string | null;
export declare function sortPrioritiesFromSpecs(specs: SortSpec[]): Map<string, number>;
//# sourceMappingURL=sortQueryParam.d.ts.map
import type { SortSpec } from "./dataProviderTypes";

function normalizeSort(sort?: SortSpec | SortSpec[]): SortSpec[] {
  if (!sort) return [];
  return Array.isArray(sort) ? sort : [sort];
}

/**
 * Django REST Framework `ordering` query param.
 * ASC → `username`; DESC → `-username`; multi → `username,-date_joined`.
 */
export function toDjangoRestOrdering(
  sort?: SortSpec | SortSpec[],
): string | undefined {
  const specs = normalizeSort(sort);
  if (specs.length === 0) return undefined;
  return specs
    .map((s) => (s.order === "DESC" ? `-${s.field}` : s.field))
    .join(",");
}

/**
 * OData `$orderby` query param.
 * ASC → `username asc`; DESC → `username desc`.
 */
export function toODataOrderBy(
  sort?: SortSpec | SortSpec[],
): string | undefined {
  const specs = normalizeSort(sort);
  if (specs.length === 0) return undefined;
  return specs
    .map((s) => `${s.field} ${s.order === "DESC" ? "desc" : "asc"}`)
    .join(",");
}

/**
 * Common JSON:API `sort` query param.
 * ASC → `username`; DESC → `-username`.
 */
export function toJsonApiSort(
  sort?: SortSpec | SortSpec[],
): string | undefined {
  const specs = normalizeSort(sort);
  if (specs.length === 0) return undefined;
  return specs
    .map((s) => (s.order === "DESC" ? `-${s.field}` : s.field))
    .join(",");
}

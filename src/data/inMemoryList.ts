import type { GetListParams, Identifier, SortSpec } from "./dataProviderTypes";

export function getById<T extends { id: number }>(
  rows: T[],
  id: Identifier,
): T {
  const n = typeof id === "string" ? Number(id) : id;
  const row = rows.find((r) => r.id === n);
  if (!row) throw new Error("Not found");
  return row;
}

function sortRows<T extends Record<string, unknown>>(
  rows: T[],
  specs: SortSpec[],
): T[] {
  if (specs.length === 0) return rows;
  const mul = (order: "ASC" | "DESC") => (order === "DESC" ? -1 : 1);
  return [...rows].sort((a, b) => {
    for (const { field, order } of specs) {
      const av = a[field];
      const bv = b[field];
      if (av === bv) continue;
      if (av == null) return -1 * mul(order);
      if (bv == null) return 1 * mul(order);
      if (typeof av === "number" && typeof bv === "number") {
        return av < bv ? -mul(order) : mul(order);
      }
      const cmp = String(av).localeCompare(String(bv));
      if (cmp !== 0) return cmp * mul(order);
    }
    return 0;
  });
}

function matchFilterValue(rowVal: unknown, filterVal: unknown): boolean {
  if (filterVal === undefined || filterVal === null || filterVal === "") {
    return true;
  }
  if (Array.isArray(filterVal)) {
    if (filterVal.length === 0) return true;
    if (Array.isArray(rowVal)) {
      return filterVal.some((fv) => rowVal.includes(fv));
    }
    return filterVal.includes(rowVal);
  }
  if (Array.isArray(rowVal)) {
    return rowVal.includes(filterVal);
  }
  if (typeof filterVal === "string" && typeof rowVal === "string") {
    return rowVal.toLowerCase().includes(filterVal.toLowerCase());
  }
  return rowVal === filterVal;
}

export function filterRows<T extends Record<string, unknown>>(
  rows: T[],
  filter?: Record<string, unknown>,
): T[] {
  if (!filter) return rows;
  return rows.filter((row) =>
    Object.entries(filter).every(([k, v]) => matchFilterValue(row[k], v)),
  );
}

function paginate<T>(rows: T[], page: number, perPage: number) {
  const start = (page - 1) * perPage;
  return {
    data: rows.slice(start, start + perPage),
    total: rows.length,
  };
}

/** Apply CRUD list filters, sort, and pagination to an in-memory row array. */
export function applyInMemoryListParams<T extends Record<string, unknown>>(
  rows: T[],
  params: GetListParams,
): { data: T[]; total: number } {
  const { pagination, sort, filter } = params;
  let out = filterRows(rows, filter);
  if (sort) {
    const specs = Array.isArray(sort) ? sort : [sort];
    if (specs.length > 0 && specs[0]?.field) {
      out = sortRows(out, specs);
    }
  }
  if (pagination) {
    return paginate(out, pagination.page, pagination.perPage);
  }
  return { data: out, total: out.length };
}

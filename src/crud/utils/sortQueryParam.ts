import type { SortOrder, SortSpec } from "../../data/dataProviderTypes";

/** Parse `sort` query (Django-style: `sku,-price`; legacy: `sku:asc,price:desc`). */
export function parseSortParam(raw: string | null): SortSpec[] {
  if (!raw) return [];
  const specs: SortSpec[] = [];
  for (const part of raw.split(",").map((p) => p.trim()).filter(Boolean)) {
    if (part.includes(":")) {
      const [field, orderRaw] = part.split(":");
      if (!field) continue;
      const order: SortOrder =
        orderRaw?.toLowerCase() === "desc" ? "DESC" : "ASC";
      specs.push({ field, order });
      continue;
    }
    if (part.startsWith("-") && part.length > 1) {
      specs.push({ field: part.slice(1), order: "DESC" });
    } else {
      specs.push({ field: part, order: "ASC" });
    }
  }
  return specs;
}

/** Serialize sort specs to Django-style `sku,-price`. */
export function serializeSort(specs: SortSpec[]): string | null {
  if (specs.length === 0) return null;
  return specs
    .map((s) => (s.order === "DESC" ? `-${s.field}` : s.field))
    .join(",");
}

export function sortPrioritiesFromSpecs(
  specs: SortSpec[],
): Map<string, number> {
  return new Map(specs.map((s, i) => [s.field, i + 1]));
}

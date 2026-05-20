/** Read nested value from a record using dot notation, e.g. `brand.name`. */
export function getByPath(
  record: Record<string, unknown>,
  path: string,
): unknown {
  const parts = path.split(".");
  let cur: unknown = record;
  for (const part of parts) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return cur;
}

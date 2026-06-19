/** Read a nested value from form values or a record, e.g. `lines.0.label`. */
export function getFormValue(
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

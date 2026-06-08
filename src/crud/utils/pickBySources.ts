import { getByPath } from "./getByPath";
import { setByPath } from "./setByPath";

/**
 * Build a submit payload from form values using declared field `source` paths.
 * Flat `username` → `{ username }`; nested `invoiceLine.product` → `{ invoiceLine: { product } }`.
 */
export function pickBySources(
  values: Record<string, unknown>,
  sources: string[],
): Record<string, unknown> {
  if (sources.length === 0) {
    return { ...values };
  }

  const result: Record<string, unknown> = {};
  for (const source of sources) {
    const value = getByPath(values, source);
    if (value !== undefined) {
      setByPath(result, source, value);
    }
  }
  return result;
}

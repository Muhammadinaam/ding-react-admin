import { getFormValue } from "./getFormValue";
import { setFormValue } from "./setFormValue";

/**
 * Build the API save body from form values using registered field paths.
 * Flat `email` → `{ email }`; nested `address.city` → `{ address: { city } }`.
 */
export function buildFormPayload(
  values: Record<string, unknown>,
  fieldPaths: string[],
): Record<string, unknown> {
  if (fieldPaths.length === 0) {
    return { ...values };
  }

  const result: Record<string, unknown> = {};
  for (const path of fieldPaths) {
    const value = getFormValue(values, path);
    if (value !== undefined) {
      setFormValue(result, path, value);
    }
  }
  return result;
}

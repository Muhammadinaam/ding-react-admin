import type { FormValidationErrors } from "ding-react-admin";

/** Throw shape read by built-in parsers via `getErrorBody` / `resolveErrorBody`. */
export function validationError(errors: FormValidationErrors): { body: Record<string, unknown> } {
  const body: Record<string, unknown> = {};
  if (errors.global) {
    const g = errors.global;
    body.non_field_errors = Array.isArray(g) ? g : [g];
  }
  if (errors.fields) {
    for (const [key, msg] of Object.entries(errors.fields)) {
      body[key] = Array.isArray(msg) ? msg : [msg];
    }
  }
  return { body };
}

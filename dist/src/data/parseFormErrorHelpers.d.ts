import { FormValidationErrors, ParseFormErrorContext } from './dataProviderTypes';
export declare function asStringMessages(value: unknown): string[];
/** Read JSON from `throw { body }` or axios-style `{ response: { data } }`. */
export declare function getErrorBody(error: unknown): Record<string, unknown> | null;
/** Map `{ lines: [{ label: ["…"] }] }` → `{ "lines.0.label": "…" }`. */
export declare function flattenNestedArrayErrors(arrayKey: string, rows: unknown[], fields: Record<string, string | string[]>): void;
export declare function finalizeFormErrors(fields: Record<string, string | string[]>, global: string[]): FormValidationErrors;
/**
 * Django REST framework validation body:
 * `{ "email": ["Invalid"], "non_field_errors": ["…"] }`
 */
export declare function parseDjangoDRFFormErrors(error: unknown, _ctx: ParseFormErrorContext): FormValidationErrors | null;
export type DotNetFormErrorOptions = {
    /** Map API property names to form `source` paths. */
    fieldMap?: Record<string, string>;
    /** `Email` → `email`. Default true. */
    camelCase?: boolean;
    /** Include `title` / `message` in global toasts. Default false (often generic). */
    includeSummary?: boolean;
};
/**
 * ASP.NET Core `ValidationProblemDetails`:
 * `{ "errors": { "Email": ["The Email field is required."] } }`
 */
export declare function parseDotNetFormErrors(error: unknown, _ctx: ParseFormErrorContext, options?: DotNetFormErrorOptions): FormValidationErrors | null;
export type NodeFormErrorOptions = {
    fieldMap?: Record<string, string>;
};
/**
 * Common Node / Express shapes:
 * - `{ errors: { email: ["Invalid"] } }`
 * - `{ errors: [{ path: "email", msg: "Invalid" }] }` (express-validator)
 * - `{ details: [{ message: "…", path: ["email"] }] }` (Joi)
 */
export declare function parseNodeFormErrors(error: unknown, _ctx: ParseFormErrorContext, options?: NodeFormErrorOptions): FormValidationErrors | null;
//# sourceMappingURL=parseFormErrorHelpers.d.ts.map
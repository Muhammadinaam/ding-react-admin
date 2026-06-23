import type {
  FormValidationErrors,
  ParseFormErrorContext,
} from "./dataProviderTypes";

export const EXPECTED_VALIDATION_BODY_HINT =
  'Expected HTTP 400 with a JSON object such as `{ "field_name": ["message"] }` or `{ "non_field_errors": ["message"] }`.';

const RECEIVED_BODY_MAX_LENGTH = 300;

export function asStringMessages(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) {
    const strings = value.filter((x) => typeof x === "string") as string[];
    if (strings.length) return strings;
  }
  return [];
}

function toFieldValue(msgs: string[]): string | string[] {
  return msgs.length === 1 ? msgs[0] : msgs;
}

function isJsonRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isFetchResponse(value: unknown): value is Response {
  if (typeof Response !== "undefined" && value instanceof Response) {
    return true;
  }
  return (
    value !== null &&
    typeof value === "object" &&
    typeof (value as Response).json === "function" &&
    typeof (value as Response).status === "number" &&
    (value as Response).headers != null
  );
}

function formatReceivedValidationBody(
  body: Record<string, unknown> | null,
  hint?: string,
): string {
  if (hint) return hint;
  if (body === null) return "(no JSON body)";
  try {
    const text = JSON.stringify(body);
    if (text.length > RECEIVED_BODY_MAX_LENGTH) {
      return `${text.slice(0, RECEIVED_BODY_MAX_LENGTH)}…`;
    }
    return text;
  } catch {
    return String(body);
  }
}

export function describeNonStandardValidationBody(
  body: Record<string, unknown> | null,
  options?: { hint?: string },
): string {
  const received = formatReceivedValidationBody(body, options?.hint);
  return `Non-standard validation response. ${EXPECTED_VALIDATION_BODY_HINT} Received: ${received}`;
}

export function getValidationErrorStatus(error: unknown): number | null {
  if (!error || typeof error !== "object") return null;

  const response = (error as Record<string, unknown>).response;
  if (!response || typeof response !== "object") return null;

  const status = (response as { status?: number }).status;
  if (typeof status === "number" && (status === 400 || status === 422)) {
    return status;
  }

  return null;
}

export function getErrorResponseContentType(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;

  const response = (error as Record<string, unknown>).response;
  if (!isFetchResponse(response)) return null;

  return response.headers.get("content-type");
}

/**
 * Read a parsed JSON validation body when it is already available on the error.
 *
 * Supported transport shapes (sync only):
 * - `{ body: { email: ["…"] } }` — explicit throw from a handler
 * - `{ response: { data: { email: ["…"] } } }` — axios-style wrappers
 * - `{ data: { email: ["…"] } }` — some HTTP clients attach parsed JSON here
 *
 * For fetch / OpenAPI clients that only expose a `Response`, use `resolveErrorBody`.
 */
export function getErrorBody(error: unknown): Record<string, unknown> | null {
  if (!error || typeof error !== "object") return null;

  const e = error as Record<string, unknown>;

  if (isJsonRecord(e.body)) {
    return e.body;
  }

  if (isJsonRecord(e.data)) {
    return e.data;
  }

  const response = e.response;
  if (response && typeof response === "object" && !Array.isArray(response)) {
    const data = (response as Record<string, unknown>).data;
    if (isJsonRecord(data)) {
      return data;
    }
  }

  return null;
}

/**
 * Resolve a validation JSON body from any common HTTP client error shape.
 * Falls back to reading `response.json()` for fetch / OpenAPI `ResponseError`.
 */
function normalizeValidationBody(body: unknown): Record<string, unknown> | null {
  if (isJsonRecord(body)) {
    return body;
  }
  if (Array.isArray(body)) {
    const messages = asStringMessages(body);
    return messages.length ? { non_field_errors: toFieldValue(messages) } : null;
  }
  return null;
}

export async function resolveErrorBody(
  error: unknown,
): Promise<Record<string, unknown> | null> {
  const syncBody = getErrorBody(error);
  if (syncBody) return syncBody;

  if (!error || typeof error !== "object") return null;

  const response = (error as Record<string, unknown>).response;
  if (!isFetchResponse(response)) return null;

  const contentType = response.headers.get("content-type");
  if (!contentType || !/application\/json/i.test(contentType)) {
    return null;
  }

  try {
    const body: unknown = await response.clone().json();
    return normalizeValidationBody(body);
  } catch {
    return null;
  }
}

function isNestedRowErrorsArray(value: unknown): boolean {
  if (!Array.isArray(value)) return false;
  return value.some(
    (item) =>
      item &&
      typeof item === "object" &&
      !Array.isArray(item) &&
      Object.values(item as Record<string, unknown>).some(
        (v) => asStringMessages(v).length > 0,
      ),
  );
}

/** Map `{ lines: [{ label: ["…"] }] }` → `{ "lines.0.label": "…" }`. */
export function flattenNestedArrayErrors(
  arrayKey: string,
  rows: unknown[],
  fields: Record<string, string | string[]>,
): void {
  rows.forEach((row, index) => {
    if (!row || typeof row !== "object" || Array.isArray(row)) return;
    for (const [source, value] of Object.entries(
      row as Record<string, unknown>,
    )) {
      const msgs = asStringMessages(value);
      if (msgs.length) {
        fields[`${arrayKey}.${index}.${source}`] = toFieldValue(msgs);
      }
    }
  });
}

export function finalizeFormErrors(
  fields: Record<string, string | string[]>,
  global: string[],
): FormValidationErrors {
  return {
    fields: Object.keys(fields).length ? fields : undefined,
    global: global.length ? global : undefined,
  };
}

const DRF_GLOBAL_KEYS = new Set(["non_field_errors", "detail"]);

function parseDjangoDRFValidationBody(
  body: Record<string, unknown>,
): FormValidationErrors | null {
  const fields: Record<string, string | string[]> = {};
  const global: string[] = [];

  for (const [key, value] of Object.entries(body)) {
    if (DRF_GLOBAL_KEYS.has(key)) {
      global.push(...asStringMessages(value));
      continue;
    }
    if (isNestedRowErrorsArray(value)) {
      flattenNestedArrayErrors(key, value as unknown[], fields);
      continue;
    }
    const msgs = asStringMessages(value);
    if (msgs.length) fields[key] = toFieldValue(msgs);
  }

  if (!Object.keys(fields).length && !global.length) return null;
  return finalizeFormErrors(fields, global);
}

/**
 * Django REST framework validation body:
 * `{ "email": ["Invalid"], "non_field_errors": ["…"] }`
 */
export function parseDjangoDRFFormErrors(
  error: unknown,
  _ctx: ParseFormErrorContext,
): FormValidationErrors | null {
  const body = getErrorBody(error);
  if (!body) return null;
  return parseDjangoDRFValidationBody(body);
}

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
export function parseDotNetFormErrors(
  error: unknown,
  _ctx: ParseFormErrorContext,
  options?: DotNetFormErrorOptions,
): FormValidationErrors | null {
  const body = getErrorBody(error);
  if (!body) return null;

  const camelCase = options?.camelCase ?? true;
  const fieldMap = options?.fieldMap;
  const fields: Record<string, string | string[]> = {};
  const global: string[] = [];

  if (options?.includeSummary) {
    global.push(...asStringMessages(body.title));
    global.push(...asStringMessages(body.message));
  }

  const errors = body.errors;
  if (errors && typeof errors === "object" && !Array.isArray(errors)) {
    for (const [key, value] of Object.entries(errors as Record<string, unknown>)) {
      const mappedKey =
        fieldMap?.[key] ?? (camelCase ? camelCaseField(key) : key);
      const msgs = asStringMessages(value);
      if (msgs.length) fields[mappedKey] = toFieldValue(msgs);
    }
  }

  if (!Object.keys(fields).length && !global.length) return null;
  return finalizeFormErrors(fields, global);
}

export type NodeFormErrorOptions = {
  fieldMap?: Record<string, string>;
};

/**
 * Common Node / Express shapes:
 * - `{ errors: { email: ["Invalid"] } }`
 * - `{ errors: [{ path: "email", msg: "Invalid" }] }` (express-validator)
 * - `{ details: [{ message: "…", path: ["email"] }] }` (Joi)
 */
export function parseNodeFormErrors(
  error: unknown,
  _ctx: ParseFormErrorContext,
  options?: NodeFormErrorOptions,
): FormValidationErrors | null {
  const body = getErrorBody(error);
  if (!body) return null;

  const fields: Record<string, string | string[]> = {};
  const global: string[] = [];
  const fieldMap = options?.fieldMap;

  const errList = body.errors;
  if (Array.isArray(errList)) {
    for (const item of errList) {
      if (!item || typeof item !== "object") continue;
      const row = item as Record<string, unknown>;
      const path =
        (typeof row.path === "string" && row.path) ||
        (typeof row.param === "string" && row.param) ||
        (typeof row.field === "string" && row.field);
      const msg =
        asStringMessages(row.msg)[0] ?? asStringMessages(row.message)[0];
      if (!msg) continue;
      if (path) {
        const key = fieldMap?.[path] ?? path;
        mergeFieldMessage(fields, key, msg);
      } else {
        global.push(msg);
      }
    }
  } else if (errList && typeof errList === "object") {
    for (const [key, value] of Object.entries(errList as Record<string, unknown>)) {
      const mappedKey = fieldMap?.[key] ?? key;
      const msgs = asStringMessages(value);
      if (msgs.length) fields[mappedKey] = toFieldValue(msgs);
    }
  }

  const details = body.details;
  if (Array.isArray(details)) {
    for (const item of details) {
      if (!item || typeof item !== "object") continue;
      const row = item as Record<string, unknown>;
      const pathParts = Array.isArray(row.path) ? row.path : [];
      const path = pathParts.map((p) => String(p)).join(".");
      const msg = asStringMessages(row.message)[0];
      if (!msg) continue;
      if (path) {
        const key = fieldMap?.[path] ?? path;
        fields[key] = msg;
      } else {
        global.push(msg);
      }
    }
  }

  global.push(...asStringMessages(body.error));

  if (!Object.keys(fields).length && !global.length) return null;
  return finalizeFormErrors(fields, global);
}

function mergeFieldMessage(
  fields: Record<string, string | string[]>,
  key: string,
  msg: string,
) {
  const existing = fields[key];
  if (!existing) {
    fields[key] = msg;
    return;
  }
  fields[key] = Array.isArray(existing) ? [...existing, msg] : [existing, msg];
}

function camelCaseField(key: string): string {
  if (!key) return key;
  return key.charAt(0).toLowerCase() + key.slice(1);
}

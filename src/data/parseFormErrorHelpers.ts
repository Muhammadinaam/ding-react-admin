import type {
  FormValidationErrors,
  ParseFormErrorContext,
} from "./dataProviderTypes";

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

/** Read JSON from `throw { body }` or axios-style `{ response: { data } }`. */
export function getErrorBody(error: unknown): Record<string, unknown> | null {
  if (!error || typeof error !== "object") return null;
  const e = error as Record<string, unknown>;
  if (e.body && typeof e.body === "object" && !Array.isArray(e.body)) {
    return e.body as Record<string, unknown>;
  }
  const response = e.response;
  if (response && typeof response === "object" && !Array.isArray(response)) {
    const data = (response as Record<string, unknown>).data;
    if (data && typeof data === "object" && !Array.isArray(data)) {
      return data as Record<string, unknown>;
    }
  }
  return null;
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

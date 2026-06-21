import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import type {
  DataProvider,
  FormValidationErrors,
  ParseFormErrorContext,
} from "../../data/dataProviderTypes";
import type { InlineFieldRegistration } from "../context/InlineFieldsRegistry";
import { resolveErrorBody } from "../../data/parseFormErrorHelpers";

export type ApplyApiErrorsResult = {
  handled: boolean;
  globalErrors: string[];
};

export type ApplyApiErrorsOptions = {
  payloadFields: Iterable<string>;
  inlineRegistry: Iterable<InlineFieldRegistration>;
};

function toMessages(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function messageText(msg: string | string[]): string {
  return Array.isArray(msg) ? msg.join(", ") : msg;
}

/** Top-level `source` or inline cell path such as `lines.0.quantity`. */
export function isKnownFormFieldPath(
  path: string,
  payloadFields: Set<string>,
  inlineRegistry: Map<string, InlineFieldRegistration>,
): boolean {
  if (payloadFields.has(path)) return true;

  const match = path.match(/^([^.]+)\.(\d+)\.([^.]+)$/);
  if (!match) return false;

  const [, arrayName, , source] = match;
  return inlineRegistry.get(arrayName)?.sources.includes(source) ?? false;
}

export function partitionFormErrors(
  parsed: FormValidationErrors,
  payloadFields: Set<string>,
  inlineRegistry: Map<string, InlineFieldRegistration>,
): { fieldErrors: Record<string, string | string[]>; globalErrors: string[] } {
  const fieldErrors: Record<string, string | string[]> = {};
  const globalErrors = [...toMessages(parsed.global)];

  for (const [path, msg] of Object.entries(parsed.fields ?? {})) {
    if (isKnownFormFieldPath(path, payloadFields, inlineRegistry)) {
      fieldErrors[path] = msg;
    } else {
      globalErrors.push(messageText(msg));
    }
  }

  return { fieldErrors, globalErrors };
}

export function applyFormErrors<T extends FieldValues>(
  form: UseFormReturn<T>,
  fieldErrors: Record<string, string | string[]>,
) {
  for (const [path, msg] of Object.entries(fieldErrors)) {
    form.setError(path as FieldPath<T>, {
      type: "server",
      message: messageText(msg),
    });
  }
}

export async function applyApiErrorsToForm<T extends FieldValues>(
  dp: DataProvider,
  form: UseFormReturn<T>,
  error: unknown,
  context: ParseFormErrorContext,
  options: ApplyApiErrorsOptions,
): Promise<ApplyApiErrorsResult> {
  const body = await resolveErrorBody(error);
  const normalizedError = body != null ? { body } : error;
  const parsed = dp.parseFormError?.(normalizedError, context);

  if (!parsed) {
    return { handled: false, globalErrors: [] };
  }

  const payloadFields = new Set(options.payloadFields);
  const inlineRegistry = new Map<string, InlineFieldRegistration>();
  for (const inline of options.inlineRegistry) {
    inlineRegistry.set(inline.field, inline);
  }

  const { fieldErrors, globalErrors } = partitionFormErrors(
    parsed,
    payloadFields,
    inlineRegistry,
  );

  if (!Object.keys(fieldErrors).length && !globalErrors.length) {
    return { handled: false, globalErrors: [] };
  }

  applyFormErrors(form, fieldErrors);
  return { handled: true, globalErrors };
}

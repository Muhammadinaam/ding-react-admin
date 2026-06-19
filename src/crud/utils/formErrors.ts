import type { MessageInstance } from "antd/es/message/interface";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import type { DataProvider, ParseFormErrorContext } from "../../data/dataProviderTypes";

function toMessages(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function applyFormErrors<T extends FieldValues>(
  form: UseFormReturn<T>,
  parsed: { fields?: Record<string, string | string[]>; global?: string | string[] },
  message: MessageInstance,
) {
  for (const msg of toMessages(parsed.global)) {
    message.error(msg);
  }
  for (const [path, msg] of Object.entries(parsed.fields ?? {})) {
    const text = Array.isArray(msg) ? msg.join(", ") : msg;
    form.setError(path as FieldPath<T>, { type: "server", message: text });
  }
}

export function applyApiErrorsToForm<T extends FieldValues>(
  dp: DataProvider,
  form: UseFormReturn<T>,
  message: MessageInstance,
  error: unknown,
  context: ParseFormErrorContext,
): boolean {
  const parsed = dp.parseFormError?.(error, context);
  if (!parsed) return false;
  const hasFields = Object.keys(parsed.fields ?? {}).length > 0;
  const hasGlobal = toMessages(parsed.global).length > 0;
  if (!hasFields && !hasGlobal) return false;
  applyFormErrors(form, parsed, message);
  return true;
}

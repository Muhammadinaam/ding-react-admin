import { hasUploadValues } from "./hasUploadValues";
import { toFormData, type ToFormDataOptions } from "./toFormData";

export type PrepareFormSubmitBodyOptions = ToFormDataOptions;

/**
 * When the payload contains any `File`/`Blob`, return `FormData`; otherwise the plain object.
 */
export function prepareFormSubmitBody(
  payload: Record<string, unknown>,
  options?: PrepareFormSubmitBodyOptions,
): Record<string, unknown> | FormData {
  if (hasUploadValues(payload)) {
    return toFormData(payload, options);
  }
  return payload;
}

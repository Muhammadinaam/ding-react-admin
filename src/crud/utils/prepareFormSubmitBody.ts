import { hasUploadValues } from "./hasUploadValues";
import { toFormData, type ToFormDataOptions } from "./toFormData";
import { stripExistingUploadReferencesFromPayload } from "./uploadReferenceUtils";

export type PrepareFormSubmitBodyOptions = ToFormDataOptions;

/**
 * When the payload contains any `File`/`Blob`, return `FormData`; otherwise the plain object.
 * Unchanged upload URL references are omitted so edit saves do not re-post existing files.
 */
export function prepareFormSubmitBody(
  payload: Record<string, unknown>,
  options?: PrepareFormSubmitBodyOptions,
): Record<string, unknown> | FormData {
  const skipExistingUploadUrls = options?.skipExistingUploadUrls ?? true;

  if (hasUploadValues(payload)) {
    return toFormData(payload, options);
  }

  return stripExistingUploadReferencesFromPayload(payload, skipExistingUploadUrls);
}

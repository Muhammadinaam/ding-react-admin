import { ToFormDataOptions } from './toFormData';
export type PrepareFormSubmitBodyOptions = ToFormDataOptions;
/**
 * When the payload contains any `File`/`Blob`, return `FormData`; otherwise the plain object.
 * Unchanged upload URL references are omitted so edit saves do not re-post existing files.
 */
export declare function prepareFormSubmitBody(payload: Record<string, unknown>, options?: PrepareFormSubmitBodyOptions): Record<string, unknown> | FormData;
//# sourceMappingURL=prepareFormSubmitBody.d.ts.map
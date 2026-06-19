import { ToFormDataOptions } from './toFormData';
export type PrepareFormSubmitBodyOptions = ToFormDataOptions;
/**
 * When the payload contains any `File`/`Blob`, return `FormData`; otherwise the plain object.
 */
export declare function prepareFormSubmitBody(payload: Record<string, unknown>, options?: PrepareFormSubmitBodyOptions): Record<string, unknown> | FormData;
//# sourceMappingURL=prepareFormSubmitBody.d.ts.map
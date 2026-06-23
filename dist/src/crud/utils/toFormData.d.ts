export type ToFormDataOptions = {
    /**
     * Omit unchanged upload URL strings (`http://` / `https://` / `/media/`) from the body.
     * Default `true` — edit forms keep existing files without re-sending the URL.
     */
    skipExistingUploadUrls?: boolean;
};
/**
 * Flatten a save payload into `FormData` using bracket notation for nested fields
 * and arrays (e.g. `lines[0][label]`, `address[city]`).
 */
export declare function toFormData(data: Record<string, unknown>, options?: ToFormDataOptions): FormData;
//# sourceMappingURL=toFormData.d.ts.map
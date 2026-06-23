/** Existing server-side upload reference — omit on save unless replaced with a new File. */
export declare function isExistingUploadReference(value: string): boolean;
export declare function stripExistingUploadReferences(value: unknown, skipExistingUploadUrls: boolean): unknown;
export declare function stripExistingUploadReferencesFromPayload(payload: Record<string, unknown>, skipExistingUploadUrls?: boolean): Record<string, unknown>;
//# sourceMappingURL=uploadReferenceUtils.d.ts.map
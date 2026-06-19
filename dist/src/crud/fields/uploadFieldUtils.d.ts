/** Form value for file/image fields — backend-agnostic. */
export type UploadFieldValue = File | string | null | undefined;
export declare function hasUploadValue(value: UploadFieldValue): boolean;
export declare function getUploadFileName(value: UploadFieldValue): string | undefined;
//# sourceMappingURL=uploadFieldUtils.d.ts.map
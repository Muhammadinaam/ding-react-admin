/**
 * Parent form fields register even when `source` is nested (`address.city`).
 * Inline cells pass a different `name` (`lines.0.label`) and must not.
 */
export declare function shouldRegisterSourceInPayload(source: string, name?: string): boolean;
//# sourceMappingURL=shouldRegisterSourceInPayload.d.ts.map
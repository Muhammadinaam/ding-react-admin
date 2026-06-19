export type BuildInlineRowsPayloadOptions = {
    transformRows?: (rows: Record<string, unknown>[]) => unknown;
};
/** Clean inline field-array rows for the API (strip RHF `rowKey`, keep record `id`). */
export declare function buildInlineRowsPayload(rows: unknown, sources: string[], options?: BuildInlineRowsPayloadOptions): unknown;
//# sourceMappingURL=buildInlineRowsPayload.d.ts.map
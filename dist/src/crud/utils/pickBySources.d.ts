/**
 * Build a submit payload from form values using declared field `source` paths.
 * Flat `username` → `{ username }`; nested `invoiceLine.product` → `{ invoiceLine: { product } }`.
 */
export declare function pickBySources(values: Record<string, unknown>, sources: string[]): Record<string, unknown>;
//# sourceMappingURL=pickBySources.d.ts.map
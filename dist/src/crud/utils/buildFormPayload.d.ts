/**
 * Build the API save body from form values using registered field paths.
 * Flat `email` → `{ email }`; nested `address.city` → `{ address: { city } }`.
 */
export declare function buildFormPayload(values: Record<string, unknown>, fieldPaths: string[]): Record<string, unknown>;
//# sourceMappingURL=buildFormPayload.d.ts.map
/**
 * Read a form path that may never be registered as an input (sibling labels
 * like `authorName` / `branch_display` after `form.reset(retrieve)`).
 *
 * Watching a single unregistered name returns `undefined`; watching the whole
 * form (plus `getValues` on first paint) keeps retrieve siblings visible.
 */
export declare function useFormPathValue(path: string | undefined): unknown;
//# sourceMappingURL=useFormPathValue.d.ts.map
import { useFormContext, useWatch } from "react-hook-form";
import { getFormValue } from "./getFormValue";

/**
 * Read a form path that may never be registered as an input (sibling labels
 * like `authorName` / `branch_display` after `form.reset(retrieve)`).
 *
 * Watching a single unregistered name returns `undefined`; watching the whole
 * form (plus `getValues` on first paint) keeps retrieve siblings visible.
 */
export function useFormPathValue(path: string | undefined): unknown {
  const { control, getValues } = useFormContext();
  const values = useWatch({ control }) as Record<string, unknown> | undefined;
  if (!path) return undefined;
  const record =
    values && Object.keys(values).length > 0
      ? values
      : (getValues() as Record<string, unknown>);
  return getFormValue(record, path);
}

import { useFormContext, useWatch } from "react-hook-form";

/**
 * Read a form path that may never be registered as an input (sibling labels
 * like `authorName` / `branch_display` after `form.reset(retrieve)`).
 *
 * `useWatch` without `defaultValue` returns `undefined` for unregistered
 * paths, which would make ReferenceField fall back to `getOne`.
 */
export function useFormPathValue(path: string | undefined): unknown {
  const enabled = Boolean(path);
  const { control, getValues } = useFormContext();
  return useWatch({
    control,
    name: path ?? "",
    disabled: !enabled,
    defaultValue: enabled ? getValues(path) : undefined,
  });
}

/**
 * Resolve `labelSource` to an absolute RHF path.
 * A single segment (no dots) is a sibling of the field `name` (or `source`).
 */
export function resolveLabelSourcePath(
  labelSource: string,
  fieldName: string | undefined,
  source: string,
): string {
  if (labelSource.includes(".")) return labelSource;
  const valuePath = fieldName || source;
  const lastDot = valuePath.lastIndexOf(".");
  if (lastDot === -1) return labelSource;
  return `${valuePath.slice(0, lastDot)}.${labelSource}`;
}

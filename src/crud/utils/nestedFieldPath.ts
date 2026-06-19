/** RHF path for one cell in a nested field array row, e.g. `lines.0.label`. */
export function nestedFieldPath(
  field: string,
  index: number,
  source: string,
): string {
  return `${field}.${index}.${source}`;
}

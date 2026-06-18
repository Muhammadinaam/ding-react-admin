/** RHF field path for one cell in an inline field array row. */
export function inlineFieldName(
  arrayName: string,
  index: number,
  source: string,
) {
  return `${arrayName}.${index}.${source}`;
}

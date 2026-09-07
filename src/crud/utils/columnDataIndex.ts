/**
 * Ant Design nested `dataIndex` for dotted sources (`address.city`).
 */
export function columnDataIndex(source: string): string | string[] {
  return source.includes(".") ? source.split(".") : source;
}

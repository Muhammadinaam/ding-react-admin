/** Form value for file/image fields — backend-agnostic. */
export type UploadFieldValue = File | string | null | undefined;

export function hasUploadValue(value: UploadFieldValue): boolean {
  if (value instanceof File) return true;
  return typeof value === "string" && value.length > 0;
}

export function getUploadFileName(value: UploadFieldValue): string | undefined {
  if (value instanceof File) return value.name;
  if (typeof value === "string" && value.length > 0) {
    try {
      const pathname = new URL(value, "http://local").pathname;
      const name = pathname.split("/").filter(Boolean).pop();
      return name || value;
    } catch {
      return value.split("/").filter(Boolean).pop() || value;
    }
  }
  return undefined;
}

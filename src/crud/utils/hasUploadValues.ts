/** Whether a save payload contains a `File` or `Blob` anywhere (including inline rows). */
export function hasUploadValues(value: unknown): boolean {
  if (value instanceof Blob) return true;
  if (Array.isArray(value)) return value.some(hasUploadValues);
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some(hasUploadValues);
  }
  return false;
}

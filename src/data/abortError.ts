/** True when a fetch/axios call was aborted via `AbortSignal` (not a real failure). */
export function isAbortError(error: unknown): boolean {
  if (error == null || typeof error !== "object") return false;
  const e = error as { name?: string; code?: string };
  return (
    e.name === "AbortError" ||
    e.name === "CanceledError" ||
    e.code === "ERR_CANCELED"
  );
}

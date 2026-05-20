/** Shared field-array name for InlineFormSet + ResourceForm inline loading. */
export function inlineArrayName(resource: string, name?: string) {
  return name ?? `__inline_${resource.replace(/[^a-z0-9]/gi, "_")}`;
}

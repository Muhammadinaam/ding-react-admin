/** Existing server-side upload reference — omit on save unless replaced with a new File. */
export function isExistingUploadReference(value: string): boolean {
  return /^https?:\/\//i.test(value) || value.startsWith("/media/");
}

export function stripExistingUploadReferences(
  value: unknown,
  skipExistingUploadUrls: boolean,
): unknown {
  if (!skipExistingUploadUrls) return value;

  if (typeof value === "string") {
    return isExistingUploadReference(value) ? undefined : value;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => stripExistingUploadReferences(item, skipExistingUploadUrls))
      .filter((item) => item !== undefined);
  }

  if (value && typeof value === "object" && !(value instanceof Blob)) {
    const result: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      const stripped = stripExistingUploadReferences(child, skipExistingUploadUrls);
      if (stripped !== undefined) {
        result[key] = stripped;
      }
    }
    return result;
  }

  return value;
}

export function stripExistingUploadReferencesFromPayload(
  payload: Record<string, unknown>,
  skipExistingUploadUrls = true,
): Record<string, unknown> {
  return stripExistingUploadReferences(payload, skipExistingUploadUrls) as Record<
    string,
    unknown
  >;
}

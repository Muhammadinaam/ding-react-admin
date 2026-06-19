export type ToFormDataOptions = {
  /**
   * Omit unchanged upload URL strings (`http://` / `https://`) from the body.
   * Default `true` — edit forms keep existing files without re-sending the URL.
   */
  skipExistingUploadUrls?: boolean;
};

function isExistingUploadUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function appendFormDataValue(
  formData: FormData,
  key: string,
  value: unknown,
  options: Required<ToFormDataOptions>,
): void {
  if (value === undefined) return;

  if (value === null) {
    formData.append(key, "");
    return;
  }

  if (value instanceof Blob) {
    formData.append(key, value);
    return;
  }

  if (typeof value === "boolean" || typeof value === "number") {
    formData.append(key, String(value));
    return;
  }

  if (typeof value === "string") {
    if (options.skipExistingUploadUrls && isExistingUploadUrl(value)) {
      return;
    }
    formData.append(key, value);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      appendFormDataValue(formData, `${key}[${index}]`, item, options);
    });
    return;
  }

  if (typeof value === "object") {
    for (const [childKey, childValue] of Object.entries(
      value as Record<string, unknown>,
    )) {
      appendFormDataValue(formData, `${key}[${childKey}]`, childValue, options);
    }
    return;
  }

  formData.append(key, String(value));
}

/**
 * Flatten a save payload into `FormData` using bracket notation for nested fields
 * and arrays (e.g. `lines[0][label]`, `address[city]`).
 */
export function toFormData(
  data: Record<string, unknown>,
  options?: ToFormDataOptions,
): FormData {
  const resolved: Required<ToFormDataOptions> = {
    skipExistingUploadUrls: options?.skipExistingUploadUrls ?? true,
  };
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    appendFormDataValue(formData, key, value, resolved);
  }

  return formData;
}

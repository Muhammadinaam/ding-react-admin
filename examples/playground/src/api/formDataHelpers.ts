/** Parse multipart save bodies from the playground (bracket notation → nested object). */
export function formDataToRecord(formData: FormData): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    const resolved = resolveFormDataValue(value);
    setFormDataPath(result, parseFormDataKey(key), resolved);
  }
  return result;
}

export function normalizeMutationBody(
  data: Record<string, unknown> | FormData,
): Record<string, unknown> {
  if (data instanceof FormData) return formDataToRecord(data);
  return data;
}

function resolveFormDataValue(value: FormDataEntryValue): unknown {
  if (value instanceof File) {
    return URL.createObjectURL(value);
  }
  if (value === "") return null;
  return value;
}

function parseFormDataKey(key: string): string[] {
  const parts: string[] = [];
  let i = 0;
  let head = "";
  while (i < key.length && key[i] !== "[") {
    head += key[i++]!;
  }
  if (head) parts.push(head);
  while (i < key.length) {
    const close = key.indexOf("]", i);
    parts.push(key.slice(i + 1, close));
    i = close + 1;
  }
  return parts;
}

function setFormDataPath(
  obj: Record<string, unknown>,
  path: string[],
  value: unknown,
): void {
  if (path.length === 0) return;
  if (path.length === 1) {
    obj[path[0]!] = value;
    return;
  }

  const [head, ...rest] = path;
  const nextIsIndex = /^\d+$/.test(rest[0]!);

  if (nextIsIndex) {
    let arr = obj[head!];
    if (!Array.isArray(arr)) {
      arr = [];
      obj[head!] = arr;
    }
    const rows = arr as Record<string, unknown>[];
    const idx = Number(rest[0]!);
    while (rows.length <= idx) rows.push({});
    if (rest.length === 1) {
      rows[idx] = value as Record<string, unknown>;
      return;
    }
    const row = rows[idx];
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      rows[idx] = {};
    }
    setFormDataPath(rows[idx]!, rest.slice(1), value);
    return;
  }

  let child = obj[head!];
  if (!child || typeof child !== "object" || Array.isArray(child)) {
    child = {};
    obj[head!] = child;
  }
  setFormDataPath(child as Record<string, unknown>, rest, value);
}

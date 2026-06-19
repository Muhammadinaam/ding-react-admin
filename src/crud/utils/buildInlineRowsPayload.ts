export type BuildInlineRowsPayloadOptions = {
  transformRows?: (rows: Record<string, unknown>[]) => unknown;
};

/** Clean inline field-array rows for the API (strip RHF `rowKey`, keep record `id`). */
export function buildInlineRowsPayload(
  rows: unknown,
  sources: string[],
  options?: BuildInlineRowsPayloadOptions,
): unknown {
  if (!Array.isArray(rows)) return [];

  const cleaned = rows.map((row) => {
    if (!row || typeof row !== "object") return {};
    const record = row as Record<string, unknown>;
    const out: Record<string, unknown> = {};

    for (const source of sources) {
      const value = record[source];
      if (value !== undefined) {
        out[source] = value;
      }
    }

    const id = record.id;
    if (id !== undefined && id !== null) {
      out.id = id;
    }

    return out;
  });

  if (options?.transformRows) {
    return options.transformRows(cleaned);
  }
  return cleaned;
}

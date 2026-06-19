import type { InlineFieldRegistration } from "../context/InlineFieldsRegistry";
import { buildFormPayload } from "./buildFormPayload";
import { buildInlineRowsPayload } from "./buildInlineRowsPayload";
import {
  prepareFormSubmitBody,
  type PrepareFormSubmitBodyOptions,
} from "./prepareFormSubmitBody";

/** Build the create/update body from form values, auto-switching to multipart when needed. */
export function buildResourceFormSubmitBody(
  raw: Record<string, unknown>,
  payloadFieldPaths: string[],
  inlineRegistry?: Iterable<InlineFieldRegistration>,
  options?: PrepareFormSubmitBodyOptions,
): Record<string, unknown> | FormData {
  const payload = buildFormPayload(raw, payloadFieldPaths);

  if (inlineRegistry) {
    for (const inline of inlineRegistry) {
      const rows = raw[inline.field];
      const key = inline.payloadKey ?? inline.field;
      payload[key] = buildInlineRowsPayload(rows, inline.sources, {
        transformRows: inline.transformRows,
      });
    }
  }

  return prepareFormSubmitBody(payload, options);
}

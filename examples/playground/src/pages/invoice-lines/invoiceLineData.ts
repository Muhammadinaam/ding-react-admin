// WHAT YOU IMPLEMENT: store access + list scoping (invoiceId filter) + typed FK fields.
// WHAT THE LIBRARY HANDLES: in-memory list filter/sort/paginate; form payload from field `source`.
// SEE: docs/tutorial-one-entity.md

import {
  createMemoryResourceHandlers,
  type ResourceHandlers,
} from "ding-react-admin";
import type { InvoiceLine } from "../../api/memoryApi";
import { validationError } from "../../api/formValidation";
import type { PlaygroundHandlerContext } from "../playgroundHandlerContext";

export const INVOICE_LINE_RESOURCE = "invoice-lines" as const;

type LineRow = InvoiceLine & Record<string, unknown>;

export function createInvoiceLineHandlers(
  ctx: PlaygroundHandlerContext,
): ResourceHandlers<LineRow> {
  const { api, nextId } = ctx;

  return createMemoryResourceHandlers<InvoiceLine>({
    getRows: () => api.invoiceLines,
    nextId,
    scopeList: (rows, params) => {
      const invId = params.filter?.invoiceId;
      if (invId === undefined || invId === "" || invId === null) return rows;
      return rows.filter((l) => l.invoiceId === Number(invId));
    },
    mapCreate: (data, id) => {
      const quantity = Number(data.quantity ?? 0);
      if (quantity <= 0) {
        throw validationError({
          fields: { quantity: "Quantity must be greater than zero" },
        });
      }
      return {
        id,
        invoiceId: Number(data.invoiceId),
        productId: data.productId == null ? null : Number(data.productId),
        label: String(data.label ?? ""),
        quantity,
        unitPrice: Number(data.unitPrice ?? 0),
      };
    },
    applyUpdate: (current, patch) => {
      const quantity =
        patch.quantity !== undefined
          ? Number(patch.quantity)
          : current.quantity;
      if (quantity <= 0) {
        throw validationError({
          fields: { quantity: "Quantity must be greater than zero" },
        });
      }
      return {
        ...current,
        invoiceId:
          patch.invoiceId !== undefined
            ? Number(patch.invoiceId)
            : current.invoiceId,
        productId:
          patch.productId !== undefined
            ? patch.productId === null
              ? null
              : Number(patch.productId)
            : current.productId,
        label: patch.label !== undefined ? String(patch.label) : current.label,
        quantity,
        unitPrice:
          patch.unitPrice !== undefined
            ? Number(patch.unitPrice)
            : current.unitPrice,
      };
    },
  }) as ResourceHandlers<LineRow>;
}

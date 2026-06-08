// WHAT YOU IMPLEMENT: store access + any delete side effects (see afterDelete below).
// WHAT THE LIBRARY HANDLES: in-memory list filter/sort/paginate; form payload from field `source`.
// SEE: docs/tutorial-one-entity.md

import {
  createMemoryResourceHandlers,
  type ResourceHandlers,
} from "ding-react-admin";
import type { Invoice, InvoiceLine } from "../../api/memoryApi";
import type { PlaygroundHandlerContext } from "../playgroundHandlerContext";

export const INVOICE_RESOURCE = "invoices" as const;

type InvoiceRow = Invoice & Record<string, unknown>;

export function createInvoiceHandlers(
  ctx: PlaygroundHandlerContext,
): ResourceHandlers<InvoiceRow> {
  const { api, nextId } = ctx;

  return createMemoryResourceHandlers<Invoice>({
    getRows: () => api.invoices,
    nextId,
    mapCreate: (data, id) => ({
      id,
      number: String(data.number ?? ""),
      customer: String(data.customer ?? ""),
      issuedAt: String(
        data.issuedAt ?? new Date().toISOString().slice(0, 10),
      ),
    }),
    afterDelete: (removed) => {
      api.invoiceLines = api.invoiceLines.filter(
        (l: InvoiceLine) => l.invoiceId !== removed.id,
      );
    },
  }) as ResourceHandlers<InvoiceRow>;
}

// WHAT YOU IMPLEMENT: store access + nested inline row sync on getOne/create/update.
// WHAT THE LIBRARY HANDLES: in-memory list filter/sort/paginate; form payload from field `source`.
// SEE: docs/tutorial-one-entity.md

import {
  createMemoryResourceHandlers,
  type ResourceHandlers,
} from "ding-react-admin";
import type { Invoice, InvoiceLine } from "../../api/memoryApi";
import { validationError } from "../../api/formValidation";
import type { PlaygroundHandlerContext } from "../playgroundHandlerContext";

export const INVOICE_RESOURCE = "invoices" as const;

type InvoiceRow = Invoice & Record<string, unknown>;

type LineInput = {
  id?: number;
  productId?: number | null;
  label?: string;
  quantity?: number;
  unitPrice?: number;
};

function linesForInvoice(api: PlaygroundHandlerContext["api"], invoiceId: number) {
  return api.invoiceLines
    .filter((l) => l.invoiceId === invoiceId)
    .map(({ id, productId, label, quantity, unitPrice }) => ({
      id,
      productId,
      label,
      quantity,
      unitPrice,
    }));
}

function syncInvoiceLines(
  api: PlaygroundHandlerContext["api"],
  nextId: PlaygroundHandlerContext["nextId"],
  invoiceId: number,
  lines: unknown,
) {
  const rows = Array.isArray(lines) ? lines : [];
  const keptIds = new Set<number>();

  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const input = row as LineInput;
    const quantity = Number(input.quantity ?? 0);
    if (quantity <= 0) {
      throw validationError({
        fields: { quantity: "Quantity must be greater than zero" },
      });
    }

    const lineData: Omit<InvoiceLine, "id"> = {
      invoiceId,
      productId:
        input.productId == null ? null : Number(input.productId),
      label: String(input.label ?? ""),
      quantity,
      unitPrice: Number(input.unitPrice ?? 0),
    };

    if (input.id != null) {
      const id = Number(input.id);
      const idx = api.invoiceLines.findIndex((l) => l.id === id);
      if (idx >= 0) {
        api.invoiceLines[idx] = { id, ...lineData };
        keptIds.add(id);
      }
    } else {
      const id = Number(nextId());
      api.invoiceLines.push({ id, ...lineData });
      keptIds.add(id);
    }
  }

  api.invoiceLines = api.invoiceLines.filter(
    (l) => l.invoiceId !== invoiceId || keptIds.has(l.id),
  );
}

export function createInvoiceHandlers(
  ctx: PlaygroundHandlerContext,
): ResourceHandlers<InvoiceRow> {
  const { api, nextId } = ctx;

  const base = createMemoryResourceHandlers<Invoice>({
    getRows: () => api.invoices,
    nextId,
    mapCreate: (data, id) => ({
      id: Number(id),
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

  return {
    ...base,
    async getOne(id, params) {
      const result = await base.getOne(id, params);
      const invoiceId = result.data.id as number;
      return {
        data: {
          ...result.data,
          lines: linesForInvoice(api, invoiceId),
        },
      };
    },
    async create(data) {
      const { lines, ...parent } = data as Record<string, unknown>;
      const result = await base.create(parent);
      const invoiceId = result.data.id as number;
      syncInvoiceLines(api, nextId, invoiceId, lines);
      return {
        data: {
          ...result.data,
          lines: linesForInvoice(api, invoiceId),
        },
      };
    },
    async update({ id, data }) {
      const { lines, ...parent } = data as Record<string, unknown>;
      const result = await base.update({ id, data: parent });
      const invoiceId = result.data.id as number;
      syncInvoiceLines(api, nextId, invoiceId, lines);
      return {
        data: {
          ...result.data,
          lines: linesForInvoice(api, invoiceId),
        },
      };
    },
  };
}

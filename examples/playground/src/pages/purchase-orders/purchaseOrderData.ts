import {
  createMemoryResourceHandlers,
  type ResourceHandlers,
} from "ding-react-admin";
import type { PurchaseOrder } from "../../api/memoryApi";
import { validationError } from "../../api/formValidation";
import type { PlaygroundHandlerContext } from "../playgroundHandlerContext";

export const PURCHASE_ORDER_RESOURCE = "purchase-orders" as const;

type PurchaseOrderRow = PurchaseOrder & Record<string, unknown>;

function mapPurchaseOrder(
  data: Record<string, unknown>,
  id: number,
): PurchaseOrder {
  const number = String(data.number ?? "").trim();
  if (!number) {
    throw validationError({ fields: { number: "PO number is required" } });
  }
  return {
    id,
    number,
    supplierName: String(data.supplierName ?? ""),
    orderDate: String(
      data.orderDate ?? new Date().toISOString().slice(0, 10),
    ),
    expectedDelivery: String(data.expectedDelivery ?? ""),
    shipTo: String(data.shipTo ?? ""),
    shippingMethod: String(data.shippingMethod ?? "standard"),
    warehouse: String(data.warehouse ?? ""),
    incoterms: String(data.incoterms ?? "EXW"),
    currency: String(data.currency ?? "USD"),
    subtotal: Number(data.subtotal ?? 0),
    taxRate: Number(data.taxRate ?? 0),
    notes: String(data.notes ?? ""),
    status: String(data.status ?? "draft"),
    approvedBy: String(data.approvedBy ?? ""),
    approvedAt: String(data.approvedAt ?? ""),
    internalNotes: String(data.internalNotes ?? ""),
  };
}

export function createPurchaseOrderHandlers(
  ctx: PlaygroundHandlerContext,
): ResourceHandlers<PurchaseOrderRow> {
  const { api, nextId } = ctx;

  return createMemoryResourceHandlers<PurchaseOrder>({
    getRows: () => api.purchaseOrders,
    nextId,
    mapCreate: (data, id) => {
      const row = mapPurchaseOrder(data as Record<string, unknown>, id);
      if (api.purchaseOrders.some((p) => p.number === row.number)) {
        throw validationError({ fields: { number: "PO number already exists" } });
      }
      return row;
    },
    applyUpdate: (current, patch) => {
      const merged = { ...current, ...patch };
      const row = mapPurchaseOrder(merged as Record<string, unknown>, current.id);
      if (
        api.purchaseOrders.some(
          (p) => p.number === row.number && p.id !== current.id,
        )
      ) {
        throw validationError({ fields: { number: "PO number already exists" } });
      }
      return row;
    },
  }) as ResourceHandlers<PurchaseOrderRow>;
}

import {
  combineResourceHandlers,
  parseDjangoDRFFormErrors,
  type DataProviderContract,
  type PermissionsChecker,
} from "ding-react-admin";
import type { PlaygroundMemoryApi } from "./memoryApi";
import {
  BRAND_PERMS,
  CATEGORY_PERMS,
  CUSTOMER_PERMS,
  INVOICE_LINE_PERMS,
  INVOICE_PERMS,
  PRODUCT_PERMS,
  PURCHASE_ORDER_PERMS,
} from "./playgroundPermissions";
import { createBrandHandlers, BRAND_RESOURCE } from "../pages/brands";
import { createCategoryHandlers, CATEGORY_RESOURCE } from "../pages/categories";
import {
  createCustomerHandlers,
  CUSTOMER_RESOURCE,
} from "../pages/customers";
import {
  createInvoiceLineHandlers,
  INVOICE_LINE_RESOURCE,
} from "../pages/invoices/invoiceLineData";
import { createInvoiceHandlers, INVOICE_RESOURCE } from "../pages/invoices";
import {
  createPurchaseOrderHandlers,
  PURCHASE_ORDER_RESOURCE,
} from "../pages/purchase-orders";
import { createProductHandlers, PRODUCT_RESOURCE } from "../pages/products";
import { createPlaygroundHandlerContext } from "../pages/playgroundHandlerContext";

/**
 * Thin composer: each entity registers handlers from its feature folder.
 * Delete a resource → remove its folder + entries here + routes + nav.
 */
export function createPlaygroundDataProvider(
  api: PlaygroundMemoryApi,
  can: PermissionsChecker,
): DataProviderContract {
  const ctx = createPlaygroundHandlerContext(api);

  return combineResourceHandlers(
    {
      [PRODUCT_RESOURCE]: {
        handlers: createProductHandlers(ctx),
        permissions: PRODUCT_PERMS,
      },
      [BRAND_RESOURCE]: {
        handlers: createBrandHandlers(ctx),
        permissions: BRAND_PERMS,
      },
      [CATEGORY_RESOURCE]: {
        handlers: createCategoryHandlers(ctx),
        permissions: CATEGORY_PERMS,
      },
      [CUSTOMER_RESOURCE]: {
        handlers: createCustomerHandlers(ctx),
        permissions: CUSTOMER_PERMS,
      },
      [PURCHASE_ORDER_RESOURCE]: {
        handlers: createPurchaseOrderHandlers(ctx),
        permissions: PURCHASE_ORDER_PERMS,
      },
      [INVOICE_RESOURCE]: {
        handlers: createInvoiceHandlers(ctx),
        permissions: INVOICE_PERMS,
      },
      [INVOICE_LINE_RESOURCE]: {
        handlers: createInvoiceLineHandlers(ctx),
        permissions: INVOICE_LINE_PERMS,
      },
    },
    { can, parseFormError: parseDjangoDRFFormErrors },
  );
}

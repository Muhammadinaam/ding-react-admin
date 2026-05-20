import { combineResourceHandlers, type DataProviderContract } from "ding-react-admin";
import type { PlaygroundMemoryApi } from "./memoryApi";
import { createBrandHandlers, BRAND_RESOURCE } from "../pages/brands";
import { createCategoryHandlers, CATEGORY_RESOURCE } from "../pages/categories";
import {
  createInvoiceLineHandlers,
  INVOICE_LINE_RESOURCE,
} from "../pages/invoice-lines";
import { createInvoiceHandlers, INVOICE_RESOURCE } from "../pages/invoices";
import { createProductHandlers, PRODUCT_RESOURCE } from "../pages/products";
import { createPlaygroundHandlerContext } from "../pages/playgroundHandlerContext";

/**
 * Thin composer: each entity registers handlers from its feature folder.
 * Delete a resource → remove its folder + entries here + routes + nav.
 */
export function createPlaygroundDataProvider(
  api: PlaygroundMemoryApi,
  getToken: () => string | null,
): DataProviderContract {
  const ctx = createPlaygroundHandlerContext(api);

  return combineResourceHandlers(
    {
      [PRODUCT_RESOURCE]: createProductHandlers(ctx),
      [BRAND_RESOURCE]: createBrandHandlers(ctx),
      [CATEGORY_RESOURCE]: createCategoryHandlers(ctx),
      [INVOICE_RESOURCE]: createInvoiceHandlers(ctx),
      [INVOICE_LINE_RESOURCE]: createInvoiceLineHandlers(ctx),
    },
    {
      guard: (resource, action) =>
        api.assertCan(getToken(), action, resource),
    },
  );
}

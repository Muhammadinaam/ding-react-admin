/** Demo permission strings — same pattern as any backend (opaque strings). */

export function resourcePerms(resource: string) {
  return {
    list: `${resource}.list`,
    add: `${resource}.add`,
    change: `${resource}.change`,
    delete: `${resource}.delete`,
  } as const;
}

export const PLAYGROUND_RESOURCES = [
  "products",
  "brands",
  "categories",
  "customers",
  "purchase-orders",
  "invoices",
  "invoice-lines",
  "product-photos",
  "product-attachments",
] as const;

export const PRODUCT_PERMS = resourcePerms("products");
export const BRAND_PERMS = resourcePerms("brands");
export const CATEGORY_PERMS = resourcePerms("categories");
export const CUSTOMER_PERMS = resourcePerms("customers");
export const PURCHASE_ORDER_PERMS = resourcePerms("purchase-orders");
export const INVOICE_PERMS = resourcePerms("invoices");
export const INVOICE_LINE_PERMS = resourcePerms("invoice-lines");
export const PRODUCT_PHOTO_PERMS = resourcePerms("product-photos");
export const PRODUCT_ATTACHMENT_PERMS = resourcePerms("product-attachments");

export function adminPermissions(): string[] {
  return PLAYGROUND_RESOURCES.flatMap((r) => Object.values(resourcePerms(r)));
}

export function readOnlyPermissions(): string[] {
  return PLAYGROUND_RESOURCES.map((r) => `${r}.list`);
}

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
] as const;

export const PRODUCT_PERMS = resourcePerms("products");
export const BRAND_PERMS = resourcePerms("brands");
export const CATEGORY_PERMS = resourcePerms("categories");
export const CUSTOMER_PERMS = resourcePerms("customers");
export const PURCHASE_ORDER_PERMS = resourcePerms("purchase-orders");
export const INVOICE_PERMS = resourcePerms("invoices");
export const INVOICE_LINE_PERMS = resourcePerms("invoice-lines");

export function adminPermissions(): string[] {
  return PLAYGROUND_RESOURCES.flatMap((r) => Object.values(resourcePerms(r)));
}

export function readOnlyPermissions(): string[] {
  return PLAYGROUND_RESOURCES.map((r) => `${r}.list`);
}

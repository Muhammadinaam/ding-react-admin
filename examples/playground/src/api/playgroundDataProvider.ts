import type {
  DataProviderContract,
  GetListParams,
  Identifier,
} from "ding-react-admin";
import type {
  Brand,
  Category,
  Invoice,
  InvoiceLine,
  Product,
  PlaygroundMemoryApi,
} from "./memoryApi";

type Row = Record<string, unknown>;

function asRows<T extends object>(xs: T[]): Row[] {
  return xs as unknown as Row[];
}

function getById<T extends { id: number }>(rows: T[], id: Identifier): T {
  const n = typeof id === "string" ? Number(id) : id;
  const row = rows.find((r) => r.id === n);
  if (!row) throw new Error("Not found");
  return row;
}

function sortRows<T extends Record<string, unknown>>(
  rows: T[],
  field: string,
  order: "ASC" | "DESC",
): T[] {
  const mul = order === "DESC" ? -1 : 1;
  return [...rows].sort((a, b) => {
    const av = a[field];
    const bv = b[field];
    if (av === bv) return 0;
    if (av == null) return -1 * mul;
    if (bv == null) return 1 * mul;
    if (typeof av === "number" && typeof bv === "number") {
      return av < bv ? -mul : mul;
    }
    return String(av).localeCompare(String(bv)) * mul;
  });
}

function filterRows<T extends Record<string, unknown>>(
  rows: T[],
  filter?: Record<string, unknown>,
): T[] {
  if (!filter) return rows;
  return rows.filter((row) =>
    Object.entries(filter).every(([k, v]) => {
      if (v === undefined || v === null || v === "") return true;
      return row[k] === v;
    }),
  );
}

function paginate<T>(rows: T[], page: number, perPage: number) {
  const start = (page - 1) * perPage;
  return {
    data: rows.slice(start, start + perPage),
    total: rows.length,
  };
}

function list<T extends Record<string, unknown>>(
  rows: T[],
  params: GetListParams,
): { data: T[]; total: number } {
  const { pagination, sort, filter } = params;
  let out = filterRows(rows, filter);
  if (sort?.field) {
    out = sortRows(out, sort.field, sort.order ?? "ASC");
  }
  if (pagination) {
    return paginate(out, pagination.page, pagination.perPage);
  }
  return { data: out, total: out.length };
}

let nextEntityId = 1_000;

export function createPlaygroundDataProvider(
  api: PlaygroundMemoryApi,
  getToken: () => string | null,
): DataProviderContract {
  const assert = (action: string, resource: string) =>
    api.assertCan(getToken(), action, resource);

  const provider: DataProviderContract = {
    async getList(resource, params) {
      assert("list", resource);
      switch (resource) {
        case "products":
          return list(asRows<Product>(api.products), params);
        case "brands":
          return list(asRows<Brand>(api.brands), params);
        case "categories":
          return list(asRows<Category>(api.categories), params);
        case "invoices":
          return list(asRows<Invoice>(api.invoices), params);
        case "invoice-lines": {
          const invId = params.filter?.invoiceId;
          const base = api.invoiceLines.filter((l) =>
            invId === undefined || invId === "" || invId === null
              ? true
              : l.invoiceId === Number(invId),
          );
          return list(asRows<InvoiceLine>(base), params);
        }
        default:
          throw new Error(`Unknown resource: ${resource}`);
      }
    },

    async getOne(resource, id) {
      assert("read", resource);
      switch (resource) {
        case "products":
          return {
            data: getById(api.products, id) as unknown as Row,
          };
        case "brands":
          return { data: getById(api.brands, id) as unknown as Row };
        case "categories":
          return { data: getById(api.categories, id) as unknown as Row };
        case "invoices":
          return { data: getById(api.invoices, id) as unknown as Row };
        case "invoice-lines":
          return { data: getById(api.invoiceLines, id) as unknown as Row };
        default:
          throw new Error(`Unknown resource: ${resource}`);
      }
    },

    async create(resource, data) {
      assert("write", resource);
      const row = data as Row;
      switch (resource) {
        case "products": {
          const brandId = Number(row.brandId);
          const p: Product = {
            id: nextEntityId++,
            name: String(row.name ?? ""),
            sku: String(row.sku ?? ""),
            price: Number(row.price ?? 0),
            brandId,
            categoryIds: Array.isArray(row.categoryIds)
              ? (row.categoryIds as number[])
              : [],
          };
          api.syncBrandProductLink(p);
          api.products.push(p);
          return { data: p as unknown as Row };
        }
        case "brands": {
          const b: Brand = {
            id: nextEntityId++,
            name: String(row.name ?? ""),
            productId: null,
          };
          api.brands.push(b);
          return { data: b as unknown as Row };
        }
        case "categories": {
          const c: Category = {
            id: nextEntityId++,
            name: String(row.name ?? ""),
          };
          api.categories.push(c);
          return { data: c as unknown as Row };
        }
        case "invoices": {
          const inv: Invoice = {
            id: nextEntityId++,
            number: String(row.number ?? ""),
            customer: String(row.customer ?? ""),
            issuedAt: String(row.issuedAt ?? new Date().toISOString().slice(0, 10)),
          };
          api.invoices.push(inv);
          return { data: inv as unknown as Row };
        }
        case "invoice-lines": {
          const line: InvoiceLine = {
            id: nextEntityId++,
            invoiceId: Number(row.invoiceId),
            productId: row.productId == null ? null : Number(row.productId),
            label: String(row.label ?? ""),
            quantity: Number(row.quantity ?? 0),
            unitPrice: Number(row.unitPrice ?? 0),
          };
          api.invoiceLines.push(line);
          return { data: line as unknown as Row };
        }
        default:
          throw new Error(`Unknown resource: ${resource}`);
      }
    },

    async update(resource, { id, data }) {
      assert("write", resource);
      const patch = data as Row;
      switch (resource) {
        case "products": {
          const cur = getById(api.products, id);
          const prevBrand = cur.brandId;
          const next: Product = {
            ...cur,
            ...patch,
            id: cur.id,
            brandId:
              patch.brandId !== undefined
                ? Number(patch.brandId)
                : cur.brandId,
            categoryIds:
              patch.categoryIds !== undefined
                ? (patch.categoryIds as number[])
                : cur.categoryIds,
            name:
              patch.name !== undefined ? String(patch.name) : cur.name,
            sku: patch.sku !== undefined ? String(patch.sku) : cur.sku,
            price:
              patch.price !== undefined ? Number(patch.price) : cur.price,
          };
          api.syncBrandProductLink(next, prevBrand);
          Object.assign(cur, next);
          return { data: cur as unknown as Row };
        }
        case "brands": {
          const b = getById(api.brands, id);
          if (patch.name !== undefined) b.name = String(patch.name);
          return { data: b as unknown as Row };
        }
        case "categories": {
          const c = getById(api.categories, id);
          if (patch.name !== undefined) c.name = String(patch.name);
          return { data: c as unknown as Row };
        }
        case "invoices": {
          const inv = getById(api.invoices, id);
          if (patch.number !== undefined) inv.number = String(patch.number);
          if (patch.customer !== undefined) {
            inv.customer = String(patch.customer);
          }
          if (patch.issuedAt !== undefined) {
            inv.issuedAt = String(patch.issuedAt);
          }
          return { data: inv as unknown as Row };
        }
        case "invoice-lines": {
          const line = getById(api.invoiceLines, id);
          if (patch.invoiceId !== undefined) {
            line.invoiceId = Number(patch.invoiceId);
          }
          if (patch.productId !== undefined) {
            line.productId =
              patch.productId === null ? null : Number(patch.productId);
          }
          if (patch.label !== undefined) line.label = String(patch.label);
          if (patch.quantity !== undefined) {
            line.quantity = Number(patch.quantity);
          }
          if (patch.unitPrice !== undefined) {
            line.unitPrice = Number(patch.unitPrice);
          }
          return { data: line as unknown as Row };
        }
        default:
          throw new Error(`Unknown resource: ${resource}`);
      }
    },

    async delete(resource, id) {
      assert("delete", resource);
      const n = typeof id === "string" ? Number(id) : id;
      switch (resource) {
        case "products": {
          const idx = api.products.findIndex((p) => p.id === n);
          if (idx < 0) return { data: null };
          const [removed] = api.products.splice(idx, 1);
          const br = api.brands.find((b) => b.productId === removed.id);
          if (br) br.productId = null;
          return { data: removed as unknown as Row };
        }
        case "brands": {
          const idx = api.brands.findIndex((b) => b.id === n);
          if (idx < 0) return { data: null };
          const [removed] = api.brands.splice(idx, 1);
          api.products.forEach((p) => {
            if (p.brandId === removed.id) {
              const orphan = api.brands.find((b) => b.productId === null);
              if (orphan) {
                p.brandId = orphan.id;
                api.syncBrandProductLink(p);
              }
            }
          });
          return { data: removed as unknown as Row };
        }
        case "categories": {
          const idx = api.categories.findIndex((c) => c.id === n);
          if (idx < 0) return { data: null };
          const [removed] = api.categories.splice(idx, 1);
          api.products.forEach((p) => {
            p.categoryIds = p.categoryIds.filter((cid) => cid !== removed.id);
          });
          return { data: removed as unknown as Row };
        }
        case "invoices": {
          const idx = api.invoices.findIndex((i) => i.id === n);
          if (idx < 0) return { data: null };
          const [removed] = api.invoices.splice(idx, 1);
          api.invoiceLines = api.invoiceLines.filter(
            (l) => l.invoiceId !== removed.id,
          );
          return { data: removed as unknown as Row };
        }
        case "invoice-lines": {
          const idx = api.invoiceLines.findIndex((l) => l.id === n);
          if (idx < 0) return { data: null };
          const [removed] = api.invoiceLines.splice(idx, 1);
          return { data: removed as unknown as Row };
        }
        default:
          throw new Error(`Unknown resource: ${resource}`);
      }
    },
  };

  return provider;
}

// ADVANCED: manual handlers when create/update/delete have cross-entity side effects.
// For simple entities use createMemoryResourceHandlers or createRestResourceHandlers instead.
// SEE: docs/data-layer-advanced.md

import {
  applyInMemoryListParams,
  getRowById,
  type ResourceHandlers,
} from "ding-react-admin";
import type { Brand, Product } from "../../api/memoryApi";
import { validationError } from "../../api/formValidation";
import type { PlaygroundHandlerContext } from "../playgroundHandlerContext";

export const PRODUCT_RESOURCE = "products" as const;

export const PRODUCT_PERMS = {
  list: "products.list",
  add: "products.add",
  change: "products.change",
  delete: "products.delete",
} as const;

type ProductRow = Product & Record<string, unknown>;
type Row = Record<string, unknown>;

function assertProduct(api: PlaygroundHandlerContext["api"], row: Row, excludeId?: number) {
  const sku = String(row.sku ?? "").trim();
  if (!sku) {
    throw validationError({ fields: { sku: "SKU is required" } });
  }
  if (api.products.some((p) => p.sku === sku && p.id !== excludeId)) {
    throw validationError({ fields: { sku: "SKU already exists" } });
  }
}

export function createProductHandlers(
  ctx: PlaygroundHandlerContext,
): ResourceHandlers<ProductRow> {
  const { api, nextId } = ctx;

  return {
    async getList(params) {
      return applyInMemoryListParams(
        api.products as unknown as Row[],
        params,
      ) as { data: ProductRow[]; total: number };
    },

    async getOne(id, _params?) {
      return {
        data: getRowById(api.products, id) as unknown as ProductRow,
      };
    },

    async create(data) {
      const row = data as Row;
      assertProduct(api, row);
      const brandId = Number(row.brandId);
      const p: Product = {
        id: nextId(),
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
      return { data: p as ProductRow };
    },

    async update({ id, data }) {
      const patch = data as Row;
      const cur = getRowById(api.products, id) as Product;
      const merged = { ...cur, ...patch };
      assertProduct(api, merged as Row, cur.id);
      const prevBrand = cur.brandId;
      const next: Product = {
        ...cur,
        ...patch,
        id: cur.id,
        brandId:
          patch.brandId !== undefined ? Number(patch.brandId) : cur.brandId,
        categoryIds:
          patch.categoryIds !== undefined
            ? (patch.categoryIds as number[])
            : cur.categoryIds,
        name: patch.name !== undefined ? String(patch.name) : cur.name,
        sku: patch.sku !== undefined ? String(patch.sku) : cur.sku,
        price: patch.price !== undefined ? Number(patch.price) : cur.price,
      };
      api.syncBrandProductLink(next, prevBrand);
      Object.assign(cur, next);
      return { data: cur as ProductRow };
    },

    async delete(id) {
      const n = typeof id === "string" ? Number(id) : id;
      const idx = api.products.findIndex((p: Product) => p.id === n);
      if (idx < 0) return { data: null };
      const [removed] = api.products.splice(idx, 1);
      const br = api.brands.find((b: Brand) => b.productId === removed.id);
      if (br) br.productId = null;
      return { data: removed as ProductRow };
    },
  };
}

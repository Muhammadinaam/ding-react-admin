// WHAT YOU IMPLEMENT: store access + any delete side effects (see afterDelete below).
// WHAT THE LIBRARY HANDLES: in-memory list filter/sort/paginate; form payload from field `source`.
// SEE: docs/tutorial-one-entity.md

import {
  createMemoryResourceHandlers,
  type ResourceHandlers,
} from "ding-react-admin";
import type { Brand, Product } from "../../api/memoryApi";
import type { PlaygroundHandlerContext } from "../playgroundHandlerContext";

export const BRAND_RESOURCE = "brands" as const;

type BrandRow = Brand & Record<string, unknown>;

export function createBrandHandlers(
  ctx: PlaygroundHandlerContext,
): ResourceHandlers<BrandRow> {
  const { api, nextId } = ctx;

  return createMemoryResourceHandlers<Brand>({
    getRows: () => api.brands,
    nextId,
    mapCreate: (data, id) => ({
      id,
      name: String(data.name ?? ""),
      productId: null,
    }),
    afterDelete: (removed) => {
      api.products.forEach((p: Product) => {
        if (p.brandId === removed.id) {
          const orphan = api.brands.find((b: Brand) => b.productId === null);
          if (orphan) {
            p.brandId = orphan.id;
            api.syncBrandProductLink(p);
          }
        }
      });
    },
  }) as ResourceHandlers<BrandRow>;
}

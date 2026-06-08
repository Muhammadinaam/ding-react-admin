// WHAT YOU IMPLEMENT: store access + any delete side effects (see afterDelete below).
// WHAT THE LIBRARY HANDLES: in-memory list filter/sort/paginate; form payload from field `source`.
// SEE: docs/tutorial-one-entity.md

import {
  createMemoryResourceHandlers,
  type ResourceHandlers,
} from "ding-react-admin";
import type { Category, Product } from "../../api/memoryApi";
import type { PlaygroundHandlerContext } from "../playgroundHandlerContext";

export const CATEGORY_RESOURCE = "categories" as const;

type CategoryRow = Category & Record<string, unknown>;

export function createCategoryHandlers(
  ctx: PlaygroundHandlerContext,
): ResourceHandlers<CategoryRow> {
  const { api, nextId } = ctx;

  return createMemoryResourceHandlers<Category>({
    getRows: () => api.categories,
    nextId,
    afterDelete: (removed) => {
      api.products.forEach((p: Product) => {
        p.categoryIds = p.categoryIds.filter(
          (cid: number) => cid !== removed.id,
        );
      });
    },
  }) as ResourceHandlers<CategoryRow>;
}

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
    mapCreate: (data, id) => ({
      id,
      name: String(data.name ?? ""),
    }),
    applyUpdate: (current, patch) => ({
      ...current,
      name: patch.name !== undefined ? String(patch.name) : current.name,
    }),
    afterDelete: (removed) => {
      api.products.forEach((p: Product) => {
        p.categoryIds = p.categoryIds.filter((cid: number) => cid !== removed.id);
      });
    },
  }) as ResourceHandlers<CategoryRow>;
}

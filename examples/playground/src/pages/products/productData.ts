import {
  applyInMemoryListParams,
  getRowById,
  type ResourceHandlers,
} from "ding-react-admin";
import type { Brand, Product, ProductAttachment, ProductPhoto } from "../../api/memoryApi";
import { normalizeMutationBody } from "../../api/formDataHelpers";
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

type PhotoInput = {
  id?: number;
  caption?: string;
  image?: string | null;
};

type AttachmentInput = {
  id?: number;
  label?: string;
  file?: string | null;
};

function nullableString(value: unknown): string | null {
  if (value == null || value === "") return null;
  return String(value);
}

function photosForProduct(api: PlaygroundHandlerContext["api"], productId: number) {
  return api.productPhotos
    .filter((p) => p.productId === productId)
    .map(({ id, caption, image }) => ({ id, caption, image }));
}

function attachmentsForProduct(
  api: PlaygroundHandlerContext["api"],
  productId: number,
) {
  return api.productAttachments
    .filter((a) => a.productId === productId)
    .map(({ id, label, file }) => ({ id, label, file }));
}

function syncProductPhotos(
  api: PlaygroundHandlerContext["api"],
  nextId: PlaygroundHandlerContext["nextId"],
  productId: number,
  photos: unknown,
) {
  const rows = Array.isArray(photos) ? photos : [];
  const keptIds = new Set<number>();

  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const input = row as PhotoInput;
    const photoData: Omit<ProductPhoto, "id"> = {
      productId,
      caption: String(input.caption ?? ""),
      image: nullableString(input.image),
    };

    if (input.id != null) {
      const id = Number(input.id);
      const idx = api.productPhotos.findIndex((p) => p.id === id);
      if (idx >= 0) {
        api.productPhotos[idx] = { id, ...photoData };
        keptIds.add(id);
      }
    } else {
      const id = Number(nextId());
      api.productPhotos.push({ id, ...photoData });
      keptIds.add(id);
    }
  }

  api.productPhotos = api.productPhotos.filter(
    (p) => p.productId !== productId || keptIds.has(p.id),
  );
}

function syncProductAttachments(
  api: PlaygroundHandlerContext["api"],
  nextId: PlaygroundHandlerContext["nextId"],
  productId: number,
  attachments: unknown,
) {
  const rows = Array.isArray(attachments) ? attachments : [];
  const keptIds = new Set<number>();

  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const input = row as AttachmentInput;
    const attachmentData: Omit<ProductAttachment, "id"> = {
      productId,
      label: String(input.label ?? ""),
      file: nullableString(input.file),
    };

    if (input.id != null) {
      const id = Number(input.id);
      const idx = api.productAttachments.findIndex((a) => a.id === id);
      if (idx >= 0) {
        api.productAttachments[idx] = { id, ...attachmentData };
        keptIds.add(id);
      }
    } else {
      const id = Number(nextId());
      api.productAttachments.push({ id, ...attachmentData });
      keptIds.add(id);
    }
  }

  api.productAttachments = api.productAttachments.filter(
    (a) => a.productId !== productId || keptIds.has(a.id),
  );
}

function assertProduct(api: PlaygroundHandlerContext["api"], row: Row, excludeId?: number) {
  const sku = String(row.sku ?? "").trim();
  if (!sku) {
    throw validationError({ fields: { sku: "SKU is required" } });
  }
  if (api.products.some((p) => p.sku === sku && p.id !== excludeId)) {
    throw validationError({ fields: { sku: "SKU already exists" } });
  }
}

/** Django-style nested body — parsed to `image` and `photos.0.image` form paths. */
function assertProductImages(image: string | null, photos: unknown): void {
  const body: Record<string, unknown> = {};

  if (!image) {
    body.image = ["Product image is required"];
  }

  const photoRows = Array.isArray(photos) ? photos : [];
  const inlineErrors = photoRows.map((row) => {
    if (!row || typeof row !== "object") return {};
    const input = row as PhotoInput;
    return nullableString(input.image) ? {} : { image: ["Photo is required"] };
  });
  const hasInlineErrors = inlineErrors.some(
    (row) => Object.keys(row).length > 0,
  );

  if (hasInlineErrors) {
    body.photos = inlineErrors;
  }

  if (Object.keys(body).length > 0) {
    throw { body };
  }
}

function mapProductPatch(cur: Product, patch: Row): Product {
  return {
    ...cur,
    ...patch,
    id: cur.id,
    brandId: patch.brandId !== undefined ? Number(patch.brandId) : cur.brandId,
    categoryIds:
      patch.categoryIds !== undefined
        ? (patch.categoryIds as number[])
        : cur.categoryIds,
    name: patch.name !== undefined ? String(patch.name) : cur.name,
    sku: patch.sku !== undefined ? String(patch.sku) : cur.sku,
    price: patch.price !== undefined ? Number(patch.price) : cur.price,
    image: patch.image !== undefined ? nullableString(patch.image) : cur.image,
    specsPdf:
      patch.specsPdf !== undefined ? nullableString(patch.specsPdf) : cur.specsPdf,
  };
}

function productWithNested(
  api: PlaygroundHandlerContext["api"],
  product: Product,
): ProductRow {
  const productId = product.id;
  return {
    ...product,
    photos: photosForProduct(api, productId),
    attachments: attachmentsForProduct(api, productId),
  };
}

function purgeProductNested(api: PlaygroundHandlerContext["api"], productId: number) {
  api.productPhotos = api.productPhotos.filter((p) => p.productId !== productId);
  api.productAttachments = api.productAttachments.filter(
    (a) => a.productId !== productId,
  );
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
      const product = getRowById(api.products, id) as Product;
      return { data: productWithNested(api, product) };
    },

    async create(data) {
      const record = normalizeMutationBody(data);
      const { photos, attachments, ...parent } = record;
      assertProduct(api, parent);
      const image = nullableString(parent.image);
      assertProductImages(image, photos);
      const brandId = Number(parent.brandId);
      const p: Product = {
        id: nextId(),
        name: String(parent.name ?? ""),
        sku: String(parent.sku ?? ""),
        price: Number(parent.price ?? 0),
        brandId,
        categoryIds: Array.isArray(parent.categoryIds)
          ? (parent.categoryIds as number[])
          : [],
        image: nullableString(parent.image),
        specsPdf: nullableString(parent.specsPdf),
      };
      api.syncBrandProductLink(p);
      api.products.push(p);
      syncProductPhotos(api, nextId, p.id, photos);
      syncProductAttachments(api, nextId, p.id, attachments);
      return { data: productWithNested(api, p) };
    },

    async update({ id, data }) {
      const record = normalizeMutationBody(data);
      const { photos, attachments, ...parent } = record;
      const cur = getRowById(api.products, id) as Product;
      const merged = mapProductPatch(cur, parent);
      assertProduct(api, merged as Row, cur.id);
      assertProductImages(merged.image, photos);
      const prevBrand = cur.brandId;
      api.syncBrandProductLink(merged, prevBrand);
      Object.assign(cur, merged);
      if (photos !== undefined) {
        syncProductPhotos(api, nextId, cur.id, photos);
      }
      if (attachments !== undefined) {
        syncProductAttachments(api, nextId, cur.id, attachments);
      }
      return { data: productWithNested(api, cur) };
    },

    async delete(id) {
      const n = typeof id === "string" ? Number(id) : id;
      const idx = api.products.findIndex((p: Product) => p.id === n);
      if (idx < 0) return { data: null };
      const [removed] = api.products.splice(idx, 1);
      const br = api.brands.find((b: Brand) => b.productId === removed.id);
      if (br) br.productId = null;
      purgeProductNested(api, removed.id);
      return { data: removed as ProductRow };
    },
  };
}

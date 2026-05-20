# Example app in this repo

There is a Vite app under [`examples/playground`](../examples/playground): **in-memory demo API** (auth + products, brands, categories, invoices, lines), **CRUD screens**, wired **`DataProvider` / `PermissionsProvider`**, and **demo users** (`admin`/`admin` vs `user`/`user`).

From the **repository root**:

```bash
yarn --cwd examples/playground install
yarn dev:example
```

For day-to-day work on the library, the playground uses a Vite alias to `../../src` so changes hot-reload. **Consumers installing from GitHub do not need that alias.**

## Per-entity data modules (playground pattern)

Each resource lives in a **feature folder** under `examples/playground/src/pages/`:

```
pages/products/
  Products.tsx      # UI only (ResourceList / ResourceForm)
  productData.ts    # getList / getOne / create / update / delete
  index.ts          # re-exports
```

`examples/playground/src/api/playgroundDataProvider.ts` is a thin composer:

```tsx
import { combineResourceHandlers } from "ding-react-admin";
import { createProductHandlers, PRODUCT_RESOURCE } from "../pages/products";

return combineResourceHandlers(
  { [PRODUCT_RESOURCE]: createProductHandlers(ctx), /* … */ },
  { guard: (resource, action) => api.assertCan(getToken(), action, resource) },
);
```

**Removing a resource:** delete its folder, remove one line from the composer, and drop routes + nav entries.

For a **generated API client**, implement the same `ResourceHandlers` in `productData.ts` by calling `apiClient.fetchProducts(...)` inside `getList`, etc. Pages keep `resource={PRODUCT_RESOURCE}` and `pathPrefix="/products"` unchanged.

Library helpers:

- **`combineResourceHandlers`** — compose entity handlers into a `DataProvider`
- **`createMemoryResourceHandlers`** — generic in-memory CRUD for demos (override hooks for special rules)
- **`applyInMemoryListParams`** — filter / sort / paginate in-memory rows

[← Back to README](../README.md)

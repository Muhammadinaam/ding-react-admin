# ding-react-admin

Composable admin shell for React apps: **Ant Design** layout, **CRUD field system** (lists, forms, filters, inlines), **theme/density** controls, **session-style auth** helpers, **data / permissions providers** (react-admin–style naming, intentionally small), and **React Router** helpers. Prefer **`createBrowserRouter` in your app** with **`AdminLayout`**, `Protected`, and `GuestOnly` (see `examples/playground/src/main.tsx`) so routes stay readable. Use the quick-start `<AdminApp />` or optional `createAdminRouter` shortcut when you do not want the route tree in app code.

## Install

Peer dependencies (your app must provide them):

- `react`, `react-dom` (18+)
- `react-router-dom` (6+)
- `react-hook-form` (7+)
- `dayjs` (1+)
- `antd` (5+)
- `@ant-design/icons` (5+)

From GitHub, **no Vite alias required** — the package resolves to published `exports` (`dist/index.js` + types). Commit `dist/` in your fork, or run `yarn && yarn build` in this repo before packing / installing.

```bash
yarn add https://github.com/Muhammadinaam/ding-react-admin.git
```

(Optional) Pin a tag or commit:

```bash
yarn add https://github.com/Muhammadinaam/ding-react-admin.git#v0.1.0
```

## Example app in this repo

There is a Vite app under [`examples/playground`](examples/playground): **in-memory demo API** (auth + products, brands, categories, invoices, lines), **CRUD screens**, wired **`DataProvider` / `PermissionsProvider`**, and **demo users** (`admin`/`admin` vs `user`/`user`).

From the **repository root**:

```bash
yarn --cwd examples/playground install
yarn dev:example
```

For day-to-day work on the library, the playground uses a Vite alias to `../../src` so changes hot-reload. **Consumers installing from GitHub do not need that alias.**

### Per-entity data modules (playground pattern)

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


`AdminLayout` renders **`navItems`** as an Ant Design **`Menu`**.

- **Flat items** — `{ path, label, Icon? }`: **`path`** is the menu key and the pathname used when a **leaf** row is clicked.
- **Nested menus** — optional **`children`**: `NavItem[]`. Parent rows open a submenu; navigation runs **only for leaves**. Give parents a **`path`** that acts as submenu key only (for example **`/catalog`**) unless you define that route yourself.
- **Badges / custom labels** — **`label`** is **`React.ReactNode`**, so you can combine text with **`Badge`** or other markup.

```tsx
import { AppstoreOutlined, GiftOutlined } from "@ant-design/icons";
import { Badge, Space } from "antd";
import type { NavItem } from "ding-react-admin";

const nav: NavItem[] = [
  {
    path: "/catalog",
    label: "Catalog",
    Icon: AppstoreOutlined,
    children: [
      { path: "/products", label: "Products", Icon: GiftOutlined },
      {
        path: "/orders",
        label: (
          <Space size="small">
            <span>Orders</span>
            <Badge count={4} size="small" />
          </Space>
        ),
      },
    ],
  },
];
```

See **`examples/playground/src/navigation.tsx`** for a nested group plus a badge on a leaf row.

## CRUD field system

Django-admin-style CRUD built from JSX components. List pages, forms, filters, reference lookups, URL-synced state, modal create/edit, and nested inlines are all included.

**Requires:** `DataProvider`, `PermissionsProvider`, and `react-hook-form` in your app (see playground `main.tsx`).

### List page

```tsx
import {
  FilterBar,
  NumberColumn,
  ReferenceColumn,
  ReferenceFilter,
  ResourceList,
  TextColumn,
  TextField,
  TextFilter,
} from "ding-react-admin";

export function ProductListPage() {
  const formFields = (
    <>
      <TextField source="sku" label="SKU" required />
      <TextField source="name" label="Name" required />
    </>
  );

  return (
    <ResourceList
      resource="products"
      title="Products"
      pathPrefix="/products"
      editMode="both"
      formChildren={formFields}
    >
      <FilterBar>
        <TextFilter source="name" label="Name" />
        <ReferenceFilter
          source="brandId"
          label="Brand"
          reference="brands"
          optionLabel="name"
          multiple
        />
      </FilterBar>
      <TextColumn source="sku" label="SKU" />
      <TextColumn source="name" label="Name" />
      <ReferenceColumn
        source="brandId"
        label="Brand"
        reference="brands"
        optionLabel="name"
      />
    </ResourceList>
  );
}
```

**URL query params** (shareable links):

| Param | Example | Purpose |
|-------|---------|---------|
| `page`, `perPage` | `?page=2&perPage=25` | Pagination |
| `sort` | `?sort=name:asc&sort=price:desc` | Multi-column sort |
| Filter keys | `?name=Widget&brandId=1,2` | List filters |
| `create` | `?create=1` | Open create modal |
| `edit` | `?edit=5` | Open edit modal |

`editMode`: `"page"` (default), `"modal"`, or `"both"`.

#### List header and row actions

**Card header** — add buttons to the left of **New** / **New page** with `headerExtra`:

```tsx
<ResourceList
  resource="products"
  title="Products"
  pathPrefix="/products"
  headerExtra={<Button onClick={exportCsv}>Export</Button>}
>
  {/* columns & filters */}
</ResourceList>
```

**Built-in row actions** — Edit, Quick edit, and Delete are shown when the user has `write` / `delete` permission. Hide individual actions with `actions` (permissions still apply; `false` only suppresses the button):

```tsx
<ResourceList
  resource="products"
  title="Products"
  pathPrefix="/products"
  editMode="both"
  actions={{ delete: false, quickEdit: false }}
>
  {/* … */}
</ResourceList>
```

| `actions` key | Hides |
|---------------|--------|
| `edit` | Navigate-to-form **Edit** link (`editMode` `"page"` or `"both"`) |
| `quickEdit` | Modal **Edit** / **Quick edit** (`editMode` `"modal"` or `"both"`) |
| `delete` | **Delete** button |

**Custom row actions** — append links or buttons in the Actions column with `rowActions`. The second argument exposes `reload()` and `openEditModal(id)`:

```tsx
<ResourceList
  resource="products"
  title="Products"
  pathPrefix="/products"
  rowActions={(row, { reload, openEditModal }) => (
    <>
      <Button type="link" size="small" style={{ padding: 0 }} onClick={() => openEditModal(row.id as number)}>
        Clone
      </Button>
      <Link to={`/products/${row.id}/preview`}>Preview</Link>
    </>
  )}
>
  {/* … */}
</ResourceList>
```

Pass `rowActions` alone (without built-in actions) to get an Actions column with only your buttons — set every `actions` key to `false` and ensure permissions would not show defaults, or rely on read-only users plus custom actions.

For a **separate column** (not the Actions column), use `CustomColumn` instead.

### Form page

```tsx
import { ResourceForm, TextField, ReferenceField } from "ding-react-admin";

export function ProductFormPage() {
  return (
    <ResourceForm resource="products" title="Product" listPath="/products">
      <TextField source="sku" label="SKU" required />
      <TextField source="name" label="Name" required />
      <ReferenceField
        source="brandId"
        label="Brand"
        reference="brands"
        optionLabel="name"
        required
      />
    </ResourceForm>
  );
}
```

Forms use **react-hook-form** under the hood. Layout is plain JSX — wrap fields in Ant Design `Row` / `Col` as needed.

### Reference / lookup fields

Load options from your `DataProvider` or a custom function:

```tsx
// From another resource
<ReferenceField source="brandId" reference="brands" optionLabel="name" />

// Custom loader (REST client, GraphQL, etc.)
<ReferenceField
  source="brandId"
  choices={async ({ dataProvider, search }) => {
    const res = await dataProvider.getList("brands", {
      filter: search ? { q: search } : undefined,
    });
    return res.data.map((row) => ({
      label: String(row.name),
      value: row.id,
    }));
  }}
/>

// Server-side search in dropdown
<ReferenceField source="brandId" reference="brands" search optionLabel="name" />
```

Table columns resolve FK ids to labels via `ReferenceColumn`. Filters support multi-select via `ReferenceFilter multiple`.

### Inline nested forms (TabularInline / StackedInline)

```tsx
import { InlineFormSet, ResourceForm, TextField, NumberField } from "ding-react-admin";

<ResourceForm
  resource="invoices"
  listPath="/invoices"
  inlines={[{ resource: "invoice-lines", foreignKey: "invoiceId" }]}
>
  <TextField source="number" required />
  {/* Tabular (default) — one row per line, column headers, no duplicate labels */}
  <InlineFormSet resource="invoice-lines" foreignKey="invoiceId" label="Lines">
    <TextField source="label" label="Label" required />
    <NumberField source="quantity" label="Qty" required />
  </InlineFormSet>

  {/* Stacked — Django StackedInline, each item in a card with field labels */}
  <InlineFormSet
    resource="invoice-lines"
    foreignKey="invoiceId"
    label="Lines"
    layout="stacked"
  >
    <TextField source="label" label="Label" required />
    <NumberField source="quantity" label="Qty" required />
  </InlineFormSet>
</ResourceForm>
```

| `layout` | Behavior |
|----------|----------|
| `"tabular"` (default) | Mini-table with column headers; cell inputs have **no** extra labels |
| `"stacked"` | Each related row in a card; fields show labels vertically |

Pass matching `inlines={[...]}` on `ResourceForm` so child rows load/save with the parent.

#### Inline column width and input styling

In tabular inlines, set **`minWidth`** / **`width`** on field components to size table columns (e.g. `minWidth={220}` on a `ReferenceField`). Use **`inputStyle`** for the control itself (`style` on the underlying Ant Design input/select).

#### Dependent fields (e.g. product → unit price)

Use **`onValueChange`** on `ReferenceField` with `useFormContext().setValue`. The callback receives the selected option’s **`record`** (full row from the reference resource) and the inline field **`name`** so you can update sibling fields in the same row:

```tsx
function InvoiceLinesInline() {
  const { setValue } = useFormContext();

  return (
    <InlineFormSet resource="invoice-lines" foreignKey="invoiceId" label="Lines">
      <ReferenceField
        source="productId"
        reference="products"
        minWidth={220}
        onValueChange={(value, option, { name }) => {
          if (!name) return;
          const unitPriceName = name.replace(/\.productId$/, ".unitPrice");
          if (value == null) {
            setValue(unitPriceName, undefined, { shouldDirty: true });
            return;
          }
          const price = option?.record?.price;
          if (typeof price === "number") {
            setValue(unitPriceName, price, { shouldDirty: true });
          }
        }}
      />
      <NumberField source="unitPrice" label="Unit price" minWidth={120} />
    </InlineFormSet>
  );
}
```

Reference choices are **cached and deduped** across rows, so multiple inline `ReferenceField`s for the same resource should not each show a loading spinner after the first load.

### Built-in field / column / filter components

| Type | Form | Column | Filter |
|------|------|--------|--------|
| Text | `TextField` | `TextColumn` | `TextFilter` |
| Number | `NumberField` | `NumberColumn` | `NumberFilter` |
| Boolean | `BooleanField` | `BooleanColumn` | `BooleanFilter` |
| Date | `DateField` | `DateColumn` | `DateFilter` |
| Select (static) | `SelectField` | — | `SelectFilter` |
| Reference (FK) | `ReferenceField` | `ReferenceColumn` | `ReferenceFilter` |
| Reference many | `ReferenceManyField` | `ReferenceManyColumn` | `ReferenceManyFilter` |
| Custom | — | `CustomColumn` | — |

`DateField` and `DateFilter` use Ant Design **`DatePicker`** (requires `dayjs` peer). If you alias this library to source in a monorepo (like the playground), **dedupe `dayjs`** in Vite so Ant Design and the library share one copy — otherwise opening the calendar can throw `clone.weekday is not a function`.

## Adding a custom field type

The CRUD system uses three parallel component families that share props (`source`, `label`, …) from `src/crud/types.ts`:

1. **Form fields** — `*Field.tsx` in `src/crud/fields/`
2. **Table columns** — `*Column.tsx` in `src/crud/columns/`
3. **List filters** — `*Filter.tsx` in `src/crud/filters/`

You only need the pieces you use (e.g. a read-only column might skip the form field).

### 1. Form field

Use `FieldWrapper` (react-hook-form + Ant Design `Form.Item`) and `useInlineOrFormField` so the same field works in normal forms and inside `InlineFormSet`:

```tsx
// src/crud/fields/ColorField.tsx
import { ColorPicker } from "antd";
import type { BaseSourceProps, FieldRules } from "../types";
import { useInlineOrFormField } from "./useInlineOrFormField";

export type ColorFieldProps = BaseSourceProps & {
  required?: boolean;
  rules?: FieldRules;
};

export function ColorField({ source, label, required, rules }: ColorFieldProps) {
  const field = useInlineOrFormField(
    source,
    label,
    required,
    rules,
    ({ value, onChange, disabled }) => (
      <ColorPicker
        value={value as string | undefined}
        onChange={(_, hex) => onChange(hex)}
        disabled={disabled}
      />
    ),
  );

  if (field.mode === "inline") return null;
  return field.element;
}
```

Export it from `src/crud/index.ts` and `src/index.ts`.

### 2. Table column

Register with `useRegisterColumn` inside a null-rendering component:

```tsx
// src/crud/columns/ColorColumn.tsx
import { useMemo } from "react";
import { useRegisterColumn } from "../context/ListContext";

export function ColorColumn({ source, label }: { source: string; label?: string }) {
  const def = useMemo(
    () => ({
      key: source,
      source,
      label,
      sortable: false,
      buildColumn: () => ({
        title: label ?? source,
        dataIndex: source,
        key: source,
        render: (v: string) => (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 16,
                height: 16,
                background: v,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
            {v}
          </span>
        ),
      }),
    }),
    [source, label],
  );
  useRegisterColumn(def);
  return null;
}
```

Use inside `<ResourceList>`: `<ColorColumn source="color" label="Color" />`.

### 3. List filter

Register with `useRegisterFilter`:

```tsx
// src/crud/filters/ColorFilter.tsx
import { Input } from "antd";
import { useMemo } from "react";
import { useRegisterFilter } from "../context/FilterContext";

export function ColorFilter({ source, label }: { source: string; label?: string }) {
  const def = useMemo(
    () => ({
      key: source,
      source,
      label,
      render: ({ value, onChange }) => (
        <Input
          allowClear
          placeholder={label ?? source}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value || undefined)}
        />
      ),
    }),
    [source, label],
  );
  useRegisterFilter(def);
  return null;
}
```

Use inside `<FilterBar>` on a list page.

### 4. Fully custom column

For one-off renderers, use `CustomColumn`:

```tsx
<CustomColumn
  source="__actions_extra"
  label="Links"
  render={(row) => <Link to={`/items/${row.id}/preview`}>Preview</Link>}
/>
```

### Tips

- **Reference data:** reuse `useChoices(choices, reference, optionLabel)` from `src/crud/utils/useChoices.ts`.
- **Nested paths:** `display="brand.name"` on columns uses `getByPath`.
- **Permissions:** `ResourceList` respects `usePermissions()` for New / Edit / Delete. Use `actions={{ delete: false }}` etc. to hide built-in buttons even when permitted; use `headerExtra` and `rowActions` for custom header/row controls.
- **Playground:** see `examples/playground/src/pages/` for full examples.

## Data layer & permissions (lightweight)

- **`DataProvider` / `useDataProvider`** — supply a `DataProvider` implementation (`getList`, `getOne`, `create`, `update`, `delete`). Types are exported as `DataProviderContract`, `GetListParams`, etc.
- **`PermissionsProvider` / `usePermissions` / `useCan`** — one function `can(action, resource?)` for UI gating (wire to your roles or ACL).

Example wiring (see `examples/playground/src/main.tsx` for a full stack). The route tree lives in your app so login, guards, and `AdminLayout` stay visible:

```tsx
import {
  AdminLayout,
  AppThemeProvider,
  AuthProvider,
  DataProvider,
  GuestOnly,
  LoginPage,
  PermissionsProvider,
  Protected,
} from "ding-react-admin";
import type { DataProviderContract } from "ding-react-admin";
import type { RouteObject } from "react-router-dom";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const LOGIN_PATH = "/login";
const HOME_PATH = "/";

const data: DataProviderContract = {
  /* call your REST API */
} as DataProviderContract;

const can = (action: string, resource?: string) => {
  /* read role from session, etc. */
  return true;
};

const router = createBrowserRouter([
  {
    path: LOGIN_PATH,
    element: (
      <GuestOnly redirectTo={HOME_PATH}>
        <LoginPage afterLoginPath={HOME_PATH} />
      </GuestOnly>
    ),
  },
  {
    path: "/",
    element: (
      <Protected redirectTo={LOGIN_PATH}>
        <AdminLayout
          navItems={navItems}
          loginPath={LOGIN_PATH}
          brand="Acme"
          collapsedBrand="A"
        />
      </Protected>
    ),
    children: routes as RouteObject[],
  },
  { path: "*", element: <Navigate to={HOME_PATH} replace /> },
]);

export function Root() {
  return (
    <AppThemeProvider>
      <AuthProvider adapter={authAdapter}>
        <DataProvider value={data}>
          <PermissionsProvider can={can}>
            <RouterProvider router={router} />
          </PermissionsProvider>
        </DataProvider>
      </AuthProvider>
    </AppThemeProvider>
  );
}
```

## Quick start (`<AdminApp />`)

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  AdminApp,
  createSessionStorageAuthAdapter,
  PlaceholderPage,
  type AdminRouteChild,
  type NavItem,
} from "ding-react-admin";
import { DashboardOutlined } from "@ant-design/icons";

const nav: NavItem[] = [
  { path: "/", label: "Dashboard", Icon: DashboardOutlined },
];

const routes: AdminRouteChild[] = [
  { index: true, element: <PlaceholderPage title="Dashboard" /> },
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminApp
      authAdapter={createSessionStorageAuthAdapter()}
      navItems={nav}
      routes={routes}
      layoutProps={{ brand: "My App", collapsedBrand: "M" }}
    />
  </StrictMode>,
);
```

`createSessionStorageAuthAdapter(key?)` stores a dummy token in `sessionStorage`—swap for an adapter that calls your API.

## Composition (your own layout, login, router)

You own `createBrowserRouter` / routes. Use providers and guards only:

```tsx
import {
  AppThemeProvider,
  AuthProvider,
  GuestOnly,
  Protected,
  ThemeToolbar,
  createSessionStorageAuthAdapter,
} from "ding-react-admin";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

const authAdapter = createSessionStorageAuthAdapter();

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <GuestOnly>
        <YourLoginPage />
      </GuestOnly>
    ),
  },
  {
    path: "/",
    element: (
      <Protected>
        <YourShell />
      </Protected>
    ),
    children: [{ index: true, element: <YourHome /> }],
  },
]);

export function Root() {
  return (
    <AppThemeProvider>
      <AuthProvider adapter={authAdapter}>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppThemeProvider>
  );
}

function YourShell() {
  return (
    <div>
      <header>
        <ThemeToolbar />
      </header>
      <Outlet />
    </div>
  );
}
```

You can skip `AdminLayout` entirely (no sidebar/top bar), add custom signup routes, etc.

## Odoo-style app hub (boxed icons)

Home screen is a grid of tiles; each tile navigates into a module—no persistent sidebar:

```tsx
import { Card, Col, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import type { NavItem } from "ding-react-admin";

export function AppHub({ apps }: { apps: NavItem[] }) {
  const navigate = useNavigate();
  return (
    <Row gutter={[16, 16]}>
      {apps.map((app) => (
        <Col key={app.path} xs={12} sm={8} md={6} lg={4}>
          <Card
            hoverable
            onClick={() => navigate(app.path)}
            styles={{ body: { textAlign: "center" } }}
          >
            <Space direction="vertical" size="small">
              <app.Icon style={{ fontSize: 32 }} />
              <Typography.Text strong>{app.label}</Typography.Text>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
```

Use that as the index route inside whatever shell you prefer.

## Default shell with more control

The recommended layout is **`createBrowserRouter`** with **`GuestOnly`** on the login path, **`Protected`** around **`AdminLayout`**, and **`children`** for app pages—the same shape as [`examples/playground/src/main.tsx`](examples/playground/src/main.tsx).

**Shortcut:** `createAdminRouter` builds that tree for you and matches `<AdminApp />`’s routing (omit if you prefer an explicit router):

```tsx
import {
  AppThemeProvider,
  AuthProvider,
  createAdminRouter,
  createSessionStorageAuthAdapter,
} from "ding-react-admin";
import { RouterProvider } from "react-router-dom";

const router = createAdminRouter({
  navItems,
  children: routes,
  layoutProps: { brand: "Acme", headerExtras: <Notifications /> },
});

<AppThemeProvider>
  <AuthProvider adapter={createSessionStorageAuthAdapter()}>
    <RouterProvider router={router} />
  </AuthProvider>
</AppThemeProvider>;
```

## Developing the package next to your app (Vite)

Only needed when hacking on **this** library from another checkout. Consumes **do not** need this when installing from GitHub.

In your app’s `vite.config.ts`:

```ts
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "ding-react-admin": path.resolve(__dirname, "../../ding-react-admin/src"),
    },
  },
});
```

And in `tsconfig.json` / `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "ding-react-admin": ["../../ding-react-admin/src"] }
  }
}
```

Keep `"ding-react-admin": "file:../../ding-react-admin"` in `package.json` so types resolve from the package `dist` when aliases are off.

## License

MIT

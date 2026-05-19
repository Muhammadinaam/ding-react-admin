# ding-react-admin

Composable admin shell for React apps: **Ant Design** layout (sidebar + header), **theme/density** controls, **session-style auth** helpers, **data / permissions providers** (react-admin–style naming, intentionally small), and **React Router** helpers. Prefer **`createBrowserRouter` in your app** with **`AdminLayout`**, `Protected`, and `GuestOnly` (see `examples/playground/src/main.tsx`) so routes stay readable. Use the quick-start `<AdminApp />` or optional `createAdminRouter` shortcut when you do not want the route tree in app code.

## Install

Peer dependencies (your app must provide them):

- `react`, `react-dom` (18+)
- `react-router-dom` (6+)
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

## Sidebar navigation (`NavItem`)

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

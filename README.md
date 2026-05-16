# ding-react-admin

Composable admin shell for React apps: **Ant Design** layout (sidebar + header), **theme/density** controls, **session-style auth** helpers, and **React Router** wiring. Use the **quick-start** `<AdminApp />` or **compose** your own shell with `AuthProvider`, `AppThemeProvider`, guards, and primitives.

## Install

Peer dependencies (your app must provide them):

- `react`, `react-dom` (18+)
- `react-router-dom` (6+)
- `antd` (5+)
- `@ant-design/icons` (5+)

From GitHub (after you publish the repo and tag releases):

```bash
yarn add github:YOUR_USER/ding-react-admin#v0.1.0
```

For local development of the library alongside an app, use a `file:` dependency and point your bundler at `src` (see below).

## Example app in this repo

There is a Vite app under [`examples/playground`](examples/playground) that imports the library from `../../src` (via alias) so you can hack on `src/` and reload immediately.

From the **repository root** (after installing root deps if needed):

```bash
yarn --cwd examples/playground install
yarn dev:example
```

Or work only in the example:

```bash
cd examples/playground
yarn install
yarn dev
```

The playground declares `"ding-react-admin": "file:../.."` while Vite aliases that package id to the live `../../src` tree, so edits to the library hot-reload without publishing.

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

`createAdminRouter` matches `<AdminApp />` but lets you build `RouterProvider` yourself:

```tsx
import {
  AuthProvider,
  AppThemeProvider,
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

# Quick start (`<AdminApp />`)

Providers are composed explicitly — nothing is hidden except theme inside `<AdminApp />` (via its `theme` prop, which wraps `AppThemeProvider`).

## Providers you wrap

| Provider | Wrap it? | Used for |
|----------|----------|----------|
| **`AuthProvider`** | Yes | Login, logout, guards, `useAuth` |
| **`DataProvider`** | Yes, when using CRUD | `ResourceList`, `ResourceForm`, reference fields |
| **`PermissionsProvider`** | Yes, when using CRUD | `usePermissions`, `useCan` in lists/forms |
| **`AppThemeProvider`** | Optional — `AdminApp` includes it | Theme/density; only wrap yourself if you skip `AdminApp` |
| **`AntdApp`** (from `antd`) | Optional | Global Ant Design message/modal context |

List/form **internal** contexts (`ListContext`, `FilterContext`, etc.) are created by CRUD components — you do not wrap those.

Recommended order: **`AuthProvider` → `DataProvider` → `PermissionsProvider` → `AdminApp`**.

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App as AntdApp } from "antd";
import {
  AdminApp,
  AuthProvider,
  DataProvider,
  LoginPage,
  PermissionsProvider,
  PlaceholderPage,
  createSessionStorageAuthAdapter,
  type AdminRouteChild,
  type DataProviderContract,
  type NavItem,
} from "ding-react-admin";
import { DashboardOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const authBrand = (
  <Typography.Title level={3} style={{ margin: 0 }}>
    My App
  </Typography.Title>
);

const nav: NavItem[] = [
  { path: "/", label: "Dashboard", Icon: DashboardOutlined },
];

const routes: AdminRouteChild[] = [
  {
    path: "login",
    access: "guest",
    element: (
      <LoginPage
        brand={authBrand}
        afterLoginPath="/"
        alternateAuth={{
          prompt: "Don't have an account?",
          linkText: "Sign up",
          to: "/register",
        }}
      />
    ),
  },
  { index: true, element: <PlaceholderPage title="Dashboard" /> },
];

const authAdapter = createSessionStorageAuthAdapter();

const dataProvider: DataProviderContract = {
  getList: async () => ({ data: [], total: 0 }),
  getOne: async () => ({ data: {} }),
  create: async () => ({ data: {} }),
  update: async () => ({ data: {} }),
  delete: async () => ({ data: {} }),
};

const can = (_action: string, _resource?: string) => true;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AntdApp>
      <AuthProvider adapter={authAdapter}>
        <DataProvider value={dataProvider}>
          <PermissionsProvider can={can}>
            <AdminApp
              navItems={nav}
              routes={routes}
              layoutProps={{ brand: "My App", collapsedBrand: "M" }}
            />
          </PermissionsProvider>
        </DataProvider>
      </AuthProvider>
    </AntdApp>
  </StrictMode>,
);
```

## Notes

- **`AuthProvider`** + **`adapter`** — `createSessionStorageAuthAdapter(key?)` stores a dummy token in `sessionStorage` for demos; swap for an adapter that calls your API.
- **`DataProvider`** — replace the stub with your REST client or `combineResourceHandlers`; see [data-permissions.md](data-permissions.md).
- **`PermissionsProvider`** — wire `can(action, resource?)` to your roles/ACL; return `true` until you need gating.
- **`routes`** — the full route list. Login uses **`access: "guest"`**; app pages default to **`protected`**. See [routing.md](routing.md).
- **`access: "public"`** — optional top-level pages without auth (signup, etc.).

**Auth only** (no CRUD yet)? Drop `DataProvider` and `PermissionsProvider` — keep `AuthProvider` around `AdminApp`.

Full working stack with in-memory CRUD: [playground `main.tsx`](../examples/playground/src/main.tsx).

[← Back to README](../README.md)

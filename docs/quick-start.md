# Quick start (`<AdminApp />`)

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  AdminApp,
  LoginPage,
  PlaceholderPage,
  createSessionStorageAuthAdapter,
  type AdminRouteChild,
  type NavItem,
} from "ding-react-admin";
import { DashboardOutlined } from "@ant-design/icons";

const nav: NavItem[] = [
  { path: "/", label: "Dashboard", Icon: DashboardOutlined },
];

const routes: AdminRouteChild[] = [
  { path: "login", access: "guest", element: <LoginPage /> },
  { index: true, element: <PlaceholderPage title="Dashboard" /> },
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminApp
      auth={{ adapter: createSessionStorageAuthAdapter() }}
      navItems={nav}
      routes={routes}
      layoutProps={{ brand: "My App", collapsedBrand: "M" }}
    />
  </StrictMode>,
);
```

- **`auth.adapter`** — how login/logout/token work. `createSessionStorageAuthAdapter(key?)` stores a dummy token in `sessionStorage`; swap for an adapter that calls your API.
- **`access: "guest"`** — login route (`GuestOnly`). Omit it and a default **`/login`** screen is added automatically.
- **`access: "public"`** — optional top-level pages without auth (signup, etc.). See [routing.md](routing.md).

[← Back to README](../README.md)

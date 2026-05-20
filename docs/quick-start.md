# Quick start (`<AdminApp />`)

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

[← Back to README](../README.md)

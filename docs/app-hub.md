# Odoo-style app hub (boxed icons)

Home screen is a grid of tiles; each tile navigates into a module. Hide the sidebar on the hub and show a scoped sidebar inside each app.

## `AppHub`

```tsx
import { AppHub, type NavItem } from "ding-react-admin";
import { GiftOutlined, ShoppingOutlined } from "@ant-design/icons";

const apps: NavItem[] = [
  { path: "/catalog", label: "Catalog", Icon: GiftOutlined },
  { path: "/sales", label: "Sales", Icon: ShoppingOutlined },
];

export function HomePage() {
  return <AppHub apps={apps} />;
}
```

Optional `onAppClick` overrides the default `navigate(app.path)` behavior.

## Scoped sidebar + back to apps

Derive the active app from the URL and pass only that app's `navItems` to `AdminLayout`. On the hub route, set `hideSider` and disable nav search.

```tsx
import {
  AdminLayout,
  AppHub,
  AppLauncherButton,
  type NavItem,
} from "ding-react-admin";
import { Outlet, useLocation } from "react-router-dom";

const hubApps: NavItem[] = [/* top-level app tiles */];
const catalogNav: NavItem[] = [/* sidebar for /catalog/* */];

function Shell() {
  const { pathname } = useLocation();
  const isHub = pathname === "/";

  return (
    <AdminLayout
      navItems={isHub ? [] : catalogNav}
      hideSider={isHub}
      navSearch={!isHub}
      headerExtras={
        !isHub ? <AppLauncherButton hubPath="/" /> : undefined
      }
    />
  );
}

// Routes: index → <AppHub apps={hubApps} />, /catalog/* → module pages
```

See the [playground](../examples/playground) for a full demo.

[← Back to README](../README.md)

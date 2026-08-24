# Odoo-style app hub (boxed icons)

Home screen is a grid of tiles; each tile navigates into a module. Hide the sidebar on the hub and show a scoped sidebar inside each app.

## `AppHub`

```tsx
import {
  AppHub,
  flattenNavLeaves,
  type NavItem,
} from "ding-react-admin";
import { GiftOutlined, ShoppingOutlined } from "@ant-design/icons";

const apps: NavItem[] = [
  { path: "/catalog", label: "Catalog", Icon: GiftOutlined },
  { path: "/sales", label: "Sales", Icon: ShoppingOutlined },
];

const menuItems = [
  ...flattenNavLeaves(catalogNav, { group: "Catalog" }),
  ...flattenNavLeaves(salesNav, { group: "Sales" }),
];

export function HomePage() {
  return <AppHub apps={apps} menuItems={menuItems} />;
}
```

Optional `onAppClick` / `onMenuClick` override the default `navigate()` behavior.

When `menuItems` is set, a search field appears at the top. Typing filters menus across all apps (match on menu label or app name).

## Scoped sidebar + back to apps

Derive the active app from the URL and pass only that app's `navItems` to `AdminLayout`. On the hub route, set `hideSider` and disable nav search.

**Use `useLocation()` from React Router** so the shell re-renders when navigating between hub and apps:

```tsx
import {
  AdminLayout,
  AppHub,
  AppLauncherButton,
  type NavItem,
} from "ding-react-admin";
import { useLocation } from "react-router-dom";

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

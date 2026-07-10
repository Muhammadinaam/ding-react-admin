# Sidebar navigation

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

## Menu appearance

`AdminLayout` defaults to **`wrapLabels: true`** and **`itemDivider: "inset"`**. Override via **`navMenu`** on `AdminLayout` (or `layoutProps` on `AdminApp`):

```tsx
<AdminApp
  navItems={nav}
  routes={routes}
  layoutProps={{
    brand: "Acme",
    navMenu: {
      wrapLabels: false, // ellipsis + instant Ant Design tooltip on hover
      itemDivider: "none",
    },
  }}
/>
```

| Option | Effect |
|--------|--------|
| **`wrapLabels`** | Long labels wrap onto multiple lines instead of truncating with `…`. Hover tooltips are omitted when wrapping is enabled. Default **`true`**. |
| **`itemDivider`** | Divider between sibling rows at each submenu level. Default **`"inset"`**. |
| **`itemDivider: "none"`** | No dividers. |
| **`itemDivider: "full"`** | Edge-to-edge line across the sidebar. |
| **`itemDivider: "inset"`** | Shorter line inset from the left and right edges. |

When **`wrapLabels`** is **`false`**, truncated labels show an Ant Design tooltip on hover with **no delay**.

[← Back to README](../README.md)

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

[← Back to README](../README.md)

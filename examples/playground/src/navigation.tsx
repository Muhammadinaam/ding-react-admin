import {
  AppstoreOutlined,
  DashboardOutlined,
  FileTextOutlined,
  GiftOutlined,
  GoldOutlined,
  SettingOutlined,
  TagsOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import type { NavItem } from "ding-react-admin";

export const PLAYGROUND_NAV: NavItem[] = [
  { path: "/", label: "Dashboard", Icon: DashboardOutlined },
  {
    path: "/catalog",
    label: "Catalog",
    Icon: AppstoreOutlined,
    children: [
      { path: "/products", label: "Products", Icon: GiftOutlined },
      { path: "/brands", label: "Brands", Icon: GoldOutlined },
      { path: "/categories", label: "Categories", Icon: TagsOutlined },
    ],
  },
  { path: "/invoices", label: "Invoices", Icon: FileTextOutlined },
  {
    path: "/invoice-lines",
    label: (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          justifyContent: "space-between",
          width: "100%",
          minWidth: 0,
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          Invoice lines
        </span>
        <Badge count={3} size="small" />
      </span>
    ),
    Icon: UnorderedListOutlined,
  },
  { path: "/settings", label: "Settings", Icon: SettingOutlined },
];

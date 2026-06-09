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
import {
  BRAND_PERMS,
  CATEGORY_PERMS,
  INVOICE_LINE_PERMS,
  INVOICE_PERMS,
  PRODUCT_PERMS,
} from "./api/playgroundPermissions";

export const PLAYGROUND_NAV: NavItem[] = [
  { path: "/", label: "Dashboard", Icon: DashboardOutlined },
  {
    path: "/catalog",
    label: "Catalog",
    Icon: AppstoreOutlined,
    children: [
      {
        path: "/products",
        label: "Products",
        Icon: GiftOutlined,
        permission: PRODUCT_PERMS.list,
      },
      {
        path: "/brands",
        label: "Brands",
        Icon: GoldOutlined,
        permission: BRAND_PERMS.list,
      },
      {
        path: "/categories",
        label: "Categories",
        Icon: TagsOutlined,
        permission: CATEGORY_PERMS.list,
      },
    ],
  },
  {
    path: "/invoices",
    label: "Invoices",
    Icon: FileTextOutlined,
    permission: INVOICE_PERMS.list,
  },
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
    permission: INVOICE_LINE_PERMS.list,
  },
  { path: "/settings", label: "Settings", Icon: SettingOutlined },
];

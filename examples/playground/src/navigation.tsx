import {
  AppstoreOutlined,
  DashboardOutlined,
  FileTextOutlined,
  GiftOutlined,
  GoldOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TagsOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { NavItem } from "ding-react-admin";
import {
  BRAND_PERMS,
  CATEGORY_PERMS,
  CUSTOMER_PERMS,
  INVOICE_PERMS,
  PRODUCT_PERMS,
  PURCHASE_ORDER_PERMS,
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
    path: "/sales",
    label: "Sales",
    Icon: ShoppingOutlined,
    children: [
      {
        path: "/customers",
        label: "Customers",
        Icon: TeamOutlined,
        permission: CUSTOMER_PERMS.list,
      },
      {
        path: "/purchase-orders",
        label: "Purchase orders",
        Icon: ShoppingCartOutlined,
        permission: PURCHASE_ORDER_PERMS.list,
      },
      {
        path: "/invoices",
        label: "Invoices",
        Icon: FileTextOutlined,
        permission: INVOICE_PERMS.list,
      },
    ],
  },
  { path: "/settings", label: "Settings", Icon: SettingOutlined },
];

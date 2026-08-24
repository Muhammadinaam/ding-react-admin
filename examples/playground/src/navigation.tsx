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

/** Top-level app tiles on the hub home screen. */
export const PLAYGROUND_HUB_APPS: NavItem[] = [
  { path: "/catalog", label: "Catalog", Icon: AppstoreOutlined },
  { path: "/sales", label: "Sales", Icon: ShoppingOutlined },
  { path: "/settings", label: "Settings", Icon: SettingOutlined },
];

export const CATALOG_NAV: NavItem[] = [
  { path: "/catalog", label: "Overview", Icon: DashboardOutlined },
  {
    path: "/catalog/products",
    label: "Products",
    Icon: GiftOutlined,
    permission: PRODUCT_PERMS.list,
  },
  {
    path: "/catalog/brands",
    label: "Brands",
    Icon: GoldOutlined,
    permission: BRAND_PERMS.list,
  },
  {
    path: "/catalog/categories",
    label: "Categories",
    Icon: TagsOutlined,
    permission: CATEGORY_PERMS.list,
  },
];

export const SALES_NAV: NavItem[] = [
  { path: "/sales", label: "Overview", Icon: DashboardOutlined },
  {
    path: "/sales/customers",
    label: "Customers",
    Icon: TeamOutlined,
    permission: CUSTOMER_PERMS.list,
  },
  {
    path: "/sales/purchase-orders",
    label: "Purchase orders",
    Icon: ShoppingCartOutlined,
    permission: PURCHASE_ORDER_PERMS.list,
  },
  {
    path: "/sales/invoices",
    label: "Invoices",
    Icon: FileTextOutlined,
    permission: INVOICE_PERMS.list,
  },
];

export const SETTINGS_NAV: NavItem[] = [
  { path: "/settings", label: "Settings", Icon: SettingOutlined },
];

export type PlaygroundApp = {
  id: string;
  basePath: string;
  nav: NavItem[];
};

export const PLAYGROUND_APPS: PlaygroundApp[] = [
  { id: "catalog", basePath: "/catalog", nav: CATALOG_NAV },
  { id: "sales", basePath: "/sales", nav: SALES_NAV },
  { id: "settings", basePath: "/settings", nav: SETTINGS_NAV },
];

export function resolvePlaygroundApp(pathname: string): PlaygroundApp | null {
  if (pathname === "/") return null;
  return (
    PLAYGROUND_APPS.find(
      (app) =>
        pathname === app.basePath || pathname.startsWith(`${app.basePath}/`),
    ) ?? null
  );
}

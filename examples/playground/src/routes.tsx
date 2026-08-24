import type { AdminRouteChild } from "ding-react-admin";
import { PlaceholderPage } from "ding-react-admin";
import { AppHubPage } from "./pages/AppHubPage";
import { DashboardPage } from "./pages/DashboardPage";
import { BrandFormPage, BrandListPage } from "./pages/brands";
import { CategoryFormPage, CategoryListPage } from "./pages/categories";
import { CustomerFormPage, CustomerListPage } from "./pages/customers";
import { InvoiceFormPage, InvoiceListPage } from "./pages/invoices";
import {
  PurchaseOrderFormPage,
  PurchaseOrderListPage,
} from "./pages/purchase-orders";
import { ProductFormPage, ProductListPage } from "./pages/products";

export const playgroundRoutes: AdminRouteChild[] = [
  { index: true, element: <AppHubPage /> },
  { path: "catalog", element: <DashboardPage title="Catalog" /> },
  { path: "catalog/products", element: <ProductListPage /> },
  { path: "catalog/products/:id", element: <ProductFormPage /> },
  { path: "catalog/brands", element: <BrandListPage /> },
  { path: "catalog/brands/:id", element: <BrandFormPage /> },
  { path: "catalog/categories", element: <CategoryListPage /> },
  { path: "catalog/categories/:id", element: <CategoryFormPage /> },
  { path: "sales", element: <DashboardPage title="Sales" /> },
  { path: "sales/customers", element: <CustomerListPage /> },
  { path: "sales/customers/:id", element: <CustomerFormPage /> },
  { path: "sales/purchase-orders", element: <PurchaseOrderListPage /> },
  { path: "sales/purchase-orders/:id", element: <PurchaseOrderFormPage /> },
  { path: "sales/invoices", element: <InvoiceListPage /> },
  { path: "sales/invoices/:id", element: <InvoiceFormPage /> },
  {
    path: "settings",
    element: <PlaceholderPage title="Settings" />,
  },
];

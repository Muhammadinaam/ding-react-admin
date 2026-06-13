import type { AdminRouteChild } from "ding-react-admin";
import { PlaceholderPage } from "ding-react-admin";
import { BrandFormPage, BrandListPage } from "./pages/brands";
import { CategoryFormPage, CategoryListPage } from "./pages/categories";
import { CustomerFormPage, CustomerListPage } from "./pages/customers";
import { DashboardPage } from "./pages/DashboardPage";
import { InvoiceFormPage, InvoiceListPage } from "./pages/invoices";
import {
  PurchaseOrderFormPage,
  PurchaseOrderListPage,
} from "./pages/purchase-orders";
import { ProductFormPage, ProductListPage } from "./pages/products";

export const playgroundRoutes: AdminRouteChild[] = [
  { index: true, element: <DashboardPage /> },
  { path: "products", element: <ProductListPage /> },
  { path: "products/:id", element: <ProductFormPage /> },
  { path: "brands", element: <BrandListPage /> },
  { path: "brands/:id", element: <BrandFormPage /> },
  { path: "categories", element: <CategoryListPage /> },
  { path: "categories/:id", element: <CategoryFormPage /> },
  { path: "customers", element: <CustomerListPage /> },
  { path: "customers/:id", element: <CustomerFormPage /> },
  { path: "purchase-orders", element: <PurchaseOrderListPage /> },
  { path: "purchase-orders/:id", element: <PurchaseOrderFormPage /> },
  { path: "invoices", element: <InvoiceListPage /> },
  { path: "invoices/:id", element: <InvoiceFormPage /> },
  {
    path: "settings",
    element: <PlaceholderPage title="Settings" />,
  },
];

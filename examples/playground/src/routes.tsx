import type { AdminRouteChild } from "ding-react-admin";
import { PlaceholderPage } from "ding-react-admin";
import { BrandFormPage, BrandListPage } from "./pages/Brands";
import { CategoryFormPage, CategoryListPage } from "./pages/Categories";
import { DashboardPage } from "./pages/DashboardPage";
import { InvoiceLineFormPage, InvoiceLineListPage } from "./pages/InvoiceLines";
import { InvoiceFormPage, InvoiceListPage } from "./pages/Invoices";
import { ProductFormPage, ProductListPage } from "./pages/Products";

export const playgroundRoutes: AdminRouteChild[] = [
  { index: true, element: <DashboardPage /> },
  { path: "products", element: <ProductListPage /> },
  { path: "products/:id", element: <ProductFormPage /> },
  { path: "brands", element: <BrandListPage /> },
  { path: "brands/:id", element: <BrandFormPage /> },
  { path: "categories", element: <CategoryListPage /> },
  { path: "categories/:id", element: <CategoryFormPage /> },
  { path: "invoices", element: <InvoiceListPage /> },
  { path: "invoices/:id", element: <InvoiceFormPage /> },
  { path: "invoice-lines", element: <InvoiceLineListPage /> },
  { path: "invoice-lines/:id", element: <InvoiceLineFormPage /> },
  {
    path: "settings",
    element: <PlaceholderPage title="Settings" />,
  },
];

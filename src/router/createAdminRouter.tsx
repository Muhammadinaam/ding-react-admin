import { Navigate, createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { LoginPage } from "../pages/LoginPage";
import type { CreateAdminRouterOptions } from "../types";
import { GuestOnly, Protected } from "./guards";

export function createAdminRouter({
  navItems,
  children,
  layoutProps,
  loginPath = "/login",
  homePath = "/",
  loginElement,
}: CreateAdminRouterOptions) {
  const login =
    loginElement ?? <LoginPage afterLoginPath={homePath} />;

  return createBrowserRouter([
    {
      path: loginPath,
      element: (
        <GuestOnly redirectTo={homePath}>{login}</GuestOnly>
      ),
    },
    {
      path: "/",
      element: (
        <Protected redirectTo={loginPath}>
          <AdminLayout
            navItems={navItems}
            loginPath={loginPath}
            {...layoutProps}
          />
        </Protected>
      ),
      children: children as RouteObject[],
    },
    { path: "*", element: <Navigate to={homePath} replace /> },
  ]);
}

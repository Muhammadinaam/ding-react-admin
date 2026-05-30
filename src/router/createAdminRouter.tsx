import { Navigate, createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { LoginPage } from "../pages/LoginPage";
import type { CreateAdminRouterOptions } from "../types";
import { GuestOnly, Protected } from "./guards";
import {
  deriveAuthPaths,
  partitionAdminRoutes,
  toProtectedRouteObject,
  toRouterSegment,
} from "./routeAccess";

export function createAdminRouter({
  navItems,
  children,
  layoutProps,
  redirects,
  loginElement,
}: CreateAdminRouterOptions) {
  const { loginPath, homePath } = deriveAuthPaths(children, redirects);
  const { guest, public: publicRoutes, protected: protectedRoutes } =
    partitionAdminRoutes(children);

  const defaultLogin =
    loginElement ?? <LoginPage afterLoginPath={homePath} />;

  const routerRoutes = [];

  for (const route of guest) {
    if (!("path" in route) || !route.path) continue;
    routerRoutes.push({
      path: toRouterSegment(route.path),
      element: (
        <GuestOnly redirectTo={homePath}>{route.element}</GuestOnly>
      ),
    });
  }

  if (guest.length === 0) {
    routerRoutes.push({
      path: toRouterSegment(loginPath),
      element: (
        <GuestOnly redirectTo={homePath}>{defaultLogin}</GuestOnly>
      ),
    });
  }

  for (const route of publicRoutes) {
    if (!("path" in route) || !route.path) continue;
    routerRoutes.push({
      path: toRouterSegment(route.path),
      element: route.element,
    });
  }

  routerRoutes.push({
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
    children: protectedRoutes.map(toProtectedRouteObject),
  });

  routerRoutes.push({
    path: "*",
    element: <Navigate to={homePath} replace />,
  });

  return createBrowserRouter(routerRoutes);
}

import type { RouteObject } from "react-router-dom";
import type { AdminRouteChild, AuthRedirects, RouteAccess } from "../types";

export function getRouteAccess(route: AdminRouteChild): RouteAccess {
  return route.access ?? "protected";
}

export function partitionAdminRoutes(routes: AdminRouteChild[]) {
  const guest: AdminRouteChild[] = [];
  const publicRoutes: AdminRouteChild[] = [];
  const protectedRoutes: AdminRouteChild[] = [];

  for (const route of routes) {
    const access = getRouteAccess(route);
    if (access === "guest") guest.push(route);
    else if (access === "public") publicRoutes.push(route);
    else protectedRoutes.push(route);
  }

  return { guest, public: publicRoutes, protected: protectedRoutes };
}

/** React Router path segment for a top-level route (`/login` → `login`). */
export function toRouterSegment(path: string): string {
  return path.replace(/^\/+/, "");
}

export function toAbsolutePath(path: string): string {
  return `/${toRouterSegment(path)}`;
}

export function deriveAuthPaths(
  routes: AdminRouteChild[],
  redirects?: AuthRedirects,
): { loginPath: string; homePath: string } {
  const { guest, protected: protectedRoutes } = partitionAdminRoutes(routes);
  const firstGuest = guest.find((r) => "path" in r && r.path);
  const indexProtected = protectedRoutes.find(
    (r) => "index" in r && r.index,
  );
  const firstProtectedPath = protectedRoutes.find(
    (r) => "path" in r && r.path,
  );

  const loginPath =
    redirects?.unauthenticated ??
    (firstGuest && "path" in firstGuest && firstGuest.path
      ? toAbsolutePath(firstGuest.path)
      : "/login");

  const homePath =
    redirects?.afterLogin ??
    (indexProtected
      ? "/"
      : firstProtectedPath && "path" in firstProtectedPath && firstProtectedPath.path
        ? toAbsolutePath(firstProtectedPath.path)
        : "/");

  return { loginPath, homePath };
}

export function toProtectedRouteObject(route: AdminRouteChild): RouteObject {
  if ("index" in route && route.index) {
    return { index: true, element: route.element };
  }
  return { path: route.path!, element: route.element };
}

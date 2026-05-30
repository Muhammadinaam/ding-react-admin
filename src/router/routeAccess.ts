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

/**
 * Resolve redirect targets from declared routes and optional overrides.
 * Throws when protected or guest routes exist but paths cannot be determined.
 */
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

  let loginPath: string | undefined = redirects?.unauthenticated;
  if (!loginPath && firstGuest && "path" in firstGuest && firstGuest.path) {
    loginPath = toAbsolutePath(firstGuest.path);
  }

  let homePath: string | undefined = redirects?.afterLogin;
  if (!homePath) {
    if (indexProtected) homePath = "/";
    else if (
      firstProtectedPath &&
      "path" in firstProtectedPath &&
      firstProtectedPath.path
    ) {
      homePath = toAbsolutePath(firstProtectedPath.path);
    }
  }

  if (protectedRoutes.length > 0 && !loginPath) {
    throw new Error(
      'createAdminRouter: protected routes require redirects.unauthenticated or a guest route (access: "guest").',
    );
  }

  if (guest.length > 0 && !homePath) {
    throw new Error(
      'createAdminRouter: guest routes require redirects.afterLogin or a protected route (index or path).',
    );
  }

  return {
    loginPath: loginPath ?? "/",
    homePath: homePath ?? "/",
  };
}

export function toProtectedRouteObject(route: AdminRouteChild): RouteObject {
  if ("index" in route && route.index) {
    return { index: true, element: route.element };
  }
  return { path: route.path!, element: route.element };
}

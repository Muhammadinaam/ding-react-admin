import { RouteObject } from 'react-router-dom';
import { AdminRouteChild, AuthRedirects, RouteAccess } from '../types';
export declare function getRouteAccess(route: AdminRouteChild): RouteAccess;
export declare function partitionAdminRoutes(routes: AdminRouteChild[]): {
    guest: AdminRouteChild[];
    public: AdminRouteChild[];
    protected: AdminRouteChild[];
};
/** React Router path segment for a top-level route (`/login` → `login`). */
export declare function toRouterSegment(path: string): string;
export declare function toAbsolutePath(path: string): string;
/**
 * Resolve redirect targets from declared routes and optional overrides.
 * Throws when protected or guest routes exist but paths cannot be determined.
 */
export declare function deriveAuthPaths(routes: AdminRouteChild[], redirects?: AuthRedirects): {
    loginPath: string;
    homePath: string;
};
export declare function toProtectedRouteObject(route: AdminRouteChild): RouteObject;
//# sourceMappingURL=routeAccess.d.ts.map
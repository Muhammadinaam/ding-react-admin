import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { AppThemeProvider } from "../context/AppThemeProvider";
import { createAdminRouter } from "../router/createAdminRouter";
import type { AdminAppProps } from "../types";

/**
 * Declarative admin shell: theme, router, and layout from your route list.
 * Wrap in `<AuthProvider adapter={...}>` — auth is not configured on this component.
 */
export function AdminApp({
  navItems,
  routes,
  authRedirects,
  layoutProps,
  theme: themeKeys,
}: AdminAppProps) {
  const router = useMemo(
    () =>
      createAdminRouter({
        navItems,
        children: routes,
        layoutProps,
        redirects: authRedirects,
      }),
    [navItems, routes, layoutProps, authRedirects],
  );

  return (
    <AppThemeProvider {...themeKeys}>
      <RouterProvider router={router} />
    </AppThemeProvider>
  );
}

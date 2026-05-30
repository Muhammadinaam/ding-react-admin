import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { AppThemeProvider } from "../context/AppThemeProvider";
import { AuthProvider } from "../context/AuthProvider";
import { createAdminRouter } from "../router/createAdminRouter";
import type { AdminAppProps } from "../types";

export function AdminApp({
  navItems,
  routes,
  auth,
  layoutProps,
  loginElement,
  theme: themeKeys,
}: AdminAppProps) {
  const router = useMemo(
    () =>
      createAdminRouter({
        navItems,
        children: routes,
        layoutProps,
        redirects: auth.redirects,
        loginElement,
      }),
    [navItems, routes, layoutProps, auth.redirects, loginElement],
  );

  return (
    <AppThemeProvider {...themeKeys}>
      <AuthProvider adapter={auth.adapter}>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppThemeProvider>
  );
}

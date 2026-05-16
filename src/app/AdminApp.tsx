import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { AppThemeProvider } from "../context/AppThemeProvider";
import { AuthProvider } from "../context/AuthProvider";
import { createAdminRouter } from "../router/createAdminRouter";
import type { AdminAppProps } from "../types";

export function AdminApp({
  navItems,
  routes,
  authAdapter,
  layoutProps,
  loginPath,
  homePath,
  loginElement,
  theme: themeKeys,
}: AdminAppProps) {
  const router = useMemo(
    () =>
      createAdminRouter({
        navItems,
        children: routes,
        layoutProps,
        loginPath,
        homePath,
        loginElement,
      }),
    [
      navItems,
      routes,
      layoutProps,
      loginPath,
      homePath,
      loginElement,
    ],
  );

  return (
    <AppThemeProvider {...themeKeys}>
      <AuthProvider adapter={authAdapter}>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppThemeProvider>
  );
}

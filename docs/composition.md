# Composition (your own layout, login, router)

You own `createBrowserRouter` / routes. Use providers and guards only:

```tsx
import {
  AppThemeProvider,
  AuthProvider,
  GuestOnly,
  Protected,
  ThemeToolbar,
  createSessionStorageAuthAdapter,
} from "ding-react-admin";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

const authAdapter = createSessionStorageAuthAdapter();

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <GuestOnly>
        <YourLoginPage />
      </GuestOnly>
    ),
  },
  {
    path: "/",
    element: (
      <Protected>
        <YourShell />
      </Protected>
    ),
    children: [{ index: true, element: <YourHome /> }],
  },
]);

export function Root() {
  return (
    <AppThemeProvider>
      <AuthProvider adapter={authAdapter}>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppThemeProvider>
  );
}

function YourShell() {
  return (
    <div>
      <header>
        <ThemeToolbar />
      </header>
      <Outlet />
    </div>
  );
}
```

You can skip `AdminLayout` entirely (no sidebar/top bar), add custom signup routes, etc. For CRUD, wrap **`DataProvider`** and **`PermissionsProvider`** inside **`AuthProvider`** — see [data-permissions.md](data-permissions.md) and the [playground](../examples/playground/src/main.tsx). For declarative guest/public/protected routes without hand-writing guards, see [routing.md](routing.md) (`AdminApp` / `createAdminRouter`).

[← Back to README](../README.md)

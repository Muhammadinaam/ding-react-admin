# Default shell with `createAdminRouter`

`createAdminRouter` applies the same **`access`** rules as `<AdminApp />`: only routes you pass in are mounted — guest and public at the top level, protected inside **`AdminLayout`**. See [routing.md](routing.md) for the full table.

```tsx
import {
  AppThemeProvider,
  AuthProvider,
  LoginPage,
  createAdminRouter,
  createSessionStorageAuthAdapter,
  type AdminRouteChild,
} from "ding-react-admin";
import { RouterProvider } from "react-router-dom";

const routes: AdminRouteChild[] = [
  { path: "login", access: "guest", element: <LoginPage afterLoginPath="/" /> },
  { index: true, element: <Dashboard /> },
];

const router = createAdminRouter({
  navItems,
  children: routes,
  layoutProps: { brand: "Acme", headerExtras: <Notifications /> },
});

<AppThemeProvider>
  <AuthProvider adapter={createSessionStorageAuthAdapter()}>
    <RouterProvider router={router} />
  </AuthProvider>
</AppThemeProvider>;
```

Prefer an explicit **`createBrowserRouter`** when you also wire **`DataProvider`**, **`PermissionsProvider`**, or a non-standard layout — see [composition.md](composition.md) and the [playground](../examples/playground/src/main.tsx).

[← Back to README](../README.md)

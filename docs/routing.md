# Routing & auth guards

`AdminApp` and `createAdminRouter` build the same route tree from one **`routes`** array. Each route has an optional **`access`** field; redirects are derived automatically (override with **`auth.redirects`** when needed).

## Route access

| `access` | Meaning | Rendered as |
|----------|---------|-------------|
| **`protected`** (default) | Requires a session | Child of `/` inside `AdminLayout` |
| **`guest`** | Login-style; authenticated users are redirected away | Top-level route wrapped in `GuestOnly` |
| **`public`** | No session required | Top-level route, no guard |

```tsx
import {
  AdminApp,
  LoginPage,
  PlaceholderPage,
  createSessionStorageAuthAdapter,
  type AdminRouteChild,
} from "ding-react-admin";

const routes: AdminRouteChild[] = [
  { path: "login", access: "guest", element: <LoginPage /> },
  { path: "signup", access: "public", element: <PlaceholderPage title="Sign up" /> },
  { index: true, element: <PlaceholderPage title="Dashboard" /> },
  { path: "settings", element: <PlaceholderPage title="Settings" /> },
];

<AdminApp
  auth={{ adapter: createSessionStorageAuthAdapter() }}
  navItems={nav}
  routes={routes}
/>;
```

### Defaults (no extra config)

- **No `guest` route?** A login screen is added at **`/login`** using `<LoginPage />`.
- **`loginPath`** → first `guest` route path, else **`/login`**.
- **`homePath`** → protected index route (**`/`**), else first protected path, else **`/`**.
- **`Protected`** sends unauthenticated users to `loginPath`.
- **`GuestOnly`** sends authenticated users to `homePath`.

### Override redirects

Use when paths cannot be inferred (e.g. role-based landing page):

```tsx
<AdminApp
  auth={{
    adapter: createSessionStorageAuthAdapter(),
    redirects: {
      unauthenticated: "/login",
      afterLogin: "/dashboard",
    },
  }}
  navItems={nav}
  routes={routes}
/>
```

`AuthAdapter` stays focused on **session/token** only (`login`, `logout`, `getToken`). URLs belong on routes and optional `redirects`, not on the adapter.

## `createAdminRouter` (same rules)

```tsx
import {
  AppThemeProvider,
  AuthProvider,
  createAdminRouter,
  createSessionStorageAuthAdapter,
} from "ding-react-admin";
import { RouterProvider } from "react-router-dom";

const router = createAdminRouter({
  navItems,
  children: routes,
  redirects: { afterLogin: "/" },
  layoutProps: { brand: "Acme" },
});

<AppThemeProvider>
  <AuthProvider adapter={createSessionStorageAuthAdapter()}>
    <RouterProvider router={router} />
  </AuthProvider>
</AppThemeProvider>;
```

Helpers exported for custom routers: **`partitionAdminRoutes`**, **`deriveAuthPaths`**, **`getRouteAccess`**.

## Composition (full control)

When you need a custom tree (extra providers, multiple layouts, unusual nesting), use **`createBrowserRouter`** with **`Protected`** and **`GuestOnly`** directly. See [composition.md](composition.md) and [`examples/playground/src/main.tsx`](../examples/playground/src/main.tsx).

[← Back to README](../README.md)

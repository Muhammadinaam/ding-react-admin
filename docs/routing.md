# Routing & auth guards

`AdminApp` and `createAdminRouter` wire up **only the routes you declare** — no hidden login screen or extra paths. Each route has an optional **`access`** field; redirect targets are taken from those routes or from **`auth.redirects`**.

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
  { path: "login", access: "guest", element: <LoginPage afterLoginPath="/" /> },
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

Your **`routes` array is the full route list** — declare login, signup, and app pages yourself.

## Redirect paths

Guards need a login URL and a post-login URL. They are resolved in this order:

| Target | From routes | Or override with |
|--------|-------------|------------------|
| **Login** (`Protected` redirect, logout) | First `guest` route path | `auth.redirects.unauthenticated` |
| **Home** (`GuestOnly` redirect, catch-all) | Protected index → `/`, else first protected path | `auth.redirects.afterLogin` |

If resolution fails, `createAdminRouter` throws a clear error:

- Protected routes but no guest route and no `redirects.unauthenticated`
- Guest routes but no protected route and no `redirects.afterLogin`

Set **`afterLoginPath`** on `<LoginPage />` to match the home path (defaults to `/` when the dashboard is the index route).

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

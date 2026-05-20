# Default shell with `createAdminRouter`

The recommended layout is **`createBrowserRouter`** with **`GuestOnly`** on the login path, **`Protected`** around **`AdminLayout`**, and **`children`** for app pages—the same shape as [`examples/playground/src/main.tsx`](../examples/playground/src/main.tsx).

**Shortcut:** `createAdminRouter` builds that tree for you and matches `<AdminApp />`’s routing (omit if you prefer an explicit router):

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
  layoutProps: { brand: "Acme", headerExtras: <Notifications /> },
});

<AppThemeProvider>
  <AuthProvider adapter={createSessionStorageAuthAdapter()}>
    <RouterProvider router={router} />
  </AuthProvider>
</AppThemeProvider>;
```

[← Back to README](../README.md)

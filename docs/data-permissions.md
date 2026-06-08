# Data layer & permissions

- **`DataProvider` / `useDataProvider`** — supply a `DataProvider` implementation (`getList`, `getOne`, `create`, `update`, `delete`). Types are exported as `DataProviderContract`, `GetListParams`, etc.
- **`PermissionsProvider` / `usePermissions` / `useCan`** — one function `can(action, resource?)` for UI gating (wire to your roles or ACL).

**Not automatic** — wrap these yourself (inside `AuthProvider`), same as auth. Required only when using CRUD components.

Example wiring (see `examples/playground/src/main.tsx` for a full stack). The route tree lives in your app so login, guards, and `AdminLayout` stay visible:

```tsx
import {
  AdminLayout,
  AppThemeProvider,
  AuthProvider,
  DataProvider,
  GuestOnly,
  LoginPage,
  PermissionsProvider,
  Protected,
  combineResourceHandlers,
  createSessionStorageAuthAdapter,
} from "ding-react-admin";
import type { RouteObject } from "react-router-dom";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { createUserHandlers, USER_RESOURCE } from "./pages/users";

const LOGIN_PATH = "/login";
const HOME_PATH = "/";
const authAdapter = createSessionStorageAuthAdapter();

const data = combineResourceHandlers({
  [USER_RESOURCE]: createUserHandlers(() => apiClient),
});
```

See [tutorial-one-entity.md](tutorial-one-entity.md) for the full Users example (fetch + typed client). Until you add entities, use a stub `DataProviderContract` with empty `getList` / `getOne` / etc.

const can = (action: string, resource?: string) => {
  /* read role from session, etc. */
  return true;
};

const router = createBrowserRouter([
  {
    path: LOGIN_PATH,
    element: (
      <GuestOnly redirectTo={HOME_PATH}>
        <LoginPage afterLoginPath={HOME_PATH} />
      </GuestOnly>
    ),
  },
  {
    path: "/",
    element: (
      <Protected redirectTo={LOGIN_PATH}>
        <AdminLayout
          navItems={navItems}
          loginPath={LOGIN_PATH}
          brand="Acme"
          collapsedBrand="A"
        />
      </Protected>
    ),
    children: routes as RouteObject[],
  },
  { path: "*", element: <Navigate to={HOME_PATH} replace /> },
]);

export function Root() {
  return (
    <AppThemeProvider>
      <AuthProvider adapter={authAdapter}>
        <DataProvider value={data}>
          <PermissionsProvider can={can}>
            <RouterProvider router={router} />
          </PermissionsProvider>
        </DataProvider>
      </AuthProvider>
    </AppThemeProvider>
  );
}
```

[← Back to README](../README.md)

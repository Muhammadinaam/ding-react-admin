import { App as AntdApp } from "antd";
import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  type RouteObject,
} from "react-router-dom";
import {
  AdminLayout,
  AppThemeProvider,
  AuthProvider,
  DataProvider,
  GuestOnly,
  LoginPage,
  PermissionsProvider,
  Protected,
} from "ding-react-admin";
import {
  createPlaygroundAuthAdapter,
  createPlaygroundPermissions,
  PLAYGROUND_SESSION_KEY,
} from "./api/playgroundAuth";
import { createPlaygroundDataProvider } from "./api/playgroundDataProvider";
import { PlaygroundMemoryApi } from "./api/memoryApi";
import { PLAYGROUND_NAV } from "./navigation";
import { playgroundRoutes } from "./routes";

const LOGIN_PATH = "/login";
const HOME_PATH = "/";

const api = new PlaygroundMemoryApi();
const authAdapter = createPlaygroundAuthAdapter(api, PLAYGROUND_SESSION_KEY);
const can = createPlaygroundPermissions();
const dataProvider = createPlaygroundDataProvider(api, can);

const loginElement = (
  <LoginPage
    afterLoginPath={HOME_PATH}
    description={
      <>
        Use <strong>admin</strong> / <strong>admin</strong> for full CRUD, or{" "}
        <strong>user</strong> / <strong>user</strong> for read-only demos.
      </>
    }
  />
);

/** Match Vite `base` (e.g. `/ding-react-admin/` on GitHub Pages). */
const routerBasename =
  import.meta.env.BASE_URL === "/"
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, "");

function PlaygroundProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider adapter={authAdapter}>
      <DataProvider value={dataProvider}>
        <PermissionsProvider can={can}>{children}</PermissionsProvider>
      </DataProvider>
    </AuthProvider>
  );
}

const router = createBrowserRouter(
  [
    {
      element: (
        <PlaygroundProviders>
          <Outlet />
        </PlaygroundProviders>
      ),
      children: [
        {
          path: LOGIN_PATH,
          element: (
            <GuestOnly redirectTo={HOME_PATH}>{loginElement}</GuestOnly>
          ),
        },
        {
          path: "/",
          element: (
            <Protected redirectTo={LOGIN_PATH}>
              <AdminLayout
                navItems={PLAYGROUND_NAV}
                loginPath={LOGIN_PATH}
                brand="Playground"
                collapsedBrand="P"
              />
            </Protected>
          ),
          children: playgroundRoutes as RouteObject[],
        },
        { path: "*", element: <Navigate to={HOME_PATH} replace /> },
      ],
    },
  ],
  { basename: routerBasename },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AntdApp>
      <AppThemeProvider>
        <RouterProvider router={router} />
      </AppThemeProvider>
    </AntdApp>
  </StrictMode>,
);

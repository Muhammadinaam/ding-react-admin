import { App as AntdApp } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Navigate,
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
  playgroundGetToken,
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
const dataProvider = createPlaygroundDataProvider(
  api,
  playgroundGetToken(PLAYGROUND_SESSION_KEY),
);
const permissions = createPlaygroundPermissions(api, PLAYGROUND_SESSION_KEY);

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

const router = createBrowserRouter([
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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AntdApp>
      <AppThemeProvider>
        <AuthProvider adapter={authAdapter}>
          <DataProvider value={dataProvider}>
            <PermissionsProvider can={permissions}>
              <RouterProvider router={router} />
            </PermissionsProvider>
          </DataProvider>
        </AuthProvider>
      </AppThemeProvider>
    </AntdApp>
  </StrictMode>,
);

import { AdminLayout, AppLauncherButton } from "ding-react-admin";
import { Outlet, useLocation } from "react-router-dom";
import { resolvePlaygroundApp } from "./navigation";

const LOGIN_PATH = "/login";

export function PlaygroundShell() {
  const { pathname } = useLocation();
  const isHub = pathname === "/";
  const activeApp = resolvePlaygroundApp(pathname);

  return (
    <AdminLayout
      navItems={activeApp?.nav ?? []}
      hideSider={isHub}
      navSearch={!isHub}
      loginPath={LOGIN_PATH}
      brand="Playground"
      collapsedBrand="P"
      headerExtras={
        !isHub ? <AppLauncherButton hubPath="/" /> : undefined
      }
    />
  );
}

export function PlaygroundOutlet() {
  return <Outlet />;
}

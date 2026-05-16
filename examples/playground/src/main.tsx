import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  AdminApp,
  createSessionStorageAuthAdapter,
} from "ding-react-admin";
import { PLAYGROUND_NAV } from "./navigation";
import { playgroundRoutes } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminApp
      authAdapter={createSessionStorageAuthAdapter(
        "ding-react-admin-playground-auth",
      )}
      navItems={[...PLAYGROUND_NAV]}
      routes={playgroundRoutes}
      layoutProps={{
        brand: "Playground",
        collapsedBrand: "P",
      }}
    />
  </StrictMode>,
);

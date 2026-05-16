import type { AdminRouteChild } from "ding-react-admin";
import { PlaceholderPage } from "ding-react-admin";
import { PLAYGROUND_NAV } from "./navigation";

export const playgroundRoutes: AdminRouteChild[] = PLAYGROUND_NAV.map(
  (item, index) =>
    index === 0
      ? {
          index: true as const,
          element: <PlaceholderPage title={item.label} />,
        }
      : {
          path: item.path.replace(/^\//, ""),
          element: <PlaceholderPage title={item.label} />,
        },
);

import { AppHub, flattenNavLeaves } from "ding-react-admin";
import { Typography } from "antd";
import {
  CATALOG_NAV,
  PLAYGROUND_APPS,
  PLAYGROUND_HUB_APPS,
  SALES_NAV,
} from "../navigation";

const MENU_ITEMS = [
  ...flattenNavLeaves(CATALOG_NAV, { group: "Catalog" }),
  ...flattenNavLeaves(SALES_NAV, { group: "Sales" }),
  ...flattenNavLeaves(PLAYGROUND_APPS.find((a) => a.id === "settings")!.nav, {
    group: "Settings",
  }),
];

export function AppHubPage() {
  return (
    <div style={{ paddingBlock: 24 }}>
      <Typography.Title level={3} style={{ marginTop: 0, textAlign: "center" }}>
        Apps
      </Typography.Title>
      <Typography.Paragraph
        type="secondary"
        style={{ marginBottom: 24, textAlign: "center" }}
      >
        Choose an app to get started.
      </Typography.Paragraph>
      <AppHub apps={PLAYGROUND_HUB_APPS} menuItems={MENU_ITEMS} />
    </div>
  );
}

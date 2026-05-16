import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

export const PLAYGROUND_NAV = [
  { path: "/", label: "Dashboard", Icon: DashboardOutlined },
  { path: "/settings", label: "Settings", Icon: SettingOutlined },
] as const;

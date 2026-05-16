import {
  DesktopOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Segmented } from "antd";
import type { SegmentedProps } from "antd";
import type { ThemeMode } from "../types";
import { useThemeMode } from "../context/AppThemeProvider";

const OPTIONS: SegmentedProps["options"] = [
  { label: "Light", value: "light", icon: <SunOutlined /> },
  { label: "Dark", value: "dark", icon: <MoonOutlined /> },
  { label: "Auto", value: "system", icon: <DesktopOutlined /> },
];

export function ThemeSwitch() {
  const { mode, setMode } = useThemeMode();

  return (
    <Segmented
      size="small"
      value={mode}
      options={OPTIONS}
      onChange={(v) => setMode(v as ThemeMode)}
    />
  );
}

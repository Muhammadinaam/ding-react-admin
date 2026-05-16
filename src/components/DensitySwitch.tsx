import { ColumnHeightOutlined, LayoutOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import type { SegmentedProps } from "antd";
import { useThemeMode } from "../context/AppThemeProvider";
import type { ThemeDensity } from "../types";

const OPTIONS: SegmentedProps["options"] = [
  {
    label: "Comfortable",
    value: "comfortable",
    icon: <LayoutOutlined />,
  },
  {
    label: "Compact",
    value: "compact",
    icon: <ColumnHeightOutlined />,
  },
];

export function DensitySwitch() {
  const { density, setDensity } = useThemeMode();

  return (
    <Segmented
      size="small"
      value={density}
      options={OPTIONS}
      onChange={(v) => setDensity(v as ThemeDensity)}
    />
  );
}

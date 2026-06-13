import { SettingOutlined } from "@ant-design/icons";
import { Button, Grid, Popover, Space, theme } from "antd";
import { DensitySwitch } from "./DensitySwitch";
import { ThemeSwitch } from "./ThemeSwitch";

export function ThemeToolbar() {
  const { token } = theme.useToken();
  const screens = Grid.useBreakpoint();
  const placement = screens.lg ? "bottomRight" : "bottom";

  return (
    <Popover
      placement={placement}
      trigger="click"
      content={
        <Space
          orientation="vertical"
          size="middle"
          style={{ minWidth: 240, maxWidth: "min(92vw, 320px)" }}
        >
          <ThemeSwitch />
          <DensitySwitch />
        </Space>
      }
      styles={{ content: { padding: token.paddingSM } }}
    >
      <Button
        type="default"
        icon={<SettingOutlined />}
        aria-label="Display and theme settings"
      />
    </Popover>
  );
}

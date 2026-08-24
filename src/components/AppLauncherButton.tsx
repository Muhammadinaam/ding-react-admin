import { AppstoreOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export type AppLauncherButtonProps = {
  hubPath?: string;
  label?: string;
  onClick?: () => void;
};

export function AppLauncherButton({
  hubPath = "/",
  label = "Apps",
  onClick,
}: AppLauncherButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      type="text"
      icon={<AppstoreOutlined />}
      onClick={() => {
        if (onClick) {
          onClick();
          return;
        }
        navigate(hubPath);
      }}
    >
      {label}
    </Button>
  );
}

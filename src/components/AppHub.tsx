import { Card, Col, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import type { NavItem } from "../types";

export type AppHubProps = {
  apps: NavItem[];
  onAppClick?: (app: NavItem) => void;
  className?: string;
};

export function AppHub({ apps, onAppClick, className }: AppHubProps) {
  const navigate = useNavigate();

  const handleClick = (app: NavItem) => {
    if (onAppClick) {
      onAppClick(app);
      return;
    }
    navigate(app.path);
  };

  return (
    <Row gutter={[16, 16]} className={className}>
      {apps.map((app) => {
        const Icon = app.Icon;
        return (
          <Col key={app.path} xs={12} sm={8} md={6} lg={4}>
            <Card
              hoverable
              onClick={() => handleClick(app)}
              styles={{ body: { textAlign: "center" } }}
            >
              <Space orientation="vertical" size="small">
                {Icon ? (
                  <span style={{ fontSize: 32, lineHeight: 1 }}>
                    <Icon />
                  </span>
                ) : null}
                <Typography.Text strong>{app.label}</Typography.Text>
              </Space>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

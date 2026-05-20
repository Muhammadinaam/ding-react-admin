# Odoo-style app hub (boxed icons)

Home screen is a grid of tiles; each tile navigates into a module—no persistent sidebar:

```tsx
import { Card, Col, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import type { NavItem } from "ding-react-admin";

export function AppHub({ apps }: { apps: NavItem[] }) {
  const navigate = useNavigate();
  return (
    <Row gutter={[16, 16]}>
      {apps.map((app) => (
        <Col key={app.path} xs={12} sm={8} md={6} lg={4}>
          <Card
            hoverable
            onClick={() => navigate(app.path)}
            styles={{ body: { textAlign: "center" } }}
          >
            <Space direction="vertical" size="small">
              <app.Icon style={{ fontSize: 32 }} />
              <Typography.Text strong>{app.label}</Typography.Text>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
```

Use that as the index route inside whatever shell you prefer.

[← Back to README](../README.md)

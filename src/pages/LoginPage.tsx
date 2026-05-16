import { Button, Card, Flex, Form, Input, theme, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ThemeToolbar } from "../components/ThemeToolbar";
import { useAuth } from "../context/AuthProvider";
import type { LoginPageProps } from "../types";

export function LoginPage({
  title = "Sign in",
  description = "Use any username and password to continue.",
  logo,
  extraFields,
  showThemeToolbar = true,
  afterLoginPath = "/",
}: LoginPageProps) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  return (
    <Flex
      vertical
      align="stretch"
      style={{
        height: "100dvh",
        maxHeight: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: token.colorBgLayout,
      }}
    >
      {showThemeToolbar && (
        <Flex
          justify="flex-end"
          style={{
            flexShrink: 0,
            width: "100%",
            padding: 16,
            background: token.colorBgLayout,
          }}
        >
          <ThemeToolbar />
        </Flex>
      )}
      <Flex
        flex={1}
        justify="center"
        align="center"
        style={{
          width: "100%",
          minHeight: 0,
          padding: 24,
          overflow: "auto",
          overflowX: "hidden",
          background: token.colorBgLayout,
        }}
      >
        <Card
          style={{ width: "100%", maxWidth: 360 }}
          title={title}
          extra={logo}
        >
          {description ? (
            <Typography.Paragraph type="secondary" style={{ marginTop: 0 }}>
              {description}
            </Typography.Paragraph>
          ) : null}
          <Form
            layout="vertical"
            onFinish={async (values: {
              username: string;
              password: string;
            }) => {
              await login(values.username, values.password);
              navigate(afterLoginPath, { replace: true });
            }}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input autoComplete="username" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input.Password autoComplete="current-password" />
            </Form.Item>
            {extraFields}
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" block>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </Flex>
  );
}

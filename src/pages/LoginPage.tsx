import { Button, Card, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthAlternateLink } from "../components/AuthAlternateLink";
import { useAuth } from "../context/AuthProvider";
import { AuthPageLayout } from "../layouts/AuthPageLayout";
import type { LoginPageProps } from "../types";

export function LoginPage({
  title = "Sign in",
  description = "Use any username and password to continue.",
  logo,
  brand,
  extraFields,
  showThemeToolbar = true,
  afterLoginPath = "/",
  alternateAuth,
  footer,
}: LoginPageProps) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const brandNode = brand ?? logo;

  const resolvedFooter =
    footer ??
    (alternateAuth ? (
      <AuthAlternateLink
        prompt={alternateAuth.prompt ?? "Don't have an account?"}
        linkText={alternateAuth.linkText}
        to={alternateAuth.to}
      />
    ) : null);

  return (
    <AuthPageLayout
      brand={brandNode}
      footer={resolvedFooter}
      showThemeToolbar={showThemeToolbar}
    >
      <Card style={{ width: "100%", maxWidth: 360 }} title={title}>
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
    </AuthPageLayout>
  );
}

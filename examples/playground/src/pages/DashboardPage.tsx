import { Typography } from "antd";

export function DashboardPage() {
  return (
    <div>
      <Typography.Title level={4}>Playground</Typography.Title>
      <Typography.Paragraph type="secondary">
        Demo in-memory API with CRUD screens. Sign in as <strong>admin</strong>{" "}
        / <strong>admin</strong> for full access, or <strong>user</strong> /{" "}
        <strong>user</strong> for read-only listing.
      </Typography.Paragraph>
    </div>
  );
}

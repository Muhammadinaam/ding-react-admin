import { Typography } from "antd";

type DashboardPageProps = {
  title?: string;
};

export function DashboardPage({ title = "Playground" }: DashboardPageProps) {
  return (
    <div>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Paragraph type="secondary">
        Demo in-memory API with CRUD screens. Sign in as <strong>admin</strong>{" "}
        / <strong>admin</strong> for full access, or <strong>user</strong> /{" "}
        <strong>user</strong> for read-only listing.
      </Typography.Paragraph>
    </div>
  );
}

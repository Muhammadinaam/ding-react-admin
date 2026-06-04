import { Typography } from "antd";
import { Link } from "react-router-dom";

export type AuthAlternateLinkProps = {
  prompt: string;
  linkText: string;
  to: string;
};

export function AuthAlternateLink({
  prompt,
  linkText,
  to,
}: AuthAlternateLinkProps) {
  return (
    <Typography.Paragraph
      type="secondary"
      style={{ textAlign: "center", marginBottom: 0 }}
    >
      {prompt} <Link to={to}>{linkText}</Link>
    </Typography.Paragraph>
  );
}

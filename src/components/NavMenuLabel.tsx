import { Tooltip } from "antd";
import type { ReactNode } from "react";
import "./navMenu.css";

export type NavMenuLabelProps = {
  label: ReactNode;
  /** Plain-text tooltip shown on hover. */
  title: string;
};

export function NavMenuLabel({ label, title }: NavMenuLabelProps) {
  if (!title) {
    return <span className="ding-admin-menu-label">{label}</span>;
  }

  return (
    <Tooltip
      title={title}
      placement="right"
      mouseEnterDelay={0}
      destroyOnHidden
    >
      <span className="ding-admin-menu-label">{label}</span>
    </Tooltip>
  );
}

import { theme } from "antd";
import { forwardRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import "./scrollable.css";

export type ScrollableAreaProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Use lighter thumbs on dark sidebar backgrounds. */
  variant?: "default" | "on-dark";
};

export const ScrollableArea = forwardRef<HTMLDivElement, ScrollableAreaProps>(
  function ScrollableArea(
    { children, className, style, variant = "default" },
    ref,
  ) {
    const { token } = theme.useToken();

    const thumb =
      variant === "on-dark"
        ? "rgba(255, 255, 255, 0.22)"
        : token.colorTextQuaternary;
    const thumbHover =
      variant === "on-dark"
        ? "rgba(255, 255, 255, 0.38)"
        : token.colorTextTertiary;

    return (
      <div
        ref={ref}
        className={["ding-admin-scroll", className].filter(Boolean).join(" ")}
        style={
          {
            overflow: "auto",
            ...style,
            "--ding-scroll-thumb": thumb,
            "--ding-scroll-thumb-hover": thumbHover,
          } as CSSProperties
        }
      >
        {children}
      </div>
    );
  },
);

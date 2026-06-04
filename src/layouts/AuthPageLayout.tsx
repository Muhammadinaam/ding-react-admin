import { Flex, theme } from "antd";
import type { ReactNode } from "react";
import { ThemeToolbar } from "../components/ThemeToolbar";

export type AuthPageLayoutProps = {
  children: ReactNode;
  /** Brand mark centered above the card. */
  brand?: ReactNode;
  /** Row below the card (e.g. link to register or login). */
  footer?: ReactNode;
  showThemeToolbar?: boolean;
};

export function AuthPageLayout({
  children,
  brand,
  footer,
  showThemeToolbar = true,
}: AuthPageLayoutProps) {
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
      {showThemeToolbar ? (
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
      ) : null}
      <Flex
        flex={1}
        vertical
        align="center"
        justify="center"
        style={{
          width: "100%",
          minHeight: 0,
          padding: 24,
          overflow: "auto",
          overflowX: "hidden",
          background: token.colorBgLayout,
        }}
      >
        {brand ? (
          <div style={{ marginBottom: 24, textAlign: "center" }}>{brand}</div>
        ) : null}
        {children}
        {footer ? (
          <div style={{ marginTop: 16, width: "100%", maxWidth: 520 }}>
            {footer}
          </div>
        ) : null}
      </Flex>
    </Flex>
  );
}

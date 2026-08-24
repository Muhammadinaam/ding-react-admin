import { Card, Col, List, Row, Space, Typography, theme } from "antd";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  filterFlatNavItems,
  getNavItemLabel,
} from "../layouts/navFilter";
import type { FlatNavItem } from "../layouts/navFilter";
import type { NavItem } from "../types";
import { NavMenuSearch } from "./NavMenuSearch";

export type AppHubProps = {
  apps: NavItem[];
  /** Flattened leaf menus from all apps — enables cross-app search when set. */
  menuItems?: FlatNavItem[];
  onAppClick?: (app: NavItem) => void;
  onMenuClick?: (item: FlatNavItem) => void;
  menuSearchPlaceholder?: string;
  className?: string;
  /** Max width of the centered hub content. Default `960`. */
  maxWidth?: number;
};

export function AppHub({
  apps,
  menuItems,
  onAppClick,
  onMenuClick,
  menuSearchPlaceholder = "Search menus across apps…",
  className,
  maxWidth = 960,
}: AppHubProps) {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [query, setQuery] = useState("");

  const handleAppClick = (app: NavItem) => {
    if (onAppClick) {
      onAppClick(app);
      return;
    }
    navigate(app.path);
  };

  const handleMenuClick = (item: FlatNavItem) => {
    if (onMenuClick) {
      onMenuClick(item);
      return;
    }
    navigate(item.path);
  };

  const trimmedQuery = query.trim();
  const menuResults = useMemo(
    () =>
      menuItems && trimmedQuery
        ? filterFlatNavItems(menuItems, trimmedQuery)
        : [],
    [menuItems, trimmedQuery],
  );
  const isSearching = Boolean(menuItems && trimmedQuery);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth,
        marginInline: "auto",
        paddingInline: token.paddingMD,
      }}
    >
      {menuItems?.length ? (
        <div style={{ maxWidth: 480, margin: "0 auto 24px" }}>
          <NavMenuSearch
            value={query}
            onChange={setQuery}
            placeholder={menuSearchPlaceholder}
            variant="app"
          />
        </div>
      ) : null}

      {isSearching ? (
        <List
          bordered
          dataSource={menuResults}
          locale={{ emptyText: "No menus match your search." }}
          style={{ background: token.colorBgContainer, borderRadius: token.borderRadiusLG }}
          renderItem={(item) => {
            const Icon = item.Icon;
            return (
              <List.Item
                style={{ cursor: "pointer" }}
                onClick={() => handleMenuClick(item)}
              >
                <List.Item.Meta
                  avatar={
                    Icon ? (
                      <span style={{ fontSize: 20, lineHeight: 1 }}>
                        <Icon />
                      </span>
                    ) : undefined
                  }
                  title={getNavItemLabel(item)}
                  description={item.group}
                />
              </List.Item>
            );
          }}
        />
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {apps.map((app) => {
            const Icon = app.Icon;
            return (
              <Col key={app.path} xs={12} sm={8} md={6} lg={4} style={{ maxWidth: 200 }}>
                <Card
                  hoverable
                  onClick={() => handleAppClick(app)}
                  styles={{ body: { textAlign: "center", padding: token.paddingLG } }}
                >
                  <Space orientation="vertical" size="middle">
                    {Icon ? (
                      <span style={{ fontSize: 40, lineHeight: 1 }}>
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
      )}
    </div>
  );
}

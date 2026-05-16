import {
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Grid,
  Layout,
  Menu,
  theme,
  Typography,
} from "antd";
import type { MenuProps } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ThemeToolbar } from "../components/ThemeToolbar";
import { useAuth } from "../context/AuthProvider";
import { useThemeMode } from "../context/AppThemeProvider";
import type { AdminLayoutProps } from "../types";

const LIGHT_SIDEBAR_BG = "#001529";
const DEFAULT_SIDER_KEY = "ding-react-admin-sider-collapsed";

function readSiderCollapsed(key: string): boolean {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function useIsMobileNav(): boolean {
  const screens = Grid.useBreakpoint();
  return screens.lg !== true;
}

type NavMenuProps = {
  menuItems: MenuProps["items"];
  selectedKeys: string[];
  inlineCollapsed: boolean;
  onNavigate: (key: string) => void;
};

function NavMenu({
  menuItems,
  selectedKeys,
  inlineCollapsed,
  onNavigate,
}: NavMenuProps) {
  return (
    <Menu
      mode="inline"
      theme="dark"
      inlineCollapsed={inlineCollapsed}
      selectedKeys={selectedKeys}
      items={menuItems}
      onClick={({ key }) => onNavigate(key)}
      style={{ background: "transparent", borderInlineEnd: "none" }}
    />
  );
}

export function AdminLayout({
  navItems,
  brand = "Admin",
  collapsedBrand = "A",
  mobileDrawerTitle,
  headerExtras,
  userMenuItems,
  onUserMenuClick,
  loginPath = "/login",
  siderCollapsedStorageKey = DEFAULT_SIDER_KEY,
}: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { resolved } = useThemeMode();
  const isAppDark = resolved === "dark";
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(() =>
    readSiderCollapsed(siderCollapsedStorageKey),
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isMobile = useIsMobileNav();
  const { token } = theme.useToken();

  const drawerTitle = mobileDrawerTitle ?? brand;

  const handleLogout = () => {
    logout();
    navigate(loginPath, { replace: true });
  };

  const handleCollapse = useCallback(
    (next: boolean) => {
      setCollapsed(next);
      try {
        localStorage.setItem(siderCollapsedStorageKey, next ? "1" : "0");
      } catch {
        /* ignore */
      }
    },
    [siderCollapsedStorageKey],
  );

  useEffect(() => {
    if (!isMobile) setMobileNavOpen(false);
  }, [isMobile]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  const menuItems: MenuProps["items"] = useMemo(
    () =>
      navItems.map(({ path, label, Icon }) => ({
        key: path,
        icon: <Icon />,
        label,
      })),
    [navItems],
  );

  const defaultUserMenuItems: MenuProps["items"] = useMemo(
    () => [
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Log out",
        danger: true,
      },
    ],
    [],
  );

  const resolvedUserItems = userMenuItems ?? defaultUserMenuItems;

  const onDropdownMenuClick: MenuProps["onClick"] = (info) => {
    if (onUserMenuClick) {
      onUserMenuClick(info);
      return;
    }
    if (info.key === "logout") handleLogout();
  };

  const siderBg = isAppDark ? token.colorBgContainer : LIGHT_SIDEBAR_BG;
  const selectedKeys = [location.pathname];

  const goNav = (key: string) => {
    navigate(key);
    if (isMobile) setMobileNavOpen(false);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        width: "100%",
        background: token.colorBgLayout,
      }}
    >
      {!isMobile && (
        <Layout.Sider
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapse}
          collapsedWidth={64}
          style={{
            background: siderBg,
            borderInlineEnd: isAppDark
              ? `1px solid ${token.colorSplit}`
              : undefined,
          }}
        >
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
            }}
          >
            <Typography.Text
              strong
              style={{ color: token.colorTextLightSolid }}
            >
              {collapsed ? collapsedBrand : brand}
            </Typography.Text>
          </div>
          <NavMenu
            menuItems={menuItems}
            selectedKeys={selectedKeys}
            inlineCollapsed={collapsed}
            onNavigate={goNav}
          />
        </Layout.Sider>
      )}
      {isMobile && (
        <Drawer
          title={
            <Typography.Text
              strong
              style={{ color: token.colorTextLightSolid }}
            >
              {drawerTitle}
            </Typography.Text>
          }
          placement="left"
          width={280}
          onClose={() => setMobileNavOpen(false)}
          open={mobileNavOpen}
          styles={{
            header: {
              background: siderBg,
              borderBottom: `1px solid ${token.colorSplit}`,
            },
            body: { padding: 0, background: siderBg },
          }}
          destroyOnClose
        >
          <NavMenu
            menuItems={menuItems}
            selectedKeys={selectedKeys}
            inlineCollapsed={false}
            onNavigate={goNav}
          />
        </Drawer>
      )}
      <Layout>
        <Layout.Header
          style={{
            background: token.colorBgContainer,
            paddingInline: token.paddingLG,
            display: "flex",
            alignItems: "center",
            gap: token.marginSM,
            lineHeight: "normal",
          }}
        >
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation"
            />
          )}
          <div style={{ flex: 1, minWidth: 0 }} />
          {headerExtras}
          <ThemeToolbar />
          <Dropdown
            menu={{
              items: resolvedUserItems,
              onClick: onDropdownMenuClick,
            }}
            trigger={["click"]}
          >
            <Button
              type="text"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: token.marginXS,
                maxWidth: isMobile ? 44 : undefined,
                paddingInline: isMobile ? token.paddingXS : undefined,
              }}
              aria-label="Account menu"
            >
              <Avatar size="small" icon={<UserOutlined />} />
              {!isMobile && (
                <Typography.Text type="secondary">User</Typography.Text>
              )}
            </Button>
          </Dropdown>
        </Layout.Header>
        <Layout.Content
          style={{
            margin: isMobile ? token.marginSM : token.marginLG,
          }}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

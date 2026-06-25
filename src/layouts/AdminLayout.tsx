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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ThemeToolbar } from "../components/ThemeToolbar";
import { NavMenuSearch } from "../components/NavMenuSearch";
import { ScrollableArea } from "../components/ScrollableArea";
import { useAuth } from "../context/AuthProvider";
import { usePermissions } from "../context/PermissionsProvider";
import { useThemeMode } from "../context/AppThemeProvider";
import {
  collectSubmenuKeys,
  filterNavItems,
} from "./navFilter";
import { navItemsToAntdItems } from "./navMenuItems";
import { filterNavByPermission } from "../permissions/resourcePermissions";
import type { AdminLayoutProps, NavItem } from "../types";
import "../components/navMenu.css";

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

/** Paths that correspond to actual routes (leaf menu rows only). */
function collectLeafPaths(items: NavItem[]): Set<string> {
  const set = new Set<string>();
  function walk(nodes: NavItem[]) {
    for (const n of nodes) {
      if (n.children?.length) walk(n.children);
      else set.add(n.path);
    }
  }
  walk(items);
  return set;
}

/** Submenu keys that must stay open for `pathname` to remain visible in the tree. */
function ancestorKeysForActivePath(
  items: NavItem[],
  pathname: string,
): string[] {
  function dfs(nodes: NavItem[]): string[] | null {
    for (const node of nodes) {
      if (node.children?.length) {
        const sub = dfs(node.children);
        if (sub !== null) return [node.path, ...sub];
      } else if (node.path === pathname) {
        return [];
      }
    }
    return null;
  }
  return dfs(items) ?? [];
}

type NavMenuProps = {
  menuItems: MenuProps["items"];
  selectedKeys: string[];
  inlineCollapsed: boolean;
  openKeys?: string[];
  onOpenChange?: (keys: string[]) => void;
  onNavigate: (key: string) => void;
};

type SiderNavPanelProps = NavMenuProps & {
  navQuery: string;
  onNavQueryChange: (value: string) => void;
  showNavSearch: boolean;
  navSearchPlaceholder?: string;
  scrollVariant: "default" | "on-dark";
  searchVariant: "on-dark" | "app";
};

function SiderNavPanel({
  menuItems,
  selectedKeys,
  inlineCollapsed,
  openKeys,
  onOpenChange,
  onNavigate,
  navQuery,
  onNavQueryChange,
  showNavSearch,
  navSearchPlaceholder,
  scrollVariant,
  searchVariant,
}: SiderNavPanelProps) {
  return (
    <>
      {showNavSearch && !inlineCollapsed ? (
        <NavMenuSearch
          value={navQuery}
          onChange={onNavQueryChange}
          placeholder={navSearchPlaceholder}
          variant={searchVariant}
        />
      ) : null}
      <ScrollableArea
        variant={scrollVariant}
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <NavMenu
          menuItems={menuItems}
          selectedKeys={selectedKeys}
          inlineCollapsed={inlineCollapsed}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onNavigate={onNavigate}
        />
      </ScrollableArea>
    </>
  );
}

function NavMenu({
  menuItems,
  selectedKeys,
  inlineCollapsed,
  openKeys,
  onOpenChange,
  onNavigate,
}: NavMenuProps) {
  return (
    <Menu
      className="ding-admin-nav-menu"
      mode="inline"
      theme="dark"
      inlineCollapsed={inlineCollapsed}
      selectedKeys={selectedKeys}
      tooltip={{ placement: "right", mouseEnterDelay: 1 }}
      {...(!inlineCollapsed && openKeys !== undefined && onOpenChange
        ? { openKeys, onOpenChange }
        : {})}
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
  navSearch = true,
}: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { resolved } = useThemeMode();
  const isAppDark = resolved === "dark";
  const { logout, userLabel } = useAuth();
  const can = usePermissions();
  const [collapsed, setCollapsed] = useState(() =>
    readSiderCollapsed(siderCollapsedStorageKey),
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isMobile = useIsMobileNav();
  const { token } = theme.useToken();
  const contentRef = useRef<HTMLDivElement>(null);
  const [navQuery, setNavQuery] = useState("");

  const navSearchEnabled = navSearch !== false;
  const navSearchPlaceholder =
    typeof navSearch === "object" ? navSearch.placeholder : undefined;

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

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, left: 0 });
  }, [location.pathname]);

  useEffect(() => {
    if (collapsed) setNavQuery("");
  }, [collapsed]);

  const visibleNavItems = useMemo(
    () => filterNavByPermission(navItems, can),
    [navItems, can],
  );

  const trimmedNavQuery = navQuery.trim();
  const isNavFiltering = trimmedNavQuery.length > 0;

  const displayNavItems = useMemo(
    () =>
      isNavFiltering
        ? filterNavItems(visibleNavItems, trimmedNavQuery)
        : visibleNavItems,
    [visibleNavItems, trimmedNavQuery, isNavFiltering],
  );

  const leafPaths = useMemo(
    () => collectLeafPaths(displayNavItems),
    [displayNavItems],
  );

  const menuItems: MenuProps["items"] = useMemo(
    () =>
      navItemsToAntdItems(displayNavItems, {
        showLabelTooltip: !collapsed,
      }),
    [displayNavItems, collapsed],
  );

  const filteredOpenKeys = useMemo(
    () => collectSubmenuKeys(displayNavItems),
    [displayNavItems],
  );

  const requiredOpenKeys = useMemo(
    () => ancestorKeysForActivePath(visibleNavItems, location.pathname),
    [visibleNavItems, location.pathname],
  );

  const [openKeys, setOpenKeys] = useState<string[]>(() =>
    ancestorKeysForActivePath(visibleNavItems, location.pathname),
  );

  useEffect(() => {
    setOpenKeys((prev) => [...new Set([...prev, ...requiredOpenKeys])]);
  }, [requiredOpenKeys]);

  const handleOpenChange = useCallback((keys: string[]) => {
    setOpenKeys(keys);
  }, []);

  const effectiveOpenKeys = isNavFiltering ? filteredOpenKeys : openKeys;

  const handleNavQueryChange = useCallback((value: string) => {
    setNavQuery(value);
  }, []);

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
  const siderScrollVariant = isAppDark ? "default" : "on-dark";
  const siderSearchVariant = isAppDark ? "app" : "on-dark";
  const selectedKeys = [location.pathname];

  const goNav = (key: string) => {
    if (!leafPaths.has(key)) return;
    navigate(key);
    if (isMobile) setMobileNavOpen(false);
  };

  return (
    <Layout
      style={{
        height: "100vh",
        width: "100%",
        overflow: "hidden",
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
            height: "100vh",
            overflow: "hidden",
            borderInlineEnd: isAppDark
              ? `1px solid ${token.colorSplit}`
              : undefined,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 64,
                flexShrink: 0,
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
            <SiderNavPanel
              menuItems={menuItems}
              selectedKeys={selectedKeys}
              inlineCollapsed={collapsed}
              openKeys={effectiveOpenKeys}
              onOpenChange={handleOpenChange}
              onNavigate={goNav}
              navQuery={navQuery}
              onNavQueryChange={handleNavQueryChange}
              showNavSearch={navSearchEnabled}
              navSearchPlaceholder={navSearchPlaceholder}
              scrollVariant={siderScrollVariant}
              searchVariant={siderSearchVariant}
            />
          </div>
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
          size={280}
          onClose={() => setMobileNavOpen(false)}
          open={mobileNavOpen}
          styles={{
            header: {
              background: siderBg,
              borderBottom: `1px solid ${token.colorSplit}`,
            },
            body: { padding: 0, background: siderBg },
          }}
          destroyOnHidden
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <SiderNavPanel
              menuItems={menuItems}
              selectedKeys={selectedKeys}
              inlineCollapsed={false}
              openKeys={effectiveOpenKeys}
              onOpenChange={handleOpenChange}
              onNavigate={goNav}
              navQuery={navQuery}
              onNavQueryChange={handleNavQueryChange}
              showNavSearch={navSearchEnabled}
              navSearchPlaceholder={navSearchPlaceholder}
              scrollVariant={siderScrollVariant}
              searchVariant={siderSearchVariant}
            />
          </div>
        </Drawer>
      )}
      <Layout
        style={{
          minWidth: 0,
          flex: 1,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Layout.Header
          style={{
            background: token.colorBgContainer,
            paddingInline: token.paddingLG,
            display: "flex",
            alignItems: "center",
            gap: token.marginSM,
            lineHeight: "normal",
            flexShrink: 0,
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
                <Typography.Text
                  type="secondary"
                  ellipsis
                  style={{ maxWidth: 160 }}
                >
                  {userLabel}
                </Typography.Text>
              )}
            </Button>
          </Dropdown>
        </Layout.Header>
        <Layout.Content
          style={{
            minWidth: 0,
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ScrollableArea
            ref={contentRef}
            style={{
              margin: isMobile ? token.marginSM : token.marginLG,
              flex: 1,
              minHeight: 0,
              overflow: "auto",
            }}
          >
            <Outlet />
          </ScrollableArea>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

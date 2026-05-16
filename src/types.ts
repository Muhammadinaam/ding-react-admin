import type { MenuProps } from "antd";
import type { ReactElement, ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "system";

export type ThemeDensity = "comfortable" | "compact";

/** One primary navigation entry (sidebar / app hub). */
export type NavItem = {
  path: string;
  label: string;
  Icon: React.ComponentType;
};

export type AuthAdapter = {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  /** Synchronous read of session (e.g. token). Used after mount and after login/logout. */
  getToken: () => string | null;
};

export type AppThemeProviderProps = {
  children: ReactNode;
  /** localStorage key for theme mode. Default `ding-react-admin-theme-mode`. */
  modeStorageKey?: string;
  /** localStorage key for density. Default `ding-react-admin-theme-density`. */
  densityStorageKey?: string;
};

export type AdminLayoutProps = {
  navItems: NavItem[];
  /** Shown in sider header when expanded; drawer title on mobile. */
  brand?: ReactNode;
  /** Shown in sider header when collapsed. */
  collapsedBrand?: ReactNode;
  /** Optional drawer title override (defaults to `brand`). */
  mobileDrawerTitle?: ReactNode;
  headerExtras?: ReactNode;
  /** Full menu items for the account dropdown. If omitted, a default “Log out” item is used. */
  userMenuItems?: MenuProps["items"];
  onUserMenuClick?: MenuProps["onClick"];
  /** Where to send the user after logout. Default `/login`. */
  loginPath?: string;
  /** localStorage key for sider collapsed state. Default `ding-react-admin-sider-collapsed`. */
  siderCollapsedStorageKey?: string;
};

export type LoginPageProps = {
  title?: ReactNode;
  description?: ReactNode;
  logo?: ReactNode;
  /** Extra form items rendered before the submit button. */
  extraFields?: ReactNode;
  showThemeToolbar?: boolean;
  /** Navigate here after successful login. Default `/`. */
  afterLoginPath?: string;
};

/** Route list for `AdminApp` / `createAdminRouter` (flat children under the shell). */
export type AdminRouteChild =
  | { index: true; element: ReactElement; path?: undefined }
  | { path: string; element: ReactElement; index?: undefined };

export type CreateAdminRouterOptions = {
  navItems: NavItem[];
  /** Child routes rendered inside `AdminLayout` (`<Outlet />`). */
  children: AdminRouteChild[];
  layoutProps?: Partial<AdminLayoutProps>;
  /** Path for the login screen. Default `/login`. */
  loginPath?: string;
  /** Where authenticated users are redirected when visiting login. Default `/`. */
  homePath?: string;
  /** Element for the login route. Default `<LoginPage />`. */
  loginElement?: ReactElement;
};

export type AdminAppProps = {
  navItems: NavItem[];
  routes: AdminRouteChild[];
  authAdapter: AuthAdapter;
  layoutProps?: Partial<AdminLayoutProps>;
  loginPath?: string;
  homePath?: string;
  loginElement?: ReactElement;
  theme?: Partial<
    Pick<AppThemeProviderProps, "modeStorageKey" | "densityStorageKey">
  >;
};

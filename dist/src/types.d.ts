import { MenuProps } from 'antd';
import { ReactElement, ReactNode } from 'react';
export type ThemeMode = "light" | "dark" | "system";
export type ThemeDensity = "comfortable" | "compact";
/**
 * Sidebar / app-hub navigation row. Maps to Ant Design `Menu` items.
 *
 * - **`children`** — nested submenu; parent rows should use a `path` that you **do not** navigate to as a leaf (for example `/catalog`), unless you define that route.
 * - **`label`** — string or any React node (badges, extra markup).
 * - **`Icon`** — optional; omit on group-only rows if you prefer text-only labels.
 */
export type NavItem = {
    /** Menu item key and `navigate()` target for leaf items (pathname). Parents use this as submenu key. */
    path: string;
    label: ReactNode;
    Icon?: React.ComponentType;
    children?: NavItem[];
};
/** Credentials passed from login forms to `AuthAdapter.login` and `useAuth().login`. */
export type LoginCredentials = {
    username: string;
    password: string;
    [key: string]: unknown;
};
/** Pluggable login/logout/token backend (e.g. sessionStorage, your REST API). */
export type AuthAdapter = {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    /** Synchronous read of session (e.g. token). Used after mount and after login/logout. */
    getToken: () => string | null;
};
/** How a route participates in auth when using `AdminApp` / `createAdminRouter`. */
export type RouteAccess = 
/** Inside `AdminLayout`; requires a session. Default. */
"protected"
/** Top-level; no session required (signup, forgot-password, etc.). */
 | "public"
/** Top-level; only for guests (`GuestOnly`). Use for login. */
 | "guest";
export type AuthRedirects = {
    /** Where unauthenticated users are sent. Required with protected routes unless a guest route is declared. */
    unauthenticated?: string;
    /** After login and when visiting guest routes while authenticated. Required with guest routes unless a protected route is declared. */
    afterLogin?: string;
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
export type { AuthPageLayoutProps } from './layouts/AuthPageLayout';
export type { AuthAlternateLinkProps } from './components/AuthAlternateLink';
export type LoginPageProps = {
    title?: ReactNode;
    description?: ReactNode;
    /** @deprecated Use `brand` — shown above the card, not in the card header. */
    logo?: ReactNode;
    /** Brand mark centered above the card. */
    brand?: ReactNode;
    /** Extra form items rendered before the submit button. */
    extraFields?: ReactNode;
    showThemeToolbar?: boolean;
    /** Navigate here after successful login. Default `/`. */
    afterLoginPath?: string;
    /** Row below the card linking to registration (or another auth flow). */
    alternateAuth?: {
        prompt?: string;
        linkText: string;
        to: string;
    };
    /** Custom footer below the card; overrides `alternateAuth` when set. */
    footer?: ReactNode;
};
type AdminRouteChildBase = {
    element: ReactElement;
    /** Default `protected`. See [docs/routing.md](../docs/routing.md). */
    access?: RouteAccess;
};
/** Route list for `AdminApp` / `createAdminRouter`. */
export type AdminRouteChild = (AdminRouteChildBase & {
    index: true;
    path?: undefined;
}) | (AdminRouteChildBase & {
    path: string;
    index?: undefined;
});
export type CreateAdminRouterOptions = {
    navItems: NavItem[];
    /** App routes; split by `access` into guest, public, and protected segments. */
    children: AdminRouteChild[];
    layoutProps?: Partial<AdminLayoutProps>;
    redirects?: AuthRedirects;
};
export type AdminAppProps = {
    navItems: NavItem[];
    routes: AdminRouteChild[];
    /** Override login / post-login redirect paths when they cannot be inferred from routes. */
    authRedirects?: AuthRedirects;
    layoutProps?: Partial<AdminLayoutProps>;
    theme?: Partial<Pick<AppThemeProviderProps, "modeStorageKey" | "densityStorageKey">>;
};
//# sourceMappingURL=types.d.ts.map
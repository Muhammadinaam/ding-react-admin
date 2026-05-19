export { AdminApp } from "./app/AdminApp";
export { AdminLayout } from "./layouts/AdminLayout";
export {
  AuthProvider,
  createSessionStorageAuthAdapter,
  useAuth,
  type AuthProviderProps,
} from "./context/AuthProvider";
export {
  DataProvider,
  useDataProvider,
  type DataProviderProps,
} from "./context/DataProvider";
export {
  PermissionsProvider,
  useCan,
  usePermissions,
  type PermissionsProviderProps,
} from "./context/PermissionsProvider";
export {
  AppThemeProvider,
  useThemeMode,
} from "./context/AppThemeProvider";
export type {
  CreateResult,
  DataProvider as DataProviderContract,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetOneResult,
  Identifier,
  PaginationParams,
  SortOrder,
  UpdateParams,
  UpdateResult,
} from "./data/dataProviderTypes";
export type { PermissionsChecker } from "./context/PermissionsProvider";
export { LoginPage } from "./pages/LoginPage";
export { PlaceholderPage } from "./pages/PlaceholderPage";
export { DensitySwitch, ThemeSwitch, ThemeToolbar } from "./components";
export { Guard, GuestOnly, Protected } from "./router/guards";
export { createAdminRouter } from "./router/createAdminRouter";
export type {
  AdminAppProps,
  AdminLayoutProps,
  AdminRouteChild,
  AppThemeProviderProps,
  AuthAdapter,
  CreateAdminRouterOptions,
  LoginPageProps,
  NavItem,
  ThemeDensity,
  ThemeMode,
} from "./types";

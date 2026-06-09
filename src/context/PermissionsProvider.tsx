import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

/**
 * Check whether the current user has a permission string from your backend.
 * Example: `can("users.create")` or `can("main.add_user")`.
 */
export type PermissionsChecker = (permission: string) => boolean;

const PermissionsContext = createContext<PermissionsChecker | null>(null);

export type PermissionsProviderProps = {
  children: ReactNode;
  /** Return true if the current user has this permission string. */
  can: PermissionsChecker;
};

export function PermissionsProvider({
  children,
  can,
}: PermissionsProviderProps) {
  const memo = useMemo(() => can, [can]);
  return (
    <PermissionsContext.Provider value={memo}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions(): PermissionsChecker {
  const ctx = useContext(PermissionsContext);
  if (!ctx) {
    throw new Error(
      "usePermissions must be used within PermissionsProvider",
    );
  }
  return ctx;
}

/** Build a `can(permission)` checker from the user's permission strings (e.g. from login). */
export function createPermissionsChecker(
  getPermissions: () => string[] | undefined,
): PermissionsChecker {
  return (permission: string) =>
    getPermissions()?.includes(permission) ?? false;
}

/** Convenience: `const allowed = useCan("users.create")();` */
export function useCan(permission: string) {
  const can = usePermissions();
  return useCallback(() => can(permission), [can, permission]);
}

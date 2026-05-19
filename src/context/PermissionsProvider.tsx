import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

/**
 * Lightweight permission check. Map to roles, ACLs, or flags from your backend.
 * Example: `can("write", "products")` or `can("delete")`.
 */
export type PermissionsChecker = (
  action: string,
  resource?: string,
) => boolean;

const PermissionsContext = createContext<PermissionsChecker | null>(null);

export type PermissionsProviderProps = {
  children: ReactNode;
  /** Return true if the current user may perform `action` on optional `resource`. */
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

/** Convenience: `const canWrite = useCan("write", "products");` */
export function useCan(action: string, resource?: string) {
  const can = usePermissions();
  return useCallback(() => can(action, resource), [can, action, resource]);
}

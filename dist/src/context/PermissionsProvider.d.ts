import { ReactNode } from 'react';
/**
 * Check whether the current user has a permission string from your backend.
 * Example: `can("users.create")` or `can("main.add_user")`.
 */
export type PermissionsChecker = (permission: string) => boolean;
export type PermissionsProviderProps = {
    children: ReactNode;
    /** Return true if the current user has this permission string. */
    can: PermissionsChecker;
};
export declare function PermissionsProvider({ children, can, }: PermissionsProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function usePermissions(): PermissionsChecker;
/** Build a `can(permission)` checker from the user's permission strings (e.g. from login). */
export declare function createPermissionsChecker(getPermissions: () => string[] | undefined): PermissionsChecker;
/** Convenience: `const allowed = useCan("users.create")();` */
export declare function useCan(permission: string): () => boolean;
//# sourceMappingURL=PermissionsProvider.d.ts.map
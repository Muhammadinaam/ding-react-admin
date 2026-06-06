import { ReactNode } from 'react';
/**
 * Lightweight permission check. Map to roles, ACLs, or flags from your backend.
 * Example: `can("write", "products")` or `can("delete")`.
 */
export type PermissionsChecker = (action: string, resource?: string) => boolean;
export type PermissionsProviderProps = {
    children: ReactNode;
    /** Return true if the current user may perform `action` on optional `resource`. */
    can: PermissionsChecker;
};
export declare function PermissionsProvider({ children, can, }: PermissionsProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function usePermissions(): PermissionsChecker;
/** Convenience: `const canWrite = useCan("write", "products");` */
export declare function useCan(action: string, resource?: string): () => boolean;
//# sourceMappingURL=PermissionsProvider.d.ts.map
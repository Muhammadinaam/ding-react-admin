import { ReactNode } from 'react';
import { AuthAdapter, LoginCredentials } from '../types';
type AuthContextValue = {
    isAuthenticated: boolean;
    /** From `AuthAdapter.getUserLabel`; `"User"` when the adapter omits it or returns null. */
    userLabel: string;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
};
export type AuthProviderProps = {
    children: ReactNode;
    /** How login, logout, and token reads are implemented (API, sessionStorage, etc.). */
    adapter: AuthAdapter;
};
export declare function AuthProvider({ children, adapter }: AuthProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useAuth(): AuthContextValue;
/** Store a non-empty token string in `sessionStorage` when “logged in”. */
export declare function createSessionStorageAuthAdapter(storageKey?: string): AuthAdapter;
export {};
//# sourceMappingURL=AuthProvider.d.ts.map
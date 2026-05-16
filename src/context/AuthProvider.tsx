import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthAdapter } from "../types";

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export type AuthProviderProps = {
  children: ReactNode;
  adapter: AuthAdapter;
};

export function AuthProvider({ children, adapter }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => adapter.getToken());

  const login = useCallback(
    async (username: string, password: string) => {
      await adapter.login(username, password);
      setToken(adapter.getToken());
    },
    [adapter],
  );

  const logout = useCallback(() => {
    adapter.logout();
    setToken(adapter.getToken());
  }, [adapter]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

const DEFAULT_SESSION_KEY = "ding-react-admin-auth";

/** Store a non-empty token string in `sessionStorage` when “logged in”. */
export function createSessionStorageAuthAdapter(
  storageKey: string = DEFAULT_SESSION_KEY,
): AuthAdapter {
  return {
    async login(username: string, password: string) {
      if (!username.trim() || !password) throw new Error("Invalid credentials");
      sessionStorage.setItem(storageKey, "1");
    },
    logout() {
      sessionStorage.removeItem(storageKey);
    },
    getToken() {
      return sessionStorage.getItem(storageKey);
    },
  };
}

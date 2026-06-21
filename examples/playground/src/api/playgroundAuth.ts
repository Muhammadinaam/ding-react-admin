import type { AuthAdapter, PermissionsChecker } from "ding-react-admin";
import { createPermissionsChecker } from "ding-react-admin";
import type { PlaygroundMemoryApi } from "./memoryApi";
import type { PublicUser } from "./memoryApi";

export const PLAYGROUND_SESSION_KEY = "ding-react-admin-playground-session-v2";
export const PLAYGROUND_USER_KEY = "ding-react-admin-playground-user-v2";

export function createPlaygroundAuthAdapter(
  api: PlaygroundMemoryApi,
  storageKey: string = PLAYGROUND_SESSION_KEY,
): AuthAdapter {
  return {
    async login({ username, password }) {
      const { token, user } = api.login(username, password);
      sessionStorage.setItem(storageKey, token);
      sessionStorage.setItem(PLAYGROUND_USER_KEY, JSON.stringify(user));
    },
    logout() {
      const token = sessionStorage.getItem(storageKey);
      api.logoutToken(token);
      sessionStorage.removeItem(storageKey);
      sessionStorage.removeItem(PLAYGROUND_USER_KEY);
    },
    getToken() {
      return sessionStorage.getItem(storageKey);
    },
    getUserLabel() {
      try {
        const raw = sessionStorage.getItem(PLAYGROUND_USER_KEY);
        if (!raw) return null;
        const user = JSON.parse(raw) as PublicUser;
        return user.username || null;
      } catch {
        return null;
      }
    },
  };
}

export function playgroundGetToken(
  storageKey: string = PLAYGROUND_SESSION_KEY,
) {
  return () => sessionStorage.getItem(storageKey);
}

export function playgroundGetPermissions(): string[] | undefined {
  try {
    const raw = sessionStorage.getItem(PLAYGROUND_USER_KEY);
    if (!raw) return undefined;
    return (JSON.parse(raw) as PublicUser).permissions;
  } catch {
    return undefined;
  }
}

export function createPlaygroundPermissions(): PermissionsChecker {
  return createPermissionsChecker(() => playgroundGetPermissions());
}

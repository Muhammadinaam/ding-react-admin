import type { AuthAdapter } from "ding-react-admin";
import type { PlaygroundMemoryApi } from "./memoryApi";

export const PLAYGROUND_SESSION_KEY = "ding-react-admin-playground-session-v2";

export function createPlaygroundAuthAdapter(
  api: PlaygroundMemoryApi,
  storageKey: string = PLAYGROUND_SESSION_KEY,
): AuthAdapter {
  return {
    async login(username: string, password: string) {
      const { token } = api.login(username, password);
      sessionStorage.setItem(storageKey, token);
    },
    logout() {
      const token = sessionStorage.getItem(storageKey);
      api.logoutToken(token);
      sessionStorage.removeItem(storageKey);
    },
    getToken() {
      return sessionStorage.getItem(storageKey);
    },
  };
}

export function playgroundGetToken(
  storageKey: string = PLAYGROUND_SESSION_KEY,
) {
  return () => sessionStorage.getItem(storageKey);
}

export function createPlaygroundPermissions(
  api: PlaygroundMemoryApi,
  storageKey: string = PLAYGROUND_SESSION_KEY,
) {
  return (action: string, resource?: string) =>
    api.can(sessionStorage.getItem(storageKey), action, resource);
}

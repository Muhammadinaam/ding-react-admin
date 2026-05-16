import { ConfigProvider, theme as antdTheme } from "antd";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  AppThemeProviderProps,
  ThemeDensity,
  ThemeMode,
} from "../types";

export type { ThemeDensity, ThemeMode };

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  /** Resolved appearance for Ant Design (`system` → OS preference). */
  resolved: "light" | "dark";
  density: ThemeDensity;
  setDensity: (density: ThemeDensity) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredMode(key: string): ThemeMode {
  try {
    const raw = localStorage.getItem(key);
    if (raw === "light" || raw === "dark" || raw === "system") return raw;
  } catch {
    /* ignore */
  }
  return "system";
}

function getSystemDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function readStoredDensity(key: string): ThemeDensity {
  try {
    const raw = localStorage.getItem(key);
    if (raw === "comfortable" || raw === "compact") return raw;
  } catch {
    /* ignore */
  }
  return "comfortable";
}

const DEFAULT_MODE_KEY = "ding-react-admin-theme-mode";
const DEFAULT_DENSITY_KEY = "ding-react-admin-theme-density";

export function AppThemeProvider({
  children,
  modeStorageKey = DEFAULT_MODE_KEY,
  densityStorageKey = DEFAULT_DENSITY_KEY,
}: AppThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() =>
    readStoredMode(modeStorageKey),
  );
  const [density, setDensityState] = useState<ThemeDensity>(() =>
    readStoredDensity(densityStorageKey),
  );
  const [systemDark, setSystemDark] = useState(getSystemDark);

  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mode]);

  const setMode = (next: ThemeMode) => {
    setModeState(next);
    try {
      localStorage.setItem(modeStorageKey, next);
    } catch {
      /* ignore */
    }
  };

  const setDensity = (next: ThemeDensity) => {
    setDensityState(next);
    try {
      localStorage.setItem(densityStorageKey, next);
    } catch {
      /* ignore */
    }
  };

  const resolved: "light" | "dark" =
    mode === "system" ? (systemDark ? "dark" : "light") : mode;

  const configTheme = useMemo(() => {
    const base =
      resolved === "dark"
        ? antdTheme.darkAlgorithm
        : antdTheme.defaultAlgorithm;
    return {
      algorithm:
        density === "compact"
          ? [base, antdTheme.compactAlgorithm]
          : base,
    };
  }, [resolved, density]);

  const value = useMemo(
    () => ({ mode, setMode, resolved, density, setDensity }),
    [mode, resolved, density, setMode, setDensity],
  );

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider theme={configTheme}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useThemeMode must be used within AppThemeProvider");
  return ctx;
}

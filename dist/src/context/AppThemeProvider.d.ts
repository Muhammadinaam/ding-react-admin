import { AppThemeProviderProps, ThemeDensity, ThemeMode } from '../types';
export type { ThemeDensity, ThemeMode };
type ThemeContextValue = {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    /** Resolved appearance for Ant Design (`system` → OS preference). */
    resolved: "light" | "dark";
    density: ThemeDensity;
    setDensity: (density: ThemeDensity) => void;
};
export declare function AppThemeProvider({ children, modeStorageKey, densityStorageKey, }: AppThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useThemeMode(): ThemeContextValue;
//# sourceMappingURL=AppThemeProvider.d.ts.map
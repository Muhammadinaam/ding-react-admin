import { FlatNavItem } from '../layouts/navFilter';
import { NavItem } from '../types';
export type AppHubProps = {
    apps: NavItem[];
    /** Flattened leaf menus from all apps — enables cross-app search when set. */
    menuItems?: FlatNavItem[];
    onAppClick?: (app: NavItem) => void;
    onMenuClick?: (item: FlatNavItem) => void;
    menuSearchPlaceholder?: string;
    className?: string;
    /** Max width of the centered hub content. Default `960`. */
    maxWidth?: number;
};
export declare function AppHub({ apps, menuItems, onAppClick, onMenuClick, menuSearchPlaceholder, className, maxWidth, }: AppHubProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AppHub.d.ts.map